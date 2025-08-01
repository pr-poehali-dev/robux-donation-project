import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('servers');

  const servers = [
    {
      id: 1,
      name: "Epic Battles Arena",
      description: "Сражайтесь в эпических битвах с игроками со всего мира",
      players: 234,
      maxPlayers: 500,
      gamemode: "PvP",
      status: "online"
    },
    {
      id: 2,
      name: "Creative Building World",
      description: "Стройте невероятные миры и делитесь ими с друзьями",
      players: 156,
      maxPlayers: 300,
      gamemode: "Creative",
      status: "online"
    },
    {
      id: 3,
      name: "Survival Adventure",
      description: "Выживайте в опасном мире полном приключений",
      players: 89,
      maxPlayers: 200,
      gamemode: "Survival",
      status: "online"
    }
  ];

  const players = [
    {
      id: 1,
      username: "ProGamer2024",
      level: 85,
      rating: 2450,
      status: "online",
      currentServer: "Epic Battles Arena"
    },
    {
      id: 2,
      username: "BuildMaster",
      level: 72,
      rating: 2200,
      status: "online",
      currentServer: "Creative Building World"
    },
    {
      id: 3,
      username: "SurvivalKing",
      level: 94,
      rating: 2680,
      status: "offline",
      currentServer: null
    }
  ];

  const filteredServers = servers.filter(server =>
    server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    server.gamemode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPlayers = players.filter(player =>
    player.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Icon name="Gamepad2" size={32} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              ROBLOX CONNECTOR
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Подключайтесь к любым серверам и находите игроков для совместных приключений в Roblox
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="flex gap-4 mb-6">
              <Button
                variant={searchType === 'servers' ? 'default' : 'outline'}
                onClick={() => setSearchType('servers')}
                className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <Icon name="Server" size={20} className="mr-2" />
                Серверы
              </Button>
              <Button
                variant={searchType === 'players' ? 'default' : 'outline'}
                onClick={() => setSearchType('players')}
                className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                <Icon name="Users" size={20} className="mr-2" />
                Игроки
              </Button>
            </div>
            
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={searchType === 'servers' ? "Найти сервер по названию или режиму игры..." : "Найти игрока по никнейму..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        {searchType === 'servers' ? (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Icon name="Server" size={28} />
              Популярные серверы
              <Badge variant="secondary" className="bg-orange-500 text-white">
                {filteredServers.length}
              </Badge>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServers.map((server) => (
                <Card key={server.id} className="bg-slate-800/70 border-slate-700 hover:bg-slate-800/90 transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-white text-xl">{server.name}</CardTitle>
                      <Badge className="bg-green-500 text-white">
                        <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                        Онлайн
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">{server.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Users" size={16} className="text-blue-400" />
                        <span className="text-white font-semibold">
                          {server.players}/{server.maxPlayers}
                        </span>
                      </div>
                      <Badge variant="outline" className="border-purple-500 text-purple-300">
                        {server.gamemode}
                      </Badge>
                    </div>

                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(server.players / server.maxPlayers) * 100}%` }}
                      ></div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold">
                      <Icon name="LogIn" size={16} className="mr-2" />
                      Подключиться
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Icon name="Users" size={28} />
              Топовые игроки
              <Badge variant="secondary" className="bg-blue-500 text-white">
                {filteredPlayers.length}
              </Badge>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlayers.map((player, index) => (
                <Card key={player.id} className="bg-slate-800/70 border-slate-700 hover:bg-slate-800/90 transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          #{index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{player.username}</CardTitle>
                          <p className="text-gray-400 text-sm">Уровень {player.level}</p>
                        </div>
                      </div>
                      <Badge className={player.status === 'online' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                        <div className={`w-2 h-2 ${player.status === 'online' ? 'bg-white' : 'bg-gray-300'} rounded-full mr-1`}></div>
                        {player.status === 'online' ? 'Онлайн' : 'Оффлайн'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Trophy" size={16} className="text-yellow-400" />
                        <span className="text-white font-semibold">
                          Рейтинг: {player.rating}
                        </span>
                      </div>
                    </div>

                    {player.currentServer && (
                      <div className="bg-slate-700/50 rounded-lg p-3">
                        <p className="text-gray-300 text-sm mb-1">Играет на сервере:</p>
                        <p className="text-white font-semibold">{player.currentServer}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 border-blue-500 text-blue-300 hover:bg-blue-500/20">
                        <Icon name="UserPlus" size={16} className="mr-2" />
                        Добавить
                      </Button>
                      {player.currentServer && (
                        <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                          <Icon name="Users" size={16} className="mr-2" />
                          Присоединиться
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;