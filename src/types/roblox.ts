export interface RobloxServer {
  id: number;
  name: string;
  description: string;
  players: number;
  maxPlayers: number;
  gamemode: string;
  developer: string;
  status: 'online' | 'offline' | 'maintenance';
  gameId?: string;
  universeId?: string;
  placeId?: string;
  thumbnail?: string;
  created?: string;
  updated?: string;
}

export interface RobloxPlayer {
  id: number;
  username: string;
  displayName?: string;
  level: number;
  rating: number;
  status: 'online' | 'offline' | 'away';
  currentServer: string | null;
  avatar?: string;
  joinDate?: string;
  lastOnline?: string;
  premium?: boolean;
}

export interface RobloxApiConfig {
  baseUrl: string;
  apiKey?: string;
  enableMockData: boolean;
  refreshInterval: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface GameStats {
  playing: number;
  visits: number;
  favorites: number;
  rating: {
    upVotes: number;
    downVotes: number;
  };
}