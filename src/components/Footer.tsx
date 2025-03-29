
import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Twitter, Twitch, Youtube, Rss } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted py-10 border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center rounded-full bg-gradient-to-br from-forkast-300 to-forkast-500 w-10 h-10">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-xl">Forkast</div>
                <div className="font-bold text-lg text-muted-foreground">Hive</div>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your one-stop destination for the latest esports news, tweets, and updates from around the world.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/tournaments" className="hover:text-primary transition-colors">Tournaments</Link></li>
              <li><Link to="/teams" className="hover:text-primary transition-colors">Teams</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm">Popular Games</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/game/lol" className="hover:text-primary transition-colors">League of Legends</Link></li>
              <li><Link to="/game/valorant" className="hover:text-primary transition-colors">Valorant</Link></li>
              <li><Link to="/game/csgo" className="hover:text-primary transition-colors">CS:GO</Link></li>
              <li><Link to="/game/dota2" className="hover:text-primary transition-colors">Dota 2</Link></li>
              <li><Link to="/game/overwatch" className="hover:text-primary transition-colors">Overwatch</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" aria-label="Twitch" className="hover:text-primary transition-colors">
                <Twitch className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="/rss" aria-label="RSS Feed" className="hover:text-primary transition-colors">
                <Rss className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Subscribe to our newsletter to stay updated with the latest esports news.
            </p>
          </div>
        </div>
        
        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Forkast Hive. All rights reserved.</p>
          <p className="mt-2">
            Forkast Hive is not affiliated with Forkast.gg. This is a fan-made project.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
