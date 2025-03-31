
import React, { useState, useEffect } from 'react';
import { Filter, Users, Trophy, Eye } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import TournamentStatCard from '@/components/TournamentStatCard';
import { getMockTournamentMatches, TournamentMatch } from '@/data/tournamentStatsData';

const TournamentStats = () => {
  const [matches, setMatches] = useState<TournamentMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [gameFilter, setGameFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const tournamentMatches = getMockTournamentMatches();
      setMatches(tournamentMatches);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Apply filters
  const filteredMatches = matches.filter(match => {
    const matchesSearch = 
      match.tournament.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.team1.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.team2.name.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesGame = gameFilter === 'all' || match.game === gameFilter;
    const matchesPlatform = platformFilter === 'all' || match.platform === platformFilter;
    
    return matchesSearch && matchesGame && matchesPlatform;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMatches = filteredMatches.slice(startIndex, startIndex + itemsPerPage);
  
  // Calculate summary stats
  const totalViewers = matches.reduce((sum, match) => sum + match.viewers.peak, 0);
  const averageViewers = matches.length 
    ? Math.round(matches.reduce((sum, match) => sum + match.viewers.average, 0) / matches.length) 
    : 0;
  const uniqueTournaments = [...new Set(matches.map(match => match.tournament))].length;
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded mb-4" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Tournament Statistics</h1>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <TournamentStatCard 
            title="Total Matches" 
            value={matches.length}
            icon={<Trophy />}
          />
          <TournamentStatCard 
            title="Unique Tournaments" 
            value={uniqueTournaments}
            icon={<Trophy />}
          />
          <TournamentStatCard 
            title="Peak Viewers" 
            value={totalViewers.toLocaleString()}
            icon={<Eye />}
          />
          <TournamentStatCard 
            title="Average Viewers" 
            value={averageViewers.toLocaleString()}
            icon={<Users />}
          />
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search tournaments or teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={gameFilter}
              onValueChange={setGameFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Game" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Games</SelectItem>
                <SelectItem value="CS:GO">CS:GO</SelectItem>
                <SelectItem value="Valorant">Valorant</SelectItem>
                <SelectItem value="Dota 2">Dota 2</SelectItem>
                <SelectItem value="League of Legends">League of Legends</SelectItem>
                <SelectItem value="Overwatch">Overwatch</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={platformFilter}
              onValueChange={setPlatformFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="Twitch">Twitch</SelectItem>
                <SelectItem value="YouTube">YouTube</SelectItem>
                <SelectItem value="Afreeca">Afreeca</SelectItem>
                <SelectItem value="Huya">Huya</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Matches Table */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Tournament Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tournament</TableHead>
                  <TableHead>Teams</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Game</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead className="text-right">Peak Viewers</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedMatches.length > 0 ? (
                  paginatedMatches.map((match) => (
                    <TableRow key={match.id}>
                      <TableCell className="font-medium">{match.tournament}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img src={match.team1.logo} alt={match.team1.name} className="w-6 h-6 rounded-full" />
                          <span>{match.team1.name}</span>
                          <span className="font-bold">{match.team1.score} - {match.team2.score}</span>
                          <img src={match.team2.logo} alt={match.team2.name} className="w-6 h-6 rounded-full" />
                          <span>{match.team2.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{format(match.startTime, 'MMM d, yyyy')}</TableCell>
                      <TableCell>{match.game}</TableCell>
                      <TableCell>{match.platform}</TableCell>
                      <TableCell className="text-right">{match.viewers.peak.toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">No matches found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TournamentStats;
