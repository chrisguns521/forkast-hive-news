
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, Search, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

const STREAMER_CATEGORIES = [
  { name: 'Twitch', slug: 'twitch' },
  { name: 'YouTube', slug: 'youtube' },
  { name: 'Facebook Gaming', slug: 'facebook' },
  { name: 'Kick', slug: 'kick' },
  { name: 'TikTok Live', slug: 'tiktok' }
];

const POPULAR_GAMES = [
  { name: 'League of Legends', slug: 'league-of-legends' },
  { name: 'Dota 2', slug: 'dota-2' },
  { name: 'Counter-Strike', slug: 'counter-strike' },
  { name: 'Valorant', slug: 'valorant' }
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/39a65fc8-c40b-4ed2-9292-c8af6831873b.png" 
              alt="Forkast Hive Logo" 
              className="h-8 w-8"
            />
            <span className="font-bold text-xl hidden md:inline-block">Forkast</span>
            <span className="font-bold text-lg text-muted-foreground hidden md:inline-block">Hive</span>
          </Link>
        </div>

        
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="group flex items-center text-sm font-medium">
                Games
                <ChevronDown className="ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {POPULAR_GAMES.map((game) => (
                <DropdownMenuItem key={game.slug} asChild>
                  <Link to={`/games/${game.slug}`} className="flex items-center">
                    {game.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="group flex items-center text-sm font-medium">
                Streamer News
                <ChevronDown className="ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {STREAMER_CATEGORIES.map((platform) => (
                <DropdownMenuItem key={platform.slug} asChild>
                  <Link to={`/streamer/${platform.slug}`} className="flex items-center">
                    {platform.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <a 
            href="https://www.communitygaming.io/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Tournaments
          </a>
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:flex relative w-full max-w-sm items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-muted"
            />
          </div>
        </div>
      </div>

      
      {mobileMenuOpen && (
        <div className="md:hidden border-t py-4 animate-fade-in">
          <div className="container space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 bg-muted w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link 
                to="/" 
                className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a 
                href="https://www.communitygaming.io/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tournaments
              </a>
            </div>
            <div className="pt-2 border-t">
              <p className="mb-2 text-sm font-medium">Streamer News</p>
              <div className="grid grid-cols-2 gap-2">
                {STREAMER_CATEGORIES.map((platform) => (
                  <Link
                    key={platform.slug}
                    to={`/streamer/${platform.slug}`}
                    className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{platform.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t">
              <p className="mb-2 text-sm font-medium">Games</p>
              <div className="grid grid-cols-2 gap-2">
                {POPULAR_GAMES.map((game) => (
                  <Link
                    key={game.slug}
                    to={`/games/${game.slug}`}
                    className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{game.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
