import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserRole,
  HospitalInfo,
  Doctor,
  Appointment,
  Prescription,
  LabTest,
  DietPlan,
  AmbulanceRequest,
  HospitalBill,
  BedItem,
  StaffMember,
  TriagePatient,
  MedicineStock,
  EquipmentStatus,
  GovernmentScheme
} from '../types';
import {
  MOCK_HOSPITALS,
  MOCK_DOCTORS,
  MOCK_GOV_SCHEMES,
  MOCK_ACTIVE_PATIENT,
  INITIAL_APPOINTMENTS,
  MOCK_PRESCRIPTIONS,
  MOCK_LAB_TESTS,
  MOCK_DIET_PLAN,
  MOCK_BILLS,
  INITIAL_BEDS,
  INITIAL_STAFF,
  INITIAL_TRIAGE_PATIENTS,
  MOCK_MEDICINE_STOCKS,
  MOCK_EQUIPMENT_STATUS
} from '../data/mockData';
import { LanguageCode, TRANSLATIONS } from '../data/translations';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actionPayload?: {
    type: 'appointment_booked' | 'ambulance_dispatched' | 'view_prescriptions' | 'view_diet' | 'view_queue' | 'emergency_alert';
    data?: any;
  };
  quickReplies?: string[];
}

interface HealthGridContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isRoleSelected: boolean;
  setIsRoleSelected: (selected: boolean) => void;
  selectRole: (role: UserRole) => void;
  returnToRoleSelection: () => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  patient: typeof MOCK_ACTIVE_PATIENT;
  setPatientAbha: (abhaId: string) => void;
  hospitals: HospitalInfo[];
  doctors: Doctor[];
  schemes: GovernmentScheme[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  labTests: LabTest[];
  dietPlan: DietPlan;
  bills: HospitalBill[];
  ambulanceRequest: AmbulanceRequest | null;
  beds: BedItem[];
  staff: StaffMember[];
  triagePatients: TriagePatient[];
  medicineStocks: MedicineStock[];
  equipmentList: EquipmentStatus[];
  
  // Modals & UI controls
  schemesModalOpen: boolean;
  setSchemesModalOpen: (open: boolean) => void;
  hospitalsDrawerOpen: boolean;
  setHospitalsDrawerOpen: (open: boolean) => void;
  chatbotOpen: boolean;
  setChatbotOpen: (open: boolean) => void;
  emergencySosModalOpen: boolean;
  setEmergencySosModalOpen: (open: boolean) => void;
  emergencyBuzzerAlert: {
    active: boolean;
    title: string;
    message: string;
    patientId?: string;
    hospitalName?: string;
  };
  dismissBuzzerAlert: () => void;
  triggerBuzzerAlert: (title: string, message: string) => void;

  // Actions
  bookAppointment: (data: {
    doctorId: string;
    hospitalId: string;
    date: string;
    timeSlot: string;
    symptoms: string;
    type: 'In-Person' | 'Tele-Consultation';
  }) => Appointment;
  cancelAppointment: (id: string) => void;
  dispatchAmbulance: (pickupLocation?: string, preferredHospitalId?: string, reason?: string) => AmbulanceRequest;
  cancelAmbulance: () => void;
  addPrescription: (rx: Omit<Prescription, 'id' | 'digitalSignature'>) => void;
  bookLabTest: (testName: string, category: LabTest['category'], hospitalName: string) => void;
  updateBedStatus: (bedId: string, status: BedItem['status']) => void;
  updateStaffShift: (staffId: string, shift: StaffMember['currentShift'], ward: string) => void;
  prioritizeTriageQueue: () => void;
  addTriagePatient: (patient: Omit<TriagePatient, 'id' | 'token'>) => void;
  updateTriageStatus: (id: string, status: TriagePatient['status']) => void;
  restockMedicine: (medId: string, qty: number) => void;
  
  // Chatbot
  chatMessages: ChatMessage[];
  sendChatMessage: (messageText: string) => void;
  isAiTyping: boolean;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const HealthGridContext = createContext<HealthGridContextType | undefined>(undefined);

export const HealthGridProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('patient');
  const [isRoleSelected, setIsRoleSelected] = useState<boolean>(false);
  const [language, setLanguage] = useState<LanguageCode>('en');

  const selectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsRoleSelected(true);
  };

  const returnToRoleSelection = () => {
    setIsRoleSelected(false);
  };
  const [patient, setPatient] = useState(MOCK_ACTIVE_PATIENT);
  const [hospitals, setHospitals] = useState<HospitalInfo[]>(MOCK_HOSPITALS);
  const [doctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [schemes] = useState<GovernmentScheme[]>(MOCK_GOV_SCHEMES);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(MOCK_PRESCRIPTIONS);
  const [labTests, setLabTests] = useState<LabTest[]>(MOCK_LAB_TESTS);
  const [dietPlan] = useState<DietPlan>(MOCK_DIET_PLAN);
  const [bills] = useState<HospitalBill[]>(MOCK_BILLS);
  const [ambulanceRequest, setAmbulanceRequest] = useState<AmbulanceRequest | null>(null);
  const [beds, setBeds] = useState<BedItem[]>(INITIAL_BEDS);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [triagePatients, setTriagePatients] = useState<TriagePatient[]>(INITIAL_TRIAGE_PATIENTS);
  const [medicineStocks, setMedicineStocks] = useState<MedicineStock[]>(MOCK_MEDICINE_STOCKS);
  const [equipmentList, setEquipmentList] = useState<EquipmentStatus[]>(MOCK_EQUIPMENT_STATUS);

  // Translation helper
  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  const setPatientAbha = (newAbhaId: string) => {
    setPatient(prev => ({ ...prev, abhaId: newAbhaId }));
    showToast(`ABHA ID successfully updated to ${newAbhaId}`);
  };

  // Modals
  const [schemesModalOpen, setSchemesModalOpen] = useState(false);
  const [hospitalsDrawerOpen, setHospitalsDrawerOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [emergencySosModalOpen, setEmergencySosModalOpen] = useState(false);
  
  // Emergency Buzzer Alert State
  const [emergencyBuzzerAlert, setEmergencyBuzzerAlert] = useState({
    active: true,
    title: 'CRITICAL INCOMING: Code Red Trauma in Transit',
    message: 'ALS Ambulance #DL-01-AX-9942 carrying severe STEMI (Suresh Bhatia, 58M) arriving at AIIMS Emergency Trauma Bay in 4 minutes. Cath Lab notified.',
    hospitalName: 'AIIMS New Delhi'
  });

  // Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const dismissBuzzerAlert = () => {
    setEmergencyBuzzerAlert(prev => ({ ...prev, active: false }));
    showToast('Emergency Buzzer Alert acknowledged and silenced.');
  };

  const triggerBuzzerAlert = (title: string, message: string) => {
    setEmergencyBuzzerAlert({
      active: true,
      title,
      message,
      hospitalName: 'AIIMS New Delhi'
    });
  };

  // Ambulance ETA live countdown simulation
  useEffect(() => {
    if (!ambulanceRequest || ambulanceRequest.status === 'Arrived') return;

    const timer = setInterval(() => {
      setAmbulanceRequest(prev => {
        if (!prev) return null;
        if (prev.etaMinutes <= 1) {
          showToast(`🚨 Ambulance ${prev.ambulanceNumber} has ARRIVED at pickup point!`);
          return { ...prev, etaMinutes: 0, status: 'Arrived' };
        }
        return {
          ...prev,
          etaMinutes: prev.etaMinutes - 1,
          status: prev.etaMinutes <= 3 ? 'En Route' : 'Dispatched'
        };
      });
    }, 12000);

    return () => clearInterval(timer);
  }, [ambulanceRequest]);

  // Appointment Actions
  const bookAppointment = (data: {
    doctorId: string;
    hospitalId: string;
    date: string;
    timeSlot: string;
    symptoms: string;
    type: 'In-Person' | 'Tele-Consultation';
  }): Appointment => {
    const doc = doctors.find(d => d.id === data.doctorId) || doctors[0];
    const hosp = hospitals.find(h => h.id === data.hospitalId) || hospitals[0];
    const newId = `apt-${Date.now().toString().slice(-4)}`;
    const randomToken = Math.floor(Math.random() * 25) + 10;
    
    const newAppointment: Appointment = {
      id: newId,
      patientName: patient.name,
      patientAbhaId: patient.abhaId,
      doctorId: doc.id,
      doctorName: doc.name,
      department: doc.department,
      hospitalId: hosp.id,
      hospitalName: hosp.name,
      date: data.date,
      timeSlot: data.timeSlot,
      tokenNumber: randomToken,
      queuePosition: 4,
      estWaitTimeMin: 22,
      status: 'Confirmed',
      symptoms: data.symptoms || 'General Checkup',
      type: data.type
    };

    setAppointments(prev => [newAppointment, ...prev]);
    showToast(`✅ Token #${randomToken} confirmed with ${doc.name} at ${hosp.name}`);
    return newAppointment;
  };

  const cancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
    showToast('Appointment successfully cancelled.');
  };

  // Ambulance SOS Dispatch
  const dispatchAmbulance = (
    pickupLocation = patient.address,
    preferredHospitalId?: string,
    reason = 'Acute emergency assistance request'
  ): AmbulanceRequest => {
    // Select best available hospital with highest ICU/Emergency readiness
    let targetHospital = hospitals.find(h => h.id === preferredHospitalId);
    if (!targetHospital) {
      targetHospital = hospitals.filter(h => h.emergencyStatus === 'Accepting')
        .sort((a, b) => (b.icuBedsAvailable / b.totalIcuBeds) - (a.icuBedsAvailable / a.totalIcuBeds))[0] || hospitals[0];
    }

    const newReq: AmbulanceRequest = {
      id: `amb-${Date.now().toString().slice(-4)}`,
      patientName: patient.name,
      patientAbhaId: patient.abhaId,
      contactNumber: patient.phone,
      pickupLocation: pickupLocation,
      destinationHospital: targetHospital,
      status: 'Dispatched',
      ambulanceNumber: 'DL-01-AX-7724 (ALS Unit #12)',
      driverName: 'Sgt. Ramesh Chander (Certified Paramedic)',
      driverPhone: '+91 98711 00911',
      etaMinutes: 6,
      distanceKm: targetHospital.distanceKm,
      ambulanceType: 'Advanced Life Support (ALS)',
      cost: 3500,
      schemeCoveredAmount: 3500, // 100% covered under PM-JAY
      coordinates: { currentLat: 28.5520, currentLng: 77.2050 },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAmbulanceRequest(newReq);
    triggerBuzzerAlert(
      `🚨 EMERGENCY SOS: ALS Ambulance Dispatched`,
      `Unit ${newReq.ambulanceNumber} dispatched to ${pickupLocation}. Destination: ${targetHospital.name}. Reason: ${reason}.`
    );
    showToast(`🚨 ALS Ambulance #${newReq.ambulanceNumber} dispatched! ETA: 6 mins (100% Free under PM-JAY)`);
    return newReq;
  };

  const cancelAmbulance = () => {
    setAmbulanceRequest(null);
    showToast('Ambulance dispatch cancelled.');
  };

  // Doctor adds prescription
  const addPrescription = (rx: Omit<Prescription, 'id' | 'digitalSignature'>) => {
    const newRx: Prescription = {
      ...rx,
      id: `rx-${Date.now().toString().slice(-4)}`,
      digitalSignature: `SHA256:${Math.random().toString(36).substring(2, 15)}`
    };
    setPrescriptions(prev => [newRx, ...prev]);
    showToast(`📝 E-Prescription digitally signed & synced to patient ABHA`);
  };

  // Lab Test Booking
  const bookLabTest = (testName: string, category: LabTest['category'], hospitalName: string) => {
    const newTest: LabTest = {
      id: `lab-${Date.now().toString().slice(-4)}`,
      testName,
      category,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      doctorName: 'Dr. Vikramaditya Sen',
      hospitalName,
      status: 'Scheduled'
    };
    setLabTests(prev => [newTest, ...prev]);
    showToast(`🧪 Lab appointment for "${testName}" booked successfully.`);
  };

  // Bed matrix update
  const updateBedStatus = (bedId: string, status: BedItem['status']) => {
    setBeds(prev => prev.map(b => b.id === bedId ? { ...b, status } : b));
    showToast(`Bed #${bedId} updated to status: ${status}`);
  };

  // Staff shift update
  const updateStaffShift = (staffId: string, shift: StaffMember['currentShift'], ward: string) => {
    setStaff(prev => prev.map(s => s.id === staffId ? { ...s, currentShift: shift, assignedWard: ward } : s));
    showToast(`Staff shift updated successfully.`);
  };

  // Triage actions
  const prioritizeTriageQueue = () => {
    setTriagePatients(prev => [...prev].sort((a, b) => a.triageScore - b.triageScore));
    showToast(`⚡ AI Triage Engine re-prioritized emergency queue based on clinical acuity.`);
  };

  const addTriagePatient = (newPat: Omit<TriagePatient, 'id' | 'token'>) => {
    const colors = ['RED', 'ORG', 'YEL', 'GRN', 'BLU'];
    const colorTag = colors[newPat.triageScore - 1] || 'GRN';
    const item: TriagePatient = {
      ...newPat,
      id: `tr-${Date.now().toString().slice(-4)}`,
      token: `TRIAGE-${colorTag}-${Math.floor(Math.random() * 89 + 10)}`
    };
    setTriagePatients(prev => [item, ...prev].sort((a, b) => a.triageScore - b.triageScore));
    if (newPat.triageScore <= 2) {
      triggerBuzzerAlert(`🔴 CRITICAL TRIAGE ADMISSION: ${newPat.name}`, `${newPat.chiefComplaint} - Score ESI-${newPat.triageScore}`);
    }
    showToast(`Triage entry created: Token #${item.token}`);
  };

  const updateTriageStatus = (id: string, status: TriagePatient['status']) => {
    setTriagePatients(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    showToast(`Triage patient status updated to "${status}"`);
  };

  const restockMedicine = (medId: string, qty: number) => {
    setMedicineStocks(prev => prev.map(m => {
      if (m.id === medId) {
        const newStock = m.currentStock + qty;
        return {
          ...m,
          currentStock: newStock,
          status: newStock >= m.minThreshold ? 'Normal' : 'Low Stock',
          daysRemaining: Math.round(newStock / (m.dailyConsumptionAvg || 1))
        };
      }
      return m;
    }));
    showToast(`Restocked ${qty} units via Jan Aushadhi Central Depot.`);
  };

  // Chatbot State & Intelligent NLP parser
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Namaste Rohan! I am your 24/7 Nirnay AI Health Assistant on the National Health Grid. How can I assist you today?',
      timestamp: '14:50',
      quickReplies: [
        'Book Cardiologist Appointment',
        'Emergency SOS Ambulance',
        'Show my diet plan',
        'Where are my lab results?',
        'What is my OPD Token wait time?'
      ]
    }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const sendChatMessage = (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsAiTyping(true);

    const lower = trimmed.toLowerCase();

    setTimeout(() => {
      let botResponseText = '';
      let actionPayload: ChatMessage['actionPayload'] | undefined = undefined;
      let quickReplies: string[] = [];

      // 1. Emergency Crisis Triggers
      if (
        lower.includes('chest pain') ||
        lower.includes('heart attack') ||
        lower.includes('severe pain') ||
        lower.includes('urgent help') ||
        lower.includes('accident') ||
        lower.includes('sos') ||
        lower.includes('ambulance') ||
        lower.includes('emergency') ||
        lower.includes('cannot breathe')
      ) {
        const amb = dispatchAmbulance(
          patient.address,
          'hosp-aiims',
          'Immediate Nirnay AI Chatbot SOS dispatch: ' + trimmed
        );
        botResponseText = `🚨 EMERGENCY DISPATCH ACTIVATED!\n\nI have automatically dispatched ALS Ambulance #${amb.ambulanceNumber} from AIIMS New Delhi to your live GPS location (${patient.address}).\n\n• ETA: ~6 minutes\n• Paramedic: ${amb.driverName} (${amb.driverPhone})\n• Coverage: 100% Cashless under PM-JAY.\n\nPlease remain calm and keep your phone line open.`;
        actionPayload = { type: 'ambulance_dispatched', data: amb };
        quickReplies = ['Track Live Ambulance Map', 'Call Paramedic', 'Share Location with Family'];
      }
      // 2. Natural Language Appointment Booking
      else if (
        lower.includes('book') ||
        lower.includes('appointment') ||
        lower.includes('doctor') ||
        lower.includes('cardiologist') ||
        lower.includes('orthopedic') ||
        lower.includes('neurologist')
      ) {
        let chosenDoc = doctors[0];
        if (lower.includes('ortho')) chosenDoc = doctors[2];
        else if (lower.includes('neuro')) chosenDoc = doctors[1];
        else if (lower.includes('pulmo') || lower.includes('lung')) chosenDoc = doctors[3];
        else if (lower.includes('general')) chosenDoc = doctors[4];
        else if (lower.includes('oncol') || lower.includes('cancer')) chosenDoc = doctors[5];

        const newApt = bookAppointment({
          doctorId: chosenDoc.id,
          hospitalId: chosenDoc.hospitalId,
          date: '2026-08-22',
          timeSlot: '11:00 AM',
          symptoms: 'Scheduled via Nirnay AI Assistant',
          type: 'In-Person'
        });

        botResponseText = `✅ Appointment successfully confirmed!\n\n• Doctor: ${chosenDoc.name} (${chosenDoc.department})\n• Hospital: ${chosenDoc.hospitalName}\n• Date: 22 Aug 2026 at 11:00 AM\n• Token Number: #${newApt.tokenNumber} (Queue Pos: 4)\n• Cost: ₹0 (100% Covered under National Health Grid)\n\nI have added this to your Active Queue Tracker.`;
        actionPayload = { type: 'appointment_booked', data: newApt };
        quickReplies = ['View My Active Queue', 'Download Appointment Slip', 'Set Calendar Reminder'];
      }
      // 3. Diet Plan Query
      else if (lower.includes('diet') || lower.includes('food') || lower.includes('nutrition') || lower.includes('calorie') || lower.includes('meal')) {
        botResponseText = `🥗 Here is your AI-Tailored Nutrition Summary:\n\n• Target: ${dietPlan.targetCalories} kcal/day (${dietPlan.conditionTargeted})\n• Macros: ${dietPlan.macros.protein}g Protein | ${dietPlan.macros.carbs}g Carbs | ${dietPlan.macros.fats}g Fats\n• Next Scheduled Meal: ${dietPlan.dailySchedule[3].meal} (${dietPlan.dailySchedule[3].time}) - ${dietPlan.dailySchedule[3].items.join(', ')}\n• Key Restriction: Low sodium (<2,000mg/day), zero processed oils.`;
        actionPayload = { type: 'view_diet', data: dietPlan };
        quickReplies = ['View Full 7-Day Diet Plan', 'Ask Dietitian a Question', 'Log Today\'s Meal'];
      }
      // 4. Lab Reports & Prescriptions
      else if (lower.includes('lab') || lower.includes('report') || lower.includes('test') || lower.includes('prescription') || lower.includes('medicine') || lower.includes('rx')) {
        botResponseText = `📋 ABDM Health Locker Records Found:\n\n• ABHA ID: ${patient.abhaId}\n• Latest Prescription: Dr. Vikramaditya Sen (AIIMS) — Telmisartan 40mg, Rosuvastatin 10mg, Aspirin 75mg.\n• Lab Results: Lipid Profile & HbA1c (Normal - 5.6%) are verified and ready for download.\n• All files are digitally signed with ABDM Cryptographic Hash.`;
        actionPayload = { type: 'view_prescriptions', data: prescriptions };
        quickReplies = ['View Digital Prescriptions', 'Download PDF Lab Reports', 'Book New Blood Test'];
      }
      // 5. Token / Queue Tracking
      else if (lower.includes('token') || lower.includes('queue') || lower.includes('wait') || lower.includes('turn')) {
        const activeApt = appointments[0];
        botResponseText = `⏳ Active Queue Status:\n\n• Hospital: ${activeApt.hospitalName}\n• Doctor: ${activeApt.doctorName}\n• Your Token: #${activeApt.tokenNumber}\n• Current Serving: Token #${activeApt.tokenNumber - activeApt.queuePosition}\n• Estimated Wait: ~${activeApt.estWaitTimeMin} minutes\n\nYou will receive an SMS and buzzer chime when you are 2 tokens away.`;
        actionPayload = { type: 'view_queue', data: activeApt };
        quickReplies = ['Directions to Room 104', 'Reschedule Slot', 'Notify OPD Reception'];
      }
      // 6. Schemes & Bills
      else if (lower.includes('bill') || lower.includes('pmjay') || lower.includes('cghs') || lower.includes('scheme') || lower.includes('cost') || lower.includes('free')) {
        botResponseText = `💳 Billing & Coverage Status:\n\n• Active ABHA: ${patient.abhaId}\n• Scheme: Ayushman Bharat PM-JAY (Verified)\n• Annual Balance: ₹5,00,000 Family Coverage\n• Out-of-pocket Payable: ₹0.00 (100% Cashless Direct Benefit Transfer).`;
        quickReplies = ['View Itemized Bills', 'Check CGHS Status', 'Explore Govt Schemes'];
      }
      // Default general AI response
      else {
        botResponseText = `I understand your query regarding "${trimmed}". As your NirnayOS digital co-pilot, I can assist you with one-touch emergency SOS, booking doctor consultations across AIIMS/Apollo/Fortis, tracking live OPD tokens, retrieving digitally signed E-Prescriptions, and accessing PM-JAY cashless benefits.\n\nWhat would you like to do next?`;
        quickReplies = [
          'Book Cardiologist Appointment',
          'Track My Token Queue',
          'View Lab Results',
          'Emergency SOS Dispatch'
        ];
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionPayload,
        quickReplies
      };

      setChatMessages(prev => [...prev, botMsg]);
      setIsAiTyping(false);
    }, 600);
  };

  return (
    <HealthGridContext.Provider
      value={{
        role,
        setRole,
        isRoleSelected,
        setIsRoleSelected,
        selectRole,
        returnToRoleSelection,
        language,
        setLanguage,
        t,
        patient,
        setPatientAbha,
        hospitals,
        doctors,
        schemes,
        appointments,
        prescriptions,
        labTests,
        dietPlan,
        bills,
        ambulanceRequest,
        beds,
        staff,
        triagePatients,
        medicineStocks,
        equipmentList,
        schemesModalOpen,
        setSchemesModalOpen,
        hospitalsDrawerOpen,
        setHospitalsDrawerOpen,
        chatbotOpen,
        setChatbotOpen,
        emergencySosModalOpen,
        setEmergencySosModalOpen,
        emergencyBuzzerAlert,
        dismissBuzzerAlert,
        triggerBuzzerAlert,
        bookAppointment,
        cancelAppointment,
        dispatchAmbulance,
        cancelAmbulance,
        addPrescription,
        bookLabTest,
        updateBedStatus,
        updateStaffShift,
        prioritizeTriageQueue,
        addTriagePatient,
        updateTriageStatus,
        restockMedicine,
        chatMessages,
        sendChatMessage,
        isAiTyping,
        toastMessage,
        showToast
      }}
    >
      {children}
    </HealthGridContext.Provider>
  );
};

export const useHealthGrid = () => {
  const context = useContext(HealthGridContext);
  if (!context) {
    throw new Error('useHealthGrid must be used within a HealthGridProvider');
  }
  return context;
};
