
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

const ThankYouPage = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  const genreLabels = {
    'motivational': 'Motivational',
    'spiritual': 'Spiritual',
    'self-belief': 'Self-belief',
    'love-life': 'Love & Life',
    'wisdom': 'Wisdom',
    'random': 'Random (Mix of all)'
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-nature-blue/90 to-nature-teal/70 py-16">
      <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl animate-fade-in text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h2 className="text-3xl font-bold mb-2 text-nature-blue">Thank You!</h2>
        
        {formData ? (
          <div className="mb-6 space-y-2">
            <p className="text-lg">Hello <span className="font-semibold">{formData.name}</span>!</p>
            <p>You're all set to receive daily {genreLabels[formData.quoteGenre]} quotes.</p>
            <p>We'll send them to <span className="font-semibold">{formData.email}</span> at <span className="font-semibold">{formData.deliveryTime}</span> each day.</p>
          </div>
        ) : (
          <p className="mb-6">Thanks for joining StayOnTrack! Your daily inspiration journey begins soon.</p>
        )}
        
        <p className="text-sm text-gray-500 mb-6">
          Can't wait? Check your email inbox for a welcome message with your first quote.
        </p>
        
        <div className="space-y-3">
          <Button asChild className="w-full bg-[#8E9196] hover:bg-[#8E9196]/50 transition-colors duration-300">
            <Link to="/">Return to Home</Link>
          </Button>
          
          <p className="text-xs text-gray-400">
            You can unsubscribe anytime by clicking the link in the emails or visiting our Help page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
