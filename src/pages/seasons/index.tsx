import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CarImage from '../../assets/images/car.jpg';
import { PAGE_LIMIT } from '../../constants';
import type { Season } from '../../types/index.ts';
import { formatWikipediaUrl } from '../../utils/helpers';
import { Pagination, CardView, ListView, Header, LoadingSpinner, ErrorMessage } from '../../components';
import useFetch from '../../hooks/useFetch';

const Seasons: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [cardView, setCardView] = useState<boolean>(true);
  const offset = (page - 1) * PAGE_LIMIT;
  const url = `${import.meta.env.VITE_API_URL}/seasons.json?limit=${PAGE_LIMIT}&offset=${offset}`;
  const { data, loading, error } = useFetch<any>(url);
  const seasons: Season[] = data?.MRData?.SeasonTable?.Seasons || [];
  const total: number = Number(data?.MRData?.total) || 0;
  const totalPages = Math.ceil(total / PAGE_LIMIT);

  return (
    <div className="p-6 md:ml-30 md:mr-30">
      <Header
        title="Formula One Explorer"
        h2={<>Seasons</>}
        buttonLabel={cardView ? 'List View' : 'Card View'}
        onButtonClick={() => setCardView((v) => !v)}
        buttonProps={{ className: 'cursor-pointer' }}
      />
      {loading && <LoadingSpinner message="Loading..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && seasons.length === 0 && <ErrorMessage message="No seasons found" />}
      {!loading && !error && seasons.length > 0 && (
        <>
          {cardView ? (
            <CardView
              items={seasons}
              getKey={season => season.season}
              getBackgroundImage={() => CarImage}
              renderItem={season => (
                <div className="w-full bg-black/60 p-6 flex flex-col items-center">
                  <div className="text-2xl font-bold text-white mb-2">{season.season}</div>
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
                <div className="flex flex-col sm:flex-row items-center sm:items-center w-full justify-between gap-2">
                  <span className="text-2xl font-extrabold text-gray-900 w-full sm:w-auto text-center sm:text-left">{season.season}</span>
                  <div className="flex gap-4 mt-2 sm:mt-0 w-full sm:w-auto justify-center sm:justify-end">
                    <Link to={`/season/${season.season}`} className="text-blue-700 font-medium hover:underline hover:text-blue-900 transition-colors">
                      Details
                    </Link>
                    <a
                      href={formatWikipediaUrl(season.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 font-medium hover:underline hover:text-blue-700 transition-colors"
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

