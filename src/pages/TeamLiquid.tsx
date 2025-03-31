
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import TeamPlayer, { Player } from '@/components/TeamPlayer';
import PredictionSidebar from '@/components/PredictionSidebar';
import { Prediction } from '@/components/PredictionCard';

// Team Liquid logo
const TEAM_LIQUID_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Team_Liquid_logo.svg/1200px-Team_Liquid_logo.svg.png";

// Mock match schedule data
const matchSchedule = [
  { date: new Date(2025, 9, 15), opponent: 'Cloud9', tournament: 'LCS Summer Split', game: 'League of Legends' },
  { date: new Date(2025, 9, 18), opponent: 'Fnatic', tournament: 'VCT Champions', game: 'Valorant' },
  { date: new Date(2025, 9, 21), opponent: 'Cloud9', tournament: 'LCS Summer Split', game: 'League of Legends' },
  { date: new Date(2025, 9, 22), opponent: 'Astralis', tournament: 'ESL Pro League', game: 'CS:GO' },
  { date: new Date(2025, 9, 25), opponent: 'G2 Esports', tournament: 'VCT Champions', game: 'Valorant' },
  { date: new Date(2025, 9, 28), opponent: 'TSM', tournament: 'LCS Summer Split', game: 'League of Legends' },
  { date: new Date(2025, 9, 30), opponent: 'FaZe Clan', tournament: 'ESL Pro League', game: 'CS:GO' },
  { date: new Date(2025, 10, 3), opponent: 'NaVi', tournament: 'ESL Pro League', game: 'CS:GO' },
  { date: new Date(2025, 10, 5), opponent: '100 Thieves', tournament: 'LCS Summer Split', game: 'League of Legends' },
  { date: new Date(2025, 10, 8), opponent: 'Sentinels', tournament: 'VCT Champions', game: 'Valorant' },
];

// Team Liquid players data
const teamLiquidPlayers: Player[] = [
  {
    id: '1',
    name: 'CoreJJ',
    role: 'Support',
    game: 'League of Legends',
    country: 'South Korea',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Jo "CoreJJ" Yong-in is a League of Legends support player known for his incredible vision control and playmaking abilities. He is a former World Champion with Samsung Galaxy.',
    socials: [
      { type: 'twitch', url: 'https://twitch.tv/corejj' },
      { type: 'twitter', url: 'https://twitter.com/TL_CoreJJ' },
      { type: 'youtube', url: 'https://youtube.com/channel/UC4Ndz4U-8kofo_A9f9SkR0A' }
    ]
  },
  {
    id: '2',
    name: 'Yeon',
    role: 'Bot Lane',
    game: 'League of Legends',
    country: 'United States',
    imageUrl: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=1931&auto=format&fit=crop',
    description: 'Sean "Yeon" Sung is an up-and-coming ADC player who climbed through Team Liquid\'s academy system. Known for his mechanical prowess on champions like Zeri and Lucian.',
    socials: [
      { type: 'twitch', url: 'https://twitch.tv/yeon' },
      { type: 'twitter', url: 'https://twitter.com/TL_Yeon' }
    ]
  },
  {
    id: '3',
    name: 'ScreaM',
    role: 'Entry Fragger',
    game: 'Valorant',
    country: 'Belgium',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    description: 'Adil "ScreaM" Benrlitom is a legendary FPS player who transitioned from CS:GO to Valorant. Known for his incredible aim and headshot ratio, he\'s one of the most mechanically gifted players.',
    socials: [
      { type: 'twitch', url: 'https://twitch.tv/scream' },
      { type: 'twitter', url: 'https://twitter.com/ScreaM_' },
      { type: 'youtube', url: 'https://youtube.com/channel/UCOpuMFmU4s6lWKb_3L5B7tw' }
    ]
  },
  {
    id: '4',
    name: 'soulcas',
    role: 'Flex',
    game: 'Valorant',
    country: 'United Kingdom',
    imageUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=2070&auto=format&fit=crop',
    description: 'Dom "soulcas" Sulcas is a versatile player who can adapt to multiple agents in Valorant. His flexibility allows the team to run various compositions effectively.',
    socials: [
      { type: 'twitch', url: 'https://twitch.tv/soulcas' },
      { type: 'twitter', url: 'https://twitter.com/soulcas_' }
    ]
  },
  {
    id: '5',
    name: 'EliGE',
    role: 'Rifler',
    game: 'CS:GO',
    country: 'United States',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop',
    description: 'Jonathan "EliGE" Jablonowski is an American CS:GO player and one of the best riflers in North America. He has been with Team Liquid for many years and is a cornerstone of their roster.',
    socials: [
      { type: 'twitch', url: 'https://twitch.tv/elige' },
      { type: 'twitter', url: 'https://twitter.com/EliGE' },
      { type: 'youtube', url: 'https://youtube.com/c/EliGE' }
    ]
  },
  {
    id: '6',
    name: 'NAF',
    role: 'Rifler',
    game: 'CS:GO',
    country: 'Canada',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
    description: 'Keith "NAF" Markovic is a Canadian CS:GO player known for his versatility and ability to play multiple roles effectively. His calm demeanor makes him a reliable performer in high-pressure situations.',
    socials: [
      { type: 'twitch', url: 'https://twitch.tv/naffly' },
      { type: 'twitter', url: 'https://twitter.com/NAFFLY' }
    ]
  }
];

// Team Liquid specific predictions
const teamLiquidPredictions: Prediction[] = [
  {
    id: '1',
    question: 'Will Team Liquid win the LCS Summer Split 2025?',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    percentYes: 78,
    volume: '$26.5K',
    endsIn: 'Ends in 45d',
    comments: 35,
    favorited: true
  },
  {
    id: '2',
    question: 'Will CoreJJ have the most assists in the next Team Liquid match?',
    imageUrl: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=1931&auto=format&fit=crop',
    percentYes: 92,
    volume: '$12.3K',
    endsIn: 'Ends in 3d',
    comments: 8
  },
  {
    id: '3',
    question: 'Will Team Liquid\'s Valorant roster reach top 3 in VCT 2025?',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    percentYes: 65,
    volume: '$19.7K',
    endsIn: 'Ends in 30d',
    comments: 42,
    favorited: false
  }
];

const TeamLiquid = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Get matches for selected date
  const matchesOnSelectedDate = date 
    ? matchSchedule.filter(match => 
        match.date.getDate() === date.getDate() && 
        match.date.getMonth() === date.getMonth() && 
        match.date.getFullYear() === date.getFullYear())
    : [];

  // Highlight dates with matches
  const matchDates = matchSchedule.map(match => match.date);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <div className="flex flex-col md:flex-row items-start gap-4 mb-8">
          <img 
            src={TEAM_LIQUID_LOGO} 
            alt="Team Liquid Logo" 
            className="w-24 h-24 md:w-32 md:h-32 object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold">Team Liquid</h1>
            <p className="text-muted-foreground">
              One of the most recognizable esports organizations, competing across multiple titles including League of Legends, Valorant, and CS:GO.
            </p>
            <div className="flex gap-2 mt-2">
              <Badge>Founded: 2000</Badge>
              <Badge variant="secondary">Location: Netherlands</Badge>
              <Badge variant="outline">4x LCS Champions</Badge>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="schedule" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="schedule">Match Schedule</TabsTrigger>
                <TabsTrigger value="players">Players</TabsTrigger>
              </TabsList>
              
              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Matches</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border shadow"
                        modifiers={{
                          highlighted: matchDates
                        }}
                        modifiersStyles={{
                          highlighted: { 
                            backgroundColor: 'rgba(0, 150, 255, 0.1)',
                            fontWeight: 'bold' 
                          }
                        }}
                      />
                      
                      <div>
                        <h3 className="font-medium mb-4">
                          {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
                        </h3>
                        
                        {matchesOnSelectedDate.length > 0 ? (
                          <div className="space-y-4">
                            {matchesOnSelectedDate.map((match, index) => (
                              <div key={index} className="border rounded-md p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-bold">Team Liquid vs {match.opponent}</p>
                                    <p className="text-sm text-muted-foreground">{match.tournament}</p>
                                  </div>
                                  <Badge>{match.game}</Badge>
                                </div>
                                <p className="text-sm mt-2">
                                  {format(match.date, 'h:mm a')} EST
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center p-6 border rounded-md bg-muted/30">
                            <p>No matches scheduled for this date</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="players">
                <div className="grid grid-cols-1 gap-6">
                  <Tabs defaultValue="lol">
                    <TabsList className="mb-6">
                      <TabsTrigger value="lol">League of Legends</TabsTrigger>
                      <TabsTrigger value="valorant">Valorant</TabsTrigger>
                      <TabsTrigger value="csgo">CS:GO</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="lol">
                      <div className="grid gap-6">
                        {teamLiquidPlayers
                          .filter(player => player.game === 'League of Legends')
                          .map(player => (
                            <TeamPlayer key={player.id} player={player} />
                          ))
                        }
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="valorant">
                      <div className="grid gap-6">
                        {teamLiquidPlayers
                          .filter(player => player.game === 'Valorant')
                          .map(player => (
                            <TeamPlayer key={player.id} player={player} />
                          ))
                        }
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="csgo">
                      <div className="grid gap-6">
                        {teamLiquidPlayers
                          .filter(player => player.game === 'CS:GO')
                          .map(player => (
                            <TeamPlayer key={player.id} player={player} />
                          ))
                        }
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-6">Team Liquid Predictions</h2>
            <div className="grid gap-4">
              <PredictionSidebar />
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-lg">Team Liquid Specific Predictions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teamLiquidPredictions.map(prediction => (
                    <div key={prediction.id} className="border-b pb-4 last:border-b-0">
                      <p className="font-medium mb-1">{prediction.question}</p>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{prediction.endsIn}</span>
                        <span>{prediction.percentYes}% Yes</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamLiquid;
