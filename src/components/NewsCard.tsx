
import React from 'react';
import { ExternalLink, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  sourceUrl: string;
  imageUrl: string;
  category: string;
  publishedAt: Date;
  url: string;
}

interface NewsCardProps {
  news: NewsItem;
  className?: string;
  featured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, className, featured = false }) => {
  return (
    <article 
      className={cn(
        "news-card group",
        featured ? "md:col-span-2 md:grid md:grid-cols-2 md:gap-4" : "",
        className
      )}
    >
      <div className={cn(
        "aspect-video overflow-hidden relative",
        featured ? "md:h-full" : ""
      )}>
        <Link to={`/article/${news.id}`}>
          <img 
            src={news.imageUrl} 
            alt={news.title} 
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-2 left-2">
          <span className="bg-forkast-500 text-white text-xs font-medium px-2 py-1 rounded">
            {news.category}
          </span>
        </div>
        {news.source && (
          <div className="absolute bottom-2 right-2">
            <span className="bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
              {news.source}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className={cn("news-card-title", featured ? "text-xl md:text-2xl" : "")}>
          <Link 
            to={`/article/${news.id}`}
            className="hover:text-primary transition-colors flex items-start"
          >
            {news.title}
          </Link>
        </h3>
        
        {featured && <p className="text-muted-foreground mt-2 line-clamp-3">{news.excerpt}</p>}
        
        <div className="flex items-center text-xs text-muted-foreground mt-3">
          <Calendar className="h-3 w-3 mr-1" />
          <time dateTime={news.publishedAt.toISOString()}>
            {formatDistanceToNow(news.publishedAt, { addSuffix: true })}
          </time>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
