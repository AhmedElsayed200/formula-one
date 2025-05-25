import { useCallback, useEffect, useState } from 'react';

function getStorageKey(season: string) {
  return `favouriteRaces_${season}`;
}

export function useFavouriteRaces(season: string | undefined) {
  const [favourites, setFavourites] = useState<number[]>([]);

  useEffect(() => {
    if (!season) return;
    const key = getStorageKey(season);
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setFavourites(JSON.parse(stored));
      } catch {
        setFavourites([]);
      }
    } else {
      setFavourites([]);
    }
  }, [season]);

  const isFavourite = useCallback((round: number) => {
    return favourites.includes(round);
  }, [favourites]);

  const toggleFavourite = useCallback((round: number) => {
    if (!season) return;
    const key = getStorageKey(season);
    setFavourites(prev => {
      let updated;
      if (prev.includes(round)) {
        updated = prev.filter(r => r !== round);
      } else {
        updated = [...prev, round];
      }
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });
  }, [season]);

  return { favourites, isFavourite, toggleFavourite };
} 