import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw } from 'lucide-react';

export const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [countdown, setCountdown] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Transition phase
            setPhase((currentPhase) => {
              if (currentPhase === 'Inhale') return 'Hold';
              if (currentPhase === 'Hold') return 'Exhale';
              if (currentPhase === 'Exhale') return 'Rest';
              // Completed a full cycle
              setCyclesCompleted((c) => c + 1);
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const reset = () => {
    setIsActive(false);
    setPhase('Inhale');
    setCountdown(4);
    setCyclesCompleted(0);
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'Inhale':
        return 'Breathe in slowly through your nose...';
      case 'Hold':
        return 'Gently hold your breath in peace...';
      case 'Exhale':
        return 'Slowly release through your mouth...';
      case 'Rest':
        return 'Rest comfortably and observe stillness...';
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 rounded-3xl p-6 text-white text-center shadow-lg relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs mb-3 backdrop-blur-md">
          <Wind className="w-3.5 h-3.5" />
          <span>Somatic Box Breathing (4-4-4-4)</span>
        </div>

        <h3 className="text-lg font-serif font-bold text-white mb-1">
          Vagus Nerve Calmness
        </h3>
        <p className="text-xs text-teal-100/80 max-w-xs mb-6">
          Calm your nervous system and dissolve stress in 2 minutes
        </p>

        {/* Dynamic Breathing Bubble */}
        <div className="relative flex items-center justify-center my-4 w-44 h-44">
          {/* Animated concentric rings */}
          <div
            className={`absolute inset-0 rounded-full bg-teal-400/20 transition-all duration-1000 ease-in-out ${
              isActive && (phase === 'Inhale' || phase === 'Hold')
                ? 'scale-115 opacity-70'
                : 'scale-90 opacity-30'
            }`}
          />
          <div
            className={`absolute inset-3 rounded-full bg-teal-500/30 transition-all duration-1000 ease-in-out ${
              isActive && (phase === 'Inhale' || phase === 'Hold')
                ? 'scale-110 opacity-80'
                : 'scale-95 opacity-40'
            }`}
          />
          <div
            className={`w-32 h-32 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-400 shadow-xl flex flex-col items-center justify-center transition-transform duration-1000 ease-in-out z-10 ${
              isActive && (phase === 'Inhale' || phase === 'Hold')
                ? 'scale-110'
                : 'scale-90'
            }`}
          >
            <span className="text-xs uppercase tracking-wider font-semibold text-teal-100">
              {isActive ? phase : 'Ready'}
            </span>
            <span className="text-3xl font-extrabold tracking-tight text-white mt-0.5">
              {isActive ? countdown : '4s'}
            </span>
          </div>
        </div>

        <p className="text-xs font-medium text-teal-100 min-h-[20px] my-3">
          {isActive ? getPhaseInstruction() : 'Tap Begin to start synchronized breathwork'}
        </p>

        {/* Counter and controls */}
        <div className="flex items-center space-x-3 mt-2">
          <button
            onClick={() => setIsActive(!isActive)}
            className="px-6 py-2.5 rounded-full bg-white text-teal-900 font-semibold text-xs shadow-md hover:bg-teal-50 transition-transform active:scale-95 flex items-center space-x-1.5"
          >
            {isActive ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{cyclesCompleted > 0 ? 'Resume' : 'Begin Breathwork'}</span>
              </>
            )}
          </button>

          <button
            onClick={reset}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-teal-200 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {cyclesCompleted > 0 && (
          <div className="mt-4 text-[11px] text-teal-200 font-medium">
            ✨ {cyclesCompleted} mindful {cyclesCompleted === 1 ? 'cycle' : 'cycles'} completed today
          </div>
        )}
      </div>
    </div>
  );
};
