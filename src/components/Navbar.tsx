
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, Search, Gamepad2, Trophy, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

const GAME_CATEGORIES = [
  { name: 'League of Legends', slug: 'lol' },
  { name: 'Valorant', slug: 'valorant' },
  { name: 'CS:GO', slug: 'csgo' },
  { name: 'Dota 2', slug: 'dota2' },
  { name: 'Overwatch', slug: 'overwatch' }
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
            <div className="flex items-center justify-center rounded-full bg-gradient-to-br from-forkast-300 to-forkast-500 w-8 h-8">
              <Trophy className="h-4 w-4 text-white" />
            </div>
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
              {GAME_CATEGORIES.map((game) => (
                <DropdownMenuItem key={game.slug} asChild>
                  <Link to={`/game/${game.slug}`} className="flex items-center">
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    {game.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/tournaments" className="text-sm font-medium transition-colors hover:text-primary">
            Tournaments
          </Link>
          <Link to="/teams" className="text-sm font-medium transition-colors hover:text-primary">
            Teams
          </Link>
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
              <Link 
                to="/tournaments" 
                className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tournaments
              </Link>
              <Link 
                to="/teams" 
                className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Teams
              </Link>
            </div>
            <div className="pt-2 border-t">
              <p className="mb-2 text-sm font-medium">Games</p>
              <div className="grid grid-cols-2 gap-2">
                {GAME_CATEGORIES.map((game) => (
                  <Link
                    key={game.slug}
                    to={`/game/${game.slug}`}
                    className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Gamepad2 className="h-4 w-4" />
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
