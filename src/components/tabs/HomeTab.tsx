import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Heart, 
  GraduationCap, 
  Wind, 
  CheckCircle2, 
  MapPin, 
  PhoneCall, 
  Star,
  Users
} from 'lucide-react';
import { 
  CLINIC_INFO, 
  THERAPY_SERVICES, 
  COMMUNITY_EVENTS, 
  TESTIMONIALS, 
  WELLNESS_PROMPTS 
} from '../../data/ashaData';
import { TabType } from '../../types';

interface HomeTabProps {
  onSelectTab: (tab: TabType) => void;
  onOpenBooking: (serviceId?: string) => void;
  onOpenCrisis: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onSelectTab,
  onOpenBooking,
  onOpenCrisis
}) => {
  const [promptIdx, setPromptIdx] = useState(0);
  const currentPrompt = WELLNESS_PROMPTS[promptIdx];

  const nextPrompt = () => {
    setPromptIdx((prev) => (prev + 1) % WELLNESS_PROMPTS.length);
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-950 text-white p-5 shadow-lg">
        {/* Glow circles */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-teal-400/15 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>Welcome to Asha The Hope</span>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold tracking-tight text-white leading-tight">
              A Sanctuary for Healing, Growth & Art
            </h2>
            <p className="text-xs text-teal-100/80 mt-1 leading-relaxed">
              Expressive Art Therapy, Psychological Counseling, and Holistic Academics in Banashankari, Bengaluru.
            </p>
          </div>

          {/* Quick Hero CTAs */}
          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={() => onOpenBooking('art-therapy')}
              className="flex-1 py-2.5 px-4 bg-white text-teal-900 font-bold text-xs rounded-2xl shadow-sm hover:bg-teal-50 transition-transform active:scale-95 flex items-center justify-center space-x-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-700" />
              <span>Book Consultation</span>
            </button>
            <button
              onClick={() => onSelectTab('wellness')}
              className="py-2.5 px-3 bg-white/15 hover:bg-white/20 text-white font-medium text-xs rounded-2xl border border-white/20 transition-all flex items-center space-x-1"
            >
              <span>Draw Art</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Category Grid */}
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => onOpenBooking()}
          className="p-3 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:border-teal-300 text-center flex flex-col items-center transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-slate-700 leading-tight">Therapy</span>
        </button>

        <button
          onClick={() => onSelectTab('wellness')}
          className="p-3 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:border-teal-300 text-center flex flex-col items-center transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-slate-700 leading-tight">Art Studio</span>
        </button>

        <button
          onClick={() => onSelectTab('courses')}
          className="p-3 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:border-teal-300 text-center flex flex-col items-center transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-slate-700 leading-tight">Courses</span>
        </button>

        <button
          onClick={() => onSelectTab('wellness')}
          className="p-3 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:border-teal-300 text-center flex flex-col items-center transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
            <Wind className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-slate-700 leading-tight">Breathe</span>
        </button>
      </div>

      {/* Daily Affirmation & Reflection Card */}
      <div className="bg-gradient-to-r from-amber-50/70 via-rose-50/40 to-teal-50/60 p-4 rounded-3xl border border-amber-100 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Daily Mindful Reflection</span>
          </div>
          <button
            onClick={nextPrompt}
            className="text-[11px] text-teal-700 hover:text-teal-900 font-semibold underline"
          >
            Next Thought
          </button>
        </div>
        <p className="text-xs font-serif italic text-slate-700 leading-relaxed mb-2">
          &ldquo;{currentPrompt.quote}&rdquo;
        </p>
        <div className="text-[10px] text-slate-400 font-medium mb-3">
          — {currentPrompt.author}
        </div>
        <div className="bg-white/80 p-2.5 rounded-2xl border border-amber-100/70 text-[11px] text-slate-600 flex items-start space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
          <span><strong className="text-slate-800">Prompt:</strong> {currentPrompt.reflectionQuestion}</span>
        </div>
      </div>

      {/* Featured Therapies Carousel / List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Key Therapeutic Care</h3>
            <p className="text-[11px] text-slate-400">Clinical, creative & transformative</p>
          </div>
          <button
            onClick={() => onSelectTab('therapy')}
            className="text-xs font-semibold text-teal-700 flex items-center space-x-0.5 hover:underline"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2.5">
          {THERAPY_SERVICES.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs flex space-x-3 items-center hover:border-slate-200 transition-colors"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{service.title}</h4>
                  {service.popular && (
                    <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{service.subtitle}</p>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-50">
                  <span className="text-xs font-bold text-teal-700">{service.fee}</span>
                  <button
                    onClick={() => onOpenBooking(service.id)}
                    className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-lg text-[11px] font-semibold transition-colors"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Founder Spotlight: Dr. Asha */}
      <div className="bg-gradient-to-br from-teal-50/70 via-white to-slate-50 rounded-3xl p-4 border border-teal-100 shadow-2xs space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-700 to-emerald-600 flex items-center justify-center text-white font-serif font-bold text-xl shadow-xs shrink-0">
            Dr. A
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
              Founder & Director
            </span>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">
              {CLINIC_INFO.founder}
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">{CLINIC_INFO.founderTitle}</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          &ldquo;At Asha The Hope, we combine traditional psychological science with expressive art therapy and somatic healing. True healing occurs when a person is heard, seen, and empowered to create their own inner peace.&rdquo;
        </p>

        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="p-2 bg-white rounded-xl border border-teal-100/60">
            <span className="text-xs font-bold text-teal-800 block">10,000+</span>
            <span className="text-[9px] text-slate-500">Lives Touched</span>
          </div>
          <div className="p-2 bg-white rounded-xl border border-teal-100/60">
            <span className="text-xs font-bold text-teal-800 block">500+</span>
            <span className="text-[9px] text-slate-500">Therapists Trained</span>
          </div>
          <div className="p-2 bg-white rounded-xl border border-teal-100/60">
            <span className="text-xs font-bold text-teal-800 block">15+ Yrs</span>
            <span className="text-[9px] text-slate-500">Clinical Legacy</span>
          </div>
        </div>
      </div>

      {/* Community Forums & Workshops (Parivarthana & Chinthana) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Community Healing Circles</h3>
            <p className="text-[11px] text-slate-400">Transformative weekend gatherings</p>
          </div>
          <span className="text-[10px] text-teal-700 bg-teal-50 font-bold px-2 py-0.5 rounded-full">
            Banashankari & Online
          </span>
        </div>

        <div className="space-y-2">
          {COMMUNITY_EVENTS.slice(0, 2).map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs hover:border-slate-200 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                  {event.type}
                </span>
                <span className="text-[10px] text-rose-600 font-semibold">
                  Only {event.spotsLeft} spots left
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-800">{event.title}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{event.subTitle}</p>
              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-teal-600" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <button
                  onClick={() => onOpenBooking()}
                  className="text-xs font-semibold text-teal-700 hover:underline"
                >
                  Join Circle →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-2.5">
        <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-1">
          <Users className="w-4 h-4 text-teal-600" />
          <span>Voices of Hope</span>
        </h3>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs space-y-2">
          <div className="flex items-center space-x-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <p className="text-xs text-slate-700 italic leading-relaxed">
            &ldquo;{TESTIMONIALS[0].quote}&rdquo;
          </p>
          <div className="pt-1 flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-800">{TESTIMONIALS[0].name}</span>
            <span className="text-slate-400">{TESTIMONIALS[0].role}</span>
          </div>
        </div>
      </div>

      {/* Banashankari Clinic Location Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2 text-xs">
        <div className="flex items-center space-x-1.5 text-teal-300 font-semibold">
          <MapPin className="w-4 h-4" />
          <span>Banashankari Center, Bengaluru</span>
        </div>
        <p className="text-slate-300 leading-snug text-[11px]">
          {CLINIC_INFO.address}
        </p>
        <div className="flex items-center justify-between pt-1 text-[11px]">
          <span className="text-slate-400">Open Mon-Sat 9:30 AM – 7:30 PM</span>
          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="text-teal-300 font-bold hover:underline flex items-center space-x-1"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Call Clinic</span>
          </a>
        </div>
      </div>
    </div>
  );
};
