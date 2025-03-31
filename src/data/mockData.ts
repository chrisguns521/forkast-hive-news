
import { NewsItem } from '@/components/NewsCard';
import { Tweet } from '@/components/TweetCard';

// Mock images
const gameImages = [
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
];

const avatarImages = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/22.jpg',
  'https://randomuser.me/api/portraits/women/56.jpg',
  'https://randomuser.me/api/portraits/men/75.jpg',
  'https://randomuser.me/api/portraits/women/33.jpg',
];

const tweetImages = [
  'https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
];

const sources = ["ESL", "Dot Esports", "HLTV", "Dexerto", "TheGamer", "Inven Global"];
const categories = ["League of Legends", "Valorant", "CS:GO", "Dota 2", "Overwatch"];

const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Mock authors
const authors = [
  "Alex Johnson",
  "Sarah Chen",
  "Marcus Wright",
  "Elena Rodriguez",
  "Jamal Thompson",
  "Olivia Kim",
  "David Miller",
  "Priya Patel"
];

// Create mock news data
export const getMockNews = (): NewsItem[] => {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const news: NewsItem[] = [
    {
      id: "1",
      title: "Team Liquid Secures Spot in Valorant Champions Tour Finals After Epic Showdown",
      excerpt: "In a nail-biting series that went the distance, Team Liquid has secured their spot in the Valorant Champions Tour Finals, overcoming FunPlus Phoenix in a thrilling 3-2 victory that showcased some of the most intense tactical gameplay this season.",
      source: "Dot Esports",
      sourceUrl: "https://dotesports.com",
      imageUrl: gameImages[0],
      category: "Valorant",
      publishedAt: randomDate(weekAgo, now),
      url: "https://dotesports.com",
      author: "Alex Johnson"
    },
    {
      id: "2",
      title: "Major Update Coming to CS:GO Competitive Map Pool, Developers Confirm",
      excerpt: "Valve has officially confirmed that a major update is coming to the CS:GO competitive map pool, with hints that fan-favorite maps might be making a return while others will be temporarily removed for reworking.",
      source: "HLTV",
      sourceUrl: "https://hltv.org",
      imageUrl: gameImages[1],
      category: "CS:GO",
      publishedAt: randomDate(weekAgo, now),
      url: "https://hltv.org",
      author: "Sarah Chen"
    },
    {
      id: "3",
      title: "T1 Announces Roster Changes Ahead of LCK Summer Split",
      excerpt: "Korean powerhouse T1 has announced significant roster changes ahead of the LCK Summer Split, with two veteran players stepping down and promising talent from their academy team being promoted to the main roster.",
      source: "Inven Global",
      sourceUrl: "https://invenglobal.com",
      imageUrl: gameImages[2],
      category: "League of Legends",
      publishedAt: randomDate(weekAgo, now),
      url: "https://invenglobal.com",
      author: "Marcus Wright"
    },
    {
      id: "4",
      title: "OG Returns to Form with Dominant Performance at ESL One Stockholm",
      excerpt: "Two-time TI champions OG have shown they're back in top form with a dominant performance at ESL One Stockholm, dismantling Team Secret in a one-sided grand final that has the Dota 2 community buzzing.",
      source: "ESL",
      sourceUrl: "https://esl.com",
      imageUrl: gameImages[3],
      category: "Dota 2",
      publishedAt: randomDate(weekAgo, now),
      url: "https://esl.com",
      author: "Elena Rodriguez"
    },
    {
      id: "5",
      title: "Overwatch League Introduces New Format for 2023 Season",
      excerpt: "The Overwatch League has unveiled a completely revamped format for the 2023 season, featuring more regional competitions and an expanded playoff system that aims to create more exciting matchups throughout the year.",
      source: "Dexerto",
      sourceUrl: "https://dexerto.com",
      imageUrl: gameImages[4],
      category: "Overwatch",
      publishedAt: randomDate(weekAgo, now),
      url: "https://dexerto.com",
      author: "Jamal Thompson"
    },
    {
      id: "6",
      title: "New Tournament Circuit Announced for Rising Valorant Teams",
      excerpt: "Riot Games has announced a new tournament circuit specifically designed for up-and-coming Valorant teams, providing a clear path to the pro scene and more opportunities for emerging talent to showcase their skills.",
      source: "TheGamer",
      sourceUrl: "https://thegamer.com",
      imageUrl: gameImages[5],
      category: "Valorant",
      publishedAt: randomDate(weekAgo, now),
      url: "https://thegamer.com",
      author: "Olivia Kim"
    }
  ];
  
  // Add more random news items
  for (let i = 7; i <= 15; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const author = authors[Math.floor(Math.random() * authors.length)];
    
    news.push({
      id: i.toString(),
      title: `${category} Pro Player Makes Surprising Career Move to New Organization`,
      excerpt: `In a move that has surprised the ${category} community, a top professional player has announced their transfer to a new organization, citing the need for a fresh environment and new challenges.`,
      source: source,
      sourceUrl: `https://${source.toLowerCase().replace(' ', '')}.com`,
      imageUrl: gameImages[Math.floor(Math.random() * gameImages.length)],
      category: category,
      publishedAt: randomDate(weekAgo, now),
      url: `https://${source.toLowerCase().replace(' ', '')}.com`,
      author: author
    });
  }
  
  // Sort by date (newest first)
  return news.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
};

// Create mock tweets data
export const getMockTweets = (): Tweet[] => {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const tweetAuthors = [
    { name: "Faker", handle: "faker", verified: true },
    { name: "G2 Esports", handle: "G2esports", verified: true },
    { name: "Cloud9", handle: "Cloud9", verified: true },
    { name: "Valorant", handle: "PlayValorant", verified: true },
    { name: "Team Liquid", handle: "TeamLiquid", verified: true },
    { name: "ESL", handle: "ESL", verified: true },
    { name: "FaZe Clan", handle: "FaZeClan", verified: true },
    { name: "Fnatic", handle: "FNATIC", verified: true },
    { name: "TSM", handle: "TSM", verified: true },
    { name: "100 Thieves", handle: "100Thieves", verified: true },
  ];
  
  const tweets: Tweet[] = [];
  
  tweetAuthors.forEach((author, index) => {
    const hasImage = Math.random() > 0.5;
    
    tweets.push({
      id: (index + 1).toString(),
      author: {
        ...author,
        avatarUrl: avatarImages[index % avatarImages.length],
      },
      content: `Excited to announce our new roster changes for the upcoming season! Can't wait to show you what we've been working on. #Esports #Gaming #NewBeginnings`,
      imageUrl: hasImage ? tweetImages[index % tweetImages.length] : undefined,
      publishedAt: randomDate(weekAgo, now),
      stats: {
        likes: getRandomInt(500, 15000),
        retweets: getRandomInt(100, 5000),
        replies: getRandomInt(50, 1000)
      },
      url: "https://twitter.com"
    });
  });
  
  // Sort by date (newest first)
  return tweets.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
};
