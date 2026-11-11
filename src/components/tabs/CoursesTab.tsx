import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { COURSE_PROGRAMS } from '../../data/ashaData';
import { CourseProgram } from '../../types';

interface CoursesTabProps {
  onOpenInquiry: (course: CourseProgram) => void;
}

export const CoursesTab: React.FC<CoursesTabProps> = ({ onOpenInquiry }) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseProgram>(COURSE_PROGRAMS[0]);
  const [expandedCurriculum, setExpandedCurriculum] = useState<number | null>(1);

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          <span>Asha The Hope Academy</span>
        </div>
        <h2 className="text-lg font-serif font-bold text-slate-900 mt-0.5">
          Courses & Certifications
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Accredited diplomas and doctoral tracks in art therapy, holistic medicine, and psychological counseling.
        </p>
      </div>

      {/* Course Selector Tabs */}
      <div className="space-y-2">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Available Academic Tracks
        </div>
        <div className="flex space-x-2 overflow-x-auto no-scrollbar py-1">
          {COURSE_PROGRAMS.map((course) => (
            <button
              key={course.id}
              onClick={() => {
                setSelectedCourse(course);
                setExpandedCurriculum(1);
              }}
              className={`text-left p-3 rounded-2xl border transition-all shrink-0 w-64 ${
                selectedCourse.id === course.id
                  ? 'border-indigo-600 bg-indigo-50/70 shadow-2xs ring-1 ring-indigo-500'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                  {course.level}
                </span>
                {course.badge && (
                  <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full">
                    {course.badge}
                  </span>
                )}
              </div>
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{course.title}</h4>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center space-x-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{course.duration}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Course Detailed Dossier */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xs overflow-hidden space-y-4">
        {/* Banner with image */}
        <div className="relative aspect-[16/8] w-full bg-slate-900 overflow-hidden">
          <img
            src={selectedCourse.image}
            alt={selectedCourse.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[10px] uppercase font-bold text-teal-300 tracking-wider">
              {selectedCourse.format}
            </span>
            <h3 className="text-base font-bold leading-tight mt-0.5">{selectedCourse.title}</h3>
          </div>
        </div>

        {/* Core Metadata */}
        <div className="px-4 space-y-4">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Duration</span>
              <span className="font-bold text-slate-700">{selectedCourse.duration}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Tuition Fee</span>
              <span className="font-bold text-teal-700">{selectedCourse.fee}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Eligibility</span>
              <span className="font-semibold text-slate-700 line-clamp-1">{selectedCourse.eligibility}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Next Intake</span>
              <span className="font-semibold text-slate-700">{selectedCourse.nextBatchDate}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex space-x-2">
            <button
              onClick={() => onOpenInquiry(selectedCourse)}
              className="flex-1 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs rounded-2xl shadow-sm transition-transform active:scale-95 flex items-center justify-center space-x-1.5"
            >
              <span>Apply / Inquire for Seat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Overview text */}
          <div className="space-y-1.5 pt-1">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Course Overview
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedCourse.overview}
            </p>
          </div>

          {/* Curriculum Modules Accordion */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Curriculum Modules</span>
              </h4>
              <span className="text-[10px] text-slate-400">
                {selectedCourse.curriculum.length} Core Modules
              </span>
            </div>

            <div className="space-y-2">
              {selectedCourse.curriculum.map((m) => {
                const isOpen = expandedCurriculum === m.moduleNumber;
                return (
                  <div
                    key={m.moduleNumber}
                    className="border border-slate-200/70 rounded-2xl overflow-hidden bg-slate-50/50"
                  >
                    <button
                      onClick={() => setExpandedCurriculum(isOpen ? null : m.moduleNumber)}
                      className="w-full p-3 text-left text-xs font-semibold text-slate-800 flex items-center justify-between hover:bg-slate-100/60"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold flex items-center justify-center">
                          {m.moduleNumber}
                        </span>
                        <span className="line-clamp-1">{m.title}</span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-3 bg-white border-t border-slate-100 text-[11px] text-slate-600 space-y-1.5 animate-in fade-in duration-150">
                        {m.topics.map((t, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Accreditation Badge */}
          <div className="p-3 bg-gradient-to-r from-indigo-50 to-teal-50 border border-indigo-100 rounded-2xl flex items-center space-x-2.5 pb-4">
            <Award className="w-6 h-6 text-indigo-700 shrink-0" />
            <div className="text-[11px]">
              <span className="font-bold text-slate-800 block">Certificate of Completion</span>
              <span className="text-slate-500">{selectedCourse.certificationBy}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
