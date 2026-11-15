export interface TreatmentItem {
  id: string;
  number: string;
  name: string;
  category: 'Cosmetic & Aligners' | 'Restorative & Implants' | 'General & Family';
  shortDescription: string;
  consultationOverview: string;
  comfortFocus: string;
  image: string;
  imageAlt: string;
  verifiedOffering: boolean;
}

export interface DentistProfile {
  /**
   * Set to true only after confirming the lead doctor's Baner branch association,
   * exact qualifications, and approved photograph with clinic management.
   */
  branchAssociationConfirmed: boolean;
  name: string;
  photo: string;
  qualifications: string;
  specialisation: string;
  experience: string;
  introduction: string;
  verificationNote: string;
}

export interface OpeningHourEntry {
  day: string;
  hours: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  isDemonstration: boolean;
  image: string;
  imageAlt: string;
}

export interface VerifiedReview {
  id: string;
  patientName: string;
  source: 'Google Maps' | 'Justdial' | 'Practo';
  rating?: number;
  reviewText: string;
  visitContext?: string;
}

export interface ReviewChannel {
  platform: 'Google Maps' | 'Justdial' | 'Practo' | 'Clinic Blog';
  title: string;
  description: string;
  url: string;
  actionLabel: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const IMAGES = {
  heroPortrait: '/src/assets/images/hero_indian_smile_clean_1794719470621.jpg',
  clinicInterior: '/src/assets/images/clinic_interior_clean_1794719472438.jpg',
  cosmeticSmile: '/src/assets/images/treatment_cosmetic_care_1794719450435.jpg',
  clinicalSuite: '/src/assets/images/treatment_clinical_suite_1794719451260.jpg',
  clearAligners: '/src/assets/images/treatment_aligners_clean_1794719472497.jpg',
  familyCare: '/src/assets/images/treatment_family_care_clean_1794719473699.jpg',
  restorativeCrowns: '/src/assets/images/treatment_restorative_clean_1794719487765.jpg',
  demoBefore: '/src/assets/images/smile_arch_before_clean_1794719471787.jpg',
  demoAfter: '/src/assets/images/smile_arch_after_matched_1794719487561.jpg',
} as const;

export const CLINIC_CONFIG = {
  businessName: 'The Smile Works Multispeciality Dental Clinic',
  shortWordmark: 'THE SMILE WORKS',
  branchLabel: 'Multispeciality Dental Clinic · Baner, Pune',
  phoneDisplay: '+91 89998 00571',
  phoneHref: 'tel:+918999800571',
  whatsappNumber: '918999800571',
  whatsappDefaultMessage:
    'Hello, I would like to book an appointment at The Smile Works Multispeciality Dental Clinic.',
  address: {
    line1: 'First Floor, 202, Tulip Tower, Above Circle of Crust',
    line2: 'Madhavbaug Society, Balewadi Phata, Baner',
    cityStatePin: 'Pune, Maharashtra 411069',
    full: 'First Floor, 202, Tulip Tower, Above Circle of Crust, Madhavbaug Society, Balewadi Phata, Baner, Pune, Maharashtra 411069',
  },
  links: {
    googleMaps: 'https://maps.app.goo.gl/kaDXWDnsEFdhzG7D8',
    googleMapsEmbed:
      'https://maps.google.com/maps?q=First%20Floor%2C%20202%2C%20Tulip%20Tower%2C%20Balewadi%20Phata%2C%20Baner%2C%20Pune%2C%20Maharashtra%20411069&t=&z=16&ie=UTF8&iwloc=&output=embed',
    justdial:
      'https://www.justdial.com/Pune/The-Smile-Works-Multispeciality-Dental-Clinic-Opposite-Naturals-Icecream-Ghole-Road/020PXX20-XX20-240702194642-M8Z4_BZDET/doctors',
    practo:
      'https://www.practo.com/pune/clinic/the-smile-works-multi-speciality-dental-clinic-jm-road/dentist-ps-8',
    blogspot: 'https://thesmileworksmultispecialitydental.blogspot.com/',
  },
  // Editable Baner branch hours — do not assume JM Road timings apply here.
  openingHours: {
    isConfirmedByClinic: false,
    note: 'Baner branch consultation hours are subject to doctor schedule. Please call +91 89998 00571 or message on WhatsApp to confirm your preferred slot before visiting.',
    schedule: [
      { day: 'Monday – Saturday', hours: 'By Appointment (Call to Confirm Timings)' },
      { day: 'Sunday', hours: 'Prior Appointment Only' },
    ] as OpeningHourEntry[],
  },
  // Editable Dentist Profile — update fields once Baner branch association & photo are confirmed.
  dentist: {
    branchAssociationConfirmed: false,
    name: 'Dr. Priyanka Jade Deshmukh',
    photo: '',
    qualifications: 'Editable — Confirm degree details with Baner clinic',
    specialisation: 'General, Preventive & Multispeciality Dental Care (Confirm at Baner branch)',
    experience: 'Editable — Confirm clinical tenure directly with clinic',
    introduction:
      'The Smile Works Multispeciality Dental Clinic in Baner delivers calm, attentive dental consultations tailored to each patient. Branch-specific clinician schedules, credentials, and visiting specialist rosters can be updated here once confirmed by clinic management.',
    verificationNote:
      'Public directory profiles reference Dr. Priyanka Jade Deshmukh across Pune practice listings; please call +91 89998 00571 to confirm consulting dentist availability at the Balewadi Phata, Baner branch.',
  } as DentistProfile,
  treatments: [
    {
      id: 'root-canal-treatment',
      number: '01',
      name: 'Root Canal Treatment',
      category: 'Restorative & Implants',
      shortDescription:
        'Targeted endodontic care designed to relieve tooth discomfort and preserve your natural tooth structure.',
      consultationOverview:
        'Includes clinical examination, diagnostic imaging review, and a clear explanation of steps to clean, seal, and protect the affected tooth.',
      comfortFocus: 'Local anaesthesia options and unhurried chairside pacing focused on patient comfort.',
      image: IMAGES.clinicalSuite,
      imageAlt: 'Calm modern dental operatory suite prepared for endodontic care',
      verifiedOffering: true,
    },
    {
      id: 'dental-implants',
      number: '02',
      name: 'Dental Implants',
      category: 'Restorative & Implants',
      shortDescription:
        'Stable, natural-looking tooth replacement consultations planned around your bite, bone health, and smile goals.',
      consultationOverview:
        'Evaluation of missing tooth spaces, gum health, and restoration timeline so you understand every stage before proceeding.',
      comfortFocus: 'Step-by-step treatment roadmap reviewed transparently with your clinician.',
      image: IMAGES.restorativeCrowns,
      imageAlt: 'Porcelain dental restoration models on warm travertine stone',
      verifiedOffering: true,
    },
    {
      id: 'teeth-whitening',
      number: '03',
      name: 'Teeth Whitening',
      category: 'Cosmetic & Aligners',
      shortDescription:
        'Dentist-supervised shade brightening that respects natural enamel sensitivity and balanced aesthetics.',
      consultationOverview:
        'Pre-whitening enamel check to ensure your teeth and gums are healthy before selecting an appropriate brightening protocol.',
      comfortFocus: 'Measured sensitivity management and realistic shade guidance.',
      image: IMAGES.cosmeticSmile,
      imageAlt: 'Smiling woman showcasing bright natural dental aesthetics',
      verifiedOffering: true,
    },
    {
      id: 'smile-makeover',
      number: '04',
      name: 'Smile Makeover',
      category: 'Cosmetic & Aligners',
      shortDescription:
        'Coordinated aesthetic planning harmonising tooth shape, proportion, and natural shade with your facial features.',
      consultationOverview:
        'A bespoke combination of conservative cosmetic options discussed together in plain language prior to any treatment.',
      comfortFocus: 'Collaborative preview of options with conservative enamel preservation in mind.',
      image: IMAGES.heroPortrait,
      imageAlt: 'Confident natural smile in soft architectural daylight',
      verifiedOffering: true,
    },
    {
      id: 'braces-orthodontics',
      number: '05',
      name: 'Braces & Orthodontics',
      category: 'Cosmetic & Aligners',
      shortDescription:
        'Structured bite alignment and spacing correction for teenagers and adults seeking long-term functional balance.',
      consultationOverview:
        'Assessment of crowding, spacing, and jaw alignment to recommend suitable fixed orthodontic options.',
      comfortFocus: 'Regular, predictable follow-up visits scheduled cleanly around school or work.',
      image: IMAGES.demoBefore,
      imageAlt: 'Dental arch model illustrating orthodontic alignment planning',
      verifiedOffering: true,
    },
    {
      id: 'invisalign-clear-aligners',
      number: '06',
      name: 'Invisalign / Clear Aligners',
      category: 'Cosmetic & Aligners',
      shortDescription:
        'Discreet, removable clear aligner trays tailored for comfortable everyday alignment with minimal visual impact.',
      consultationOverview:
        'Candidacy check, wear-schedule walkthrough, and realistic milestone planning during your Baner consultation.',
      comfortFocus: 'Smooth, removable trays suited for working professionals and students.',
      image: IMAGES.clearAligners,
      imageAlt: 'Transparent orthodontic clear aligners beside a brushed brass case',
      verifiedOffering: true,
    },
    {
      id: 'childrens-dentistry',
      number: '07',
      name: "Children's Dentistry",
      category: 'General & Family',
      shortDescription:
        'Gentle, reassuring dental check-ups and preventive habits crafted to help young patients feel at ease.',
      consultationOverview:
        'Age-appropriate examinations, cavity prevention guidance, and calm communication without rushing.',
      comfortFocus: 'Warm, patient introduction to dental visits for lifelong confidence.',
      image: IMAGES.familyCare,
      imageAlt: 'Smiling mother and child in a bright sunlit lounge',
      verifiedOffering: true,
    },
    {
      id: 'dental-crowns-bridges',
      number: '08',
      name: 'Dental Crowns & Bridges',
      category: 'Restorative & Implants',
      shortDescription:
        'Custom-fitted protective caps and fixed bridges crafted to restore chewing strength and natural tooth contours.',
      consultationOverview:
        'Discussion of tooth preparation, shade matching, and material choices suited to front or back teeth.',
      comfortFocus: 'Natural shade harmony and comfortable bite calibration.',
      image: IMAGES.restorativeCrowns,
      imageAlt: 'Precision ceramic dental crowns arranged on natural stone',
      verifiedOffering: true,
    },
    {
      id: 'dentures',
      number: '09',
      name: 'Dentures',
      category: 'Restorative & Implants',
      shortDescription:
        'Custom partial and complete dentures designed for natural facial support, speech clarity, and daily comfort.',
      consultationOverview:
        'Careful ridge and bite evaluation with follow-up adjustments to help dentures settle comfortably.',
      comfortFocus: 'Thoughtful fit refinements for senior patients and family caregivers.',
      image: IMAGES.clinicInterior,
      imageAlt: 'Welcoming dental consultation lounge with soft seating',
      verifiedOffering: true,
    },
    {
      id: 'full-mouth-rehabilitation',
      number: '10',
      name: 'Full Mouth Rehabilitation',
      category: 'Restorative & Implants',
      shortDescription:
        'Phased multidisciplinary restoration addressing worn, missing, or uneven bites with structured planning.',
      consultationOverview:
        'Comprehensive diagnostic assessment sequencing restorative, periodontal, and prosthodontic steps clearly.',
      comfortFocus: 'Manageable phased scheduling tailored to your comfort and clinical priorities.',
      image: IMAGES.clinicalSuite,
      imageAlt: 'Modern dental treatment room equipped for comprehensive care',
      verifiedOffering: true,
    },
    {
      id: 'laser-dentistry',
      number: '11',
      name: 'Laser Dentistry',
      category: 'General & Family',
      shortDescription:
        'Enquire during consultation regarding soft-tissue laser options for select gum and restorative procedures.',
      consultationOverview:
        'Your clinician will confirm suitability and procedure specifics based on your clinical needs at the Baner branch.',
      comfortFocus: 'Minimally invasive care planning explained clearly prior to treatment.',
      image: IMAGES.clinicalSuite,
      imageAlt: 'Spotless modern clinical suite for gentle dental care',
      verifiedOffering: false,
    },
    {
      id: 'general-dental-checkup',
      number: '12',
      name: 'General Dental Check-up',
      category: 'General & Family',
      shortDescription:
        'Thorough preventive examinations, oral hygiene guidance, and early detection to keep teeth and gums healthy.',
      consultationOverview:
        'Routine check-up covering teeth, gums, existing restorations, and personalised home-care recommendations.',
      comfortFocus: 'Clear, pressure-free explanations so you feel informed at every visit.',
      image: IMAGES.cosmeticSmile,
      imageAlt: 'Healthy natural smile supported by regular preventive dental check-ups',
      verifiedOffering: true,
    },
  ] as TreatmentItem[],
  whyChooseUs: [
    {
      index: '01',
      title: 'Patient-Centred Approach',
      description:
        'Every appointment begins with listening carefully to your concerns, comfort level, and expectations before recommending any procedure.',
    },
    {
      index: '02',
      title: 'Personalised Treatment Plans',
      description:
        'No rushed one-size-fits-all templates—care options and sequences are explained clearly so you can make informed decisions.',
    },
    {
      index: '03',
      title: 'Comprehensive Dental Services',
      description:
        'Preventive check-ups, restorative care, orthodontics, implants, and family dentistry coordinated under one roof in Baner.',
    },
    {
      index: '04',
      title: 'Focus on Comfort',
      description:
        'Thoughtful chairside pacing, calm communication, and a tranquil clinic setting designed to ease dental anxiety.',
    },
    {
      index: '05',
      title: 'Modern Dental Care',
      description:
        'Contemporary clinical protocols and hygienic practice standards maintained across consultations and procedures.',
    },
    {
      index: '06',
      title: 'Care for Every Smile',
      description:
        'Welcoming care for children, working professionals, and senior family members across Baner and Balewadi Phata.',
    },
  ],
  gallery: {
    beforeAfterDemo: {
      title: 'Orthodontic Spacing & Brightening Demonstration',
      subtitle: 'Illustrative Clinical Model — Representative Alignment Preview Only',
      beforeLabel: 'Before (Model)',
      afterLabel: 'After (Model)',
      beforeImage: IMAGES.demoBefore,
      afterImage: IMAGES.demoAfter,
      disclaimer:
        'This comparison uses studio dental arch models strictly for patient education. Individual clinical outcomes vary; authentic consented patient cases will replace demonstration visuals once supplied by the clinic.',
    },
    items: [
      {
        id: 'gal-1',
        title: 'Clinic Consultation Lounge',
        category: 'Clinic Environment',
        caption: 'Representative Clinic Aesthetic · Tulip Tower, Baner',
        isDemonstration: true,
        image: IMAGES.clinicInterior,
        imageAlt: 'Serene sunlit clinic reception and consultation interior',
      },
      {
        id: 'gal-2',
        title: 'Clinical Operatory Suite',
        category: 'Patient Comfort',
        caption: 'Representative Clinical Suite · Calm Treatment Setting',
        isDemonstration: true,
        image: IMAGES.clinicalSuite,
        imageAlt: 'Clean modern dental treatment suite with warm lighting',
      },
      {
        id: 'gal-3',
        title: 'Clear Aligner & Shade Planning',
        category: 'Orthodontic Demonstration',
        caption: 'Demonstration Illustration · Clear Aligner Concept',
        isDemonstration: true,
        image: IMAGES.clearAligners,
        imageAlt: 'Clear orthodontic aligners displayed on warm travertine surface',
      },
      {
        id: 'gal-4',
        title: 'Ceramic Restoration Craft',
        category: 'Restorative Demonstration',
        caption: 'Demonstration Illustration · Porcelain Crown Aesthetics',
        isDemonstration: true,
        image: IMAGES.restorativeCrowns,
        imageAlt: 'Porcelain dental crown models arranged on natural stone',
      },
    ] as GalleryItem[],
  },
  // Populate verifiedReviews only with authentic, attributable reviews from Google/Justdial/Practo.
  verifiedReviews: [] as VerifiedReview[],
  reviewChannels: [
    {
      platform: 'Google Maps',
      title: 'Baner Branch on Google Maps',
      description:
        'Read verified patient feedback, check directions to Tulip Tower at Balewadi Phata, and share your own visit experience.',
      url: 'https://maps.app.goo.gl/kaDXWDnsEFdhzG7D8',
      actionLabel: 'Open Google Maps',
    },
    {
      platform: 'Justdial',
      title: 'The Smile Works on Justdial',
      description:
        'Explore public clinic listings and practice overview information across Pune directories.',
      url: 'https://www.justdial.com/Pune/The-Smile-Works-Multispeciality-Dental-Clinic-Opposite-Naturals-Icecream-Ghole-Road/020PXX20-XX20-240702194642-M8Z4_BZDET/doctors',
      actionLabel: 'View Justdial Listing',
    },
    {
      platform: 'Practo',
      title: 'The Smile Works on Practo',
      description:
        'Reference The Smile Works Multi-Speciality Dental Clinic profile (note: Practo profile lists the JM Road branch; use Baner address above for Balewadi Phata visits).',
      url: 'https://www.practo.com/pune/clinic/the-smile-works-multi-speciality-dental-clinic-jm-road/dentist-ps-8',
      actionLabel: 'View Practo Profile',
    },
    {
      platform: 'Clinic Blog',
      title: 'Official Clinic Information Page',
      description:
        'Visit the clinic’s official web page referencing the Baner address at Tulip Tower and contact number +91 89998 00571.',
      url: 'https://thesmileworksmultispecialitydental.blogspot.com/',
      actionLabel: 'Visit Clinic Page',
    },
  ] as ReviewChannel[],
  faqs: [
    {
      id: 'faq-location',
      question: 'Where is The Smile Works Multispeciality Dental Clinic located in Baner?',
      answer:
        'We are located at First Floor, 202, Tulip Tower, Above Circle of Crust, Madhavbaug Society, Balewadi Phata, Baner, Pune, Maharashtra 411069. You can use the "Get Directions" button to open the exact Google Maps pin.',
    },
    {
      id: 'faq-booking',
      question: 'How do I confirm my appointment slot at the Baner clinic?',
      answer:
        'Submit your preferred treatment, date, and time using the appointment request form on this page, or message us directly on WhatsApp (+91 89998 00571). Our clinic desk confirms exact slot availability and doctor schedule before your visit.',
    },
    {
      id: 'faq-timings',
      question: 'What are the clinic consultation hours for the Baner branch?',
      answer:
        'Because specialist availability can vary between days, please call +91 89998 00571 or reach out via WhatsApp before walking in so we can reserve a comfortable, unhurried slot for you.',
    },
    {
      id: 'faq-first-visit',
      question: 'What happens during an initial dental consultation?',
      answer:
        'Your first visit focuses on listening to your goals or concerns, conducting a calm clinical examination, discussing findings clearly, and outlining suitable treatment options tailored to your comfort.',
    },
    {
      id: 'faq-family',
      question: 'Do you welcome children and senior family members?',
      answer:
        'Yes. As a multispeciality dental clinic, we plan gentle preventive and restorative appointments for children, adults, and older family members.',
    },
  ] as FaqItem[],
} as const;

export function buildWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage ?? CLINIC_CONFIG.whatsappDefaultMessage);
  return `https://wa.me/${CLINIC_CONFIG.whatsappNumber}?text=${text}`;
}
