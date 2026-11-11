import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck,
  MessageCircle,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { THERAPY_SERVICES, CLINIC_INFO } from '../../data/ashaData';
import { Appointment } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  onBookingConfirmed: (appointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  onBookingConfirmed
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || THERAPY_SERVICES[0].id
  );
  const [selectedMode, setSelectedMode] = useState<'In-Person (Bengaluru)' | 'Online (Video/Audio)'>(
    'In-Person (Bengaluru)'
  );
  
  // Date calculation: Next 7 days
  const today = new Date();
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + (today.getHours() > 18 ? 1 : 0));
    return {
      dateString: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].dateString);
  const [selectedSlot, setSelectedSlot] = useState<string>('11:00 AM');

  const timeSlots = [
    '10:00 AM', '11:15 AM', '12:30 PM', '02:30 PM', '04:00 PM', '05:30 PM', '06:45 PM'
  ];

  // Client Details Form
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  if (!isOpen) return null;

  const currentService = THERAPY_SERVICES.find(s => s.id === selectedServiceId) || THERAPY_SERVICES[0];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0d9488', '#059669', '#f59e0b', '#ec4899']
      });
    } catch {
      // Fallback gracefully if not available
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    const newAppointment: Appointment = {
      id: `ASH-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceTitle: currentService.title,
      mode: selectedMode,
      date: selectedDate,
      timeSlot: selectedSlot,
      clientName: formData.name,
      clientPhone: formData.phone,
      clientEmail: formData.email,
      notes: formData.notes,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setCreatedAppointment(newAppointment);
    onBookingConfirmed(newAppointment);
    triggerConfetti();
    setStep(4);
  };

  const openWhatsAppConfirmation = () => {
    if (!createdAppointment) return;
    const text = encodeURIComponent(
      `Hello Asha The Hope team,\nI have scheduled an appointment on your mobile app:\n\n` +
      `📌 Ref ID: ${createdAppointment.id}\n` +
      `🩺 Service: ${createdAppointment.serviceTitle}\n` +
      `📍 Mode: ${createdAppointment.mode}\n` +
      `📅 Date: ${createdAppointment.date}\n` +
      `⏰ Time: ${createdAppointment.timeSlot}\n` +
      `👤 Client: ${createdAppointment.clientName}\n\n` +
      `Kindly confirm the consultation link / clinic reception arrival. Thank you!`
    );
    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in slide-in-from-bottom-6 duration-200"
      >
        {/* Modal Top Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="text-[10px] uppercase font-bold text-teal-700 tracking-wider">
              {step === 4 ? 'Appointment Confirmed' : `Step ${step} of 3`}
            </div>
            <h3 className="font-semibold text-slate-800 text-base">
              {step === 1 && 'Select Therapy Modality'}
              {step === 2 && 'Select Date & Time Slot'}
              {step === 3 && 'Client Information'}
              {step === 4 && 'Session Scheduled!'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-4 text-slate-800 flex-1">
          {/* STEP 1: Select Service & Mode */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-2">
                  Choose Therapy Focus
                </label>
                <div className="space-y-2">
                  {THERAPY_SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedServiceId(s.id)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                        selectedServiceId === s.id
                          ? 'border-teal-600 bg-teal-50/70 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800">{s.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{s.subtitle}</div>
                        <div className="flex items-center space-x-2 mt-1.5 text-[11px] text-teal-700 font-medium">
                          <span>⏱ {s.duration}</span>
                          <span>•</span>
                          <span>{s.fee}</span>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        selectedServiceId === s.id ? 'border-teal-600 bg-teal-600' : 'border-slate-300'
                      }`}>
                        {selectedServiceId === s.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Consultation Mode */}
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-2">
                  Consultation Setting
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedMode('In-Person (Bengaluru)')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedMode === 'In-Person (Bengaluru)'
                        ? 'border-teal-600 bg-teal-50 text-teal-900 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-teal-700 mb-1" />
                    <div className="text-xs font-bold">In-Clinic Visit</div>
                    <div className="text-[10px] text-slate-500">Banashankari, Bengaluru</div>
                  </button>

                  <button
                    onClick={() => setSelectedMode('Online (Video/Audio)')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedMode === 'Online (Video/Audio)'
                        ? 'border-teal-600 bg-teal-50 text-teal-900 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Video className="w-4 h-4 text-teal-700 mb-1" />
                    <div className="text-xs font-bold">Online Video Call</div>
                    <div className="text-[10px] text-slate-500">Secure Zoom / Meet Link</div>
                  </button>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-2xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center space-x-1.5"
              >
                <span>Continue to Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Date & Time */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-2 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>Choose Date</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {availableDates.map((item) => (
                    <button
                      key={item.dateString}
                      onClick={() => setSelectedDate(item.dateString)}
                      className={`p-2 rounded-2xl border text-center transition-all ${
                        selectedDate === item.dateString
                          ? 'border-teal-600 bg-teal-600 text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-medium">{item.dayName}</div>
                      <div className="text-base font-bold my-0.5">{item.dayNumber}</div>
                      <div className="text-[10px] opacity-80">{item.month}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-2 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>Available Time Slots (IST)</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-1 rounded-xl text-xs font-medium border text-center transition-all ${
                        selectedSlot === slot
                          ? 'border-teal-600 bg-teal-50 text-teal-800 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service summary chip */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-800">{currentService.title}</div>
                  <div className="text-[11px] text-slate-500">{selectedMode}</div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-teal-700">{currentService.fee}</span>
                  <div className="text-[10px] text-slate-400">Pay at session</div>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 border border-slate-200 text-slate-600 font-medium text-xs rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-2xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center space-x-1.5"
                >
                  <span>Continue to Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Client Details */}
          {step === 3 && (
            <form onSubmit={handleConfirmBooking} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priyadarshini Sharma"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  WhatsApp / Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  What would you like to explore or heal?
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Feeling overwhelmed with corporate work, seeking art therapy guidance..."
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 placeholder:text-slate-400 resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Strict 100% Medical Confidentiality & Clinical Privacy</span>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-3 border border-slate-200 text-slate-600 font-medium text-xs rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-2xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center space-x-1.5"
                >
                  <span>Confirm Appointment</span>
                  <CheckCircle2 className="w-4 h-4 text-teal-200" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success Ticket & Confirmation */}
          {step === 4 && createdAppointment && (
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900">Appointment Scheduled!</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your session request has been received by Asha The Hope team.
                </p>
              </div>

              {/* Digital Session Card */}
              <div className="bg-gradient-to-br from-teal-50 via-white to-slate-50 border border-teal-200 rounded-2xl p-4 text-left shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-teal-100 pb-2">
                  <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">
                    Booking Pass
                  </span>
                  <span className="text-xs font-mono font-bold text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-md">
                    {createdAppointment.id}
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-800">
                  {createdAppointment.serviceTitle}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Date</span>
                    <span className="font-semibold text-slate-700">{createdAppointment.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Time</span>
                    <span className="font-semibold text-slate-700">{createdAppointment.timeSlot}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-slate-400 block">Location / Format</span>
                    <span className="font-semibold text-slate-700">{createdAppointment.mode}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-teal-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Client: {createdAppointment.clientName}</span>
                  <span className="text-teal-700 font-semibold">{currentService.fee}</span>
                </div>
              </div>

              {/* Quick WhatsApp Share / Connect */}
              <button
                onClick={openWhatsAppConfirmation}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-2xl shadow-sm transition-transform active:scale-[0.99] flex items-center justify-center space-x-1.5"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send Details on WhatsApp (+91 86603 71460)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 text-slate-500 hover:text-slate-800 font-medium text-xs"
              >
                Close & Return to App
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
