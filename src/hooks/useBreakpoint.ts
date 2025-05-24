import { useState, useEffect } from 'react';

function useBreakpoint(breakpoint: number) {
  const [isBelow, setIsBelow] = useState(() => window.innerWidth < breakpoint);
  useEffect(() => {
    const handleResize = () => setIsBelow(window.innerWidth < breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isBelow;
}

export default useBreakpoint; 