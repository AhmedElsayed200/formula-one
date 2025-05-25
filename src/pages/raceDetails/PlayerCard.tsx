import React from 'react';
import type { Players } from '../../types/index.ts';
import rank1 from '../../assets/images/rank1.webp';
import rank2 from '../../assets/images/rank2.webp';
import rank3 from '../../assets/images/rank3.webp';

interface PlayerCardProps {
  result: Players;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ result }) => {
  const fastestLap = result.FastestLap;
  let badge = null;
  const badgeClass = "absolute -top-9 -left-6 w-14 h-14 z-10";
  if (result.position === '1') {
    badge = <img src={rank1} alt="Rank 1" className={badgeClass} />;
  } else if (result.position === '2') {
    badge = <img src={rank2} alt="Rank 2" className={badgeClass} />;
  } else if (result.position === '3') {
    badge = <img src={rank3} alt="Rank 3" className={badgeClass} />;
  } else {
    badge = (
      <div className={`absolute -top-7 -left-4 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-md shadow-md`}>
        {result.position}
      </div>
    );
  }
  return (
    <div className="w-full pb-2 bg-black/60 flex flex-col items-center relative">
      {/* Position Badge or Image */}
      {badge}
      {/* Driver Name */}
      <div className="text-2xl font-extrabold text-white mb-1 text-center">
        {result.Driver.givenName} {result.Driver.familyName}
      </div>
      {/* Nationality */}
      <div className="text-base text-blue-200 mb-2 text-center">
        {result.Driver.nationality}
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full mt-2 mb-2 text-white text-sm">
        <div className="text-blue-200 font-semibold text-right pr-2">Points</div>
        <div className="font-bold text-left">{result.points}</div>
        <div className="text-blue-200 font-semibold text-right pr-2">Laps</div>
        <div className="font-bold text-left">{result.laps}</div>
        <div className="text-blue-200 font-semibold text-right pr-2">Status</div>
        <div className="font-bold text-left">{result.status}</div>
        <div className="text-blue-200 font-semibold text-right pr-2">Finish Time</div>
        <div className="font-bold text-left">{result.Time?.time || '-'}</div>
        <div className="text-blue-200 font-semibold text-right pr-2">Fastest Lap</div>
        <div className="font-bold text-left">{fastestLap ? fastestLap.Time.time : '-'}</div>
        <div className="text-blue-200 font-semibold text-right pr-2">Avg Speed</div>
        <div className="font-bold text-left">{fastestLap ? `${fastestLap.AverageSpeed.speed} ${fastestLap.AverageSpeed.units}` : '-'}</div>
      </div>
    </div>
  );
};

export default PlayerCard; 