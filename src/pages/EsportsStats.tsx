
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, BarChart3, LineChart, Home } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart as RechartsLineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TournamentStatCard from '@/components/TournamentStatCard';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  getMockGameStats, 
  getMockTeamStats, 
  getTopGamesByViews,
  getYearlyTournamentCount,
  getViewershipTrends
} from '@/data/tournamentStatsData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-3 border border-gray-200 rounded shadow-sm">
        <p className="label font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const EsportsStats = () => {
  const [gamesData, setGamesData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);
  const [topGames, setTopGames] = useState([]);
  const [yearlyTournaments, setYearlyTournaments] = useState([]);
  const [viewershipTrends, setViewershipTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState('2023');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setGamesData(getMockGameStats());
      setTeamsData(getMockTeamStats());
      setTopGames(getTopGamesByViews());
      setYearlyTournaments(getYearlyTournamentCount());
      setViewershipTrends(getViewershipTrends());
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded mb-4" />
            <div className="h-64 bg-gray-200 rounded mb-4" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Calculate summary data
  const totalTournaments = gamesData.reduce((sum, game) => sum + game.tournaments, 0);
  const totalPeakViewers = Math.max(...gamesData.map(game => game.peakViewers));
  const totalHoursWatched = gamesData.reduce((sum, game) => sum + game.hours, 0);
  
  // Format for display
  const formattedHours = (totalHoursWatched / 1000000).toFixed(1) + 'M';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-4 mb-6">
          <Button variant="outline" size="sm" className="w-fit" asChild>
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className="text-3xl font-bold">Esports Statistics</h1>
            
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <span className="text-sm text-muted-foreground">Year:</span>
              <Select
                value={yearFilter}
                onValueChange={setYearFilter}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2019">2019</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <TournamentStatCard 
            title="Total Tournaments" 
            value={totalTournaments}
            change={{ value: 18, isPositive: true }}
            icon={<Trophy />}
          />
          <TournamentStatCard 
            title="Peak Viewership" 
            value={totalPeakViewers.toLocaleString()}
            change={{ value: 24, isPositive: true }}
            icon={<Users />}
          />
          <TournamentStatCard 
            title="Hours Watched" 
            value={formattedHours}
            change={{ value: 12, isPositive: true }}
            icon={<BarChart3 />}
          />
        </div>
        
        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Peak Viewers by Game */}
          <Card>
            <CardHeader>
              <CardTitle>Peak Viewers by Game</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topGames}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#8884d8">
                    {topGames.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Yearly Tournament Count */}
          <Card>
            <CardHeader>
              <CardTitle>Tournament Count by Year</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={yearlyTournaments}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="CS:GO" stackId="a" fill="#0088FE" />
                  <Bar dataKey="Valorant" stackId="a" fill="#00C49F" />
                  <Bar dataKey="Dota 2" stackId="a" fill="#FFBB28" />
                  <Bar dataKey="League of Legends" stackId="a" fill="#FF8042" />
                  <Bar dataKey="Overwatch" stackId="a" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Viewership Trends */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Monthly Viewership Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart
                data={viewershipTrends}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="Peak Viewers" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Average Viewers" stroke="#82ca9d" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Esports Games Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Game Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Game</TableHead>
                  <TableHead>Tournaments</TableHead>
                  <TableHead>Peak Viewers</TableHead>
                  <TableHead>Average Viewers</TableHead>
                  <TableHead>Hours Watched</TableHead>
                  <TableHead>Platforms</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gamesData.map((game, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{game.name}</TableCell>
                    <TableCell>{game.tournaments}</TableCell>
                    <TableCell>{game.peakViewers.toLocaleString()}</TableCell>
                    <TableCell>{game.averageViewers.toLocaleString()}</TableCell>
                    <TableCell>{(game.hours / 1000000).toFixed(1)}M</TableCell>
                    <TableCell>{game.platforms.join(', ')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Top Teams Table */}
        <Card>
          <CardHeader>
            <CardTitle>Top Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team</TableHead>
                  <TableHead>Tournaments</TableHead>
                  <TableHead>Matches</TableHead>
                  <TableHead>Win Rate</TableHead>
                  <TableHead>Peak Viewers</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamsData.map((team, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img src={team.logo} alt={team.name} className="w-6 h-6 rounded-full" />
                        <span className="font-medium">{team.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{team.tournaments}</TableCell>
                    <TableCell>{team.matches}</TableCell>
                    <TableCell>{team.winrate}%</TableCell>
                    <TableCell>{team.peakViewers.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default EsportsStats;
