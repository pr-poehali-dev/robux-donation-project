import { useState, useEffect, useCallback } from 'react';
import { robloxApi } from '@/services/robloxApi';
import { RobloxServer, RobloxPlayer, ApiResponse } from '@/types/roblox';

interface UseRobloxDataState {
  servers: RobloxServer[];
  players: RobloxPlayer[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

interface UseRobloxDataActions {
  refreshData: () => Promise<void>;
  searchGames: (query: string) => Promise<void>;
  toggleApiMode: () => void;
  clearError: () => void;
}

export function useRobloxData(): UseRobloxDataState & UseRobloxDataActions {
  const [state, setState] = useState<UseRobloxDataState>({
    servers: [],
    players: [],
    isLoading: true,
    error: null,
    lastUpdated: null,
  });

  const updateState = useCallback((updates: Partial<UseRobloxDataState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const clearError = useCallback(() => {
    updateState({ error: null });
  }, [updateState]);

  const handleApiResponse = useCallback(<T,>(response: ApiResponse<T>): T | null => {
    if (!response.success) {
      updateState({ error: response.message || 'Произошла ошибка при загрузке данных' });
      return null;
    }
    clearError();
    return response.data;
  }, [updateState, clearError]);

  const loadMockData = useCallback(() => {
    // Загружаем mock данные из текущего состояния приложения
    const mockServers: RobloxServer[] = [
      {
        id: 1,
        name: "Adopt Me!",
        description: "Заботься о питомцах, строй дом и заводи друзей в самой популярной игре Roblox",
        players: Math.floor(Math.random() * 50000) + 150000,
        maxPlayers: 200000,
        gamemode: "Roleplay",
        developer: "DreamCraft",
        status: "online"
      },
      {
        id: 2,
        name: "Blox Fruits",
        description: "Стань сильнейшим пиратом! Ешь дьявольские фрукты и исследуй моря",
        players: Math.floor(Math.random() * 100000) + 200000,
        maxPlayers: 300000,
        gamemode: "Action",
        developer: "Gamer Robot Inc",
        status: "online"
      },
      // Добавляем больше mock данных...
    ];

    const mockPlayers: RobloxPlayer[] = [
      {
        id: 1,
        username: "Builderman",
        level: 100,
        rating: 9999,
        status: "online",
        currentServer: "VIP Сервер"
      },
      {
        id: 2,
        username: "Telamon",
        level: 98,
        rating: 9500,
        status: "online",
        currentServer: "Admin Сервер"
      },
      {
        id: 3,
        username: "KreekCraft",
        level: 95,
        rating: 8900,
        status: "online",
        currentServer: "Kreek Island"
      },
      {
        id: 4,
        username: "Flamingo",
        level: 89,
        rating: 8200,
        status: "online",
        currentServer: "Flamingo Fun"
      },
      {
        id: 5,
        username: "DenisDaily",
        level: 87,
        rating: 7800,
        status: "online",
        currentServer: "Denis World"
      },
      {
        id: 6,
        username: "ItsFunneh",
        level: 84,
        rating: 7400,
        status: "online",
        currentServer: "Krew Сервер"
      },
      {
        id: 7,
        username: "Poke",
        level: 82,
        rating: 7000,
        status: "online",
        currentServer: "Poke Plaza"
      },
      {
        id: 8,
        username: "TanqR",
        level: 90,
        rating: 8500,
        status: "online",
        currentServer: "BedWars Pro"
      },
      {
        id: 9,
        username: "PinkLeaf",
        level: 86,
        rating: 7600,
        status: "online",
        currentServer: "Pink Paradise"
      },
      {
        id: 10,
        username: "Sketch",
        level: 83,
        rating: 7200,
        status: "online",
        currentServer: "Sketch Studios"
      },
      {
        id: 11,
        username: "RussoPlays",
        level: 81,
        rating: 6800,
        status: "offline",
        currentServer: null
      },
      {
        id: 12,
        username: "InquisitorMaster",
        level: 79,
        rating: 6400,
        status: "online",
        currentServer: "Squad Сервер"
      },
      {
        id: 13,
        username: "PrestonPlayz",
        level: 88,
        rating: 8100,
        status: "online",
        currentServer: "Preston's World"
      },
      {
        id: 14,
        username: "Thinknoodles",
        level: 85,
        rating: 7700,
        status: "online",
        currentServer: "Think Tank"
      },
      {
        id: 15,
        username: "CoryxKenshin",
        level: 91,
        rating: 8600,
        status: "online",
        currentServer: "Samurai Dojo"
      },
      {
        id: 16,
        username: "LaurenzSide",
        level: 80,
        rating: 6900,
        status: "online",
        currentServer: "Lauren's Lab"
      },
      {
        id: 17,
        username: "Leah_Ashe",
        level: 78,
        rating: 6500,
        status: "online",
        currentServer: "Royale High VIP"
      },
      {
        id: 18,
        username: "GamingWithJen",
        level: 77,
        rating: 6300,
        status: "online",
        currentServer: "Jen's Playground"
      },
      {
        id: 19,
        username: "RobotMega",
        level: 92,
        rating: 8700,
        status: "online",
        currentServer: "Mega Arena"
      },
      {
        id: 20,
        username: "Hyper",
        level: 93,
        rating: 8800,
        status: "online",
        currentServer: "Hyper Zone"
      },
      {
        id: 21,
        username: "AlbertsStuff",
        level: 88,
        rating: 8000,
        status: "online",
        currentServer: "Albert's Chaos"
      },
      {
        id: 22,
        username: "JeromeASF",
        level: 85,
        rating: 7500,
        status: "online",
        currentServer: "Jerome's Arena"
      },
      {
        id: 23,
        username: "KonekoKitten",
        level: 89,
        rating: 8300,
        status: "online",
        currentServer: "Koneko's Realm"
      },
      {
        id: 24,
        username: "Piggy",
        level: 94,
        rating: 9000,
        status: "online",
        currentServer: "Piggy House"
      },
      {
        id: 25,
        username: "RB_Battles",
        level: 96,
        rating: 9200,
        status: "online",
        currentServer: "RB Battles Hub"
      },
      {
        id: 26,
        username: "StealthAgent",
        level: 87,
        rating: 7900,
        status: "online",
        currentServer: "Stealth HQ"
      },
      {
        id: 27,
        username: "GoldenGlare",
        level: 84,
        rating: 7300,
        status: "online",
        currentServer: "Golden Castle"
      },
      {
        id: 28,
        username: "Remainings",
        level: 91,
        rating: 8500,
        status: "online",
        currentServer: "Remain's Realm"
      },
      {
        id: 29,
        username: "KEEMSTAR",
        level: 76,
        rating: 6200,
        status: "offline",
        currentServer: null
      },
      {
        id: 30,
        username: "SSSniperWolf_YT",
        level: 83,
        rating: 7100,
        status: "online",
        currentServer: "Sniper's Den"
      }
    ];

    updateState({
      servers: mockServers,
      players: mockPlayers,
      isLoading: false,
      lastUpdated: new Date(),
    });
  }, [updateState]);

  const refreshData = useCallback(async () => {
    updateState({ isLoading: true, error: null });
    
    try {
      // Пытаемся загрузить данные через API
      const [serversResponse, playersResponse] = await Promise.all([
        robloxApi.getPopularGames(),
        // Для игроков используем mock данные пока нет реального endpoint
        Promise.resolve({ data: [], success: true, timestamp: new Date().toISOString() } as ApiResponse<RobloxPlayer[]>)
      ]);

      const servers = handleApiResponse(serversResponse);
      const players = handleApiResponse(playersResponse);

      if (servers !== null || players !== null) {
        updateState({
          servers: servers || state.servers,
          players: players || state.players,
          isLoading: false,
          lastUpdated: new Date(),
        });
      } else {
        // Fallback к mock данным
        loadMockData();
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
      updateState({ 
        error: 'Не удалось загрузить данные. Используются локальные данные.',
        isLoading: false 
      });
      loadMockData();
    }
  }, [handleApiResponse, loadMockData, state.servers, state.players, updateState]);

  const searchGames = useCallback(async (query: string) => {
    if (!query.trim()) {
      await refreshData();
      return;
    }

    updateState({ isLoading: true });
    
    try {
      const response = await robloxApi.searchGames(query);
      const results = handleApiResponse(response);
      
      if (results) {
        updateState({ 
          servers: results, 
          isLoading: false,
          lastUpdated: new Date(),
        });
      }
    } catch (error) {
      console.error('Error searching games:', error);
      updateState({ 
        error: 'Ошибка поиска игр',
        isLoading: false 
      });
    }
  }, [refreshData, handleApiResponse, updateState]);

  const toggleApiMode = useCallback(() => {
    // Переключение между mock и реальными данными
    if (robloxApi.config?.enableMockData) {
      robloxApi.enableRealApi();
    } else {
      robloxApi.enableMockData();
    }
    refreshData();
  }, [refreshData]);

  // Автоматическая загрузка данных при монтировании
  useEffect(() => {
    refreshData();
  }, []);

  // Автоматическое обновление каждые 30 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      if (!state.isLoading) {
        refreshData();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshData, state.isLoading]);

  return {
    ...state,
    refreshData,
    searchGames,
    toggleApiMode,
    clearError,
  };
}