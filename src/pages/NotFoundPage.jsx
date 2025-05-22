
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-nature-blue/90 to-nature-teal/70">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild className="bg-[#8E9196] hover:bg-[#8E9196]/50 transition-colors duration-300">
          <Link to="/" className="flex items-center">
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
