// seasons page
export interface Season {
  season: string;
  url: string;
}


// races page
interface Circuit {
  circuitId: string;
  circuitName: string;
}

export interface Race {
  raceName: string;
  Circuit: Circuit;
  date: string;
  round: string;
}

// race details page
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

export interface Players {
  position: string;
  points: string;
  grid: string;
  laps: string;
  status: string;
  Driver: Driver;
  Time?: Time;
  FastestLap?: FastestLap;
}

export interface RaceData {
  raceName: string;
  Results: Players[];
}