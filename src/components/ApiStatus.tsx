import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface ApiStatusProps {
  isConnected: boolean;
  isMockMode: boolean;
  lastUpdated: Date | null;
  onToggleMode: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  error?: string | null;
}

export default function ApiStatus({
  isConnected,
  isMockMode,
  lastUpdated,
  onToggleMode,
  onRefresh,
  isLoading,
  error
}: ApiStatusProps) {
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');

  return (
    <Card className="bg-slate-800/50 border-slate-700 mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Icon name="Wifi" size={20} />
            API Статус
          </CardTitle>
          
          <div className="flex items-center gap-2">
            {isLoading && <LoadingSpinner size="sm" />}
            
            <Badge 
              className={`${
                isConnected && !isMockMode 
                  ? 'bg-green-500' 
                  : isMockMode 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
              } text-white`}
            >
              <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
              {isConnected && !isMockMode 
                ? 'Подключено' 
                : isMockMode 
                  ? 'Mock режим' 
                  : 'Отключено'
              }
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
            <Icon name="AlertCircle" size={16} className="text-red-400" />
            <span className="text-red-300 text-sm">{error}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-300">
            Последнее обновление: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Никогда'}
          </span>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="border-slate-600 text-white hover:bg-slate-700"
            >
              <Icon name="RefreshCw" size={14} className="mr-1" />
              Обновить
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowApiSettings(!showApiSettings)}
              className="border-slate-600 text-white hover:bg-slate-700"
            >
              <Icon name="Settings" size={14} className="mr-1" />
              Настройки
            </Button>
          </div>
        </div>

        {showApiSettings && (
          <div className="border-t border-slate-600 pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Режим данных:</span>
              <Button
                variant={isMockMode ? "outline" : "default"}
                size="sm"
                onClick={onToggleMode}
                className={
                  isMockMode 
                    ? "border-slate-600 text-white hover:bg-slate-700" 
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }
              >
                {isMockMode ? 'Включить Real API' : 'Включить Mock данные'}
              </Button>
            </div>

            {!isMockMode && (
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Roblox API Key (опционально):</label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="Введите API ключ..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                  <Button
                    size="sm"
                    className="bg-orange-500 text-white hover:bg-orange-600"
                  >
                    Сохранить
                  </Button>
                </div>
                <p className="text-xs text-gray-400">
                  API ключ увеличивает лимиты запросов. Получить можно в Roblox Developer Hub.
                </p>
              </div>
            )}

            <div className="text-xs text-gray-400 space-y-1">
              <p><strong>Mock режим:</strong> Использует локальные данные для разработки</p>
              <p><strong>Real API:</strong> Подключается к официальному Roblox API</p>
              <p><strong>Автообновление:</strong> Каждые 30 секунд</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}