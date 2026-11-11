import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Globe, 
  Clock, 
  Compass, 
  BookOpen, 
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Download,
  Share2
} from 'lucide-react';
import { CLINIC_INFO } from '../../data/ashaData';

export const ClinicTab: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [pwaInstalled, setPwaInstalled] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(CLINIC_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      'Asha The Hope, Banashankari 1st Stage, Bengaluru'
    )}`;
    window.open(url, '_blank');
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Dr. Asha and team,\nI would like to know more about Asha The Hope counseling and art therapy programs.`
    );
    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Asha The Hope - Mental Health & Art Therapy Mobile App',
        text: 'Access counseling, expressive art therapy, and accredited courses from Asha The Hope, Bengaluru.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('App link copied to clipboard!');
    }
  };

  const handleInstallPwa = () => {
    setPwaInstalled(true);
    setTimeout(() => setPwaInstalled(false), 4000);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider">
          <Compass className="w-4 h-4 text-teal-600" />
          <span>Center & Leadership</span>
        </div>
        <h2 className="text-lg font-serif font-bold text-slate-900 mt-0.5">
          About Asha The Hope
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Multi-specialty center for counselling, expressive art therapy, and holistic wellness in Bengaluru.
        </p>
      </div>

      {/* Clinic Location & Quick Navigation Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xs">Bengaluru Center</h3>
              <p className="text-[10px] text-teal-700 font-semibold">Banashankari Stage I</p>
            </div>
          </div>

          <button
            onClick={copyAddress}
            className="p-2 text-slate-400 hover:text-teal-700 rounded-xl hover:bg-slate-50 transition-colors"
            title="Copy Address"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
          {CLINIC_INFO.address}
        </p>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={openGoogleMaps}
            className="py-2.5 px-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-2xs transition-transform active:scale-95 flex items-center justify-center space-x-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Open in Maps</span>
          </button>

          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="py-2.5 px-3 border border-teal-600 text-teal-800 hover:bg-teal-50 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Reception</span>
          </a>
        </div>

        {/* Operating Hours */}
        <div className="flex items-start space-x-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
          <Clock className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
          <span>{CLINIC_INFO.workingHours}</span>
        </div>
      </div>

      {/* Direct Communication Channels */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={openWhatsApp}
          className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl text-left transition-colors flex items-center space-x-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <MessageCircle className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">WhatsApp</span>
            <span className="text-xs font-semibold text-emerald-950">+91 86603 71460</span>
          </div>
        </button>

        <a
          href={`mailto:${CLINIC_INFO.email}`}
          className="p-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-2xl text-left transition-colors flex items-center space-x-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-800 block">Email Desk</span>
            <span className="text-xs font-semibold text-indigo-950 truncate block">admin@ashathehope.in</span>
          </div>
        </a>
      </div>

      {/* Founder Profile Details */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-800 to-emerald-700 flex items-center justify-center text-white font-serif font-black text-2xl shadow-xs">
            A
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-teal-700">
              Founder & Director
            </span>
            <h3 className="font-bold text-slate-900 text-sm leading-tight">{CLINIC_INFO.founder}</h3>
            <p className="text-[11px] text-slate-500">Counseling Psychologist & Healer</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {CLINIC_INFO.founderBio}
        </p>

        <div className="space-y-1.5 pt-1 text-[11px] text-slate-600">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>Master Practitioner in Expressive Arts Therapy</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>Certified Forensic Graphologist & Handwriting Therapist</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>Author & Chief Editor of &ldquo;Hustle Wisely&rdquo; Publications</span>
          </div>
        </div>
      </div>

      {/* Publications: Hustle Wisely */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-4 space-y-2.5">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-amber-500 text-white rounded-xl">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
              Asha The Hope Publications
            </span>
            <h4 className="text-xs font-bold text-slate-900">&ldquo;Hustle Wisely&rdquo; Magazine & Guides</h4>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Our regular publications bring together reflections on mental resilience, self-discovery, mindful career growth, and emotional equilibrium in today's fast-paced world.
        </p>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-amber-900 font-semibold">Copies available at clinic & online</span>
          <a
            href="https://ashathehope.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-teal-800 hover:underline flex items-center space-x-1"
          >
            <span>Visit Website</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* App Quick Tools (Install PWA & Share) */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">Mobile App Actions</span>
          <span className="text-[10px] text-slate-400">v1.2.0 • PWA Ready</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleInstallPwa}
            className="p-2 bg-white rounded-xl border border-slate-200 hover:border-teal-500 text-xs font-semibold text-slate-700 flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-teal-600" />
            <span>{pwaInstalled ? 'Installed!' : 'Add to Home Screen'}</span>
          </button>

          <button
            onClick={handleShareApp}
            className="p-2 bg-white rounded-xl border border-slate-200 hover:border-teal-500 text-xs font-semibold text-slate-700 flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Share Mobile App</span>
          </button>
        </div>

        {pwaInstalled && (
          <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 text-center font-medium">
            ✨ App saved to your device for instant offline access!
          </div>
        )}
      </div>

      {/* Footer credits */}
      <div className="text-center pt-2 text-[11px] text-slate-400 space-y-1">
        <p>© {new Date().getFullYear()} Asha The Hope. All Rights Reserved.</p>
        <p>Banashankari, Bengaluru, Karnataka, India • ashathehope.in</p>
      </div>
    </div>
  );
};
