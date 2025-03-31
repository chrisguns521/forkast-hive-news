
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DollarSign, ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const BettingOdds = () => {
  const { toast } = useToast();

  // Mock betting odds data for different games
  const lolMatchOdds = [
    { id: 1, match: 'T1 vs Gen.G', date: 'Oct 20, 2025', team1: 'T1', team1Odds: 1.85, team2: 'Gen.G', team2Odds: 1.95, trending: 'team1' },
    { id: 2, match: 'Cloud9 vs Team Liquid', date: 'Oct 21, 2025', team1: 'Cloud9', team1Odds: 2.10, team2: 'Team Liquid', team2Odds: 1.75, trending: 'team2' },
    { id: 3, match: 'G2 Esports vs Fnatic', date: 'Oct 22, 2025', team1: 'G2 Esports', team1Odds: 1.65, team2: 'Fnatic', team2Odds: 2.25, trending: 'team1' },
    { id: 4, match: 'DRX vs Hanwha Life', date: 'Oct 23, 2025', team1: 'DRX', team1Odds: 2.45, team2: 'Hanwha Life', team2Odds: 1.55, trending: 'team2' },
    { id: 5, match: 'JD Gaming vs Top Esports', date: 'Oct 24, 2025', team1: 'JD Gaming', team1Odds: 1.90, team2: 'Top Esports', team2Odds: 1.90, trending: 'none' }
  ];

  const valorantMatchOdds = [
    { id: 1, match: 'Sentinels vs OpTic Gaming', date: 'Oct 19, 2025', team1: 'Sentinels', team1Odds: 1.75, team2: 'OpTic Gaming', team2Odds: 2.10, trending: 'team1' },
    { id: 2, match: 'Fnatic vs Team Liquid', date: 'Oct 20, 2025', team1: 'Fnatic', team1Odds: 1.95, team2: 'Team Liquid', team2Odds: 1.85, trending: 'team2' },
    { id: 3, match: 'LOUD vs NRG', date: 'Oct 21, 2025', team1: 'LOUD', team1Odds: 1.80, team2: 'NRG', team2Odds: 2.00, trending: 'team1' },
    { id: 4, match: 'Paper Rex vs DRX', date: 'Oct 22, 2025', team1: 'Paper Rex', team1Odds: 2.15, team2: 'DRX', team2Odds: 1.70, trending: 'team2' },
    { id: 5, match: 'Evil Geniuses vs 100 Thieves', date: 'Oct 23, 2025', team1: 'Evil Geniuses', team1Odds: 1.90, team2: '100 Thieves', team2Odds: 1.90, trending: 'none' }
  ];

  const csgoMatchOdds = [
    { id: 1, match: 'Navi vs Vitality', date: 'Oct 18, 2025', team1: 'Navi', team1Odds: 1.65, team2: 'Vitality', team2Odds: 2.25, trending: 'team1' },
    { id: 2, match: 'FaZe vs G2', date: 'Oct 19, 2025', team1: 'FaZe', team1Odds: 1.95, team2: 'G2', team2Odds: 1.85, trending: 'team2' },
    { id: 3, match: 'Astralis vs Team Liquid', date: 'Oct 20, 2025', team1: 'Astralis', team1Odds: 2.10, team2: 'Team Liquid', team2Odds: 1.75, trending: 'team2' },
    { id: 4, match: 'ENCE vs Complexity', date: 'Oct 21, 2025', team1: 'ENCE', team1Odds: 1.85, team2: 'Complexity', team2Odds: 1.95, trending: 'team1' },
    { id: 5, match: 'Cloud9 vs Heroic', date: 'Oct 22, 2025', team1: 'Cloud9', team1Odds: 2.00, team2: 'Heroic', team2Odds: 1.80, trending: 'team2' }
  ];

  const handlePlaceBet = (team, odds) => {
    toast({
      title: "Bet Placed",
      description: `You've placed a bet on ${team} at odds of ${odds}. Good luck!`,
      duration: 3000,
    });
  };

  const getTrendingIcon = (trending, team) => {
    if (trending === 'none') return null;
    if ((trending === 'team1' && team === 'team1') || (trending === 'team2' && team === 'team2')) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
    return <ArrowDown className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <DollarSign className="h-8 w-8 mr-2 text-green-500" />
          Esports Betting Odds
        </h1>
        
        <p className="text-muted-foreground mb-8">
          Get the latest odds for upcoming esports matches across all major tournaments. Place your bets and follow the action!
        </p>
        
        <Tabs defaultValue="lol" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="lol">League of Legends</TabsTrigger>
            <TabsTrigger value="valorant">Valorant</TabsTrigger>
            <TabsTrigger value="csgo">CS:GO</TabsTrigger>
          </TabsList>
          
          {/* League of Legends Odds */}
          <TabsContent value="lol">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sword className="h-5 w-5 mr-2" />
                  League of Legends - Upcoming Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Team 1</TableHead>
                      <TableHead>Odds</TableHead>
                      <TableHead>Team 2</TableHead>
                      <TableHead>Odds</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lolMatchOdds.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell className="font-medium">{match.match}</TableCell>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {match.team1}
                            {getTrendingIcon(match.trending, 'team1')}
                          </div>
                        </TableCell>
                        <TableCell>{match.team1Odds}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {match.team2}
                            {getTrendingIcon(match.trending, 'team2')}
                          </div>
                        </TableCell>
                        <TableCell>{match.team2Odds}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handlePlaceBet(match.team1, match.team1Odds)}
                            >
                              Bet 1
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handlePlaceBet(match.team2, match.team2Odds)}
                            >
                              Bet 2
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Valorant Odds */}
          <TabsContent value="valorant">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crosshair className="h-5 w-5 mr-2" />
                  Valorant - Upcoming Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Team 1</TableHead>
                      <TableHead>Odds</TableHead>
                      <TableHead>Team 2</TableHead>
                      <TableHead>Odds</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {valorantMatchOdds.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell className="font-medium">{match.match}</TableCell>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {match.team1}
                            {getTrendingIcon(match.trending, 'team1')}
                          </div>
                        </TableCell>
                        <TableCell>{match.team1Odds}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {match.team2}
                            {getTrendingIcon(match.trending, 'team2')}
                          </div>
                        </TableCell>
                        <TableCell>{match.team2Odds}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handlePlaceBet(match.team1, match.team1Odds)}
                            >
                              Bet 1
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handlePlaceBet(match.team2, match.team2Odds)}
                            >
                              Bet 2
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* CS:GO Odds */}
          <TabsContent value="csgo">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  CS:GO - Upcoming Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Team 1</TableHead>
                      <TableHead>Odds</TableHead>
                      <TableHead>Team 2</TableHead>
                      <TableHead>Odds</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {csgoMatchOdds.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell className="font-medium">{match.match}</TableCell>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {match.team1}
                            {getTrendingIcon(match.trending, 'team1')}
                          </div>
                        </TableCell>
                        <TableCell>{match.team1Odds}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {match.team2}
                            {getTrendingIcon(match.trending, 'team2')}
                          </div>
                        </TableCell>
                        <TableCell>{match.team2Odds}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handlePlaceBet(match.team1, match.team1Odds)}
                            >
                              Bet 1
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handlePlaceBet(match.team2, match.team2Odds)}
                            >
                              Bet 2
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Betting Information</h2>
          <p>Odds displayed are for informational purposes only. Betting may not be legal in your jurisdiction. Always gamble responsibly and be aware of your local laws regarding online betting.</p>
          <p className="mt-2">Data sourced from various esports betting platforms and updated daily.</p>
        </div>
      </main>
    </div>
  );
};

export default BettingOdds;
