import React, { useState, useEffect } from 'react';
import { Smartphone, Maximize2, Minimize2, Wifi, Battery, Volume2 } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 flex flex-col items-center justify-center p-0 md:p-6 transition-colors">
      {/* Viewport Mode Controls (Visible on medium+ screens) */}
      <div className="hidden md:flex items-center space-x-3 mb-4 bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700/60 shadow-lg text-xs text-slate-300">
        <span className="font-semibold text-teal-400">Asha The Hope Mobile App</span>
        <span className="text-slate-600">|</span>
        <button
          onClick={() => setIsPhoneFrame(true)}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-all ${
            isPhoneFrame
              ? 'bg-teal-600 text-white font-bold shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Device Mockup</span>
        </button>

        <button
          onClick={() => setIsPhoneFrame(false)}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-all ${
            !isPhoneFrame
              ? 'bg-teal-600 text-white font-bold shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Full Width</span>
        </button>
      </div>

      {/* Main Container: Either Phone Frame or Full Width */}
      <div
        className={`w-full transition-all duration-300 flex flex-col ${
          isPhoneFrame
            ? 'max-w-[430px] h-[100dvh] md:h-[870px] md:rounded-[48px] md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] md:border-[10px] md:border-slate-800 relative overflow-hidden bg-slate-50'
            : 'max-w-xl min-h-screen bg-slate-50 shadow-2xl relative overflow-hidden'
        }`}
      >
        {/* Native Mobile Status Bar (Simulated) */}
        <div className="w-full bg-white/95 backdrop-blur-md z-40 px-6 pt-3 pb-1 flex items-center justify-between text-xs font-semibold text-slate-800 select-none">
          <span className="tracking-tight text-xs font-bold">{currentTime}</span>

          {/* Dynamic Island / Speaker Pill */}
          <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 space-x-1">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500/80 animate-pulse" />
          </div>

          <div className="flex items-center space-x-1.5 text-slate-700">
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col bg-slate-50">
          {children}
        </div>

        {/* Mobile Home Gesture Bar */}
        <div className="w-full bg-white py-1 flex justify-center items-center pointer-events-none select-none">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};
