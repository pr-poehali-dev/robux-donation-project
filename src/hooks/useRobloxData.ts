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
        username: "xX_DarkLord_Xx",
        level: 185,
        rating: 4850,
        status: "online",
        currentServer: "Blox Fruits"
      },
      {
        id: 2,
        username: "CutePetLover123",
        level: 142,
        rating: 3200,
        status: "online",
        currentServer: "Adopt Me!"
      },
      // Добавляем больше mock данных...
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