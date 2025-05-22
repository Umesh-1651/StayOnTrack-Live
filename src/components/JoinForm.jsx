
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/sonner";
import TimeSelector from './TimeSelector';
import { Shuffle, Code, BookText, Zap, BookOpen, Heart, Sparkles, Lightbulb } from 'lucide-react';

// API URL - set to relative path for production deployment

const API_URL = import.meta.env.VITE_BACKEND;
console.log("API_URL:", API_URL);
const JoinForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    quoteGenre: 'motivational',
    deliveryTime: '8:00 AM',
    isRandomTime: false,
    isRandomGenre: false,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenreChange = (value) => {
    const isRandom = value === 'random';
    setFormData({
      ...formData,
      quoteGenre: value,
      isRandomGenre: isRandom,
    });
  };

  const handleTimeChange = (time) => {
    setFormData({
      ...formData,
      deliveryTime: time,
    });
  };

  const toggleRandomTime = () => {
    setFormData({
      ...formData,
      isRandomTime: !formData.isRandomTime,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Form submitted with data:', formData);
      
      // Send data to the backend API
      const response = await fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      toast.success("Successfully joined!", {
        description: "You'll start receiving quotes soon!",
      });
      
      navigate('/thank-you', { state: { formData } });
    } catch (error) {
      toast.error("Something went wrong", {
        description: error.message || "Please try again later.",
      });
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-nature-blue/80 to-nature-teal/70 backdrop-blur-md rounded-xl p-6 shadow-xl animate-fade-in border border-white/20">
      <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-sm">Join StayOnTrack</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white font-medium">What should we call you?</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name or nickname"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="bg-white/70 placeholder:text-gray-500 border-white/10 focus:border-white"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white font-medium">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="bg-white/70 placeholder:text-gray-500 border-white/10 focus:border-white"
          />
        </div>
        
        <div className="space-y-3">
          <Label className="text-white font-medium">What type of quotes inspire you?</Label>
          <RadioGroup 
            value={formData.quoteGenre} 
            onValueChange={handleGenreChange}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2 bg-white/60 hover:bg-white/70 transition-colors p-3 rounded-lg">
              <RadioGroupItem value="motivational" id="motivational" />
              <Label htmlFor="motivational" className="cursor-pointer flex items-center">
                <Zap className="h-4 w-4 mr-2" /> Motivational
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/60 hover:bg-white/70 transition-colors p-3 rounded-lg">
              <RadioGroupItem value="spiritual" id="spiritual" />
              <Label htmlFor="spiritual" className="cursor-pointer flex items-center">
                <Sparkles className="h-4 w-4 mr-2" /> Spiritual
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/60 hover:bg-white/70 transition-colors p-3 rounded-lg">
              <RadioGroupItem value="self-belief" id="self-belief" />
              <Label htmlFor="self-belief" className="cursor-pointer flex items-center">
                <Lightbulb className="h-4 w-4 mr-2" /> Self-belief
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/60 hover:bg-white/70 transition-colors p-3 rounded-lg">
              <RadioGroupItem value="love-life" id="love-life" />
              <Label htmlFor="love-life" className="cursor-pointer flex items-center">
                <Heart className="h-4 w-4 mr-2" /> Love & Life
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/60 hover:bg-white/70 transition-colors p-3 rounded-lg">
              <RadioGroupItem value="wisdom" id="wisdom" />
              <Label htmlFor="wisdom" className="cursor-pointer flex items-center">
                <BookOpen className="h-4 w-4 mr-2" /> Wisdom
              </Label>
            </div>

            <div className="flex items-center space-x-2 bg-white/60 hover:bg-white/70 transition-colors p-3 rounded-lg">
              <RadioGroupItem value="developer-tips" id="developer-tips" />
              <Label htmlFor="developer-tips" className="cursor-pointer flex items-center">
                <Code className="h-4 w-4 mr-2" /> Developer Tips
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/60 hover:bg-white/70 transition-colors p-3 rounded-lg">
              <RadioGroupItem value="dsa-tips" id="dsa-tips" />
              <Label htmlFor="dsa-tips" className="cursor-pointer flex items-center">
                <BookText className="h-4 w-4 mr-2" /> DSA Tips
              </Label>
            </div>

            <div className="flex items-center space-x-2 bg-white/60 hover:bg-white/70 transition-colors p-3 rounded-lg col-span-2">
              <RadioGroupItem value="random" id="random" />
              <Label htmlFor="random" className="cursor-pointer flex items-center">
                <Shuffle className="h-4 w-4 mr-2" /> Random (Mix of all)
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center mb-2">
            <Label className="text-white font-medium">Delivery time</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={toggleRandomTime}
              className={`flex items-center text-xs ${formData.isRandomTime ? 'bg-nature-teal text-white' : 'bg-white/60 hover:bg-white/70'}`}
            >
              <Shuffle className="h-3 w-3 mr-1" /> Random Time
            </Button>
          </div>
          {!formData.isRandomTime ? (
            <TimeSelector value={formData.deliveryTime} onChange={handleTimeChange} />
          ) : (
            <div className="bg-white/60 hover:bg-white/70 transition-colors p-4 rounded-lg text-center">
              <div className="text-2xl font-bold mb-2">Random Time</div>
              <p className="text-sm text-gray-700">Your quote will arrive at a different time each day, adding a surprise element to your day!</p>
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-[#8E9196] hover:bg-[#8E9196]/50 transition-colors duration-300 border border-white/20 shadow-lg text-white font-bold text-lg py-6"
          disabled={loading}
        >
          {loading ? "Joining..." : "Join Now"}
        </Button>
      </form>
    </div>
  );
};

export default JoinForm;
