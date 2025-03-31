
import { formatDistanceToNow, subDays } from 'date-fns';

// Mock tournament data
export interface TournamentMatch {
  id: string;
  tournament: string;
  team1: {
    name: string;
    logo: string;
    score: number;
  };
  team2: {
    name: string;
    logo: string;
    score: number;
  };
  startTime: Date;
  viewers: {
    peak: number;
    average: number;
  };
  platform: string;
  game: string;
}

export interface GameStats {
  name: string;
  tournaments: number;
  peakViewers: number;
  averageViewers: number;
  hours: number;
  platforms: string[];
}

export interface TeamStats {
  name: string;
  logo: string;
  tournaments: number;
  matches: number;
  winrate: number;
  peakViewers: number;
}

const generateTournamentMatches = (): TournamentMatch[] => {
  const teams = [
    { name: "Team Liquid", logo: "https://placehold.co/100x100/2D72F6/FFFFFF?text=TL" },
    { name: "Fnatic", logo: "https://placehold.co/100x100/FF5900/FFFFFF?text=FNC" },
    { name: "Cloud9", logo: "https://placehold.co/100x100/00AEEF/FFFFFF?text=C9" },
    { name: "G2 Esports", logo: "https://placehold.co/100x100/000000/FFFFFF?text=G2" },
    { name: "Evil Geniuses", logo: "https://placehold.co/100x100/0A0A0A/FFFFFF?text=EG" },
    { name: "T1", logo: "https://placehold.co/100x100/E2012D/FFFFFF?text=T1" },
    { name: "100 Thieves", logo: "https://placehold.co/100x100/FF0000/FFFFFF?text=100T" },
    { name: "Sentinels", logo: "https://placehold.co/100x100/D90D1E/FFFFFF?text=SEN" },
  ];
  
  const tournaments = [
    "ESL Pro League Season 16",
    "PGL Major Stockholm",
    "Valorant Champions 2023",
    "The International 2023",
    "Worlds 2023",
    "IEM Katowice 2023"
  ];
  
  const games = ["CS:GO", "Valorant", "Dota 2", "League of Legends", "Overwatch"];
  const platforms = ["Twitch", "YouTube", "Afreeca", "Huya"];
  
  const matches: TournamentMatch[] = [];
  
  for (let i = 0; i < 20; i++) {
    const teamIndexes = getTwoRandomIndexes(teams.length);
    const team1Index = teamIndexes[0];
    const team2Index = teamIndexes[1];
    
    const team1Score = Math.floor(Math.random() * 3);
    const team2Score = team1Score === 2 ? Math.floor(Math.random() * 2) : 2;
    
    const now = new Date();
    const randomDaysAgo = Math.floor(Math.random() * 10) + 1;
    const startTime = subDays(now, randomDaysAgo);
    
    const peakViewers = Math.floor(Math.random() * 900000) + 100000;
    const averageViewers = Math.floor(peakViewers * (0.5 + Math.random() * 0.3));
    
    matches.push({
      id: `match-${i+1}`,
      tournament: tournaments[Math.floor(Math.random() * tournaments.length)],
      team1: {
        name: teams[team1Index].name,
        logo: teams[team1Index].logo,
        score: team1Score
      },
      team2: {
        name: teams[team2Index].name,
        logo: teams[team2Index].logo,
        score: team2Score
      },
      startTime,
      viewers: {
        peak: peakViewers,
        average: averageViewers
      },
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      game: games[Math.floor(Math.random() * games.length)]
    });
  }
  
  return matches;
};

function getTwoRandomIndexes(max: number): [number, number] {
  const first = Math.floor(Math.random() * max);
  let second = Math.floor(Math.random() * max);
  while (second === first) {
    second = Math.floor(Math.random() * max);
  }
  return [first, second];
}

export const getMockTournamentMatches = (): TournamentMatch[] => {
  return generateTournamentMatches();
};

export const getMockGameStats = (): GameStats[] => {
  return [
    {
      name: "CS:GO",
      tournaments: 126,
      peakViewers: 1.4e6,
      averageViewers: 830000,
      hours: 87400000,
      platforms: ["Twitch", "YouTube", "GOTV"]
    },
    {
      name: "Valorant",
      tournaments: 92,
      peakViewers: 1.2e6,
      averageViewers: 748000,
      hours: 72600000,
      platforms: ["Twitch", "YouTube"]
    },
    {
      name: "League of Legends",
      tournaments: 156,
      peakViewers: 3.8e6,
      averageViewers: 1235000,
      hours: 124800000,
      platforms: ["Twitch", "YouTube", "AfreecaTV"]
    },
    {
      name: "Dota 2",
      tournaments: 84,
      peakViewers: 2.7e6,
      averageViewers: 980000,
      hours: 58900000,
      platforms: ["Twitch", "YouTube", "Steam.tv"]
    },
    {
      name: "Overwatch",
      tournaments: 68,
      peakViewers: 840000,
      averageViewers: 520000,
      hours: 42300000,
      platforms: ["Twitch", "YouTube", "OverwatchLeague.com"]
    }
  ];
};

export const getMockTeamStats = (): TeamStats[] => {
  return [
    {
      name: "Team Liquid",
      logo: "https://placehold.co/100x100/2D72F6/FFFFFF?text=TL",
      tournaments: 42,
      matches: 187,
      winrate: 68.4,
      peakViewers: 1240000
    },
    {
      name: "Fnatic",
      logo: "https://placehold.co/100x100/FF5900/FFFFFF?text=FNC",
      tournaments: 38,
      matches: 165,
      winrate: 71.2,
      peakViewers: 1180000
    },
    {
      name: "G2 Esports",
      logo: "https://placehold.co/100x100/000000/FFFFFF?text=G2",
      tournaments: 36,
      matches: 158,
      winrate: 64.8,
      peakViewers: 1420000
    },
    {
      name: "T1",
      logo: "https://placehold.co/100x100/E2012D/FFFFFF?text=T1",
      tournaments: 32,
      matches: 142,
      winrate: 73.5,
      peakViewers: 2240000
    },
    {
      name: "Cloud9",
      logo: "https://placehold.co/100x100/00AEEF/FFFFFF?text=C9",
      tournaments: 34,
      matches: 149,
      winrate: 62.7,
      peakViewers: 980000
    }
  ];
};

export const getTopGamesByViews = () => {
  return [
    { name: "League of Legends", value: 3800000 },
    { name: "Dota 2", value: 2700000 },
    { name: "CS:GO", value: 1400000 },
    { name: "Valorant", value: 1200000 },
    { name: "Overwatch", value: 840000 }
  ];
};

export const getYearlyTournamentCount = () => {
  return [
    { name: "2019", "CS:GO": 104, "Valorant": 0, "Dota 2": 72, "League of Legends": 128, "Overwatch": 76 },
    { name: "2020", "CS:GO": 89, "Valorant": 42, "Dota 2": 52, "League of Legends": 112, "Overwatch": 58 },
    { name: "2021", "CS:GO": 98, "Valorant": 68, "Dota 2": 64, "League of Legends": 124, "Overwatch": 64 },
    { name: "2022", "CS:GO": 114, "Valorant": 84, "Dota 2": 78, "League of Legends": 138, "Overwatch": 62 },
    { name: "2023", "CS:GO": 126, "Valorant": 92, "Dota 2": 84, "League of Legends": 156, "Overwatch": 68 }
  ];
};

export const getViewershipTrends = () => {
  return [
    { name: "Jan", "Peak Viewers": 1200000, "Average Viewers": 680000 },
    { name: "Feb", "Peak Viewers": 1850000, "Average Viewers": 920000 },
    { name: "Mar", "Peak Viewers": 1400000, "Average Viewers": 750000 },
    { name: "Apr", "Peak Viewers": 980000, "Average Viewers": 580000 },
    { name: "May", "Peak Viewers": 2200000, "Average Viewers": 1200000 },
    { name: "Jun", "Peak Viewers": 1750000, "Average Viewers": 950000 },
    { name: "Jul", "Peak Viewers": 1300000, "Average Viewers": 720000 },
    { name: "Aug", "Peak Viewers": 3800000, "Average Viewers": 1850000 },
    { name: "Sep", "Peak Viewers": 2700000, "Average Viewers": 1450000 },
    { name: "Oct", "Peak Viewers": 1950000, "Average Viewers": 1050000 },
    { name: "Nov", "Peak Viewers": 1650000, "Average Viewers": 880000 },
    { name: "Dec", "Peak Viewers": 2100000, "Average Viewers": 1150000 }
  ];
};
