import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  Phone, 
  User, 
  Mail, 
  Briefcase,
  Sparkles,
  MessageCircle,
  Download
} from 'lucide-react';
import { CourseProgram } from '../../types';
import { CLINIC_INFO } from '../../data/ashaData';

interface CourseInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseProgram | null;
}

export const CourseInquiryModal: React.FC<CourseInquiryModalProps> = ({
  isOpen,
  onClose,
  course
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    profession: '',
    priorExperience: 'Beginner / Enthusiast'
  });

  if (!isOpen || !course) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Asha The Hope Academy,\nI would like to inquire about admission for the following program:\n\n` +
      `🎓 Program: ${course.title}\n` +
      `⏱ Duration: ${course.duration}\n` +
      `👤 Name: ${formData.name || 'Prospective Student'}\n` +
      `💼 Background: ${formData.profession || 'Applicant'}\n\n` +
      `Could you please share the syllabus details and next batch dates? Thank you!`
    );
    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleDownloadBrochure = () => {
    // Generate clean text syllabus file download
    const brochureContent = `
========================================
ASHA THE HOPE ACADEMY OF HOLISTIC HEALING
Official Course Prospectus
========================================

Program: ${course.title}
Level: ${course.level}
Duration: ${course.duration}
Format: ${course.format}
Fee Structure: ${course.fee}
Certification Body: ${course.certificationBy}
Eligibility: ${course.eligibility}
Upcoming Batch: ${course.nextBatchDate}

----------------------------------------
PROGRAM OVERVIEW:
----------------------------------------
${course.overview}

----------------------------------------
CURRICULUM MODULES:
----------------------------------------
${course.curriculum
  .map(
    (m) => `
Module ${m.moduleNumber}: ${m.title}
Topics Covered:
${m.topics.map((t) => ` - ${t}`).join('\n')}
`
  )
  .join('\n')}

----------------------------------------
CAMPUS & ADMISSION OFFICE:
----------------------------------------
Asha The Hope Center
#1698, 6th Cross Road, Near Brahmachaithanya Mandira,
Banashankari Stage I, Bengaluru, Karnataka 560050, India
WhatsApp & Phone: ${CLINIC_INFO.phone}
Email: ${CLINIC_INFO.email}
Website: https://ashathehope.in
========================================
    `;

    const blob = new Blob([brochureContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AshaTheHope-${course.id}-Syllabus.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-teal-900 text-white">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-white/10 rounded-xl">
              <GraduationCap className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-teal-200 tracking-wider">
                Asha The Hope Academy
              </div>
              <h3 className="font-semibold text-white text-sm line-clamp-1">{course.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-teal-200 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-4 text-slate-800">
          {!submitted ? (
            <>
              {/* Program Highlight Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-100/60 px-2 py-0.5 rounded-full">
                    {course.level}
                  </span>
                  <span className="text-xs font-bold text-slate-700">{course.fee}</span>
                </div>
                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Duration: </span>
                  {course.duration} ({course.format})
                </div>
                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Batch: </span>
                  {course.nextBatchDate}
                </div>

                <button
                  type="button"
                  onClick={handleDownloadBrochure}
                  className="w-full mt-1 py-1.5 border border-teal-600/40 text-teal-700 hover:bg-teal-50 text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Detailed Syllabus Prospectus</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="text-xs font-semibold text-slate-800 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Admissions Application / Seat Reservation</span>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Radhika Varma"
                      className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    WhatsApp Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@gmail.com"
                      className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Current Profession / Educational Background
                  </label>
                  <div className="relative">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      placeholder="e.g. Teacher, Psychologist, HR, Student, Homemaker"
                      className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col space-y-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    Submit Admission Application
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppInquiry}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Inquire Instantly on WhatsApp</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800">Application Received!</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-slate-800">{formData.name || 'Applicant'}</span>! Our academic counselor at Asha The Hope will review your profile and reach out via WhatsApp / Email regarding batch timings and fee concession options.
              </p>

              <button
                onClick={handleWhatsAppInquiry}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1.5"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat Directly with Dr. Asha's Office</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 text-slate-500 hover:text-slate-700 text-xs font-medium"
              >
                Back to Courses
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
