import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'http://ergast.com/api/f1/seasons.json';
const PAGE_LIMIT = 9;

interface Season {
  season: string;
  url: string;
}

function formatWikipediaUrl(rawUrl: string): string {
  let url = rawUrl.replace(/\\/g, '');
  url = url.replace(/^http:\/\//, 'https://');
  return url;
}

const Seasons: React.FC = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchSeasons = async () => {
      setLoading(true);
      setError('');
      try {
        const offset = (page - 1) * PAGE_LIMIT;
        const response = await fetch(`${API_URL}?limit=${PAGE_LIMIT}&offset=${offset}`);
        if (!response.ok) throw new Error('Failed to fetch seasons');
        const data = await response.json();
        const seasonsData: Season[] = data?.MRData?.SeasonTable?.Seasons || [];
        setSeasons(seasonsData);
        setTotal(Number(data?.MRData?.total) || 0);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchSeasons();
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_LIMIT);

  return (
    <div>
      <h2>Seasons</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <>
          <ul>
            {seasons.map((season) => (
              <li key={season.season}>
                <Link to={`/season/${season.season}`}>{season.season}</Link>
                {' | '}
                <a
                  href={formatWikipediaUrl(season.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: 8 }}
                >
                  Wikipedia
                </a>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 16 }}>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              Previous
            </button>
            <span style={{ margin: '0 8px' }}>
              Page {page} of {totalPages}
            </span>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Seasons

