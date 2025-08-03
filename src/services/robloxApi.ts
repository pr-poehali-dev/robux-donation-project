import { RobloxServer, RobloxPlayer, RobloxApiConfig, ApiResponse, GameStats } from '@/types/roblox';

class RobloxApiService {
  private config: RobloxApiConfig = {
    baseUrl: 'https://games.roblox.com/v1',
    enableMockData: true,
    refreshInterval: 30000, // 30 seconds
  };

  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 30000; // 30 seconds

  constructor(config?: Partial<RobloxApiConfig>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  private async fetchWithCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key);
    const now = Date.now();

    if (cached && now - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    const data = await fetcher();
    this.cache.set(key, { data, timestamp: now });
    return data;
  }

  private async makeRequest<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      if (this.config.enableMockData) {
        return this.getMockResponse<T>(endpoint);
      }

      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        data,
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Roblox API Error:', error);
      return {
        data: null as T,
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      };
    }
  }

  private getMockResponse<T>(endpoint: string): ApiResponse<T> {
    // Mock responses для разработки
    const mockData = this.generateMockData(endpoint);
    
    return {
      data: mockData as T,
      success: true,
      timestamp: new Date().toISOString(),
    };
  }

  private generateMockData(endpoint: string): any {
    if (endpoint.includes('/games')) {
      return this.getMockServers();
    }
    if (endpoint.includes('/users')) {
      return this.getMockPlayers();
    }
    return null;
  }

  private getMockServers(): RobloxServer[] {
    // Возвращаем существующие mock данные
    return [];
  }

  private getMockPlayers(): RobloxPlayer[] {
    // Возвращаем существующие mock данные
    return [];
  }

  // Публичные методы API
  async getPopularGames(): Promise<ApiResponse<RobloxServer[]>> {
    return this.fetchWithCache('popular-games', () => 
      this.makeRequest<RobloxServer[]>('/games/sorts?sortToken=popularFriends&limit=50')
    );
  }

  async getGameStats(universeId: string): Promise<ApiResponse<GameStats>> {
    return this.fetchWithCache(`game-stats-${universeId}`, () =>
      this.makeRequest<GameStats>(`/games/${universeId}/votes`)
    );
  }

  async searchGames(query: string): Promise<ApiResponse<RobloxServer[]>> {
    return this.makeRequest<RobloxServer[]>(`/games/list?query=${encodeURIComponent(query)}`);
  }

  async getUserProfile(userId: string): Promise<ApiResponse<RobloxPlayer>> {
    return this.fetchWithCache(`user-${userId}`, () =>
      this.makeRequest<RobloxPlayer>(`/users/${userId}`)
    );
  }

  // Конфигурация
  updateConfig(newConfig: Partial<RobloxApiConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  enableRealApi(apiKey?: string): void {
    this.config.enableMockData = false;
    if (apiKey) {
      this.config.apiKey = apiKey;
    }
  }

  enableMockData(): void {
    this.config.enableMockData = true;
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const robloxApi = new RobloxApiService();
export default RobloxApiService;