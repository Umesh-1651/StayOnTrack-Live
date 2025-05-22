
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TimeSelector = ({ value, onChange }) => {
  const [hour, setHour] = useState(8); // Default to 8 AM
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState("AM");

  useEffect(() => {
    // Format time as "HH:MM AM/PM" and call onChange
    const formattedHour = hour === 12 ? 12 : hour % 12;
    const formattedMinute = minute.toString().padStart(2, '0');
    const formattedTime = `${formattedHour}:${formattedMinute} ${period}`;
    onChange(formattedTime);
  }, [hour, minute, period, onChange]);

  // Convert hour slider value (0-23) to display format
  const getDisplayTime = () => {
    const displayHour = hour === 0 || hour === 12 ? 12 : hour % 12;
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute} ${period}`;
  };
  
  // Calculate what % of the day has passed for the background gradient
  const getDayProgress = () => {
    const totalMinutes = hour * 60 + minute;
    const percentage = (totalMinutes / (24 * 60)) * 100;
    return `${percentage}%`;
  };

  // Determine background color based on time of day
  const getTimeColor = () => {
    if ((period === "AM" && hour >= 5) || (period === "AM" && hour < 12)) {
      return "from-amber-200 to-blue-300"; // Morning
    } else if (period === "PM" && (hour < 5 || hour === 12)) {
      return "from-blue-300 to-blue-600"; // Afternoon
    } else if (period === "PM" && hour >= 5 && hour <= 8) {
      return "from-orange-400 to-purple-700"; // Evening
    } else {
      return "from-purple-900 to-blue-900"; // Night
    }
  };

  // Handle hour change
  const handleHourChange = (e) => {
    const newHour = parseInt(e.target.value);
    setHour(newHour);
    setPeriod(newHour >= 12 ? "PM" : "AM");
  };

  // Handle minute change
  const handleMinuteChange = (e) => {
    setMinute(parseInt(e.target.value));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={`relative h-40 rounded-xl p-5 mb-4 bg-gradient-to-r ${getTimeColor()} shadow-lg flex flex-col justify-between`}
      >
        <div className="text-3xl font-bold text-white drop-shadow-md">
          {getDisplayTime()}
        </div>
        
        <div className="absolute bottom-0 left-0 h-1 bg-white opacity-50 rounded-b-xl" style={{ width: getDayProgress() }}></div>
        
        <div className="flex items-center space-x-2 text-white">
          <Clock className="w-5 h-5" />
          <span>Daily delivery time</span>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Hour</span>
            <span>{hour === 0 || hour === 12 ? 12 : hour % 12} {period}</span>
          </div>
          <input
            type="range"
            min="0"
            max="23"
            value={hour}
            onChange={handleHourChange}
            className="time-selector w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>12 AM</span>
            <span>12 PM</span>
            <span>11 PM</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Minute</span>
            <span>{minute.toString().padStart(2, '0')}</span>
          </div>
          <input
            type="range"
            min="0"
            max="55"
            step="5"
            value={minute}
            onChange={handleMinuteChange}
            className="time-selector w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>00</span>
            <span>30</span>
            <span>55</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
