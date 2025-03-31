
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { getMockNews, getMockTweets } from '@/data/mockData';
import { NewsItem } from '@/components/NewsCard';
import { Tweet } from '@/components/TweetCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import TweetSidebar from '@/components/TweetSidebar';

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the specific article and tweets
    const timer = setTimeout(() => {
      const allNews = getMockNews();
      const foundArticle = allNews.find(item => item.id === id);
      const allTweets = getMockTweets();
      setArticle(foundArticle || null);
      setTweets(allTweets.slice(0, 5)); // Get top 5 tweets
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-64 bg-gray-200 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8 px-4">
          <Link to="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </Link>
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground">The article you're looking for doesn't exist or has been removed.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8 px-4">
          <Link to="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main article content - centered in the middle */}
            <article className="md:col-start-3 md:col-span-6 col-span-1">
              <header className="mb-6">
                <div className="flex gap-2 mb-3">
                  <span className="bg-[#01E67B] text-white text-xs font-medium px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="bg-black/10 text-xs px-2 py-1 rounded">
                    {article.source}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <time dateTime={article.publishedAt.toISOString()}>
                    {formatDistanceToNow(article.publishedAt, { addSuffix: true })}
                  </time>
                </div>
              </header>

              <div className="aspect-video w-full mb-8 overflow-hidden rounded-lg">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg font-medium mb-6">{article.excerpt}</p>
                
                <p>The competitive esports scene saw a significant development today as {article.title.toLowerCase()}. Industry experts have been closely monitoring this situation, which represents a pivotal moment for the {article.category} community.</p>
                
                <p>According to sources at {article.source}, this development comes after months of speculation and behind-the-scenes negotiations. "We've been tracking these changes for some time now," said one insider who requested anonymity due to the sensitivity of the information.</p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Impact on the Competitive Scene</h2>
                
                <p>The implications for the competitive {article.category} scene cannot be overstated. Teams across the globe are already strategizing how to adapt to these new circumstances, with many top players taking to social media to express their thoughts on the matter.</p>
                
                <p>"This changes everything about how we approach tournaments going forward," noted one professional player. "The meta is definitely going to shift dramatically in response."</p>
                
                <p>Fans have reacted with a mixture of excitement and concern, with community forums buzzing with discussions about what this means for upcoming tournaments and league play.</p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Looking Ahead</h2>
                
                <p>As the esports world continues to process this news, analysts are already predicting far-reaching consequences that could reshape competitive play for seasons to come. Tournament organizers are reportedly considering format adjustments to accommodate these new developments.</p>
                
                <p>The timing is particularly significant with several major championships on the horizon. Teams that can quickly adapt to these changes will likely find themselves with a competitive advantage in the coming months.</p>
                
                <p>We'll continue to monitor this evolving story and provide updates as more information becomes available.</p>
              </div>
            </article>
            
            {/* Right sidebar - positioned at the far right */}
            <aside className="md:col-span-3 col-span-1">
              <TweetSidebar tweets={tweets} />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Article;
