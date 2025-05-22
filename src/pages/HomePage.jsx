
import React, { useState, useEffect } from 'react';
import Parallax from '@/components/Parallax';
import JoinForm from '@/components/JoinForm';
import { Button } from "@/components/ui/button";
import { ArrowDown } from 'lucide-react';

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Custom event listener to show form when triggered from header
    const handleShowFormEvent = () => {
      setShowForm(true);
    };

    window.addEventListener('show-join-form', handleShowFormEvent);

    return () => {
      window.removeEventListener('show-join-form', handleShowFormEvent);
    };
  }, []);

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      const formElement = document.getElementById('join-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Parallax>
        <div className="text-center px-4 max-w-3xl pt-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-xl bg-black/30 backdrop-blur-sm p-4 rounded-lg inline-block">
            Stay On Track with Daily Inspiration
          </h1>
          <p className="text-xl mb-8 text-white drop-shadow-lg max-w-xl mx-auto bg-black/20 backdrop-blur-sm p-3 rounded-lg">
            Start each day with a thoughtfully curated quote that sparks joy, motivation, and mindfulness.
          </p>
          
          <div className="mt-12 flex justify-center">
            <Button 
              onClick={scrollToForm}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/10 shadow-lg flex items-center gap-2 px-8 py-6 text-lg font-bold"
            >
              <ArrowDown className="h-6 w-6" />
              Join For Free
            </Button>
          </div>
        </div>
      </Parallax>
      
      {showForm && (
        <div 
          id="join-form"
          className="min-h-screen py-16 px-4 bg-gradient-to-b from-nature-blue/90 to-nature-teal/70 flex items-center justify-center"
        >
          <JoinForm />
        </div>
      )}
    </div>
  );
};

export default HomePage;
