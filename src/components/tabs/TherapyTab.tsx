import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Calendar,
  HelpCircle
} from 'lucide-react';
import { THERAPY_SERVICES, FAQ_ITEMS } from '../../data/ashaData';

interface TherapyTabProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const TherapyTab: React.FC<TherapyTabProps> = ({ onOpenBooking }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'art' | 'individual' | 'child' | 'relationship' | 'graphology'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(THERAPY_SERVICES[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredServices = selectedFilter === 'all'
    ? THERAPY_SERVICES
    : THERAPY_SERVICES.filter(s => s.category === selectedFilter);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider">
          <HeartHandshake className="w-4 h-4 text-teal-600" />
          <span>Counselling & Psychotherapy</span>
        </div>
        <h2 className="text-lg font-serif font-bold text-slate-900 mt-0.5">
          Therapeutic Services
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Compassionate clinical care and expressive art modalities tailored to your unique journey.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1.5 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: 'All Services' },
          { id: 'art', label: 'Art Therapy' },
          { id: 'individual', label: 'Individual' },
          { id: 'child', label: 'Child & Teen' },
          { id: 'relationship', label: 'Couples' },
          { id: 'graphology', label: 'Graphotherapy' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id as any)}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
              selectedFilter === f.id
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {filteredServices.map((service) => {
          const isExpanded = expandedId === service.id;
          return (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-2xs overflow-hidden transition-all"
            >
              <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                {service.popular && (
                  <span className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    Popular Focus
                  </span>
                )}

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-sm leading-tight text-white">{service.title}</h3>
                  <p className="text-[11px] text-slate-200 mt-0.5 line-clamp-1">{service.subtitle}</p>
                </div>
              </div>

              {/* Service Meta Bar */}
              <div className="p-3.5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{service.duration}</span>
                    </span>
                    <span>•</span>
                    <span className="font-bold text-teal-800">{service.fee}</span>
                  </div>

                  <button
                    onClick={() => onOpenBooking(service.id)}
                    className="py-1.5 px-3 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-transform active:scale-95 flex items-center space-x-1"
                  >
                    <Calendar className="w-3 h-3 text-teal-200" />
                    <span>Book Session</span>
                  </button>
                </div>

                {/* Modality Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {service.modes.map((mode, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 flex items-center space-x-1"
                    >
                      {mode.includes('In-Person') ? (
                        <MapPin className="w-2.5 h-2.5 text-teal-600" />
                      ) : (
                        <Video className="w-2.5 h-2.5 text-teal-600" />
                      )}
                      <span>{mode}</span>
                    </span>
                  ))}
                </div>

                {/* Expand / Collapse Details */}
                <button
                  onClick={() => toggleExpand(service.id)}
                  className="w-full pt-1 text-slate-500 hover:text-slate-800 text-[11px] font-medium flex items-center justify-between border-t border-slate-100"
                >
                  <span>{isExpanded ? 'Hide clinical details' : 'View benefits & therapeutic approach'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {isExpanded && (
                  <div className="pt-2 border-t border-slate-100 space-y-3 text-xs animate-in fade-in duration-200">
                    <p className="text-slate-600 leading-relaxed">{service.description}</p>

                    <div>
                      <h5 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1.5 text-teal-800">
                        Key Healing Benefits
                      </h5>
                      <div className="space-y-1.5">
                        {service.benefits.map((b, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-[11px] text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1.5 text-slate-700">
                        Recommended For
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {service.recommendedFor.map((r, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-teal-50/70 border border-teal-100 text-teal-800 px-2 py-0.5 rounded-full"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Therapy FAQs */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs space-y-3">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
          <HelpCircle className="w-4 h-4 text-teal-600" />
          <span>Frequently Asked Questions</span>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-3 text-xs font-semibold text-slate-800 flex justify-between items-center bg-slate-50/50 hover:bg-slate-50"
              >
                <span>{item.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
              {openFaq === idx && (
                <div className="p-3 text-[11px] text-slate-600 bg-white leading-relaxed border-t border-slate-100">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
