import { TherapyService, CourseProgram, CommunityEvent, Testimonial, WellnessPrompt } from '../types';

export const CLINIC_INFO = {
  name: "Asha The Hope",
  tagline: "Empowering Minds, Healing Souls, Inspiring Transformation",
  founder: "Dr. Asha (Dr. Sangeetha Sathyanarayan)",
  founderTitle: "Founder & Director, Counseling Psychologist, Art Therapist & Holistic Healer",
  founderBio: "Dr. Asha is an esteemed psychotherapist, international art therapy educator, and holistic wellness pioneer. Under her leadership, Asha The Hope has nurtured thousands of clients toward emotional self-recovery and trained hundreds of future counselors across India and abroad.",
  address: "#1698, 6th Cross Road, Near Brahmachaithanya Mandira, Banashankari Stage I, Bengaluru, Karnataka 560050, India",
  phone: "+91 86603 71460",
  whatsappNumber: "918660371460",
  email: "admin@ashathehope.in",
  workingHours: "Mon - Sat: 9:30 AM – 7:30 PM (IST) | Sunday by prior appointment",
  established: "Banashankari, Bengaluru",
};

export const THERAPY_SERVICES: TherapyService[] = [
  {
    id: "art-therapy",
    title: "Expressive Art Therapy",
    subtitle: "Healing beyond words through visual symbols & creative expression",
    category: "art",
    duration: "60 mins",
    fee: "₹1,800",
    modes: ["In-Person (Bengaluru)", "Online (Video/Audio)"],
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    description: "Art therapy bypasses the intellectualized defenses of the conscious mind. By utilizing colors, textures, mandalas, and guided imagery, clients release repressed emotional pain, anxiety, and unresolved trauma in a non-judgmental sacred space.",
    benefits: [
      "Process trauma without needing to vocalize painful memories",
      "Release deep-seated tension, anxiety, and chronic emotional overwhelm",
      "Gain spontaneous subconscious insights through visual metaphor",
      "Restore inner calm and reconnect with joyful creative energy"
    ],
    recommendedFor: ["Stress & Burnout", "Grief & Loss", "Child & Teen Emotional Distress", "Self-Discovery"],
    popular: true
  },
  {
    id: "individual-counselling",
    title: "Individual Psychotherapy & Counseling",
    subtitle: "Confidential one-on-one psychological support for life challenges",
    category: "individual",
    duration: "50 mins",
    fee: "₹1,500",
    modes: ["In-Person (Bengaluru)", "Online (Video/Audio)"],
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=800&q=80",
    description: "A collaborative, empathetic space focusing on cognitive restructuring, emotion regulation, coping mechanisms, and finding clarity in life transitions.",
    benefits: [
      "Overcome chronic anxiety, depressive episodes, and persistent fear",
      "Build healthy self-esteem and overcome self-sabotage",
      "Establish healthy emotional boundaries with work and family",
      "Develop actionable coping tools for daily life stressors"
    ],
    recommendedFor: ["Anxiety & Depression", "Career & Work Stress", "Low Self-Esteem", "Life Transitions"],
    popular: true
  },
  {
    id: "child-adolescent",
    title: "Child & Adolescent Therapy",
    subtitle: "Nurturing young minds through play, behavioral support & school guidance",
    category: "child",
    duration: "45 mins",
    fee: "₹1,600",
    modes: ["In-Person (Bengaluru)", "Online (Video/Audio)"],
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    description: "Specialized child-centered therapies combining play therapy, behavioral reinforcement, emotional validation, and collaborative parent guidance.",
    benefits: [
      "Manage academic anxiety and attention/focus difficulties",
      "Address aggressive outbursts, withdrawal, or behavioral challenges",
      "Strengthen parent-child emotional communication",
      "Support emotional regulation during adolescent growth"
    ],
    recommendedFor: ["ADHD / Attention Deficit", "Exam Stress & Anxiety", "Peer Pressure / Bullying", "Behavioral Changes"]
  },
  {
    id: "relationship-couples",
    title: "Couples & Marriage Counseling",
    subtitle: "Rebuilding intimacy, mutual respect, and heartfelt communication",
    category: "relationship",
    duration: "75 mins",
    fee: "₹2,400",
    modes: ["In-Person (Bengaluru)", "Online (Video/Audio)"],
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    description: "Navigate recurring arguments, emotional distance, trust issues, and differing values with an objective, compassionate relationship therapist.",
    benefits: [
      "De-escalate defensive communication loops and active listening",
      "Heal trust after conflict, betrayal, or long-standing resentment",
      "Align on parenting, financial stress, and life goals",
      "Rekindle mutual warmth and emotional intimacy"
    ],
    recommendedFor: ["Pre-Marital Preparation", "Communication Breakdown", "Infidelity Recovery", "Family Conflicts"]
  },
  {
    id: "graphotherapy",
    title: "Graphology & Graphotherapy",
    subtitle: "Handwriting analysis & therapeutic writing for personality modification",
    category: "graphology",
    duration: "60 mins",
    fee: "₹1,800",
    modes: ["In-Person (Bengaluru)", "Online (Video/Audio)"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    description: "Handwriting is brain-writing. Through systematic forensic stroke analysis and customized neuro-motor stroke drills, graphotherapy rewires deep subconscious habits.",
    benefits: [
      "Pinpoint subconscious psychological defense mechanisms",
      "Improve focus, persistence, and confidence through stroke exercises",
      "Reduce internal anxiety and emotional impulsivity",
      "Develop positive mental traits through scientific handwriting changes"
    ],
    recommendedFor: ["Confidence Building", "Focus & Discipline", "Subconscious Reprogramming", "Self-Analysis"]
  },
  {
    id: "stress-anger",
    title: "Stress & Anger Management Intensive",
    subtitle: "Regain mastery over emotional triggers and somatic body responses",
    category: "stress",
    duration: "50 mins",
    fee: "₹1,500",
    modes: ["In-Person (Bengaluru)", "Online (Video/Audio)"],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    description: "Learn practical physiological down-regulation techniques, CBT cognitive reappraisal, and emotional first-aid protocols to keep your cool under high pressure.",
    benefits: [
      "Understand the root vulnerability beneath explosive rage",
      "Master somatic de-escalation (vagus nerve breathing & grounding)",
      "Communicate assertively without aggressiveness or passive aggression",
      "Protect your physical health and cardiovascular wellbeing"
    ],
    recommendedFor: ["High-Stress Corporate Roles", "Frequent Anger Outbursts", "Burnout & Fatigue", "Panic Tendencies"]
  }
];

export const COURSE_PROGRAMS: CourseProgram[] = [
  {
    id: "diploma-art-therapy",
    title: "Diploma in Expressive Art Therapy",
    level: "Diploma",
    duration: "6 Months (Weekend Hybrid)",
    format: "Hybrid (Online + Practicum)",
    fee: "₹38,000 (Installments Available)",
    badge: "Flagship Program",
    image: "https://images.unsplash.com/photo-1460661419200-1865a1df14c4?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Comprehensive professional certification in applying creative art modalities for emotional healing and therapeutic practice.",
    overview: "This intensive diploma prepares psychologists, educators, social workers, and creative individuals to become qualified Art Therapy Practitioners. Designed and personally mentored by Dr. Asha, you will study therapeutic theory, clinical ethics, symbolism, mandala therapy, clay work, and complete live supervised practicum hours.",
    curriculum: [
      {
        moduleNumber: 1,
        title: "Foundations of Art Therapy & Neuro-aesthetics",
        topics: ["History of expressive therapies", "Brain biology & emotional processing through art", "Art materials & psychological safety"]
      },
      {
        moduleNumber: 2,
        title: "Symbolism, Colors & Projective Techniques",
        topics: ["Jungian archetypes and mandala therapy", "Color psychology and somatic associations", "Spontaneous visual expression vs technical art"]
      },
      {
        moduleNumber: 3,
        title: "Clinical Applications & Population Modalities",
        topics: ["Art therapy for anxiety & trauma", "Pediatric & adolescent art interventions", "Geriatric & palliative expressive care"]
      },
      {
        moduleNumber: 4,
        title: "Supervised Case Work & Professional Ethics",
        topics: ["Ethical boundaries & confidentiality", "Documenting client art assessments", "Final capstone project & peer reviews"]
      }
    ],
    certificationBy: "Asha The Hope Academy of Holistic Healing",
    eligibility: "Graduates, Psychologists, Teachers, Counselors, or passionate individuals with interest in creative healing.",
    nextBatchDate: "Starting 1st of Next Month"
  },
  {
    id: "doctorate-holistic-healing",
    title: "Hybrid Professional Doctorate in Holistic Healing & Alternative Therapy",
    level: "Doctorate",
    duration: "18 - 24 Months",
    format: "Hybrid (Online + Practicum)",
    fee: "₹1,20,000 (Scholarship / Grants Available)",
    badge: "Advanced Academic Track",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Prestigious doctoral program for seasoned practitioners seeking mastery in integrative alternative health & mind-body medicine.",
    overview: "A rigorous professional doctorate structured for experienced therapists, healers, and health professionals. Culminates in original research, clinical case studies, and advanced integration of eastern therapies with modern psychological science.",
    curriculum: [
      {
        moduleNumber: 1,
        title: "Philosophy & Epistemology of Integrative Medicine",
        topics: ["Ancient eastern healing paradigms", "Energy medicine & psychoneuroimmunology", "Evidence-based complementary practices"]
      },
      {
        moduleNumber: 2,
        title: "Advanced Modalities in Psychosomatic Recovery",
        topics: ["Somatic experiencing & somatic memory", "Vibrational and sound therapy protocols", "Nutritional psychiatry & circadian rhythm healing"]
      },
      {
        moduleNumber: 3,
        title: "Doctoral Dissertation & Supervised Clinical Trials",
        topics: ["Research methodology & statistical analysis", "Thesis formulation & defense", "Peer-reviewed journal publishing mentorship"]
      }
    ],
    certificationBy: "International Accredited Council for Holistic & Alternative Medicine & Asha The Hope",
    eligibility: "Master's Degree or equivalent professional experience in psychology, counseling, medicine, or alternative therapy.",
    nextBatchDate: "Admissions Open for Current Quarter"
  },
  {
    id: "child-psychology-cert",
    title: "Certificate in Child Psychology & Guidance Counseling",
    level: "Certification",
    duration: "3 Months (Live Virtual)",
    format: "Online Live Classes",
    fee: "₹18,500",
    badge: "High Demand",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Equip yourself with practical counseling skills to support children navigating emotional, academic, and behavioral hurdles.",
    overview: "Ideal for teachers, parents, school counselors, and pediatric caregivers. Learn developmental milestones, play therapy basics, identifying learning differences, and building emotional resilience in kids.",
    curriculum: [
      {
        moduleNumber: 1,
        title: "Child Developmental Stages & Cognitive Milestones",
        topics: ["Early childhood attachment theory", "Piaget & Erikson stages in modern contexts", "Emotional regulation in toddlers and young children"]
      },
      {
        moduleNumber: 2,
        title: "Identifying Behavioral & Neurodevelopmental Challenges",
        topics: ["Screening for ADHD, dyslexia, and sensory issues", "Handling school phobia and separation anxiety", "Bullying prevention and cyber safety"]
      },
      {
        moduleNumber: 3,
        title: "Expressive Counseling Techniques for Kids",
        topics: ["Storytelling and bibliotherapy", "Sand tray and puppet play therapy", "Parent counseling & school liaison protocols"]
      }
    ],
    certificationBy: "Asha The Hope Behavioral Institute",
    eligibility: "Open to all enthusiastic educators, parents, and psychology students.",
    nextBatchDate: "Weekend Batches (Sat & Sun)"
  },
  {
    id: "graphology-practitioner",
    title: "Certified Graphology & Handwriting Therapy Masterclass",
    level: "Certification",
    duration: "6 Weeks",
    format: "Online Live Classes",
    fee: "₹14,000",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Decode personality traits, hidden anxieties, and reprogram subconscious patterns through scientific handwriting analysis.",
    overview: "Master the science and art of Graphology. Discover how margins, slant, baseline, pressure, and letter formations unveil an individual's subconscious mind, and how Graphotherapy changes behavioral habits.",
    curriculum: [
      {
        moduleNumber: 1,
        title: "Fundamentals of Handwriting Anatomy",
        topics: ["Zonal analysis (Upper, Middle, Lower)", "Slant, pressure, speed, and margin psychology", "Spacing and emotional boundaries"]
      },
      {
        moduleNumber: 2,
        title: "Individual Letter Symbolism & Signature Analysis",
        topics: ["The psychology of 't'-bars and 'i'-dots", "Analyzing public persona via signatures", "Spotting dishonesty, deceit, and low self-worth"]
      },
      {
        moduleNumber: 3,
        title: "Graphotherapy Formulations",
        topics: ["Targeted 30-day stroke correction drills", "Neuro-plastic rewiring through penmanship", "Clinical case studies"]
      }
    ],
    certificationBy: "Asha The Hope Academy",
    eligibility: "No prior experience required.",
    nextBatchDate: "Every 2nd Saturday"
  },
  {
    id: "author-self-publishing",
    title: "Certificate Course in Self-Publishing for Authors",
    level: "Executive Program",
    duration: "4 Weeks (Interactive Workshop)",
    format: "Weekend Intensive",
    fee: "₹9,500",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Learn how to write, format, copyright, and independently publish your inspiring healing book on global platforms.",
    overview: "Led by published author Dr. Asha. Master manuscript structuring, editing, cover aesthetics, ISBN procurement, Amazon Kindle Direct Publishing (KDP), and author branding for personal growth and therapy books.",
    curriculum: [
      {
        moduleNumber: 1,
        title: "Manuscript Crafting & Concept Clarification",
        topics: ["Structuring non-fiction & wellness guides", "Overcoming writer's block with creative therapy", "Drafting an impactful opening chapter"]
      },
      {
        moduleNumber: 2,
        title: "Publishing, Distribution & Royalties",
        topics: ["Amazon KDP, IngramSpark & Indian distributors", "Copyrights, ISBN, and legal considerations", "Launching your book and building readership"]
      }
    ],
    certificationBy: "Asha The Hope Publications",
    eligibility: "Aspiring writers, coaches, counselors, and creators.",
    nextBatchDate: "Next Batch Starts Soon"
  }
];

export const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: "event-parivarthana",
    title: "Parivarthana: Emotional Renewal Circle",
    subTitle: "A safe experiential sanctuary to release past baggage and step into self-sovereignty",
    date: "This Saturday",
    time: "4:00 PM – 6:30 PM",
    location: "Asha The Hope Center, Banashankari & Online Zoom",
    type: "Parivarthana",
    spotsLeft: 6,
    featured: true
  },
  {
    id: "event-art-detox",
    title: "Art Therapy Weekend Expressive Detox",
    subTitle: "Color, clay, and sound immersion for sensory relaxation and mental stillness",
    date: "Upcoming Sunday",
    time: "10:30 AM – 1:30 PM",
    location: "Studio Hall, Banashankari, Bengaluru",
    type: "Art Workshop",
    spotsLeft: 4,
    featured: true
  },
  {
    id: "event-chinthana",
    title: "Chinthana: Mindful Reflections & Book Circle",
    subTitle: "Exploring perspectives from 'Hustle Wisely' on living with balance and deep purpose",
    date: "Next Wednesday",
    time: "7:00 PM – 8:30 PM",
    location: "Virtual Webinar (Google Meet / Zoom)",
    type: "Chinthana",
    spotsLeft: 15
  },
  {
    id: "event-anveshana",
    title: "Anveshana: Career & Purpose Discovery",
    subTitle: "Psychological tools to clarify your ikigai, career shifts, and emotional calling",
    date: "Next Month 12th",
    time: "2:00 PM – 5:00 PM",
    location: "Banashankari Center, Bengaluru",
    type: "Anveshana",
    spotsLeft: 9
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Pooja Hegde",
    role: "Senior UX Designer, Bengaluru",
    quote: "Expressive Art Therapy with Dr. Asha changed my life. I walked in after 6 months of devastating corporate burnout. Painting without fear of judgment released something deeply pent-up. I felt lighter than I had in years.",
    rating: 5,
    type: "Therapy Client"
  },
  {
    id: "t2",
    name: "Karthik Subramanian",
    role: "Art Therapy Diploma Graduate",
    quote: "The 6-month Diploma course at Asha The Hope is world-class. Dr. Asha's personal mentorship, case supervision, and real practical workshops gave me the confidence to open my own expressive therapy practice.",
    rating: 5,
    type: "Diploma Graduate"
  },
  {
    id: "t3",
    name: "Dr. Shweta Rao",
    role: "School Counselor & Educator",
    quote: "The warmth, integrity, and clinical depth of Asha The Hope is unmatched in Bengaluru. The child psychology and graphology insights continue to help me guide dozens of students every week.",
    rating: 5,
    type: "Diploma Graduate"
  },
  {
    id: "t4",
    name: "Ananya & Rohan M.",
    role: "Couples Therapy Clients",
    quote: "We were on the brink of separation due to misunderstandings. Asha The Hope gave us a safe, neutral ground to speak without hostility. We rediscovered the friendship that brought us together.",
    rating: 5,
    type: "Therapy Client"
  }
];

export const WELLNESS_PROMPTS: WellnessPrompt[] = [
  {
    id: "p1",
    quote: "You don't have to carry every burden alone. Hope begins the moment you give yourself permission to be human.",
    author: "Dr. Asha",
    reflectionQuestion: "What is one emotional expectation you can gently release today?"
  },
  {
    id: "p2",
    quote: "Colors speak the language of feelings that words are too timid to utter.",
    author: "Asha The Hope Philosophy",
    reflectionQuestion: "If your mood today were a color, what would it be and why?"
  },
  {
    id: "p3",
    quote: "Healing is not the absence of storm, but the discovery of peace within the rain.",
    author: "Hustle Wisely Edition",
    reflectionQuestion: "Where in your body are you holding tension right now? Breathe into that space."
  }
];

export const EMERGENCY_HELPLINES = [
  {
    name: "Tele-MANAS (Govt of India)",
    number: "14416",
    tollFree: "1800 891 4416",
    available: "24x7 Free & Confidential",
    desc: "National tele-mental health programme of India offering psychological support in multiple Indian languages."
  },
  {
    name: "KIRAN Mental Health Helpline",
    number: "1800-599-0019",
    tollFree: "1800 599 0019",
    available: "24x7 All Days",
    desc: "Ministry of Social Justice 24x7 toll-free mental health rehabilitation hotline."
  },
  {
    name: "Vandrevala Foundation Helpline",
    number: "+91 9999 666 555",
    tollFree: "9999 666 555",
    available: "24x7 Free Crisis Counseling",
    desc: "Dedicated crisis counselors providing immediate intervention for panic, distress, and trauma."
  },
  {
    name: "Asha The Hope Urgent Support Line",
    number: "+91 86603 71460",
    tollFree: "+91 86603 71460",
    available: "Clinic Hours: 9:30 AM – 7:30 PM",
    desc: "Direct support and priority booking line for individuals needing consultation in Bengaluru or online."
  }
];

export const FAQ_ITEMS = [
  {
    q: "What makes Art Therapy at Asha The Hope unique?",
    a: "Art therapy requires zero artistic talent! It is an evidence-based clinical modality using paint, clay, and visual metaphor to access non-verbal emotions stored in the subconscious and nervous system. Dr. Asha provides a safe, guided space for profound catharsis."
  },
  {
    q: "Are online counseling sessions as effective as in-person visits?",
    a: "Yes! Our high-definition secure video sessions are designed with the same clinical rigor, empathy, and privacy protocols as visits to our Banashankari, Bengaluru clinic. You can join comfortably from anywhere in the world."
  },
  {
    q: "Who is eligible to enroll in the Diploma in Art Therapy?",
    a: "Anyone with an enthusiasm for healing and psychology—including graduates, teachers, doctors, life coaches, HR professionals, and aspiring therapists. No prior fine-arts degree is required."
  },
  {
    q: "How do I reach the Banashankari clinic in Bengaluru?",
    a: "We are located at #1698, 6th Cross Road, Banashankari Stage I, near Brahmachaithanya Mandira (close to Banashankari Metro & bus terminal). Convenient parking is available."
  }
];
