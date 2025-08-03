import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('servers');

  const [servers, setServers] = useState([
    {
      id: 1,
      name: "Adopt Me!",
      description: "Заботься о питомцах, строй дом и заводи друзей в самой популярной игре Roblox",
      players: 156420,
      maxPlayers: 200000,
      gamemode: "Roleplay",
      developer: "DreamCraft",
      status: "online"
    },
    {
      id: 2,
      name: "Brookhaven RP",
      description: "Живи своей мечтой в городе Brookhaven - работай, покупай дома и машины",
      players: 89234,
      maxPlayers: 120000,
      gamemode: "Roleplay",
      developer: "Wolfpaq",
      status: "online"
    },
    {
      id: 3,
      name: "Blox Fruits",
      description: "Стань сильнейшим пиратом! Ешь дьявольские фрукты и исследуй моря",
      players: 234567,
      maxPlayers: 300000,
      gamemode: "Action",
      developer: "Gamer Robot Inc",
      status: "online"
    },
    {
      id: 4,
      name: "Murder Mystery 2",
      description: "Кто убийца? Расследуй преступления или стань самым опасным киллером",
      players: 45678,
      maxPlayers: 80000,
      gamemode: "Mystery",
      developer: "Nikilis",
      status: "online"
    },
    {
      id: 5,
      name: "Arsenal",
      description: "Динамичный FPS шутер с уникальным оружием и картами",
      players: 67890,
      maxPlayers: 100000,
      gamemode: "FPS",
      developer: "ROLVe Community",
      status: "online"
    },
    {
      id: 6,
      name: "Tower of Hell",
      description: "Поднимайся по бесконечной башне с препятствиями - докажи свое мастерство!",
      players: 34567,
      maxPlayers: 60000,
      gamemode: "Platformer",
      developer: "YXCeptional Studios",
      status: "online"
    },
    {
      id: 7,
      name: "Jailbreak",
      description: "Сбеги из тюрьмы или поймай преступников - выбери свою сторону",
      players: 78901,
      maxPlayers: 110000,
      gamemode: "Crime",
      developer: "Badimo",
      status: "online"
    },
    {
      id: 8,
      name: "Piggy",
      description: "Выживи в мире зараженных свинок и разгадай тайну инфекции",
      players: 23456,
      maxPlayers: 50000,
      gamemode: "Horror",
      developer: "MiniToon",
      status: "online"
    },
    {
      id: 9,
      name: "Pet Simulator X",
      description: "Собирай редких питомцев, открывай яйца и торгуй с друзьями",
      players: 45230,
      maxPlayers: 70000,
      gamemode: "Simulator",
      developer: "BIG Games",
      status: "online"
    },
    {
      id: 10,
      name: "Phantom Forces",
      description: "Реалистичный тактический шутер с большим арсеналом оружия",
      players: 12890,
      maxPlayers: 40000,
      gamemode: "Tactical FPS",
      developer: "StyLiS Studios",
      status: "online"
    },
    {
      id: 11,
      name: "Natural Disaster Survival",
      description: "Выживай в природных катастрофах - торнадо, цунами и землетрясения!",
      players: 8765,
      maxPlayers: 25000,
      gamemode: "Survival",
      developer: "Stickmasterluke",
      status: "online"
    },
    {
      id: 12,
      name: "Bee Swarm Simulator",
      description: "Разводи пчел, собирай мед и стань самым богатым пчеловодом",
      players: 34521,
      maxPlayers: 55000,
      gamemode: "Simulator",
      developer: "Onett",
      status: "online"
    },
    {
      id: 13,
      name: "Work at a Pizza Place",
      description: "Работай в пиццерии, готовь заказы и зарабатывай деньги",
      players: 19876,
      maxPlayers: 35000,
      gamemode: "Job Simulator",
      developer: "Dued1",
      status: "online"
    },
    {
      id: 14,
      name: "Da Hood",
      description: "Уличная жизнь в городе - сражайся, торгуй и выживай в жестоком мире",
      players: 67432,
      maxPlayers: 90000,
      gamemode: "Hood Life",
      developer: "Da Hood Entertainment",
      status: "online"
    },
    {
      id: 15,
      name: "Grow a Garden",
      description: "Выращивай растения, ухаживай за садом и создавай ботанический рай",
      players: 15432,
      maxPlayers: 30000,
      gamemode: "Farming",
      developer: "Garden Studios",
      status: "online"
    }
  ]);

  const [players, setPlayers] = useState([
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
    {
      id: 3,
      username: "NoobMaster69",
      level: 234,
      rating: 5680,
      status: "online",
      currentServer: "Arsenal"
    },
    {
      id: 4,
      username: "BuilderPro2024",
      level: 167,
      rating: 3950,
      status: "offline",
      currentServer: null
    },
    {
      id: 5,
      username: "ShadowAssassin",
      level: 298,
      rating: 6420,
      status: "online",
      currentServer: "Murder Mystery 2"
    },
    {
      id: 6,
      username: "RainbowUnicorn",
      level: 89,
      rating: 2180,
      status: "online",
      currentServer: "Brookhaven RP"
    },
    {
      id: 7,
      username: "SpeedRun_King",
      level: 201,
      rating: 4750,
      status: "online",
      currentServer: "Tower of Hell"
    },
    {
      id: 8,
      username: "CriminalMind",
      level: 156,
      rating: 3680,
      status: "offline",
      currentServer: null
    }
  ]);

  // Динамическое обновление онлайна каждые 3-5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setServers(prevServers => 
        prevServers.map(server => ({
          ...server,
          players: Math.max(1000, Math.floor(server.players + Math.random() * 2000 - 1000))
        }))
      );
    }, Math.random() * 2000 + 3000); // 3-5 секунд

    return () => clearInterval(interval);
  }, []);

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
                    
                    <div className="space-y-2">
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
                      
                      <div className="flex items-center gap-2">
                        <Icon name="Code" size={16} className="text-yellow-400" />
                        <span className="text-gray-300 text-sm">
                          by {server.developer}
                        </span>
                      </div>
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