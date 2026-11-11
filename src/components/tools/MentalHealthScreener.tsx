import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

interface ScreenerQuestion {
  id: number;
  question: string;
  options: { label: string; score: number }[];
}

const QUESTIONS: ScreenerQuestion[] = [
  {
    id: 1,
    question: "Over the past 2 weeks, how often have you felt overwhelmed, anxious, or unable to relax?",
    options: [
      { label: "Rarely or Not at all", score: 0 },
      { label: "Several days a week", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ]
  },
  {
    id: 2,
    question: "How easily can you express your feelings or talk about emotional pain to loved ones?",
    options: [
      { label: "Easily and comfortably", score: 0 },
      { label: "Sometimes, but I hold back often", score: 1 },
      { label: "It's hard to put feelings into words", score: 2 },
      { label: "I feel completely shut down / isolated", score: 3 },
    ]
  },
  {
    id: 3,
    question: "How has your sleep and physical energy been lately?",
    options: [
      { label: "Restful and energized", score: 0 },
      { label: "Occasional tossing and turning", score: 1 },
      { label: "Frequently tired or restless", score: 2 },
      { label: "Chronic exhaustion / insomnia", score: 3 },
    ]
  },
  {
    id: 4,
    question: "Have you noticed irritability, quick anger, or feeling on edge?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Occasionally when stressed", score: 1 },
      { label: "Often snap at small triggers", score: 2 },
      { label: "Constant tension / anger outbursts", score: 3 },
    ]
  },
  {
    id: 5,
    question: "Do you have time for creative hobbies, play, or joyful stillness in your daily routine?",
    options: [
      { label: "Yes, regularly", score: 0 },
      { label: "Occasionally on weekends", score: 1 },
      { label: "Rarely, I feel rushed by duties", score: 2 },
      { label: "Not at all, I feel creatively depleted", score: 3 },
    ]
  }
];

interface ScreenerProps {
  onBookTherapy?: (recommendedServiceId?: string) => void;
}

export const MentalHealthScreener: React.FC<ScreenerProps> = ({ onBookTherapy }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleSelectOption = (score: number) => {
    const updated = [...scores, score];
    setScores(updated);

    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCompleted(true);
    }
  };

  const reset = () => {
    setCurrentIdx(0);
    setScores([]);
    setCompleted(false);
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);

  const getResult = () => {
    if (totalScore <= 4) {
      return {
        level: "Nourished & Resilient",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        message: "You appear to have healthy emotional balance and coping outlets. Continuing proactive mindfulness and creative arts will sustain your vitality.",
        recommendation: "Art Therapy Workshop or Mindfulness Chinthana Circle",
        recServiceId: "art-therapy"
      };
    } else if (totalScore <= 9) {
      return {
        level: "Mild Emotional Fatigue",
        color: "text-amber-700 bg-amber-50 border-amber-200",
        message: "You are holding noticeable stress and emotional tension. Non-verbal release through art therapy or a 1-on-1 counseling check-in will help prevent deeper burnout.",
        recommendation: "Expressive Art Therapy Session",
        recServiceId: "art-therapy"
      };
    } else {
      return {
        level: "Significant Overwhelm & Distress",
        color: "text-rose-700 bg-rose-50 border-rose-200",
        message: "Your mind and nervous system are signaling for supportive care. You do not have to carry this alone. Speaking with Dr. Asha or our counseling team can provide immediate clarity and relief.",
        recommendation: "Individual Psychotherapy & Counseling",
        recServiceId: "individual-counselling"
      };
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-teal-50 text-teal-700 rounded-xl">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 text-sm">Emotional Wellbeing Pulse</h4>
            <p className="text-[11px] text-slate-400">Gentle 1-minute self-check</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
          <ShieldCheck className="w-3 h-3 text-teal-600" />
          <span>Private</span>
        </div>
      </div>

      {!completed ? (
        <div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full mb-4 overflow-hidden">
            <div
              className="bg-teal-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
            Question {currentIdx + 1} of {QUESTIONS.length}
          </div>

          <p className="text-sm font-medium text-slate-800 mb-4 min-h-[44px]">
            {QUESTIONS[currentIdx].question}
          </p>

          <div className="space-y-2">
            {QUESTIONS[currentIdx].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option.score)}
                className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all text-xs text-slate-700 font-medium active:scale-[0.99] flex items-center justify-between group"
              >
                <span>{option.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {(() => {
            const res = getResult();
            return (
              <>
                <div className={`p-4 rounded-2xl border ${res.color}`}>
                  <div className="text-[11px] uppercase tracking-wider font-bold mb-1">
                    Your Wellness Pulse
                  </div>
                  <div className="text-base font-bold mb-1.5">{res.level}</div>
                  <p className="text-xs leading-relaxed opacity-90">{res.message}</p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block mb-1">
                    Suggested Pathway:
                  </span>
                  <div className="text-xs font-bold text-teal-800 mb-2">
                    {res.recommendation}
                  </div>
                  {onBookTherapy && (
                    <button
                      onClick={() => onBookTherapy(res.recServiceId)}
                      className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1"
                    >
                      <span>Book Consultation for this</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <button
                  onClick={reset}
                  className="w-full py-2 text-slate-500 hover:text-slate-800 text-xs font-medium flex items-center justify-center space-x-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Pulse Check</span>
                </button>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
