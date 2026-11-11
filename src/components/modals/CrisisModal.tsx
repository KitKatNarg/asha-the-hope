import React from 'react';
import { X, PhoneCall, AlertCircle, HeartHandshake, ShieldAlert } from 'lucide-react';
import { EMERGENCY_HELPLINES } from '../../data/ashaData';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="px-5 py-4 bg-rose-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-white/20 rounded-xl">
              <ShieldAlert className="w-5 h-5 text-rose-100" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-rose-200 tracking-wider">
                Immediate Emotional Support
              </div>
              <h3 className="font-bold text-white text-base">Crisis & Mental Health Helplines</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-rose-200 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-4">
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p className="text-xs text-rose-900 leading-relaxed">
              If you or someone you know is in acute distress, experiencing thoughts of self-harm, or severe panic, please reach out immediately. You matter, and support is free, confidential, and always available.
            </p>
          </div>

          <div className="space-y-2.5">
            {EMERGENCY_HELPLINES.map((line, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800">{line.name}</h4>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {line.available}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{line.desc}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono font-bold text-slate-700">{line.number}</span>
                  <a
                    href={`tel:${line.tollFree.replace(/\s+/g, '')}`}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl flex items-center space-x-1 transition-colors"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Call Helpline</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-teal-50 border border-teal-200 rounded-2xl flex items-center space-x-2 text-xs text-teal-800">
            <HeartHandshake className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Asha The Hope is committed to non-judgmental community mental wellness.</span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
