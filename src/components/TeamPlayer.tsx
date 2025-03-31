
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Twitch, Youtube, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface PlayerSocial {
  type: 'twitch' | 'youtube' | 'twitter';
  url: string;
}

export interface Player {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  game: string;
  country: string;
  description: string;
  socials: PlayerSocial[];
}

interface TeamPlayerProps {
  player: Player;
}

const TeamPlayer: React.FC<TeamPlayerProps> = ({ player }) => {
  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'twitch':
        return <Twitch className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/3 aspect-square">
            <img 
              src={player.imageUrl} 
              alt={player.name}
              className="object-cover h-full w-full"
            />
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded-sm">
              {player.game}
            </div>
          </div>
          
          <div className="p-4 w-full md:w-2/3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">{player.name}</h3>
                <p className="text-sm text-muted-foreground">{player.role}</p>
                <p className="text-xs mt-1">{player.country}</p>
              </div>
              
              <div className="flex space-x-1">
                {player.socials.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      {getSocialIcon(social.type)}
                    </Button>
                  </a>
                ))}
              </div>
            </div>
            
            <p className="mt-3 text-sm line-clamp-3">{player.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamPlayer;
