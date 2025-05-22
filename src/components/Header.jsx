import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HelpCircle, UserPlus } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  const scrollToJoinForm = () => {
    // Navigate to home page first if not already there
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const formElement = document.getElementById('join-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const formElement = document.getElementById('join-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If form not visible yet, trigger it to show
        window.dispatchEvent(new CustomEvent('show-join-form'));
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white font-playfair tracking-wider">
          StayOnTrack
        </Link>
        
        <div className="flex space-x-3">
          <Button 
            onClick={scrollToJoinForm}
            className="bg-[#8E9196] hover:bg-[#8E9196]/50 transition-colors duration-300 text-white"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Join
          </Button>
          
          <Button 
            onClick={() => navigate('/help')}
            className="bg-[#8E9196] hover:bg-[#8E9196]/50 transition-colors duration-300 text-white"
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
