
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BarChart2, ChevronDown, Gamepad2, Radio, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/useMobile';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // List of games for dropdown
  const games = [
    { name: "League of Legends", href: "/game/lol" },
    { name: "Valorant", href: "/game/valorant" },
    { name: "CS:GO", href: "/game/csgo" },
    { name: "Dota 2", href: "/game/dota2" },
    { name: "Mobile Legends", href: "/game/mobile-legends" }
  ];

  // List of streamers/content categories
  const streamerCategories = [
    { name: "Twitch Highlights", href: "/streamer/twitch" },
    { name: "YouTube Content", href: "/streamer/youtube" },
    { name: "Content Creator News", href: "/streamer/news" },
    { name: "Streaming Updates", href: "/streamer/updates" }
  ];

  return (
    <header className="bg-background border-b">
      <div className="container px-4 flex h-16 items-center">
        {/* Logo and Nav items container */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/c02f731f-c1e1-4d3b-b15a-c2003d536d95.png" 
              alt="Forkast Hive Logo" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold">Forkast Hive</span>
          </Link>

          {/* Desktop navigation - moved next to logo */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            
            {/* Games Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-4 text-sm font-medium">
                    <Gamepad2 className="h-4 w-4 mr-2" />
                    Games
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2">
                      {games.map((game) => (
                        <li key={game.name}>
                          <NavigationMenuLink asChild>
                            <Link 
                              to={game.href} 
                              className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              {game.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Streamer News Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-4 text-sm font-medium">
                    <Radio className="h-4 w-4 mr-2" />
                    Streamer News
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[220px] gap-1 p-2">
                      {streamerCategories.map((category) => (
                        <li key={category.name}>
                          <NavigationMenuLink asChild>
                            <Link 
                              to={category.href} 
                              className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              {category.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/tournament-stats" className="text-sm font-medium hover:text-primary">
              Tournament Stats
            </Link>
            <Link to="/esports-stats" className="text-sm font-medium hover:text-primary">
              Esports Stats
            </Link>
          </nav>
        </div>

        {/* Mobile menu button - pushed to the right */}
        <div className="ml-auto">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          )}
        </div>

        {/* Mobile navigation */}
        {isMobile && isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b z-50">
            <nav className="container flex flex-col py-4">
              <Link
                to="/"
                className="px-4 py-2 text-sm hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Games Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center px-4 py-2 text-sm hover:bg-muted w-full text-left">
                    <Gamepad2 className="h-4 w-4 mr-2" />
                    Games
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-full">
                  {games.map((game) => (
                    <DropdownMenuItem key={game.name} asChild>
                      <Link 
                        to={game.href}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {game.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Mobile Streamer News Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center px-4 py-2 text-sm hover:bg-muted w-full text-left">
                    <Radio className="h-4 w-4 mr-2" />
                    Streamer News
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-full">
                  {streamerCategories.map((category) => (
                    <DropdownMenuItem key={category.name} asChild>
                      <Link 
                        to={category.href}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link
                to="/tournament-stats"
                className="px-4 py-2 text-sm hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                Tournament Stats
              </Link>
              <Link
                to="/esports-stats"
                className="px-4 py-2 text-sm hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                Esports Stats
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
