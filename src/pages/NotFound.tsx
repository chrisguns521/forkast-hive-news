
import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forkast-50 to-forkast-100 p-4">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center rounded-full bg-gradient-to-br from-forkast-300 to-forkast-500 w-16 h-16 mx-auto mb-6">
          <Trophy className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2">
          Forkast <span className="text-forkast-600">Hive</span>
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-forkast-500 hover:bg-forkast-600">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
