
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Twitter, Newspaper, Gamepad2, ArrowLeft, ArrowRight } from 'lucide-react';
import { getMockNews, getMockTweets } from '@/data/mockData';
import NewsCard, { NewsItem } from '@/components/NewsCard';
import TweetCard, { Tweet } from '@/components/TweetCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Index = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setNews(getMockNews());
      setTweets(getMockTweets());
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section with Carousel */}
        <section className="py-8 px-4 bg-gradient-to-br from-forkast-300 to-forkast-400">
          <div className="container">
            {!isLoading && news.length >= 3 && (
              <div className="max-w-5xl mx-auto">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                    duration: 5000,
                    watchDrag: true,
                  }}
                  className="w-full">
                  <CarouselContent>
                    {news.slice(0, 3).map((item) => (
                      <CarouselItem key={item.id}>
                        <div className="p-1">
                          <div className="news-card overflow-hidden bg-white">
                            <div className="flex flex-col md:flex-row">
                              <div className="aspect-video md:w-1/2 overflow-hidden">
                                <Link to={`/article/${item.id}`}>
                                  <img 
                                    src={item.imageUrl} 
                                    alt={item.title} 
                                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                  />
                                </Link>
                              </div>
                              <div className="p-6 md:w-1/2 flex flex-col justify-between">
                                <div>
                                  <div className="flex justify-between items-start mb-3">
                                    <span className="bg-forkast-500 text-white text-xs font-medium px-2 py-1 rounded">
                                      {item.category}
                                    </span>
                                    <span className="bg-black/10 text-xs px-2 py-1 rounded">
                                      {item.source}
                                    </span>
                                  </div>
                                  <h3 className="text-xl md:text-2xl font-bold mb-3">
                                    <Link 
                                      to={`/article/${item.id}`}
                                      className="hover:text-primary transition-colors"
                                    >
                                      {item.title}
                                    </Link>
                                  </h3>
                                  <p className="text-muted-foreground line-clamp-3">
                                    {item.excerpt}
                                  </p>
                                </div>
                                <div className="mt-4">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link to={`/article/${item.id}`} className="inline-flex items-center">
                                      Read More
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 md:left-4" />
                  <CarouselNext className="right-2 md:right-4" />
                </Carousel>
              </div>
            )}
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-8 px-4">
          <div className="container">
            <Tabs defaultValue="news" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Latest Updates</h2>
                <TabsList>
                  <TabsTrigger value="news" className="flex items-center">
                    <Gamepad2 className="h-4 w-4 mr-2" />
                    News
                  </TabsTrigger>
                  <TabsTrigger value="social" className="flex items-center">
                    <Twitter className="h-4 w-4 mr-2" />
                    Social
                  </TabsTrigger>
                </TabsList>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="news-card h-[300px] animate-pulse">
                      <div className="bg-gray-200 aspect-video w-full" />
                      <div className="p-4 space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-3/4" />
                        <div className="h-6 bg-gray-200 rounded w-1/2" />
                        <div className="h-4 bg-gray-200 rounded w-1/4 mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <TabsContent value="news" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {news.slice(3).map(item => (
                        <NewsCard key={item.id} news={item} />
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold mt-12 mb-6">More News</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {news.slice(5, 13).map(item => (
                        <NewsCard key={item.id} news={item} />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="social" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {tweets.map(tweet => (
                        <TweetCard key={tweet.id} tweet={tweet} />
                      ))}
                    </div>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-8 px-4 bg-muted">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {["League of Legends", "Valorant", "CS:GO", "Dota 2", "Mobile Legends"].map((category) => (
                <a
                  key={category}
                  href={`/game/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group relative rounded-lg overflow-hidden bg-card shadow-md transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="aspect-video bg-gradient-to-br from-forkast-400/70 to-forkast-600/70 flex items-center justify-center p-4">
                    <Gamepad2 className="h-10 w-10 text-white" />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-medium">{category}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-12 px-4 bg-gradient-to-br from-forkast-200 to-forkast-300/50">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter to get the latest esports news and updates delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-forkast-500"
                required
              />
              <button
                type="submit"
                className="bg-forkast-500 hover:bg-forkast-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
