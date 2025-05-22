import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

const API_URL = import.meta.env.VITE_BACKEND;
const UnsubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);

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
      // Check if user exists
      const response = await fetch(`${API_URL}/users/by-email/${email}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'User not found');
      }
      
      // In a real app, you would send an OTP to the user's email
      // For now, we'll simulate this process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("OTP sent successfully", {
        description: "Please check your email inbox",
      });
      
      setOtpSent(true);
    } catch (error) {
      toast.error("Failed to send OTP", {
        description: error.message || "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndUnsubscribe = async (e) => {
    e.preventDefault();
    
    if (!otp) {
      toast.error("Please enter the OTP sent to your email");
      return;
    }

    setVerifying(true);
    
    try {
      // In a real app, you would verify the OTP
      // For this example, we'll accept any OTP and unsubscribe the user
      
      const response = await fetch(`${API_URL}/users/unsubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to unsubscribe');
      }
      
      toast.success("Successfully unsubscribed", {
        description: "You will no longer receive quotes from us",
      });
      
      // Reset form after successful unsubscription
      setEmail('');
      setOtp('');
      setOtpSent(false);
    } catch (error) {
      toast.error("Failed to verify OTP", {
        description: error.message || "Please try again or request a new OTP",
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-nature-blue/80 to-nature-teal/70 backdrop-blur-md rounded-xl p-6 shadow-xl animate-fade-in border border-white/20">
      <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-sm">Unsubscribe</h2>
      
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
            We'll send a verification code to this email to confirm your unsubscription request.
          </p>
          
          <Button 
            type="submit" 
            className="w-full bg-[#8E9196] hover:bg-[#8E9196]/50 transition-colors duration-300 text-white font-bold border border-white/20 shadow-lg"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyAndUnsubscribe} className="space-y-6">
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
              {verifying ? "Verifying..." : "Verify & Unsubscribe"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UnsubscribeForm;
