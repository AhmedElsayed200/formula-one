import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

interface Circuit {
  circuitId: string;
  circuitName: string;
}

interface Race {
  raceName: string;
  Circuit: Circuit;
  date: string;
  round: string;
}

const PAGE_LIMIT = 7;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const Races: React.FC = () => {
  const { id: season } = useParams<{ id: string }>();
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastRaceRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new window.IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setRaces([]);
    setPage(0);
    setHasMore(true);
  }, [season]);

  useEffect(() => {
    if (!season || !hasMore) return;
    const fetchRaces = async () => {
      setLoading(true);
      setError('');
      try {
        const offset = page * PAGE_LIMIT;
        const res = await fetch(`http://ergast.com/api/f1/${season}/races.json?limit=${PAGE_LIMIT}&offset=${offset}`);
        if (!res.ok) throw new Error('Failed to fetch races');
        const data = await res.json();
        const newRaces: Race[] = data.MRData.RaceTable.Races;
        setRaces(prev => {
          // Prevent duplicates by checking round+date
          const existingKeys = new Set(prev.map(r => r.round + r.date));
          const filteredNew = newRaces.filter(r => !existingKeys.has(r.round + r.date));
          return [...prev, ...filteredNew];
        });
        const total = parseInt(data.MRData.total, 10);
        if (offset + newRaces.length >= total) setHasMore(false);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchRaces();
  }, [season, page]);

  return (
    <div>
      <h2>Races {season && `for ${season}`}</h2>
      {races.map((race, idx) => {
        if (idx === races.length - 1) {
          return (
            <div ref={lastRaceRef} key={race.raceName + race.date} style={{ marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
              <Link to={`/season/${season}/races/${race.round}`}>
                <div><strong>Race:</strong> {race.raceName}</div>
                <div><strong>Circuit:</strong> {race.Circuit.circuitName}</div>
                <div><strong>Date:</strong> {formatDate(race.date)}</div>
              </Link>
            </div>
          );
        }
        return (
          <div key={race.raceName + race.date} style={{ marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
            <Link to={`/season/${season}/races/${race.round}`}>
                <div><strong>Race:</strong> {race.raceName}</div>
                <div><strong>Circuit:</strong> {race.Circuit.circuitName}</div>
                <div><strong>Date:</strong> {formatDate(race.date)}</div>
              </Link>
          </div>
        );
      })}
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!hasMore && !loading && <div>No more races.</div>}
    </div>
  );
};

export default Races;
