import React, { useState } from 'react';
import { 
  ShieldAlert, 
  MessageCircle, 
  Bell, 
  MapPin, 
  Check, 
  Sparkles,
  X
} from 'lucide-react';
import { CLINIC_INFO } from '../data/ashaData';

interface HeaderProps {
  onOpenCrisis: () => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCrisis }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Mindful Morning Breath",
      message: "Take 3 slow deep breaths before checking work messages today.",
      time: "8:30 AM",
      unread: true
    },
    {
      id: 2,
      title: "New Art Therapy Weekend Batch",
      message: "Seats open for Saturday's Expressive Detox in Banashankari.",
      time: "Yesterday",
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Asha The Hope,\nI'm reaching out through your mobile app. I would like to consult about your therapy services and training courses.`
    );
    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-2.5 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-xs">
            <span className="font-serif font-black text-sm tracking-tighter">A</span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-sm font-bold tracking-tight text-slate-800 leading-none">
                Asha The Hope
              </h1>
              <span className="text-[9px] font-bold bg-teal-100/70 text-teal-800 px-1.5 py-0.2 rounded-full">
                App
              </span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-slate-400 mt-0.5">
              <MapPin className="w-2.5 h-2.5 text-teal-600" />
              <span>Banashankari, Bengaluru</span>
            </div>
          </div>
        </div>

        {/* Quick Action Icons */}
        <div className="flex items-center space-x-1.5">
          {/* Emergency Crisis Button */}
          <button
            onClick={onOpenCrisis}
            className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-full text-[11px] font-bold flex items-center space-x-1 transition-all active:scale-95"
            title="Crisis SOS & Helplines"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span className="tracking-wide">SOS</span>
          </button>

          {/* Direct WhatsApp connect */}
          <button
            onClick={openWhatsApp}
            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200 transition-colors active:scale-95"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-600" />
          </button>

          {/* Daily Notifications */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors relative active:scale-95"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-teal-600 rounded-full ring-2 ring-white" />
            )}
          </button>
        </div>
      </header>

      {/* Notifications Drawer */}
      {showNotifications && (
        <div className="absolute top-12 right-3 z-40 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
            <div className="flex items-center space-x-1 text-xs font-bold text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Mindful Nudges</span>
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[10px] text-teal-600 hover:underline flex items-center space-x-0.5"
                >
                  <Check className="w-2.5 h-2.5" />
                  <span>Mark read</span>
                </button>
              )}
              <button
                onClick={() => setShowNotifications(false)}
                className="text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-2 rounded-xl text-left transition-colors ${
                  n.unread ? 'bg-teal-50/70 border border-teal-100' : 'bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800">{n.title}</span>
                  <span className="text-[9px] text-slate-400">{n.time}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
