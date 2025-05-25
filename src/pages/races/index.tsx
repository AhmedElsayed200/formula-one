import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Race } from '../../types/index.ts';
import CarImage from '../../assets/images/car.jpg';
import { API_URL, PAGE_LIMIT } from '../../constants';
import { formatDate } from '../../utils/helpers';
import { Pagination, CardView, ListView, Header, LoadingSpinner, ErrorMessage, HeartButton } from '../../components';
import useFetch from '../../hooks/useFetch';
import { useFavouriteRaces } from '../../hooks/useFavouriteRaces';

const Races: React.FC = () => {
  const { id: season } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [cardView, setCardView] = useState(true);
  const offset = (page - 1) * PAGE_LIMIT;
  const url = season ? `${API_URL}/${season}/races.json?limit=${PAGE_LIMIT}&offset=${offset}` : null;
  const { data, loading, error } = useFetch<any>(url);
  const races: Race[] = data?.MRData?.RaceTable?.Races || [];
  const total: number = data?.MRData?.total ? parseInt(data.MRData.total, 10) : 0;
  const totalPages = Math.ceil(total / PAGE_LIMIT);

  // Favourites logic
  const { isFavourite, toggleFavourite } = useFavouriteRaces(season);
  const sortedRaces = [...races].sort((a, b) => {
    const aFav = isFavourite(Number(a.round));
    const bFav = isFavourite(Number(b.round));
    if (aFav === bFav) return 0;
    return aFav ? -1 : 1;
  });

  const renderHeart = (race: Race) => (
    <HeartButton
      active={isFavourite(Number(race.round))}
      onClick={() => toggleFavourite(Number(race.round))}
    />
  );

  return (
    <div className="p-6">
      <Header
        title="Formula One Explorer"
        h2={<>Races for - <span className="text-blue-900">Season {season}</span></>}
        buttonLabel={cardView ? 'List View' : 'Card View'}
        onButtonClick={() => setCardView((v) => !v)}
        buttonProps={{ className: 'cursor-pointer' }}
      />
      {loading && <LoadingSpinner message="Loading..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && races.length === 0 && <ErrorMessage message="No races found" />}
      {!loading && !error && races.length > 0 && (
        <>
          {cardView ? (
            <CardView
              items={sortedRaces}
              getKey={race => race.raceName + race.date}
              getBackgroundImage={() => CarImage}
              renderItem={race => (
                <div className="w-full bg-black/60 p-6 flex flex-col items-center relative">
                  <div className="text-2xl font-bold text-white mb-2">{race.raceName}</div>
                  <div className="text-lg text-white mb-1">{race.Circuit.circuitName}</div>
                  <div className="text-white mb-2">{formatDate(race.date)}</div>
                  <Link to={`/season/${season}/races/${race.round}`} className="text-white font-medium hover:underline hover:text-blue-200">
                    Details
                  </Link>
                  {renderHeart(race)}
                </div>
              )}
            />
          ) : (
            <ListView
              items={sortedRaces}
              getKey={race => race.raceName + race.date}
              getBackgroundImage={() => CarImage}
              renderItem={race => (
                <div className="w-full bg-black/60 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between relative">
                  <span className="text-xl font-semibold text-white mb-2 sm:mb-0">{race.raceName} - {race.Circuit.circuitName} - {formatDate(race.date)}</span>
                  <Link to={`/season/${season}/races/${race.round}`} className="mr-8 text-white font-medium hover:underline hover:text-blue-200">
                    Details
                  </Link>
                  {renderHeart(race)}
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
