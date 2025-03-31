
import React from 'react';
import { Star, Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface Prediction {
  id: string;
  question: string;
  imageUrl: string;
  percentYes: number;
  volume: string;
  endsIn: string;
  comments: number;
  favorited?: boolean;
}

interface PredictionCardProps {
  prediction: Prediction;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {
  return (
    <Card className="overflow-hidden mb-5 bg-gray-900 text-white border-none max-w-[80%] mx-auto">
      <div className="relative aspect-[5/3] w-full overflow-hidden">
        <img 
          src={prediction.imageUrl} 
          alt={prediction.question}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-bold leading-tight line-clamp-2">{prediction.question}</h3>
            <button className="text-gray-300 hover:text-forkast-400 mt-0.5">
              <Star className={`h-4 w-4 ${prediction.favorited ? 'fill-forkast-400 text-forkast-400' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      
      <CardContent className="p-2 pt-1.5 bg-gray-900">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <Button 
            variant="ghost" 
            className="bg-emerald-900/50 hover:bg-emerald-800/70 text-white flex items-center justify-center py-1 h-auto text-xs"
          >
            <Check className="mr-1 h-3 w-3" /> Yes
          </Button>
          <Button 
            variant="ghost" 
            className="bg-red-900/50 hover:bg-red-800/70 text-white flex items-center justify-center py-1 h-auto text-xs"
          >
            <X className="mr-1 h-3 w-3" /> No
          </Button>
        </div>
        
        <div className="relative h-1 bg-gray-800 rounded overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-forkast-400" 
            style={{ width: `${prediction.percentYes}%` }}
          />
        </div>
        <div className="text-right text-xs text-emerald-400 mt-0.5">
          {prediction.percentYes}% Yes
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <div className="flex items-center">
            <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {prediction.endsIn}
          </div>
          <div className="flex items-center">
            <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H16M3 12H13M3 18H11M17 20L21 16M21 16L17 12M21 16H7" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {prediction.volume}
          </div>
          <div className="flex items-center">
            <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 8H17M7 12H11M3 20.2895V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H7.8C7.51997 17 7.2486 17.0761 7.01491 17.2168L4.02166 19.2168C3.37984 19.6279 2.5 19.1626 2.5 18.382V18.382C2.5 18.3393 2.50137 18.2967 2.50409 18.2543L3 15L2.5 12L3 8.5L2.5 5" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {prediction.comments}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionCard;
