export type UserRole = 'patient' | 'doctor' | 'admin' | 'superadmin';

export interface HospitalInfo {
  id: string;
  name: string;
  location: string;
  district: string;
  distanceKm: number;
  totalBeds: number;
  availableBeds: number;
  icuBedsAvailable: number;
  totalIcuBeds: number;
  oxygenStatus: 'Optimal' | 'Moderate' | 'Critical';
  oxygenReservesHours: number;
  emergencyStatus: 'Accepting' | 'On Diversion' | 'High Load';
  specialties: string[];
  rating: number;
  phone: string;
  traumaLevel: 'Level 1' | 'Level 2' | 'Level 3';
  avgOpdWaitTimeMin: number;
  coordinates: { x: number; y: number; lat: number; lng: number };
}

export interface Doctor {
  id: string;
  name: string;
  department: string;
  hospitalId: string;
  hospitalName: string;
  qualification: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  consultationFee: number;
  isAvailableToday: boolean;
  opdTimings: string;
  availableSlots: string[];
  avatar: string;
  languages: string[];
}

export interface Appointment {
  id: string;
  patientName: string;
  patientAbhaId: string;
  doctorId: string;
  doctorName: string;
  department: string;
  hospitalId: string;
  hospitalName: string;
  date: string;
  timeSlot: string;
  tokenNumber: number;
  queuePosition: number;
  estWaitTimeMin: number;
  status: 'Confirmed' | 'In Consultation' | 'Completed' | 'Cancelled';
  symptoms: string;
  type: 'In-Person' | 'Tele-Consultation';
}

export interface PrescriptionItem {
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  date: string;
  doctorName: string;
  doctorSpecialty: string;
  hospitalName: string;
  diagnosis: string;
  vitals: {
    bp: string;
    pulse: number;
    spo2: number;
    temp: string;
    weight: string;
  };
  medications: PrescriptionItem[];
  instructions: string;
  followUpDate?: string;
  digitalSignature: string;
}

export interface LabTest {
  id: string;
  testName: string;
  category: 'Hematology' | 'Biochemistry' | 'Radiology' | 'Cardiology' | 'Pathology';
  date: string;
  doctorName: string;
  hospitalName: string;
  status: 'Ready' | 'In-Progress' | 'Scheduled';
  resultSummary?: string;
  reportUrl?: string;
  metrics?: {
    parameter: string;
    value: string;
    unit: string;
    referenceRange: string;
    isAbnormal: boolean;
  }[];
}

export interface DietPlan {
  title: string;
  targetCalories: number;
  conditionTargeted: string;
  macros: {
    protein: number; // in grams
    carbs: number;
    fats: number;
    fiber: number;
  };
  recommendations: string[];
  restrictions: string[];
  dailySchedule: {
    meal: string;
    time: string;
    items: string[];
    calories: number;
  }[];
}

export interface AmbulanceRequest {
  id: string;
  patientName: string;
  patientAbhaId: string;
  contactNumber: string;
  pickupLocation: string;
  destinationHospital: HospitalInfo;
  status: 'Dispatched' | 'En Route' | 'Arrived' | 'Completed';
  ambulanceNumber: string;
  driverName: string;
  driverPhone: string;
  etaMinutes: number;
  distanceKm: number;
  ambulanceType: 'Advanced Life Support (ALS)' | 'Basic Life Support (BLS)';
  cost: number;
  schemeCoveredAmount: number;
  coordinates: { currentLat: number; currentLng: number };
  timestamp: string;
}

export interface HospitalBill {
  id: string;
  billNumber: string;
  date: string;
  hospitalName: string;
  patientAbhaId: string;
  items: {
    description: string;
    category: string;
    amount: number;
  }[];
  totalAmount: number;
  pmjaySubsidy: number;
  patientPayable: number;
  paymentStatus: 'Covered by PM-JAY (100%)' | 'Paid' | 'Pending';
  schemeName: string;
}

export interface BedItem {
  id: string;
  bedNumber: string;
  wardType: 'ICU' | 'HDU' | 'General' | 'Private';
  wardNumber: string;
  status: 'Available' | 'Occupied' | 'Under Sanitation' | 'Reserved Emergency';
  currentPatient?: {
    name: string;
    abhaId: string;
    admittedDate: string;
    attendingDoctor: string;
    diagnosis: string;
  };
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Senior Consultant' | 'Resident Medical Officer' | 'ICU Specialist' | 'Head Nurse' | 'Staff Nurse' | 'Triage Officer';
  department: string;
  assignedWard: string;
  currentShift: 'Morning (08:00 - 16:00)' | 'Evening (16:00 - 00:00)' | 'Night (00:00 - 08:00)';
  status: 'On Duty' | 'On Break' | 'Emergency Call';
  phone: string;
  experienceYears: number;
}

export interface TriagePatient {
  id: string;
  token: string;
  name: string;
  abhaId: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  arrivalTime: string;
  chiefComplaint: string;
  triageScore: 1 | 2 | 3 | 4 | 5; // ESI 1 (Resuscitation) to 5 (Non-urgent)
  triageCategory: 'Immediate Critical (Red)' | 'Emergency (Orange)' | 'Urgent (Yellow)' | 'Standard (Green)' | 'Non-Urgent (Blue)';
  vitals: {
    hr: number;
    bp: string;
    spo2: number;
    temp: number;
    rr: number;
  };
  recommendedAction: 'Immediate Trauma Bay' | 'ICU Resuscitation' | 'HDU Urgent Review' | 'OPD Fast Track' | 'Routine OPD';
  status: 'Waiting' | 'In Resuscitation' | 'Shifted to ICU' | 'Admitted to Ward';
}

export interface MedicineStock {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minThreshold: number;
  unit: string;
  status: 'Normal' | 'Low Stock' | 'Critical Shortage';
  dailyConsumptionAvg: number;
  daysRemaining: number;
  supplier: string;
}

export interface EquipmentStatus {
  id: string;
  name: string;
  department: string;
  status: 'Operational' | 'In Maintenance' | 'Overloaded';
  queueLength: number;
  avgScanTimeMin: number;
  lastServiceDate: string;
  utilizationRatePct: number;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  code: string;
  type: 'Central' | 'State' | 'Digital Health';
  coverageLimit: string;
  beneficiariesCount: string;
  description: string;
  eligibleCriteria: string[];
  keyBenefits: string[];
  portalLink: string;
  badge: string;
}
