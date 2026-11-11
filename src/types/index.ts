export type TabType = 'home' | 'therapy' | 'courses' | 'wellness' | 'clinic';

export interface TherapyService {
  id: string;
  title: string;
  subtitle: string;
  category: 'art' | 'individual' | 'child' | 'relationship' | 'graphology' | 'stress';
  duration: string;
  fee: string;
  modes: ('In-Person (Bengaluru)' | 'Online (Video/Audio)')[];
  image: string;
  description: string;
  benefits: string[];
  recommendedFor: string[];
  popular?: boolean;
}

export interface CourseProgram {
  id: string;
  title: string;
  level: 'Diploma' | 'Doctorate' | 'Certification' | 'Executive Program';
  duration: string;
  format: 'Hybrid (Online + Practicum)' | 'Online Live Classes' | 'Weekend Intensive';
  fee: string;
  badge?: string;
  image: string;
  shortDescription: string;
  overview: string;
  curriculum: {
    moduleNumber: number;
    title: string;
    topics: string[];
  }[];
  certificationBy: string;
  eligibility: string;
  nextBatchDate: string;
}

export interface Appointment {
  id: string;
  serviceTitle: string;
  mode: 'In-Person (Bengaluru)' | 'Online (Video/Audio)';
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes?: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface MoodEntry {
  id: string;
  mood: 'peaceful' | 'happy' | 'neutral' | 'anxious' | 'sad' | 'exhausted';
  intensity: number; // 1 to 5
  tags: string[];
  note: string;
  date: string;
  time: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  subTitle: string;
  date: string;
  time: string;
  location: string;
  type: 'Parivarthana' | 'Chinthana' | 'Anveshana' | 'Art Workshop';
  spotsLeft: number;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  type: 'Therapy Client' | 'Diploma Graduate';
}

export interface WellnessPrompt {
  id: string;
  quote: string;
  author: string;
  reflectionQuestion: string;
}
