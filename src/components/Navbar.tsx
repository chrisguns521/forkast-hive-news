
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/useMobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-background border-b">
      <div className="container px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <BarChart2 className="h-6 w-6 text-forkast-500" />
          <span className="text-xl font-bold">EsportsInsight</span>
        </Link>

        {/* Mobile menu button */}
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        )}

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link to="/tournament-stats" className="text-sm font-medium hover:text-primary">
            Tournament Stats
          </Link>
          <Link to="/esports-stats" className="text-sm font-medium hover:text-primary">
            Esports Stats
          </Link>
        </nav>

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
