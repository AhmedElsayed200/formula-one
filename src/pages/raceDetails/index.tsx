import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PAGE_LIMIT, API_URL } from '../../constants';
import type { Players, RaceData } from '../../types/index.ts';
import PlayerImage from '../../assets/images/player.jpg';
import Pagination from '../../components/Pagination.tsx';
import CardView from '../../components/CardView';
import Header from '../../components/Header';
import FastestLapChart from '../../components/Charts/FastestLapChart';
import PointsChart from '../../components/Charts/PointsChart';
import TotalRaceTimeChart from '../../components/Charts/TotalRaceTimeChart';
import PlayerCard from './PlayerCard';
import useFetch from '../../hooks/useFetch';

const RaceDetails: React.FC = () => {
  const { seasonId, roundId } = useParams<{ seasonId: string; roundId: string }>();
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const url = seasonId && roundId ? `${API_URL}/${seasonId}/${roundId}/results.json` : null;
  const { data, loading, error } = useFetch<any>(url);

  const players: Players[] = data?.MRData?.RaceTable?.Races?.[0]?.Results || [];
  const raceName: string = data?.MRData?.RaceTable?.Races?.[0]?.raceName || '';

  // Chart data logic
  const fastestLapData = players
    .filter(r => r.FastestLap)
    .map(r => {
      const timeStr = r.FastestLap?.Time.time;
      let seconds = null;
      if (timeStr) {
        const [min, sec] = timeStr.split(':');
        seconds = parseInt(min, 10) * 60 + parseFloat(sec);
      }
      return {
        name: `${r.Driver.givenName} ${r.Driver.familyName}`,
        seconds,
      };
    })
    .filter(d => d.seconds && d.seconds > 0)
    .sort((a, b) => (a.seconds ?? Infinity) - (b.seconds ?? Infinity));

  const pointsData = players
    .map(r => ({
      name: `${r.Driver.givenName} ${r.Driver.familyName}`,
      points: parseFloat(r.points),
    }))
    .filter(d => d.points && d.points > 0)
    .sort((a, b) => (b.points ?? -Infinity) - (a.points ?? -Infinity));

  const totalTimeData = players
    .filter(r => r.Time && r.Time.time)
    .map(r => {
      const timeStr = r.Time?.time;
      let seconds = null;
      if (timeStr) {
        const parts = timeStr.split(':');
        if (parts.length === 3) {
          seconds = parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseFloat(parts[2]);
        } else if (parts.length === 2) {
          seconds = parseInt(parts[0], 10) * 60 + parseFloat(parts[1]);
        }
      }
      return {
        name: `${r.Driver.givenName} ${r.Driver.familyName}`,
        seconds,
      };
    })
    .filter(d => d.seconds && d.seconds > 0)
    .sort((a, b) => (a.seconds ?? Infinity) - (b.seconds ?? Infinity));

  return (
    <div className="p-6">
      <Header
        title="Formula One Explorer"
        h2={<>Race Details - {raceName && <span className="text-blue-900"> {raceName}</span>}</>}
        buttonLabel={showComparison ? 'Players' : 'Comparisons'}
        onButtonClick={() => setShowComparison((v) => !v)}
        buttonProps={{ className: 'cursor-pointer' }}
      />
      {loading && <div style={{ textAlign: 'center', fontSize: 18 }}>Loading...</div>}
      {error && <div style={{ color: 'red', textAlign: 'center', fontSize: 18 }}>{error}</div>}
      {!loading && !error && players?.length > 0 && (
        <>
          {!showComparison && (
            <>
              <CardView
                items={players.slice((page - 1) * PAGE_LIMIT, page * PAGE_LIMIT)}
                getKey={result => result.Driver.driverId}
                getBackgroundImage={() => PlayerImage}
                renderItem={result => <PlayerCard result={result} />}
              />
              <div className="mt-4 text-center">
                <Pagination
                  page={page}
                  totalPages={Math.ceil(players.length / PAGE_LIMIT)}
                  onPageChange={setPage}
                />
              </div>
            </>
          )}

          {/* Charts Section */}
          {showComparison && (
            <>
              <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
                <FastestLapChart fastestLapData={fastestLapData} />
                <PointsChart pointsData={pointsData} />
              </div>
              <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
                <TotalRaceTimeChart totalTimeData={totalTimeData} />
              </div>
            </>
          )}
        </>
      )}
      {!loading && !error && players?.length === 0 && <div style={{ textAlign: 'center', fontSize: 18 }}>No results found.</div>}
    </div>
  );
};

export default RaceDetails;

