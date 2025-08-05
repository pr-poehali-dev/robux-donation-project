import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { RobloxPlayer } from '@/types/roblox';

interface JoinServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: RobloxPlayer | null;
}

export function JoinServerModal({ isOpen, onClose, player }: JoinServerModalProps) {
  const [isJoining, setIsJoining] = useState(false);

  if (!player) return null;

  const handleJoinServer = async () => {
    setIsJoining(true);
    
    // Имитируем процесс подключения
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // В реальном приложении здесь был бы запрос к Roblox API
    // Для демонстрации просто показываем успешное подключение
    
    // Открываем Roblox (или показываем инструкции)
    const robloxUrl = `roblox://experiences/start?placeId=123456&gameInstanceId=${player.currentServer}`;
    
    try {
      // Пытаемся открыть Roblox напрямую
      window.location.href = robloxUrl;
    } catch {
      // Fallback - копируем в буфер обмена
      navigator.clipboard.writeText(robloxUrl);
    }
    
    setIsJoining(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Icon name="Users" size={24} />
            Присоединиться к серверу
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Информация об игроке */}
          <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Icon name="User" size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">{player.username}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-green-500 text-white">
                  Уровень {player.level}
                </Badge>
                <Badge variant="outline" className="border-blue-500 text-blue-400">
                  {player.rating} рейтинг
                </Badge>
              </div>
            </div>
          </div>

          {/* Информация о сервере */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Icon name="Server" size={20} />
              <span className="font-medium">Сервер:</span>
              <span className="text-blue-400">{player.currentServer}</span>
            </div>
            
            <div className="flex items-center gap-2 text-white">
              <Icon name="Users" size={20} />
              <span className="font-medium">Игроков онлайн:</span>
              <span className="text-green-400">{Math.floor(Math.random() * 20) + 5}</span>
            </div>

            <div className="flex items-center gap-2 text-white">
              <Icon name="Clock" size={20} />
              <span className="font-medium">Ping:</span>
              <span className="text-yellow-400">{Math.floor(Math.random() * 50) + 20}ms</span>
            </div>
          </div>

          {/* Предупреждение */}
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-400">
              <Icon name="AlertTriangle" size={16} />
              <span className="text-sm">
                Убедитесь, что у вас установлен Roblox для подключения к серверу
              </span>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              disabled={isJoining}
            >
              Отмена
            </Button>
            <Button
              onClick={handleJoinServer}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              disabled={isJoining || !player.currentServer}
            >
              {isJoining ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Подключение...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Icon name="Play" size={16} />
                  Присоединиться
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default JoinServerModal;