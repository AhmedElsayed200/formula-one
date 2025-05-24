import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Driver {
  driverId: string;
  givenName: string;
  familyName: string;
  nationality: string;
  dateOfBirth: string;
  url?: string;
}

interface Time {
  millis: string;
  time: string;
}

interface AverageSpeed {
  units: string;
  speed: string;
}

interface FastestLap {
  rank: string;
  lap: string;
  Time: Time;
  AverageSpeed: AverageSpeed;
}

interface Result {
  position: string;
  points: string;
  grid: string;
  laps: string;
  status: string;
  Driver: Driver;
  Time?: Time;
  FastestLap?: FastestLap;
}

interface Race {
  raceName: string;
  Results: Result[];
}

const RaceDetails: React.FC = () => {
  const { seasonId, roundId } = useParams<{ seasonId: string; roundId: string }>();
  const [results, setResults] = useState<Result[]>([]);
  const [raceName, setRaceName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!roundId) return;
    setLoading(true);
    setError('');
    setResults([]);
    setRaceName('');
    fetch(`http://ergast.com/api/f1/${seasonId}/${roundId}/results.json`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch race results');
        return res.json();
      })
      .then((data) => {
        const race: Race = data.MRData.RaceTable.Races[0];
        if (race) {
          setRaceName(race.raceName);
          setResults(race.Results);
        } else {
          setError('Race not found');
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [seasonId, roundId]);

  return (
    <div>
      <h2>Race Details {raceName && `- ${raceName}`}</h2>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && results.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Position</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Nationality</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Grid</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Laps</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Status</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Points</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Finish Time</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Fastest Lap</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Avg Speed</th>
            </tr>
          </thead>
          <tbody>
            {results.map(result => {
              const fastestLap = result.FastestLap;
              return (
                <tr key={result.Driver.driverId}>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{result.position}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{result.Driver.givenName} {result.Driver.familyName}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{result.Driver.nationality}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{result.grid}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{result.laps}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{result.status}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{result.points}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{result.Time?.time || '-'}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{fastestLap ? fastestLap.Time.time : '-'}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{fastestLap ? `${fastestLap.AverageSpeed.speed} ${fastestLap.AverageSpeed.units}` : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {!loading && !error && results.length === 0 && <div>No results found.</div>}
    </div>
  );
};

export default RaceDetails;

