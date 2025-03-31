
import React from 'react';
import { Twitter, Heart, MessageCircle, Repeat, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface Tweet {
  id: string;
  author: {
    name: string;
    handle: string;
    avatarUrl: string;
    verified: boolean;
  };
  content: string;
  imageUrl?: string;
  publishedAt: Date;
  stats: {
    likes: number;
    retweets: number;
    replies: number;
  };
  url: string;
}

interface TweetCardProps {
  tweet: Tweet;
  className?: string;
  compact?: boolean;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const TweetCard: React.FC<TweetCardProps> = ({ tweet, className, compact = false }) => {
  return (
    <article className={`news-card bg-white rounded-lg overflow-hidden ${className}`}>
      <div className="p-4">
        <div className="flex items-center">
          <img 
            src={tweet.author.avatarUrl} 
            alt={tweet.author.name} 
            className="w-8 h-8 rounded-full mr-2"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold truncate">{tweet.author.name}</span>
              {tweet.author.verified && (
                <span className="text-blue-500 flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                  </svg>
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground truncate">@{tweet.author.handle}</div>
          </div>
          <div className="ml-auto">
            <Twitter className="h-4 w-4 text-[#1DA1F2]" />
          </div>
        </div>
        
        <p className="mt-2 text-sm whitespace-pre-line line-clamp-3">{tweet.content}</p>
        
        {tweet.imageUrl && !compact && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img 
              src={tweet.imageUrl} 
              alt="Tweet media" 
              className="w-full h-auto"
            />
          </div>
        )}
        
        <div className="mt-2 text-xs text-muted-foreground">
          <time dateTime={tweet.publishedAt.toISOString()} className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDistanceToNow(tweet.publishedAt, { addSuffix: true })}
          </time>
        </div>
        
        <div className="mt-2 pt-2 border-t flex justify-between">
          <div className="flex items-center text-muted-foreground">
            <MessageCircle className="h-3 w-3 mr-1" />
            <span className="text-xs">{formatNumber(tweet.stats.replies)}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Repeat className="h-3 w-3 mr-1" />
            <span className="text-xs">{formatNumber(tweet.stats.retweets)}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Heart className="h-3 w-3 mr-1" />
            <span className="text-xs">{formatNumber(tweet.stats.likes)}</span>
          </div>
          <a 
            href={tweet.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline"
          >
            View
          </a>
        </div>
      </div>
    </article>
  );
};

export default TweetCard;
