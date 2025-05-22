
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/sonner";
import TimeSelector from './TimeSelector';
import { Shuffle, Code, BookText, Zap, BookOpen, Heart, Sparkles, Lightbulb } from 'lucide-react';

const EditPreferencesForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [preferences, setPreferences] = useState({
    quoteGenre: 'motivational',
    deliveryTime: '8:00 AM',
    isRandomTime: false,
    isRandomGenre: false,
  });
  const [saving, setSaving] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("OTP sent successfully", {
        description: "Please check your email inbox",
      });
      
      setOtpSent(true);
    } catch (error) {
      toast.error("Failed to send OTP", {
        description: "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (!otp) {
      toast.error("Please enter the OTP sent to your email");
      return;
    }

    setVerifying(true);
    
    try {
      // Simulate API call to verify OTP and fetch current preferences
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate fetching preferences
      const fetchedPreferences = {
        quoteGenre: 'motivational',
        deliveryTime: '9:00 AM',
        isRandomTime: false,
        isRandomGenre: false,
      };
      
      setPreferences(fetchedPreferences);
      setVerified(true);
      
      toast.success("Email verified", {
        description: "You can now edit your preferences",
      });
    } catch (error) {
      toast.error("Failed to verify OTP", {
        description: "Please try again or request a new OTP",
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleGenreChange = (value) => {
    const isRandom = value === 'random';
    setPreferences({
      ...preferences,
      quoteGenre: value,
      isRandomGenre: isRandom,
    });
  };

  const handleTimeChange = (time) => {
    setPreferences({
      ...preferences,
      deliveryTime: time,
    });
  };

  const toggleRandomTime = () => {
    setPreferences({
      ...preferences,
      isRandomTime: !preferences.isRandomTime,
    });
  };

  const handleSavePreferences = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Simulate API call to save preferences
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Preferences updated successfully", {
        description: "Your changes have been saved",
      });
      
      // Reset form after successful update
      setEmail('');
      setOtp('');
      setOtpSent(false);
      setVerified(false);
    } catch (error) {
      toast.error("Failed to update preferences", {
        description: "Please try again later",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-nature-blue/80 to-nature-teal/70 backdrop-blur-md rounded-xl p-6 shadow-xl animate-fade-in border border-white/20">
      <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-sm">Edit Preferences</h2>
      
      {!otpSent ? (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-medium">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="your.email@example.com"
              required
              className="bg-white/70 placeholder:text-gray-500 border-white/10 focus:border-white"
            />
          </div>
          
          <p className="text-white/90 text-sm">
            We'll send a verification code to this email to allow you to edit your preferences.
          </p>
          
          <Button 
            type="submit" 
            className="w-full bg-[#8E9196] hover:bg-[#8E9196]/50 transition-colors duration-300 text-white font-bold border border-white/20 shadow-lg"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </Button>
        </form>
      ) : !verified ? (
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-white font-medium">Verification Code</Label>
            <Input
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter the code sent to your email"
              required
              className="bg-white/70 placeholder:text-gray-500 border-white/10 focus:border-white"
            />
          </div>
          
          <p className="text-white/90 text-sm">
            Please enter the verification code we sent to {email}
          </p>
          
          <div className="flex space-x-3">
            <Button 
              type="button" 
              variant="outline"
              className="w-1/2 bg-white/20 hover:bg-white/30 text-white border-white/10"
              onClick={() => setOtpSent(false)}
              disabled={verifying}
            >
              Back
            </Button>
            
            <Button 
              type="submit" 
              className="w-1/2 bg-[#8E9196] hover:bg-[#8E9196]/50 transition-colors duration-300 text-white font-bold border border-white/20 shadow-lg"
              disabled={verifying}
            >
              {verifying ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSavePreferences} className="space-y-6">
          <div className="space-y-3">
            <Label className="text-white font-medium">What type of quotes inspire you?</Label>
            <RadioGroup 
              value={preferences.quoteGenre} 
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
                className={`flex items-center text-xs ${preferences.isRandomTime ? 'bg-nature-teal text-white' : 'bg-white/60 hover:bg-white/70'}`}
              >
                <Shuffle className="h-3 w-3 mr-1" /> Random Time
              </Button>
            </div>
            {!preferences.isRandomTime ? (
              <TimeSelector value={preferences.deliveryTime} onChange={handleTimeChange} />
            ) : (
              <div className="bg-white/60 hover:bg-white/70 transition-colors p-4 rounded-lg text-center">
                <div className="text-2xl font-bold mb-2">Random Time</div>
                <p className="text-sm text-gray-700">Your quote will arrive at a different time each day, adding a surprise element to your day!</p>
              </div>
            )}
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline"
              className="w-1/2 bg-white/20 hover:bg-white/30 text-white border-white/10"
              onClick={() => {
                setVerified(false);
                setOtpSent(false);
              }}
              disabled={saving}
            >
              Cancel
            </Button>
            
            <Button 
              type="submit" 
              className="w-1/2 bg-[#8E9196] hover:bg-[#8E9196]/50 transition-colors duration-300 text-white font-bold border border-white/20 shadow-lg"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditPreferencesForm;
