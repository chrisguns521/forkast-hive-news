
import React from 'react';
import PredictionCard, { Prediction } from './PredictionCard';

// Mock data for predictions
const mockPredictions: Prediction[] = [
  {
    id: '1',
    question: 'Will Tundra Esports Win ESL One Raleigh?',
    imageUrl: 'https://images.unsplash.com/photo-1551406483-3f3c12c1a171?q=80&w=2000&auto=format&fit=crop',
    percentYes: 96,
    volume: '$18.7K',
    endsIn: 'Ends in 13 days',
    comments: 0,
    favorited: true
  },
  {
    id: '2',
    question: 'Will Team Liquid reach the Finals of Valorant Champions Tour 2025?',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    percentYes: 78,
    volume: '$24.2K',
    endsIn: 'Ends in 21 days',
    comments: 12
  },
  {
    id: '3',
    question: 'Will League of Legends Worlds 2025 break 5M concurrent viewers?',
    imageUrl: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=1931&auto=format&fit=crop',
    percentYes: 82,
    volume: '$31.5K',
    endsIn: 'Ends in 48 days',
    comments: 27,
    favorited: false
  }
];

interface PredictionSidebarProps {
  className?: string;
}

const PredictionSidebar: React.FC<PredictionSidebarProps> = ({ className }) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <span className="bg-[#01E67B] w-2 h-6 mr-2 rounded inline-block"></span>
        Trending Predictions
      </h2>
      
      <div className="space-y-4">
        {mockPredictions.map(prediction => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
      </div>
    </div>
  );
};

export default PredictionSidebar;
