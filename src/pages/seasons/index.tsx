import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CarImage from '../../assets/images/car.jpg';
import { API_URL, PAGE_LIMIT } from '../../constants';
import type { Season } from '../../types/index.ts';
import { formatWikipediaUrl } from '../../utils/helpers';
import Pagination from '../../components/Pagination.tsx';
import CardView from '../../components/CardView';
import ListView from '../../components/ListView';
import Header from '../../components/Header';


const Seasons: React.FC = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [cardView, setCardView] = useState<boolean>(true);

  useEffect(() => {
    const fetchSeasons = async () => {
      setLoading(true);
      setError('');
      try {
        const offset = (page - 1) * PAGE_LIMIT;
        const response = await fetch(`${API_URL}/seasons.json?limit=${PAGE_LIMIT}&offset=${offset}`);
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
    <div className="p-6">
      <Header
        title="Formula One Explorer"
        h2={<>Seasons</>}
        buttonLabel={cardView ? 'List View' : 'Card View'}
        onButtonClick={() => setCardView((v) => !v)}
        buttonProps={{ className: 'cursor-pointer' }}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <>
          {cardView ? (
            <CardView
              items={seasons}
              getKey={season => season.season}
              getBackgroundImage={() => CarImage}
              renderItem={season => (
                <div className="w-full bg-black/60 p-6 flex flex-col items-center">
                  <div className="text-3xl font-bold text-white mb-2">{season.season}</div>
                  <div className="flex gap-4">
                    <Link to={`/season/${season.season}`} className="text-white font-medium hover:underline hover:text-blue-200">
                      Details
                    </Link>
                    <a
                      href={formatWikipediaUrl(season.url)}
                      target="_blank"
                      className="text-white font-medium hover:underline hover:text-blue-200"
                    >
                      Wikipedia
                    </a>
                  </div>
                </div>
              )}
            />
          ) : (
            <ListView
              items={seasons}
              getKey={season => season.season}
              getBackgroundImage={() => CarImage}
              renderItem={season => (
                <div className="w-full bg-black/60 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-2xl font-semibold text-white mb-2 sm:mb-0">{season.season}</span>
                  <div className="flex gap-4">
                    <Link to={`/season/${season.season}`} className="text-white font-medium hover:underline hover:text-blue-200">
                      Details
                    </Link>
                    <a
                      href={formatWikipediaUrl(season.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:underline hover:text-blue-200"
                    >
                      Wikipedia
                    </a>
                  </div>
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

export default Seasons

