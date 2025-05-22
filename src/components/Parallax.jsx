
import React, { useEffect, useState } from 'react';

// List of background images for the parallax effect
const backgrounds = [
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716", // waterfall
  "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb", // river and mountains
  "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9", // pine trees
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843", // forest with sunbeams
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05", // foggy mountains
];

const Parallax = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState("");
  
  useEffect(() => {
    // Select a random background on mount/reload
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setBackgroundImage(`${backgrounds[randomIndex]}?auto=format&fit=crop&w=2000&q=80`);
  }, []);

  return (
    <div className="parallax h-screen">
      <div 
        className="parallax-layer parallax-layer-back h-full w-full bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          filter: 'brightness(0.8)',
        }}
      />
      <div className="parallax-layer parallax-layer-base flex flex-col items-center justify-center h-full">
        <div className="z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Parallax;
