import {
  HospitalInfo,
  Doctor,
  Appointment,
  Prescription,
  LabTest,
  DietPlan,
  HospitalBill,
  BedItem,
  StaffMember,
  TriagePatient,
  MedicineStock,
  EquipmentStatus,
  GovernmentScheme
} from '../types';

export const MOCK_HOSPITALS: HospitalInfo[] = [
  {
    id: 'hosp-aiims',
    name: 'AIIMS New Delhi (Apex Institute)',
    location: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi',
    district: 'South Delhi',
    distanceKm: 3.2,
    totalBeds: 2478,
    availableBeds: 184,
    icuBedsAvailable: 14,
    totalIcuBeds: 220,
    oxygenStatus: 'Optimal',
    oxygenReservesHours: 72,
    emergencyStatus: 'Accepting',
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Trauma & Emergency', 'Organ Transplant', 'Pediatrics'],
    rating: 4.9,
    phone: '+91 11 2658 8500',
    traumaLevel: 'Level 1',
    avgOpdWaitTimeMin: 35,
    coordinates: { x: 38, y: 44, lat: 28.5672, lng: 77.2100 }
  },
  {
    id: 'hosp-safdarjung',
    name: 'Vardhman Mahavir Medical College & Safdarjung Hospital',
    location: 'Ring Road, Opposite AIIMS, New Delhi',
    district: 'South Delhi',
    distanceKm: 3.6,
    totalBeds: 1530,
    availableBeds: 112,
    icuBedsAvailable: 9,
    totalIcuBeds: 140,
    oxygenStatus: 'Optimal',
    oxygenReservesHours: 64,
    emergencyStatus: 'Accepting',
    specialties: ['Burns & Plastic Surgery', 'Orthopedics', 'General Surgery', 'Pulmonology', 'Pediatric ICU'],
    rating: 4.7,
    phone: '+91 11 2616 5060',
    traumaLevel: 'Level 1',
    avgOpdWaitTimeMin: 40,
    coordinates: { x: 42, y: 46, lat: 28.5701, lng: 77.2072 }
  },
  {
    id: 'hosp-apollo',
    name: 'Indraprastha Apollo Hospitals',
    location: 'Delhi-Mathura Road, Sarita Vihar, New Delhi',
    district: 'South East Delhi',
    distanceKm: 8.4,
    totalBeds: 710,
    availableBeds: 82,
    icuBedsAvailable: 18,
    totalIcuBeds: 90,
    oxygenStatus: 'Optimal',
    oxygenReservesHours: 96,
    emergencyStatus: 'Accepting',
    specialties: ['Cardiology & Interventional Cath', 'Robotic Surgery', 'Nephrology & Renal', 'Gastroenterology'],
    rating: 4.8,
    phone: '+91 11 7179 1090',
    traumaLevel: 'Level 1',
    avgOpdWaitTimeMin: 15,
    coordinates: { x: 62, y: 68, lat: 28.5385, lng: 77.2842 }
  },
  {
    id: 'hosp-max',
    name: 'Max Super Speciality Hospital, Saket',
    location: '1, 2, Press Enclave Marg, Saket, New Delhi',
    district: 'South Delhi',
    distanceKm: 6.1,
    totalBeds: 530,
    availableBeds: 45,
    icuBedsAvailable: 6,
    totalIcuBeds: 70,
    oxygenStatus: 'Optimal',
    oxygenReservesHours: 58,
    emergencyStatus: 'High Load',
    specialties: ['Neurosciences', 'Cardiac Sciences', 'Cancer Care', 'Bariatric & Minimal Access'],
    rating: 4.8,
    phone: '+91 11 2651 5050',
    traumaLevel: 'Level 2',
    avgOpdWaitTimeMin: 20,
    coordinates: { x: 48, y: 72, lat: 28.5283, lng: 77.2124 }
  },
  {
    id: 'hosp-fortis',
    name: 'Fortis Escorts Heart Institute',
    location: 'Okhla Road, Sukhdev Vihar Metro, New Delhi',
    district: 'South Delhi',
    distanceKm: 7.0,
    totalBeds: 310,
    availableBeds: 28,
    icuBedsAvailable: 8,
    totalIcuBeds: 60,
    oxygenStatus: 'Optimal',
    oxygenReservesHours: 80,
    emergencyStatus: 'Accepting',
    specialties: ['Pediatric Cardiac Surgery', 'Electrophysiology', 'Vascular Surgery', 'Heart Failure Program'],
    rating: 4.9,
    phone: '+91 11 4713 5000',
    traumaLevel: 'Level 1',
    avgOpdWaitTimeMin: 18,
    coordinates: { x: 58, y: 56, lat: 28.5606, lng: 77.2731 }
  },
  {
    id: 'hosp-manipal',
    name: 'Manipal Hospital, Dwarka',
    location: 'Sector 6, Dwarka, New Delhi',
    district: 'South West Delhi',
    distanceKm: 14.2,
    totalBeds: 380,
    availableBeds: 54,
    icuBedsAvailable: 11,
    totalIcuBeds: 52,
    oxygenStatus: 'Optimal',
    oxygenReservesHours: 70,
    emergencyStatus: 'Accepting',
    specialties: ['Organ Transplant', 'Orthopedics & Joint Replacement', 'Critical Care', 'Internal Medicine'],
    rating: 4.7,
    phone: '+91 11 4967 4967',
    traumaLevel: 'Level 2',
    avgOpdWaitTimeMin: 22,
    coordinates: { x: 18, y: 58, lat: 28.5888, lng: 77.0658 }
  }
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Vikramaditya Sen',
    department: 'Cardiology',
    hospitalId: 'hosp-aiims',
    hospitalName: 'AIIMS New Delhi',
    qualification: 'MD, DM (Cardiology), FACC',
    experienceYears: 18,
    rating: 4.9,
    reviewsCount: 342,
    consultationFee: 0, // Free under National Health Grid
    isAvailableToday: true,
    opdTimings: '09:00 AM - 01:30 PM',
    availableSlots: ['09:30 AM', '10:15 AM', '11:00 AM', '12:15 PM'],
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Hindi', 'Bengali']
  },
  {
    id: 'doc-2',
    name: 'Dr. Suniti Narang',
    department: 'Neurology',
    hospitalId: 'hosp-max',
    hospitalName: 'Max Super Speciality Hospital, Saket',
    qualification: 'MBBS, MD, DNB (Neurology)',
    experienceYears: 14,
    rating: 4.8,
    reviewsCount: 219,
    consultationFee: 0,
    isAvailableToday: true,
    opdTimings: '10:00 AM - 03:00 PM',
    availableSlots: ['10:30 AM', '11:45 AM', '01:30 PM', '02:15 PM'],
    avatar: 'https://images.unsplash.com/photo-1594824813583-4a11222e0394?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Hindi', 'Punjabi']
  },
  {
    id: 'doc-3',
    name: 'Dr. Rajesh K. Bansal',
    department: 'Orthopedics',
    hospitalId: 'hosp-safdarjung',
    hospitalName: 'Safdarjung Hospital',
    qualification: 'MS (Ortho), M.Ch (Joint Reconstruction)',
    experienceYears: 22,
    rating: 4.7,
    reviewsCount: 512,
    consultationFee: 0,
    isAvailableToday: true,
    opdTimings: '08:30 AM - 01:00 PM',
    availableSlots: ['09:00 AM', '10:00 AM', '11:30 AM', '12:30 PM'],
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Hindi']
  },
  {
    id: 'doc-4',
    name: 'Dr. Farhana Siddiqui',
    department: 'Pulmonology',
    hospitalId: 'hosp-apollo',
    hospitalName: 'Indraprastha Apollo Hospitals',
    qualification: 'MD (Respiratory Med), FCCP',
    experienceYears: 12,
    rating: 4.9,
    reviewsCount: 184,
    consultationFee: 0,
    isAvailableToday: true,
    opdTimings: '11:00 AM - 04:30 PM',
    availableSlots: ['11:30 AM', '01:00 PM', '02:45 PM', '03:30 PM'],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Hindi', 'Urdu']
  },
  {
    id: 'doc-5',
    name: 'Dr. Alok Verma',
    department: 'General Medicine',
    hospitalId: 'hosp-aiims',
    hospitalName: 'AIIMS New Delhi',
    qualification: 'MBBS, MD (Internal Medicine)',
    experienceYears: 16,
    rating: 4.8,
    reviewsCount: 420,
    consultationFee: 0,
    isAvailableToday: true,
    opdTimings: '09:00 AM - 02:00 PM',
    availableSlots: ['09:45 AM', '11:15 AM', '12:45 PM', '01:30 PM'],
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Hindi']
  },
  {
    id: 'doc-6',
    name: 'Dr. Priyamvada Chawla',
    department: 'Oncology',
    hospitalId: 'hosp-fortis',
    hospitalName: 'Fortis Escorts Heart Institute',
    qualification: 'MD, DM (Medical Oncology)',
    experienceYears: 15,
    rating: 4.9,
    reviewsCount: 167,
    consultationFee: 0,
    isAvailableToday: true,
    opdTimings: '10:00 AM - 02:30 PM',
    availableSlots: ['10:45 AM', '12:00 PM', '01:15 PM'],
    avatar: 'https://images.unsplash.com/photo-1594824813583-4a11222e0394?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Hindi']
  }
];

export const MOCK_GOV_SCHEMES: GovernmentScheme[] = [
  {
    id: 'scheme-pmjay',
    name: 'Ayushman Bharat — Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    code: 'PM-JAY',
    type: 'Central',
    coverageLimit: '₹5,00,000 / family / year',
    beneficiariesCount: '55+ Crore Citizens',
    badge: '100% Cashless Coverage',
    description: 'World’s largest government-funded health assurance scheme providing secondary and tertiary care hospitalization across all empaneled public and private hospitals in India.',
    eligibleCriteria: [
      'Identified under SECC 2011 deprivation criteria & active RSBY cardholders',
      'Valid ABHA ID (Ayushman Bharat Health Account) linked with Aadhaar',
      'No cap on family size or age limit'
    ],
    keyBenefits: [
      'Cashless access to 1,949 medical packages & surgeries',
      'Pre-existing conditions covered from Day 1',
      'Pre & post hospitalization expenses covered (3 days pre, 15 days post)',
      'Direct benefit transfer with zero out-of-pocket payment'
    ],
    portalLink: 'https://pmjay.gov.in'
  },
  {
    id: 'scheme-cghs',
    name: 'Central Government Health Scheme (CGHS)',
    code: 'CGHS',
    type: 'Central',
    coverageLimit: 'Comprehensive Full Reimbursed / Cashless',
    beneficiariesCount: '42+ Lakh Beneficiaries',
    badge: 'Govt Servants & Pensioners',
    description: 'Provides holistic healthcare facilities for Central Government employees, pensioners, and their dependent family members across primary dispensaries and empaneled tertiary hospitals.',
    eligibleCriteria: [
      'Central Government Civil Employees paid from Civil Estimates',
      'Pensioners drawing pension from Central Civil Estimates',
      'Sitting and Ex-Members of Parliament, Supreme Court Judges'
    ],
    keyBenefits: [
      'OPD treatment and medicines issued from Wellness Centers',
      'Hospitalization at Empaneled Hospitals on cashless basis via Plastic Card',
      'Diagnostic tests reimbursement across certified labs'
    ],
    portalLink: 'https://cghs.nic.in'
  },
  {
    id: 'scheme-state',
    name: 'State Health Assurance Programs (e.g. MJPJAY / Arogyasri / CM Schemes)',
    code: 'STATE-HA',
    type: 'State',
    coverageLimit: 'Up to ₹5,00,000 / family',
    beneficiariesCount: '28+ State Jurisdictions',
    badge: 'State Grid Integrated',
    description: 'Supplemental state-level assurance programs co-funded by State Governments providing top-up treatment limits and localized tertiary procedures.',
    eligibleCriteria: [
      'Domicile ration card holders (Antyodaya & BPL categories)',
      'Registered under State Social Security Health Trusts'
    ],
    keyBenefits: [
      'Covers high-cost critical treatments including Dialysis & Oncology cycles',
      'Seamless interoperability across Inter-State Green Corridors',
      'Dedicated Arogyamitra hospital desk assistance'
    ],
    portalLink: 'https://abdm.gov.in'
  },
  {
    id: 'scheme-abdm',
    name: 'Ayushman Bharat Digital Mission (ABDM / ABHA)',
    code: 'ABDM-GRID',
    type: 'Digital Health',
    coverageLimit: 'Zero Cost Digital Health Infrastructure',
    beneficiariesCount: '65+ Crore ABHA Created',
    badge: 'Universal Health ID',
    description: 'Enables seamless digital health records exchange, unified doctor registry, interoperable lab reports, and automated token queueing across all hospitals in India.',
    eligibleCriteria: [
      'Any Indian citizen with Aadhaar or Mobile verification',
      '14-digit ABHA Number generated instantly'
    ],
    keyBenefits: [
      '1-Click Paperless OPD registration via Scan & Share QR',
      'Longitudinal health records history stored on decentralized locker',
      'Consent-based sharing with treating clinicians'
    ],
    portalLink: 'https://abdm.gov.in'
  }
];

export const MOCK_ACTIVE_PATIENT = {
  name: 'Rohan Sharma',
  age: 38,
  gender: 'Male',
  abhaId: '91-9482-1029-4821@abdm',
  abhaNumber: '91-9482-1029-4821',
  phone: '+91 98712 34567',
  bloodGroup: 'B+ Positive',
  address: 'H-42, Hauz Khas Enclave, New Delhi - 110016',
  currentGps: '28.5494° N, 77.2001° E (Hauz Khas, New Delhi)',
  emergencyContact: 'Pooja Sharma (Wife) - +91 98110 87654',
  pmjayCardNumber: 'AB-PMJAY-DEL-2024-884912',
  schemeEligibility: 'PM-JAY Verified (Active 100% Cashless)',
  activeConditions: ['Mild Essential Hypertension', 'Occasional Seasonal Asthma', 'Post-Op Knee Recovery'],
  allergies: ['Penicillin G', 'Sulfa Drugs', 'Dust Mites']
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    patientName: 'Rohan Sharma',
    patientAbhaId: '91-9482-1029-4821@abdm',
    doctorId: 'doc-1',
    doctorName: 'Dr. Vikramaditya Sen',
    department: 'Cardiology',
    hospitalId: 'hosp-aiims',
    hospitalName: 'AIIMS New Delhi',
    date: '2026-08-21',
    timeSlot: '10:15 AM',
    tokenNumber: 14,
    queuePosition: 3,
    estWaitTimeMin: 18,
    status: 'Confirmed',
    symptoms: 'Quarterly cardiac review & blood pressure calibration',
    type: 'In-Person'
  },
  {
    id: 'apt-102',
    patientName: 'Rohan Sharma',
    patientAbhaId: '91-9482-1029-4821@abdm',
    doctorId: 'doc-3',
    doctorName: 'Dr. Rajesh K. Bansal',
    department: 'Orthopedics',
    hospitalId: 'hosp-safdarjung',
    hospitalName: 'Safdarjung Hospital',
    date: '2026-08-25',
    timeSlot: '11:30 AM',
    tokenNumber: 28,
    queuePosition: 12,
    estWaitTimeMin: 45,
    status: 'Confirmed',
    symptoms: 'Follow-up physiotherapy evaluation for right knee',
    type: 'In-Person'
  }
];

export const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-2026-891',
    date: '14 Aug 2026',
    doctorName: 'Dr. Vikramaditya Sen',
    doctorSpecialty: 'Senior Consultant, Cardiology (AIIMS)',
    hospitalName: 'AIIMS New Delhi',
    diagnosis: 'Essential Stage-1 Hypertension (Controlled) with Sinus Rhythm',
    vitals: {
      bp: '128/82 mmHg',
      pulse: 74,
      spo2: 99,
      temp: '98.4 °F',
      weight: '73.5 kg'
    },
    medications: [
      {
        medicine: 'Telmisartan Tablets IP',
        dosage: '40 mg',
        frequency: '1-0-0 (Once daily after breakfast)',
        duration: '30 Days',
        instructions: 'Monitor blood pressure weekly; do not stop abruptly.'
      },
      {
        medicine: 'Rosuvastatin Calcium',
        dosage: '10 mg',
        frequency: '0-0-1 (Once daily at bedtime)',
        duration: '30 Days',
        instructions: 'Lipid control regimen. Avoid grapefruit juice.'
      },
      {
        medicine: 'Aspirin Gastro-resistant',
        dosage: '75 mg',
        frequency: '0-1-0 (Once daily post lunch)',
        duration: '30 Days',
        instructions: 'Take strictly after full meal.'
      }
    ],
    instructions: 'Maintain low-sodium DASH diet (< 2.5g salt/day). Walk 35 minutes briskly 5 days a week. Keep emergency SOS handy in SwasthyaOS.',
    followUpDate: '21 Aug 2026',
    digitalSignature: 'SHA256:e8f902ac79b8a1c3d4f8e0a129d892ba4'
  },
  {
    id: 'rx-2026-712',
    date: '28 Jul 2026',
    doctorName: 'Dr. Farhana Siddiqui',
    doctorSpecialty: 'Chief Pulmonologist (Apollo)',
    hospitalName: 'Indraprastha Apollo Hospitals',
    diagnosis: 'Seasonal Bronchospasm & Mild Allergic Rhinitis',
    vitals: {
      bp: '122/78 mmHg',
      pulse: 78,
      spo2: 98,
      temp: '98.6 °F',
      weight: '74.0 kg'
    },
    medications: [
      {
        medicine: 'Budecort Inhaler (Budesonide)',
        dosage: '200 mcg',
        frequency: '1-0-1 (2 puffs morning and night)',
        duration: '14 Days',
        instructions: 'Rinse mouth with water thoroughly after inhalation.'
      },
      {
        medicine: 'Montelukast + Levocetirizine',
        dosage: '10mg / 5mg',
        frequency: '0-0-1 (At night)',
        duration: '10 Days',
        instructions: 'May cause mild drowsiness.'
      }
    ],
    instructions: 'Avoid morning smog exposure. Use HEPA air filtration during high AQI days.',
    followUpDate: '15 Aug 2026',
    digitalSignature: 'SHA256:7f49c0d12e8b9a4c56e0123fab909876'
  }
];

export const MOCK_LAB_TESTS: LabTest[] = [
  {
    id: 'lab-901',
    testName: 'Complete Lipid Profile & Apolipoprotein A1/B',
    category: 'Biochemistry',
    date: '14 Aug 2026',
    doctorName: 'Dr. Vikramaditya Sen',
    hospitalName: 'AIIMS Central Diagnostic Lab',
    status: 'Ready',
    resultSummary: 'Cholesterol levels well controlled with current statin regimen. Normal triglycerides.',
    metrics: [
      { parameter: 'Total Cholesterol', value: '168', unit: 'mg/dL', referenceRange: '< 200', isAbnormal: false },
      { parameter: 'HDL (Good) Cholesterol', value: '52', unit: 'mg/dL', referenceRange: '> 40', isAbnormal: false },
      { parameter: 'LDL (Bad) Cholesterol', value: '94', unit: 'mg/dL', referenceRange: '< 100', isAbnormal: false },
      { parameter: 'Serum Triglycerides', value: '132', unit: 'mg/dL', referenceRange: '< 150', isAbnormal: false },
      { parameter: 'Total / HDL Ratio', value: '3.2', unit: 'ratio', referenceRange: '< 4.5', isAbnormal: false }
    ]
  },
  {
    id: 'lab-902',
    testName: 'Comprehensive Metabolic Panel & HbA1c Glycated Hemoglobin',
    category: 'Biochemistry',
    date: '14 Aug 2026',
    doctorName: 'Dr. Vikramaditya Sen',
    hospitalName: 'AIIMS Central Diagnostic Lab',
    status: 'Ready',
    resultSummary: 'HbA1c shows normal glycemic baseline (5.6%). Serum Creatinine and eGFR optimal.',
    metrics: [
      { parameter: 'HbA1c (Glycated Hb)', value: '5.6', unit: '%', referenceRange: '< 5.7', isAbnormal: false },
      { parameter: 'Fasting Blood Glucose', value: '92', unit: 'mg/dL', referenceRange: '70 - 99', isAbnormal: false },
      { parameter: 'Serum Creatinine', value: '0.94', unit: 'mg/dL', referenceRange: '0.7 - 1.2', isAbnormal: false },
      { parameter: 'Estimated GFR (eGFR)', value: '104', unit: 'mL/min/1.73m²', referenceRange: '> 90', isAbnormal: false },
      { parameter: 'Serum Potassium (K+)', value: '4.4', unit: 'mEq/L', referenceRange: '3.5 - 5.1', isAbnormal: false }
    ]
  },
  {
    id: 'lab-903',
    testName: '12-Lead Rest ECG & High-Resolution Transthoracic Echo',
    category: 'Cardiology',
    date: '12 Aug 2026',
    doctorName: 'Dr. Vikramaditya Sen',
    hospitalName: 'AIIMS Cardiac Diagnostic Wing',
    status: 'Ready',
    resultSummary: 'Normal Sinus Rhythm. Left Ventricular Ejection Fraction (LVEF) 62%. No wall motion abnormality.',
    metrics: [
      { parameter: 'Heart Rate at Rest', value: '72', unit: 'BPM', referenceRange: '60 - 100', isAbnormal: false },
      { parameter: 'PR Interval', value: '158', unit: 'ms', referenceRange: '120 - 200', isAbnormal: false },
      { parameter: 'QRS Duration', value: '88', unit: 'ms', referenceRange: '70 - 110', isAbnormal: false },
      { parameter: 'LVEF (Ejection Fraction)', value: '62', unit: '%', referenceRange: '55 - 70', isAbnormal: false }
    ]
  }
];

export const MOCK_DIET_PLAN: DietPlan = {
  title: 'AI Cardio-Metabolic & Anti-Inflammatory Recovery Diet',
  conditionTargeted: 'Hypertension Management + Post-Knee Recovery + Lipid Optimization',
  targetCalories: 2050,
  macros: {
    protein: 95,
    carbs: 240,
    fats: 48,
    fiber: 38
  },
  recommendations: [
    'Strictly limit sodium to under 2,000 mg/day (use rock salt or lemon zest for seasoning).',
    'Include 2 servings of potassium-rich foods daily (Coconut water, Spinach, Bananas).',
    'Stay hydrated with 3.2 Litres of structured water consumption spread evenly.',
    'Incorporate anti-inflammatory curcumin + black pepper milk or herbal infusion.'
  ],
  restrictions: [
    'Zero processed meats, packaged namkeens, or high-sodium papads.',
    'Avoid deep-fried foods and trans-fat baked goods.',
    'Refined sugar limit: < 15g per day.'
  ],
  dailySchedule: [
    {
      meal: 'Early Morning Detox (07:00 AM)',
      time: '07:00 AM',
      items: ['Warm water with soaked chia seeds & crushed ginger', '5 Soaked Almonds + 2 Walnut Halves'],
      calories: 140
    },
    {
      meal: 'Cardio-Protective Breakfast (08:30 AM)',
      time: '08:30 AM',
      items: ['Steel-cut oats porridge with unsweetened almond milk, berries & flaxseed powder', '1 Boiled Egg / Steamed Sprout Salad bowl'],
      calories: 420
    },
    {
      meal: 'Mid-Morning Revitalizer (11:15 AM)',
      time: '11:15 AM',
      items: ['Fresh tender coconut water', '1 Small seasonal guava or apple'],
      calories: 110
    },
    {
      meal: 'Balanced Mediterranean-Indian Lunch (01:30 PM)',
      time: '01:30 PM',
      items: ['2 Multigrain Rotis (Jowar + Wheat)', '1 Bowl Yellow Moong Dal (Tadka with Cumin/Garlic)', '1 Cup Steamed Seasonal Veggies (Methi/Beans)', 'Cucumber-Mint Curd bowl (low fat)'],
      calories: 620
    },
    {
      meal: 'Evening Fuel (05:00 PM)',
      time: '05:00 PM',
      items: ['Roasted Makhana (Foxnuts) with mild turmeric seasoning', 'Green tea with lemon'],
      calories: 160
    },
    {
      meal: 'Light Healing Dinner (08:00 PM)',
      time: '08:00 PM',
      items: ['Grilled Paneer / Tofu with sauteed broccoli, bell peppers & quinoa', 'Warm Vegetable Clear Soup with crushed black pepper'],
      calories: 510
    },
    {
      meal: 'Pre-Sleep Recovery (09:45 PM)',
      time: '09:45 PM',
      items: ['Warm golden turmeric-cinnamon infusion'],
      calories: 90
    }
  ]
};

export const MOCK_BILLS: HospitalBill[] = [
  {
    id: 'bill-8841',
    billNumber: 'DEL-AIIMS-2026-8841',
    date: '14 Aug 2026',
    hospitalName: 'AIIMS New Delhi',
    patientAbhaId: '91-9482-1029-4821@abdm',
    items: [
      { description: 'OPD Super-Specialist Cardiac Consultation', category: 'Consultation', amount: 800 },
      { description: 'Complete Lipid Profile & Apolipoprotein', category: 'Pathology', amount: 1450 },
      { description: '12-Lead Rest ECG & Color Doppler Echo', category: 'Cardiology Diagnostics', amount: 3200 },
      { description: 'Biochemistry Panel (HbA1c, eGFR, LFT)', category: 'Pathology', amount: 1850 },
      { description: 'Pharmacy Dispensary Formulations (30 Days)', category: 'Pharmacy', amount: 1680 }
    ],
    totalAmount: 8980,
    pmjaySubsidy: 8980,
    patientPayable: 0,
    paymentStatus: 'Covered by PM-JAY (100%)',
    schemeName: 'Ayushman Bharat PM-JAY Package #CARD-0491'
  },
  {
    id: 'bill-7712',
    billNumber: 'DEL-APOLLO-2026-7712',
    date: '28 Jul 2026',
    hospitalName: 'Indraprastha Apollo Hospitals',
    patientAbhaId: '91-9482-1029-4821@abdm',
    items: [
      { description: 'Pulmonology Outpatient Diagnostic Evaluation', category: 'Consultation', amount: 1500 },
      { description: 'Digital Spirometry with Pre/Post Bronchodilator', category: 'Diagnostics', amount: 2800 },
      { description: 'High-Resolution Chest X-Ray Digital', category: 'Radiology', amount: 1200 }
    ],
    totalAmount: 5500,
    pmjaySubsidy: 5500,
    patientPayable: 0,
    paymentStatus: 'Covered by PM-JAY (100%)',
    schemeName: 'Ayushman Bharat PM-JAY Package #PULM-0182'
  }
];

export const INITIAL_BEDS: BedItem[] = [
  // ICU Wards
  { id: 'b-icu-1', bedNumber: 'ICU-A1', wardType: 'ICU', wardNumber: 'Cardiac ICU Block 3', status: 'Occupied', currentPatient: { name: 'Manish Tyagi', abhaId: '91-8821-4912-1011@abdm', admittedDate: '19 Aug 2026', attendingDoctor: 'Dr. Vikramaditya Sen', diagnosis: 'Acute Coronary Syndrome Post-Angioplasty' } },
  { id: 'b-icu-2', bedNumber: 'ICU-A2', wardType: 'ICU', wardNumber: 'Cardiac ICU Block 3', status: 'Occupied', currentPatient: { name: 'Sunil Mathur', abhaId: '91-4491-8841-0021@abdm', admittedDate: '18 Aug 2026', attendingDoctor: 'Dr. Sen', diagnosis: 'Refractory Cardiogenic Pulmonary Edema' } },
  { id: 'b-icu-3', bedNumber: 'ICU-A3', wardType: 'ICU', wardNumber: 'Cardiac ICU Block 3', status: 'Available' },
  { id: 'b-icu-4', bedNumber: 'ICU-A4', wardType: 'ICU', wardNumber: 'Trauma ICU Block 1', status: 'Reserved Emergency' },
  { id: 'b-icu-5', bedNumber: 'ICU-A5', wardType: 'ICU', wardNumber: 'Trauma ICU Block 1', status: 'Under Sanitation' },
  { id: 'b-icu-6', bedNumber: 'ICU-A6', wardType: 'ICU', wardNumber: 'Neuro ICU Block 2', status: 'Available' },
  
  // HDU Wards
  { id: 'b-hdu-1', bedNumber: 'HDU-B1', wardType: 'HDU', wardNumber: 'Step-Down HDU Wing', status: 'Occupied', currentPatient: { name: 'Kavita Rao', abhaId: '91-3321-9988-4411@abdm', admittedDate: '17 Aug 2026', attendingDoctor: 'Dr. Bansal', diagnosis: 'Post-Op Bilateral Knee Replacement' } },
  { id: 'b-hdu-2', bedNumber: 'HDU-B2', wardType: 'HDU', wardNumber: 'Step-Down HDU Wing', status: 'Available' },
  { id: 'b-hdu-3', bedNumber: 'HDU-B3', wardType: 'HDU', wardNumber: 'Step-Down HDU Wing', status: 'Occupied', currentPatient: { name: 'Deepak Joshi', abhaId: '91-1122-3344-5566@abdm', admittedDate: '19 Aug 2026', attendingDoctor: 'Dr. Verma', diagnosis: 'Severe Dengue with Thrombocytopenia' } },
  { id: 'b-hdu-4', bedNumber: 'HDU-B4', wardType: 'HDU', wardNumber: 'Step-Down HDU Wing', status: 'Available' },
  { id: 'b-hdu-5', bedNumber: 'HDU-B5', wardType: 'HDU', wardNumber: 'Step-Down HDU Wing', status: 'Under Sanitation' },

  // General Wards
  { id: 'b-gen-1', bedNumber: 'GEN-C101', wardType: 'General', wardNumber: 'Male Medical Ward 4', status: 'Occupied', currentPatient: { name: 'Gopal Krishnan', abhaId: '91-9988-7766-5544@abdm', admittedDate: '16 Aug 2026', attendingDoctor: 'Dr. Verma', diagnosis: 'Type 2 Diabetes Mellitus with Foot Ulcer' } },
  { id: 'b-gen-2', bedNumber: 'GEN-C102', wardType: 'General', wardNumber: 'Male Medical Ward 4', status: 'Available' },
  { id: 'b-gen-3', bedNumber: 'GEN-C103', wardType: 'General', wardNumber: 'Male Medical Ward 4', status: 'Available' },
  { id: 'b-gen-4', bedNumber: 'GEN-C104', wardType: 'General', wardNumber: 'Female Medical Ward 5', status: 'Occupied', currentPatient: { name: 'Asha Rani', abhaId: '91-7711-2233-4455@abdm', admittedDate: '19 Aug 2026', attendingDoctor: 'Dr. Farhana', diagnosis: 'Severe Bronchial Asthma Exacerbation' } },
  { id: 'b-gen-5', bedNumber: 'GEN-C105', wardType: 'General', wardNumber: 'Female Medical Ward 5', status: 'Available' },
  { id: 'b-gen-6', bedNumber: 'GEN-C106', wardType: 'General', wardNumber: 'Female Medical Ward 5', status: 'Under Sanitation' },

  // Private Wards
  { id: 'b-pvt-1', bedNumber: 'PVT-D201', wardType: 'Private', wardNumber: 'Super Deluxe Wing A', status: 'Occupied', currentPatient: { name: 'Virendra Oberoi', abhaId: '91-2233-4455-6677@abdm', admittedDate: '18 Aug 2026', attendingDoctor: 'Dr. Bansal', diagnosis: 'Spinal Disc Herniation L4-L5' } },
  { id: 'b-pvt-2', bedNumber: 'PVT-D202', wardType: 'Private', wardNumber: 'Super Deluxe Wing A', status: 'Available' },
  { id: 'b-pvt-3', bedNumber: 'PVT-D203', wardType: 'Private', wardNumber: 'Super Deluxe Wing B', status: 'Available' }
];

export const INITIAL_STAFF: StaffMember[] = [
  { id: 'st-1', name: 'Dr. Vikramaditya Sen', role: 'Senior Consultant', department: 'Cardiology', assignedWard: 'Cardiac ICU Block 3', currentShift: 'Morning (08:00 - 16:00)', status: 'On Duty', phone: '+91 98111 00101', experienceYears: 18 },
  { id: 'st-2', name: 'Dr. Ananya Roy', role: 'ICU Specialist', department: 'Critical Care', assignedWard: 'Trauma ICU Block 1', currentShift: 'Morning (08:00 - 16:00)', status: 'On Duty', phone: '+91 98111 00102', experienceYears: 11 },
  { id: 'st-3', name: 'Dr. Siddharth Mehrotra', role: 'Resident Medical Officer', department: 'Emergency Medicine', assignedWard: 'Triage & Trauma Bay', currentShift: 'Morning (08:00 - 16:00)', status: 'On Duty', phone: '+91 98111 00103', experienceYears: 6 },
  { id: 'st-4', name: 'Sister Mary Fernandez', role: 'Head Nurse', department: 'Nursing Admin', assignedWard: 'Cardiac ICU Block 3', currentShift: 'Morning (08:00 - 16:00)', status: 'On Duty', phone: '+91 98111 00104', experienceYears: 19 },
  { id: 'st-5', name: 'Staff Nurse Rohit Kulkarni', role: 'Staff Nurse', department: 'Nursing', assignedWard: 'Male Medical Ward 4', currentShift: 'Evening (16:00 - 00:00)', status: 'On Break', phone: '+91 98111 00105', experienceYears: 5 },
  { id: 'st-6', name: 'Dr. Gaurav Pathak', role: 'Triage Officer', department: 'Emergency Triage', assignedWard: 'Green Corridor Gate 1', currentShift: 'Morning (08:00 - 16:00)', status: 'Emergency Call', phone: '+91 98111 00106', experienceYears: 8 }
];

export const INITIAL_TRIAGE_PATIENTS: TriagePatient[] = [
  {
    id: 'tr-01',
    token: 'TRIAGE-RED-01',
    name: 'Suresh Bhatia',
    abhaId: '91-8833-2211-9900@abdm',
    age: 58,
    gender: 'M',
    arrivalTime: '14:48',
    chiefComplaint: 'Severe central crushing chest pain radiating to left jaw, diaphoresis & dyspnea',
    triageScore: 1,
    triageCategory: 'Immediate Critical (Red)',
    vitals: { hr: 118, bp: '82/50', spo2: 89, temp: 98.2, rr: 28 },
    recommendedAction: 'Immediate Trauma Bay',
    status: 'In Resuscitation'
  },
  {
    id: 'tr-02',
    token: 'TRIAGE-ORG-02',
    name: 'Meena Devi',
    abhaId: '91-7766-5544-3322@abdm',
    age: 64,
    gender: 'F',
    arrivalTime: '14:55',
    chiefComplaint: 'Acute sudden onset right-sided hemiparesis & slurred speech (Suspected Stroke < 2 hrs)',
    triageScore: 2,
    triageCategory: 'Emergency (Orange)',
    vitals: { hr: 88, bp: '184/105', spo2: 96, temp: 98.6, rr: 20 },
    recommendedAction: 'ICU Resuscitation',
    status: 'Waiting'
  },
  {
    id: 'tr-03',
    token: 'TRIAGE-YEL-03',
    name: 'Harpreet Singh',
    abhaId: '91-4433-2211-0099@abdm',
    age: 29,
    gender: 'M',
    arrivalTime: '15:02',
    chiefComplaint: 'Motorcycle collision with right femur compound deformity, bleeding controlled',
    triageScore: 3,
    triageCategory: 'Urgent (Yellow)',
    vitals: { hr: 94, bp: '124/78', spo2: 98, temp: 98.4, rr: 18 },
    recommendedAction: 'HDU Urgent Review',
    status: 'Waiting'
  },
  {
    id: 'tr-04',
    token: 'TRIAGE-GRN-04',
    name: 'Ananya Deshmukh',
    abhaId: '91-1199-2288-3377@abdm',
    age: 24,
    gender: 'F',
    arrivalTime: '15:10',
    chiefComplaint: 'High grade fever with body aches for 3 days, stable hemodynamics',
    triageScore: 4,
    triageCategory: 'Standard (Green)',
    vitals: { hr: 84, bp: '118/74', spo2: 99, temp: 101.8, rr: 16 },
    recommendedAction: 'OPD Fast Track',
    status: 'Waiting'
  }
];

export const MOCK_MEDICINE_STOCKS: MedicineStock[] = [
  { id: 'med-1', name: 'Injectable Adrenaline (Epinephrine 1:1000)', category: 'Emergency Resuscitation', currentStock: 480, minThreshold: 200, unit: 'Ampoules', status: 'Normal', dailyConsumptionAvg: 22, daysRemaining: 21, supplier: 'National Medical Supplies Corp' },
  { id: 'med-2', name: 'Human Regular Insulin (100 IU/ml)', category: 'Endocrine & Metabolic', currentStock: 140, minThreshold: 300, unit: 'Vials', status: 'Low Stock', dailyConsumptionAvg: 35, daysRemaining: 4, supplier: 'Bharat BioPharma Ltd' },
  { id: 'med-3', name: 'Noradrenaline Infusion (4mg/2ml)', category: 'ICU Inotropic Support', currentStock: 85, minThreshold: 250, unit: 'Ampoules', status: 'Critical Shortage', dailyConsumptionAvg: 28, daysRemaining: 3, supplier: 'Jan Aushadhi Central Depot' },
  { id: 'med-4', name: 'Enoxaparin Sodium (40mg/0.4ml Prefilled)', category: 'Anticoagulants', currentStock: 620, minThreshold: 200, unit: 'Syringes', status: 'Normal', dailyConsumptionAvg: 42, daysRemaining: 14, supplier: 'Zydus Lifesciences' },
  { id: 'med-5', name: 'Normal Saline 0.9% IV Infusion (500ml)', category: 'IV Fluids', currentStock: 3400, minThreshold: 1000, unit: 'Bottles', status: 'Normal', dailyConsumptionAvg: 180, daysRemaining: 18, supplier: 'Core Parenterals' },
  { id: 'med-6', name: 'Piperacillin + Tazobactam (4.5g Inj)', category: 'Broad Spectrum Antibiotic', currentStock: 210, minThreshold: 400, unit: 'Vials', status: 'Low Stock', dailyConsumptionAvg: 45, daysRemaining: 4, supplier: 'Cipla India Ltd' }
];

export const MOCK_EQUIPMENT_STATUS: EquipmentStatus[] = [
  { id: 'eq-1', name: '3.0 Tesla High-Field MRI Scanner', department: 'Radiology Wing B', status: 'Operational', queueLength: 4, avgScanTimeMin: 30, lastServiceDate: '02 Aug 2026', utilizationRatePct: 92 },
  { id: 'eq-2', name: '128-Slice Dual Source CT Scanner', department: 'Emergency Trauma Imaging', status: 'Operational', queueLength: 2, avgScanTimeMin: 12, lastServiceDate: '10 Aug 2026', utilizationRatePct: 96 },
  { id: 'eq-3', name: 'Bi-Plane Digital Cath Lab (Coronary)', department: 'Cardiology Block 1', status: 'Operational', queueLength: 3, avgScanTimeMin: 45, lastServiceDate: '15 Aug 2026', utilizationRatePct: 88 },
  { id: 'eq-4', name: 'Automated Real-Time Dialysis Unit #4', department: 'Nephrology Ward', status: 'In Maintenance', queueLength: 8, avgScanTimeMin: 240, lastServiceDate: '19 Aug 2026', utilizationRatePct: 40 },
  { id: 'eq-5', name: 'Digital Fluoroscopy & X-Ray Unit 2', department: 'Outpatient Radiology', status: 'Operational', queueLength: 5, avgScanTimeMin: 8, lastServiceDate: '08 Aug 2026', utilizationRatePct: 78 }
];

export const MOCK_OXYGEN_CONSUMPTION = [
  { time: '00:00', consumptionKl: 14.2, liquidStockKl: 88.4, pressureBar: 4.8 },
  { time: '04:00', consumptionKl: 12.8, liquidStockKl: 86.2, pressureBar: 4.8 },
  { time: '08:00', consumptionKl: 22.4, liquidStockKl: 82.5, pressureBar: 4.7 },
  { time: '12:00', consumptionKl: 28.6, liquidStockKl: 77.8, pressureBar: 4.6 },
  { time: '16:00', consumptionKl: 26.2, liquidStockKl: 73.4, pressureBar: 4.6 },
  { time: '20:00', consumptionKl: 21.0, liquidStockKl: 69.9, pressureBar: 4.7 },
  { time: 'Current', consumptionKl: 24.5, liquidStockKl: 66.8, pressureBar: 4.7 }
];

export const MOCK_PATIENT_VITALS_TIMELINE = [
  { time: '10 Aug', bpSystolic: 136, bpDiastolic: 88, hr: 78, spo2: 98, glucose: 104 },
  { time: '11 Aug', bpSystolic: 132, bpDiastolic: 86, hr: 76, spo2: 99, glucose: 98 },
  { time: '12 Aug', bpSystolic: 130, bpDiastolic: 84, hr: 74, spo2: 98, glucose: 96 },
  { time: '13 Aug', bpSystolic: 126, bpDiastolic: 82, hr: 72, spo2: 99, glucose: 94 },
  { time: '14 Aug', bpSystolic: 128, bpDiastolic: 82, hr: 74, spo2: 99, glucose: 92 },
  { time: 'Today', bpSystolic: 124, bpDiastolic: 80, hr: 72, spo2: 99, glucose: 90 }
];

export const MOCK_OPD_FLOW_TIMELINE = [
  { step: '1. Scan & Share Token Entry', durationMin: 3, status: 'Optimal', bottleneckRisk: 'Low' },
  { step: '2. Triage & Vitals Recording', durationMin: 6, status: 'Optimal', bottleneckRisk: 'Low' },
  { step: '3. OPD Doctor Consultation', durationMin: 15, status: 'Active Peak', bottleneckRisk: 'Medium' },
  { step: '4. Digital Lab Sample Collection', durationMin: 8, status: 'Optimal', bottleneckRisk: 'Low' },
  { step: '5. AI Fast-Track Report Ready', durationMin: 22, status: 'Optimized', bottleneckRisk: 'Low' },
  { step: '6. E-Prescription & Pharmacy Dispense', durationMin: 7, status: 'Optimal', bottleneckRisk: 'Low' }
];

export const MOCK_REGIONAL_NETWORK_STATS = {
  totalGridHospitals: 48,
  totalAvailableBeds: 1420,
  totalIcuBedsAvailable: 168,
  activeAmbulancesOnDuty: 84,
  avgEmergencyResponseMin: 7.8,
  totalPmjayPatientsTreatedToday: 12480,
  oxygenSufficiencyIndex: '99.4% (Optimal Grid)',
  activeGreenCorridors: 3
};
