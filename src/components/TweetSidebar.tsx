
import React from 'react';
import { Tweet } from './TweetCard';
import TweetCard from './TweetCard';

interface TweetSidebarProps {
  tweets: Tweet[];
}

const TweetSidebar: React.FC<TweetSidebarProps> = ({ tweets }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <span className="bg-[#01E67B] w-2 h-6 mr-2 rounded inline-block"></span>
        Latest Tweets
      </h2>
      
      <div className="space-y-4">
        {tweets.map(tweet => (
          <TweetCard 
            key={tweet.id} 
            tweet={tweet} 
            className="shadow-sm border border-gray-100"
          />
        ))}
      </div>
    </div>
  );
};

export default TweetSidebar;
