import React, { useState } from 'react';
import { 
  Sparkles, 
  Wind, 
  Palette, 
  Smile, 
  Heart, 
  Activity, 
  Check, 
  Plus
} from 'lucide-react';
import { ArtTherapyCanvas } from '../tools/ArtTherapyCanvas';
import { BreathingExercise } from '../tools/BreathingExercise';
import { MentalHealthScreener } from '../tools/MentalHealthScreener';
import { MoodEntry } from '../../types';

interface WellnessTabProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const WellnessTab: React.FC<WellnessTabProps> = ({ onOpenBooking }) => {
  const [activeTool, setActiveTool] = useState<'canvas' | 'breathe' | 'screener' | 'mood'>('canvas');

  // Mood Tracker State
  const [moodLogs, setMoodLogs] = useState<MoodEntry[]>([
    {
      id: 'm1',
      mood: 'peaceful',
      intensity: 4,
      tags: ['Art Session', 'Nature Walk'],
      note: 'Felt deeply relieved after sketching mandalas at the clinic.',
      date: 'Yesterday',
      time: '6:15 PM'
    },
    {
      id: 'm2',
      mood: 'happy',
      intensity: 5,
      tags: ['Mindfulness', 'Good Sleep'],
      note: 'Practiced 4-4-4-4 breathing during work meetings. Felt centered.',
      date: '2 days ago',
      time: '9:00 AM'
    }
  ]);

  const [currentMood, setCurrentMood] = useState<'peaceful' | 'happy' | 'neutral' | 'anxious' | 'sad' | 'exhausted'>('peaceful');
  const [moodNote, setMoodNote] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Creative Art']);
  const [loggedNotification, setLoggedNotification] = useState(false);

  // Gallery of artworks created in current session
  const [savedArtworks, setSavedArtworks] = useState<
    { id: string; url: string; note: string; mood: string; time: string }[]
  >([]);

  const handleSaveArtwork = (dataUrl: string, reflection: string, moodTag: string) => {
    setSavedArtworks(prev => [
      {
        id: `art-${Date.now()}`,
        url: dataUrl,
        note: reflection || 'Visual emotional release',
        mood: moodTag,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      ...prev
    ]);
  };

  const handleLogMood = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: MoodEntry = {
      id: `m-${Date.now()}`,
      mood: currentMood,
      intensity: 4,
      tags: selectedTags,
      note: moodNote.trim() || 'Logged mindfully',
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMoodLogs([newEntry, ...moodLogs]);
    setMoodNote('');
    setLoggedNotification(true);
    setTimeout(() => setLoggedNotification(false), 3000);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const MOOD_OPTIONS: { id: MoodEntry['mood']; emoji: string; label: string; color: string }[] = [
    { id: 'peaceful', emoji: '🌿', label: 'Peaceful', color: 'border-teal-400 bg-teal-50 text-teal-800' },
    { id: 'happy', emoji: '✨', label: 'Joyful', color: 'border-amber-400 bg-amber-50 text-amber-800' },
    { id: 'neutral', emoji: '🌤', label: 'Reflective', color: 'border-blue-400 bg-blue-50 text-blue-800' },
    { id: 'anxious', emoji: '⚡', label: 'Anxious', color: 'border-orange-400 bg-orange-50 text-orange-800' },
    { id: 'sad', emoji: '🌧', label: 'Tender/Sad', color: 'border-indigo-400 bg-indigo-50 text-indigo-800' },
    { id: 'exhausted', emoji: '🔋', label: 'Depleted', color: 'border-rose-400 bg-rose-50 text-rose-800' },
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>Interactive Sanctuary</span>
        </div>
        <h2 className="text-lg font-serif font-bold text-slate-900 mt-0.5">
          Self-Care & Healing Hub
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Practice expressive art, guided breathwork, and track your emotional heartbeat.
        </p>
      </div>

      {/* Wellness Tool Switcher Pills */}
      <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-2xl">
        <button
          onClick={() => setActiveTool('canvas')}
          className={`py-2 px-1 text-[11px] font-bold rounded-xl transition-all flex flex-col items-center space-y-0.5 ${
            activeTool === 'canvas'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Art Canvas</span>
        </button>

        <button
          onClick={() => setActiveTool('breathe')}
          className={`py-2 px-1 text-[11px] font-bold rounded-xl transition-all flex flex-col items-center space-y-0.5 ${
            activeTool === 'breathe'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Wind className="w-4 h-4" />
          <span>Breathwork</span>
        </button>

        <button
          onClick={() => setActiveTool('mood')}
          className={`py-2 px-1 text-[11px] font-bold rounded-xl transition-all flex flex-col items-center space-y-0.5 ${
            activeTool === 'mood'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Smile className="w-4 h-4" />
          <span>Mood Log</span>
        </button>

        <button
          onClick={() => setActiveTool('screener')}
          className={`py-2 px-1 text-[11px] font-bold rounded-xl transition-all flex flex-col items-center space-y-0.5 ${
            activeTool === 'screener'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Pulse Check</span>
        </button>
      </div>

      {/* TOOL 1: Art Therapy Sanctuary */}
      {activeTool === 'canvas' && (
        <div className="space-y-4">
          <ArtTherapyCanvas onSaveArtwork={handleSaveArtwork} />

          {/* User Gallery / Saved Artworks */}
          {savedArtworks.length > 0 && (
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>Your Expressive Art Gallery ({savedArtworks.length})</span>
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {savedArtworks.map((art) => (
                  <div key={art.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                    <img src={art.url} alt="User Therapy Art" className="w-full aspect-[4/3] object-cover bg-white" />
                    <div className="p-2 space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-teal-700">{art.mood}</span>
                        <span className="text-slate-400">{art.time}</span>
                      </div>
                      <p className="text-[10px] text-slate-600 line-clamp-2 leading-tight">{art.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOOL 2: Breathing Exercise */}
      {activeTool === 'breathe' && (
        <div className="space-y-4">
          <BreathingExercise />
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs space-y-2 text-xs text-slate-600">
            <h4 className="font-bold text-slate-800 text-xs">Why Box Breathing Works</h4>
            <p className="leading-relaxed text-[11px]">
              Developed for autonomic regulation, this equal 4-count breathing technique stimulates the parasympathetic nervous system (vagus nerve), immediately dampening cortisol and adrenaline spikes.
            </p>
          </div>
        </div>
      )}

      {/* TOOL 3: Mood Tracker */}
      {activeTool === 'mood' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <Smile className="w-4 h-4 text-teal-600" />
                <h4 className="font-semibold text-slate-800 text-sm">How is your heart feeling right now?</h4>
              </div>
              <span className="text-[10px] text-slate-400">Daily Check-in</span>
            </div>

            {/* Mood Cards */}
            <div className="grid grid-cols-3 gap-2">
              {MOOD_OPTIONS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setCurrentMood(m.id)}
                  className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center ${
                    currentMood === m.id
                      ? `${m.color} ring-1 ring-teal-500 font-bold shadow-xs scale-102`
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xl mb-0.5">{m.emoji}</span>
                  <span className="text-xs">{m.label}</span>
                </button>
              ))}
            </div>

            {/* Tags */}
            <div className="pt-1">
              <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                What influenced your energy?
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['Creative Art', 'Work Stress', 'Family', 'Deep Sleep', 'Therapy', 'Solitude', 'Exercise'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTag(t)}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                      selectedTags.includes(t)
                        ? 'bg-teal-700 text-white border-teal-700 font-medium'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div>
              <textarea
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                placeholder="Write a brief compassionate reflection..."
                rows={2}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 resize-none placeholder:text-slate-400"
              />
            </div>

            <button
              onClick={handleLogMood}
              className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5"
            >
              {loggedNotification ? (
                <>
                  <Check className="w-4 h-4 text-teal-200" />
                  <span>Check-In Logged!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Save Daily Mood Check-In</span>
                </>
              )}
            </button>
          </div>

          {/* Past Log Entries */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Recent Heartbeat History
            </h4>
            <div className="space-y-2">
              {moodLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold capitalize text-slate-800 flex items-center space-x-1">
                      <span>{log.mood === 'peaceful' ? '🌿' : log.mood === 'happy' ? '✨' : '🌤'}</span>
                      <span>{log.mood}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">{log.date} • {log.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">{log.note}</p>
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {log.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 4: Mental Health Screener */}
      {activeTool === 'screener' && (
        <MentalHealthScreener onBookTherapy={onOpenBooking} />
      )}
    </div>
  );
};
