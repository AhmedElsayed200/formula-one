import React from 'react';
import type { Players } from '../../types/index.ts';

interface PlayerCardProps {
  result: Players;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ result }) => {
  const fastestLap = result.FastestLap;
  return (
    <div className="w-full pb-2 bg-black/60 flex flex-col items-center">
      {/* Position Badge */}
      <div className="absolute top-4 left-4 bg-blue-900 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-md">
        {result.position}
      </div>
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