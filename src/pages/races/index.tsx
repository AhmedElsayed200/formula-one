import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Race } from '../../types/index.ts';
import CarImage from '../../assets/images/car.jpg';
import { API_URL, PAGE_LIMIT } from '../../constants';
import { formatDate } from '../../utils/helpers';
import Pagination from '../../components/Pagination.tsx';
import CardView from '../../components/CardView';
import ListView from '../../components/ListView';
import Header from '../../components/Header';

const Races: React.FC = () => {
  const { id: season } = useParams<{ id: string }>();
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [cardView, setCardView] = useState(true);

  useEffect(() => {
    setPage(1);
  }, [season]);

  useEffect(() => {
    if (!season) return;
    const fetchRaces = async () => {
      setLoading(true);
      setError('');
      try {
        const offset = (page - 1) * PAGE_LIMIT;
        const res = await fetch(`${API_URL}/${season}/races.json?limit=${PAGE_LIMIT}&offset=${offset}`);
        if (!res.ok) throw new Error('Failed to fetch races');
        const data = await res.json();
        const newRaces: Race[] = data.MRData.RaceTable.Races;
        setRaces(newRaces);
        setTotal(parseInt(data.MRData.total, 10));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchRaces();
  }, [season, page]);

  const totalPages = Math.ceil(total / PAGE_LIMIT);

  return (
    <div className="p-6">
      <Header
        title="Formula One Explorer"
        h2={<>Races for - <span className="text-blue-900">Season {season}</span></>}
        buttonLabel={cardView ? 'List View' : 'Card View'}
        onButtonClick={() => setCardView((v) => !v)}
        buttonProps={{ className: 'cursor-pointer' }}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && races.length === 0 && <p>No races found.</p>}
      {!loading && !error && races.length > 0 && (
        <>
          {cardView ? (
            <CardView
              items={races}
              getKey={race => race.raceName + race.date}
              getBackgroundImage={() => CarImage}
              renderItem={race => (
                <div className="w-full bg-black/60 p-6 flex flex-col items-center">
                  <div className="text-2xl font-bold text-white mb-2">{race.raceName}</div>
                  <div className="text-lg text-white mb-1">{race.Circuit.circuitName}</div>
                  <div className="text-white mb-2">{formatDate(race.date)}</div>
                  <Link to={`/season/${season}/races/${race.round}`} className="text-white font-medium hover:underline hover:text-blue-200">
                    Details
                  </Link>
                </div>
              )}
            />
          ) : (
            <ListView
              items={races}
              getKey={race => race.raceName + race.date}
              getBackgroundImage={() => CarImage}
              renderItem={race => (
                <div className="w-full bg-black/60 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xl font-semibold text-white mb-2 sm:mb-0">{race.raceName} - {race.Circuit.circuitName} - {formatDate(race.date)}</span>
                  <Link to={`/season/${season}/races/${race.round}`} className="text-white font-medium hover:underline hover:text-blue-200">
                    Details
                  </Link>
                </div>
              )}
            />
          )}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default Races;
