/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './components/tabs/HomeTab';
import { TherapyTab } from './components/tabs/TherapyTab';
import { CoursesTab } from './components/tabs/CoursesTab';
import { WellnessTab } from './components/tabs/WellnessTab';
import { ClinicTab } from './components/tabs/ClinicTab';
import { BookingModal } from './components/modals/BookingModal';
import { CourseInquiryModal } from './components/modals/CourseInquiryModal';
import { CrisisModal } from './components/modals/CrisisModal';
import { TabType, CourseProgram, Appointment } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);
  const [inquiryCourse, setInquiryCourse] = useState<CourseProgram | null>(null);
  const [bookedAppointments, setBookedAppointments] = useState<Appointment[]>([]);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleOpenCourseInquiry = (course: CourseProgram) => {
    setInquiryCourse(course);
  };

  const handleBookingConfirmed = (newAppointment: Appointment) => {
    setBookedAppointments(prev => [newAppointment, ...prev]);
  };

  return (
    <MobileFrame>
      {/* Top Header */}
      <Header
        onOpenCrisis={() => setIsCrisisOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Tab Screen Content */}
      <main className="flex-1 px-4 pt-4 pb-2">
        {activeTab === 'home' && (
          <HomeTab
            onSelectTab={setActiveTab}
            onOpenBooking={handleOpenBooking}
            onOpenCrisis={() => setIsCrisisOpen(true)}
          />
        )}

        {activeTab === 'therapy' && (
          <TherapyTab onOpenBooking={handleOpenBooking} />
        )}

        {activeTab === 'courses' && (
          <CoursesTab onOpenInquiry={handleOpenCourseInquiry} />
        )}

        {activeTab === 'wellness' && (
          <WellnessTab onOpenBooking={handleOpenBooking} />
        )}

        {activeTab === 'clinic' && (
          <ClinicTab />
        )}
      </main>

      {/* Bottom Mobile Tab Bar */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={selectedServiceId}
        onBookingConfirmed={handleBookingConfirmed}
      />

      <CourseInquiryModal
        isOpen={!!inquiryCourse}
        onClose={() => setInquiryCourse(null)}
        course={inquiryCourse}
      />

      <CrisisModal
        isOpen={isCrisisOpen}
        onClose={() => setIsCrisisOpen(false)}
      />
    </MobileFrame>
  );
}
