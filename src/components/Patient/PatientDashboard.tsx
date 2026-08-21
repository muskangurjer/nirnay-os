import React, { useState } from 'react';
import { useHealthGrid } from '../../context/HealthGridContext';
import {
  Calendar,
  Clock,
  User,
  Activity,
  FileText,
  Utensils,
  Flame,
  CreditCard,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Search,
  ChevronRight,
  Download,
  Filter,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  Phone,
  ArrowUpRight,
  Layers,
  Radio
} from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const {
    patient,
    setPatientAbha,
    appointments,
    doctors,
    hospitals,
    prescriptions,
    labTests,
    dietPlan,
    bills,
    ambulanceRequest,
    bookAppointment,
    cancelAppointment,
    setEmergencySosModalOpen,
    bookLabTest,
    setChatbotOpen,
    showToast
  } = useHealthGrid();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'booking' | 'doctors' | 'records' | 'diet' | 'ambulance' | 'billing'
  >('overview');

  // ABHA Login & GPS Modal/Card State
  const [showAbhaSetup, setShowAbhaSetup] = useState(false);
  const [typedAbhaInput, setTypedAbhaInput] = useState(patient.abhaId);
  const [gpsDetecting, setGpsDetecting] = useState(false);
  const [currentLocationText, setCurrentLocationText] = useState(patient.address);

  // Extract raw digits for strict 14-digit validation
  const rawDigits = typedAbhaInput.replace(/\D/g, '');
  const isAbhaValid14 = rawDigits.length === 14;

  const handleAbhaLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAbhaValid14) {
      showToast('ABHA ID must contain exactly 14 digits (e.g. 14-8921-4820-9182)');
      return;
    }
    // Format into standard ABDM 14-digit format: XX-XXXX-XXXX-XXXX
    const formatted = `${rawDigits.slice(0, 2)}-${rawDigits.slice(2, 6)}-${rawDigits.slice(6, 10)}-${rawDigits.slice(10, 14)}`;
    setPatientAbha(formatted);
    setShowAbhaSetup(false);
    showToast(`Logged in successfully via ABHA: ${formatted}`);
  };

  const handleAutoDetectGps = () => {
    setGpsDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsDetecting(false);
          const detected = `Lat: ${pos.coords.latitude.toFixed(4)}°, Long: ${pos.coords.longitude.toFixed(4)}° (Ansari Nagar, New Delhi 110029)`;
          setCurrentLocationText(detected);
          showToast('Live GPS Location synchronized with National Health Grid!');
        },
        () => {
          // Fallback simulation
          setTimeout(() => {
            setGpsDetecting(false);
            const simulated = 'GPS: 28.5672° N, 77.2100° E (Ring Road, South Ext, New Delhi 110049)';
            setCurrentLocationText(simulated);
            showToast('Live GPS Location detected: South Ext, New Delhi');
          }, 800);
        },
        { timeout: 3000 }
      );
    } else {
      setTimeout(() => {
        setGpsDetecting(false);
        const simulated = 'GPS: 28.5672° N, 77.2100° E (Ring Road, South Ext, New Delhi 110049)';
        setCurrentLocationText(simulated);
        showToast('Live GPS Location detected: South Ext, New Delhi');
      }, 800);
    }
  };

  // Booking Form State
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>(hospitals[0]?.id || 'hosp-aiims');
  const [selectedDept, setSelectedDept] = useState<string>('Cardiology');
  const [selectedDocId, setSelectedDocId] = useState<string>(doctors[0]?.id || 'doc-1');
  const [bookingDate, setBookingDate] = useState<string>('2026-08-22');
  const [bookingSlot, setBookingSlot] = useState<string>('10:15 AM');
  const [symptomsInput, setSymptomsInput] = useState<string>('Follow-up cardiovascular evaluation & BP check');
  const [consultType, setConsultType] = useState<'In-Person' | 'Tele-Consultation'>('In-Person');

  // Doctor Filter State
  const [doctorSearch, setDoctorSearch] = useState('');
  const [doctorDeptFilter, setDoctorDeptFilter] = useState('All');

  // Records tab state
  const [recordsSubTab, setRecordsSubTab] = useState<'prescriptions' | 'labtests'>('prescriptions');
  const [selectedRx, setSelectedRx] = useState(prescriptions[0]);

  // Selected Lab Test Modal
  const [activeLabReportModal, setActiveLabReportModal] = useState<typeof labTests[0] | null>(null);

  // Filtered Doctors
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      doc.department.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      doc.hospitalName.toLowerCase().includes(doctorSearch.toLowerCase());
    const matchesDept = doctorDeptFilter === 'All' || doc.department === doctorDeptFilter;
    return matchesSearch && matchesDept;
  });

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookAppointment({
      doctorId: selectedDocId,
      hospitalId: selectedHospitalId,
      date: bookingDate,
      timeSlot: bookingSlot,
      symptoms: symptomsInput,
      type: consultType
    });
    setActiveTab('overview');
  };

  const activeAppointment = appointments.find((a) => a.status === 'Confirmed') || appointments[0];

  return (
    <div id="patient-dashboard" className="space-y-6 animate-in fade-in duration-300">
      {/* ABHA Auth & Location Live Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/60 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold text-lg">
              {patient.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
              <ShieldCheck className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-bold text-white">{patient.name}</h1>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded-full">
                ABHA Active
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-teal-950 text-teal-300 border border-teal-500/20 rounded-full">
                PM-JAY Gold Card
              </span>
              <button
                id="switch-abha-btn"
                onClick={() => setShowAbhaSetup(!showAbhaSetup)}
                className="px-2 py-0.5 text-[10px] font-medium text-teal-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                {showAbhaSetup ? 'Close Setup' : 'Switch ABHA / GPS'}
              </button>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap font-mono">
              <span>ABHA ID: <strong className="text-slate-200">{patient.abhaId}</strong></span>
              <span>•</span>
              <span>Blood: <strong className="text-rose-400">{patient.bloodGroup}</strong></span>
            </div>
          </div>
        </div>

        {/* GPS Location & Emergency SOS Hero Button */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="text-left md:text-right hidden sm:block">
            <div className="text-[10px] text-slate-400 flex items-center md:justify-end gap-1">
              <MapPin className="w-3 h-3 text-teal-400" />
              Live GPS Location
            </div>
            <div className="text-xs font-medium text-slate-200 truncate max-w-[200px]" title={currentLocationText}>
              {currentLocationText.split(',')[0]}
            </div>
          </div>

          <button
            id="patient-sos-btn"
            onClick={() => setEmergencySosModalOpen(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold shadow-lg shadow-rose-950/80 transition-all cursor-pointer animate-pulse"
          >
            <Flame className="w-4 h-4" />
            <span>Emergency SOS (108)</span>
          </button>
        </div>
      </div>

      {/* Interactive ABHA 14-Digit Login & GPS Auto-Detect Setup Card */}
      {showAbhaSetup && (
        <div
          id="abha-login-setup-card"
          className="bg-slate-900 border border-teal-500/50 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Ayushman Bharat Health Account (ABHA) Login Simulation</h3>
                <p className="text-[11px] text-slate-400">
                  National Digital Health Mission (ABDM) • Strict 14-Digit Verification
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAbhaSetup(false)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleAbhaLoginSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ABHA Input & Real-Time Digit Counter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                14-Digit ABHA ID (e.g. 14-8921-4820-9182 or 14 digits)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="abha-id-input"
                  value={typedAbhaInput}
                  onChange={(e) => setTypedAbhaInput(e.target.value)}
                  placeholder="Enter 14-digit ABHA ID..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono"
                />
                <div className="absolute right-3 top-2.5 flex items-center gap-1.5">
                  <span
                    className={`text-[11px] font-mono font-bold ${
                      isAbhaValid14 ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {rawDigits.length}/14
                  </span>
                  {isAbhaValid14 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                  )}
                </div>
              </div>

              {/* Real-time Validation Feedback Badge */}
              <div className="flex items-center gap-1.5 text-[11px]">
                {isAbhaValid14 ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Valid 14-digit ABHA format verified via ABDM Gateway
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Enter exactly 14 digits to simulate ABDM authentication
                  </span>
                )}
              </div>
            </div>

            {/* GPS Location Auto-Detection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Patient GPS & Emergency Geofence
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={currentLocationText}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono"
                />
                <button
                  type="button"
                  id="auto-detect-gps-btn"
                  onClick={handleAutoDetectGps}
                  disabled={gpsDetecting}
                  className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 shrink-0"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{gpsDetecting ? 'Locating...' : 'Auto GPS'}</span>
                </button>
              </div>
              <p className="text-[10px] text-slate-400">
                Enables sub-second ambulance routing and verified local hospital queue assignments.
              </p>
            </div>

            {/* Preset Persona Quick Selector */}
            <div className="md:col-span-2 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Quick Test Personas:</span>
                <button
                  type="button"
                  onClick={() => setTypedAbhaInput('14-8921-4820-9182')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-teal-300"
                >
                  Rohan Sharma (Cardiac)
                </button>
                <button
                  type="button"
                  onClick={() => setTypedAbhaInput('21-4492-8172-5501')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-teal-300"
                >
                  Priya Patel (Pulmonology)
                </button>
                <button
                  type="button"
                  onClick={() => setTypedAbhaInput('33-9012-7481-2294')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-teal-300"
                >
                  Sunita Devi (CGHS)
                </button>
              </div>

              <button
                type="submit"
                id="submit-abha-login-btn"
                disabled={!isAbhaValid14}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-md shadow-teal-950 cursor-pointer"
              >
                Simulate ABHA Login
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800 text-xs">
        {[
          { id: 'overview', label: 'My Queue & Overview', icon: <Activity className="w-3.5 h-3.5" /> },
          { id: 'booking', label: 'Book Appointment', icon: <Calendar className="w-3.5 h-3.5" /> },
          { id: 'doctors', label: 'Doctors Directory', icon: <Stethoscope className="w-3.5 h-3.5" /> },
          { id: 'records', label: 'E-Prescriptions & Lab Tests', icon: <FileText className="w-3.5 h-3.5" /> },
          { id: 'diet', label: 'AI Diet & Nutrition', icon: <Utensils className="w-3.5 h-3.5" /> },
          { id: 'ambulance', label: 'Ambulance Emergency Hub', icon: <Flame className="w-3.5 h-3.5" /> },
          { id: 'billing', label: 'Bills & PM-JAY Claims', icon: <CreditCard className="w-3.5 h-3.5" /> }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`patient-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-950 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & QUEUE TRACKER */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Live OPD Token Queue Banner */}
          {activeAppointment && (
            <div className="bg-gradient-to-br from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/40 rounded-2xl p-5 shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pb-5 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 text-xs font-semibold border border-teal-500/30">
                    <Radio className="w-3 h-3 text-teal-400 animate-pulse" />
                    Live OPD Token Queue Tracking
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {activeAppointment.doctorName}
                  </h2>
                  <p className="text-xs text-slate-300">
                    {activeAppointment.department} • {activeAppointment.hospitalName}
                  </p>
                </div>

                {/* Big Token Number & Wait Time Display */}
                <div className="flex items-center gap-4 bg-slate-950/80 px-5 py-3 rounded-2xl border border-teal-500/30">
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Your Token</div>
                    <div className="text-3xl font-extrabold text-teal-400 font-mono">
                      #{activeAppointment.tokenNumber}
                    </div>
                  </div>
                  <div className="h-8 w-px bg-slate-800" />
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Est. Wait Time</div>
                    <div className="text-2xl font-bold text-amber-400 font-mono">
                      ~{activeAppointment.estWaitTimeMin} <span className="text-xs font-normal text-slate-400">min</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Flow Steps */}
              <div className="pt-5 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span>Queue Position: <strong className="text-teal-300">3 patients ahead of you</strong></span>
                  <span className="text-emerald-400 font-medium">Currently Calling: Token #{activeAppointment.tokenNumber - 3}</span>
                </div>

                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-400 rounded-full w-[70%]" />
                </div>

                <div className="grid grid-cols-4 text-[11px] text-slate-400 text-center gap-2 pt-1">
                  <div className="text-teal-300 font-medium">1. Scan & Share QR Checked</div>
                  <div className="text-teal-300 font-medium">2. Vitals Triage Logged</div>
                  <div className="text-amber-300 font-bold">3. Next in Line (Room 104)</div>
                  <div className="text-slate-500">4. E-Prescription & Pharmacy</div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Active E-Prescriptions</span>
                <FileText className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-2xl font-bold text-white">{prescriptions.length} Active</div>
              <div className="text-[11px] text-emerald-400">Digitally signed via ABDM</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Diagnostic Reports</span>
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-white">{labTests.length} Ready</div>
              <div className="text-[11px] text-slate-400">All tests within normal baseline</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>PM-JAY Scheme Cover</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-emerald-400">₹5,00,000</div>
              <div className="text-[11px] text-slate-400">100% Cashless DBT Active</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Today's Calorie Target</span>
                <Utensils className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-amber-400">{dietPlan.targetCalories} kcal</div>
              <div className="text-[11px] text-slate-400">{dietPlan.macros.protein}g Protein | Low Sodium</div>
            </div>
          </div>

          {/* 2-Column: Upcoming Appointments + Latest Rx preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Appointments List */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-400" />
                  My Scheduled Appointments
                </h3>
                <button
                  onClick={() => setActiveTab('booking')}
                  className="text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
                >
                  + Book New
                </button>
              </div>

              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">{apt.doctorName}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded bg-teal-950 text-teal-300 border border-teal-500/20">
                          {apt.department}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{apt.hospitalName}</p>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1">
                        <span>Date: <strong className="text-slate-200">{apt.date}</strong></span>
                        <span>Slot: <strong className="text-slate-200">{apt.timeSlot}</strong></span>
                        <span>Token: <strong className="text-teal-400">#{apt.tokenNumber}</strong></span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          apt.status === 'Confirmed'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {apt.status}
                      </span>
                      {apt.status === 'Confirmed' && (
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          className="text-[10px] text-rose-400 hover:text-rose-300 cursor-pointer"
                        >
                          Cancel Slot
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick AI Assistant Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Swasthya AI Voice & Text Assistant
                </div>
                <h3 className="text-base font-bold text-white">Need to book or ask a question?</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Perform end-to-end tasks with natural language. Try saying: <em>"Book cardiologist at AIIMS for tomorrow"</em> or <em>"Show my diet plan"</em>.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setChatbotOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-teal-950 flex items-center justify-center gap-2 cursor-pointer transition-transform"
                >
                  <Sparkles className="w-4 h-4" />
                  Open Swasthya AI Co-Pilot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BOOK APPOINTMENT WIZARD */}
      {activeTab === 'booking' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-400" />
              National Health Grid — OPD Appointment Booking
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select empaneled hospital, clinical specialty, doctor, and convenient time slot. Zero consultation fees under PM-JAY.
            </p>
          </div>

          <form onSubmit={handleBookSubmit} className="space-y-5">
            {/* Step 1: Hospital Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                1. Select Empaneled Hospital
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {hospitals.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setSelectedHospitalId(h.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedHospitalId === h.id
                        ? 'bg-teal-950/70 border-teal-500 text-white ring-1 ring-teal-500'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs text-white">{h.name}</div>
                    <div className="text-[11px] text-teal-400 mt-0.5">{h.district} • {h.distanceKm} km</div>
                    <div className="text-[10px] text-slate-400 mt-1">Avg OPD wait: ~{h.avgOpdWaitTimeMin} mins</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Department & Doctor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  2. Select Specialty / Department
                </label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="Cardiology">Cardiology & Vascular</option>
                  <option value="Neurology">Neurology & Neurosciences</option>
                  <option value="Orthopedics">Orthopedics & Joint Replacement</option>
                  <option value="Pulmonology">Pulmonology & Respiratory</option>
                  <option value="General Medicine">General & Internal Medicine</option>
                  <option value="Oncology">Oncology & Cancer Care</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  3. Select Consultant Doctor
                </label>
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.qualification} - {d.experienceYears} yrs exp)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Date & Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  4. Appointment Date
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  min="2026-08-21"
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  5. Preferred Time Slot
                </label>
                <select
                  value={bookingSlot}
                  onChange={(e) => setBookingSlot(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="09:30 AM">09:30 AM (Morning Slot)</option>
                  <option value="10:15 AM">10:15 AM (Morning Slot)</option>
                  <option value="11:00 AM">11:00 AM (Peak Slot)</option>
                  <option value="12:15 PM">12:15 PM (Midday Slot)</option>
                  <option value="02:30 PM">02:30 PM (Afternoon Slot)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  6. Consultation Type
                </label>
                <div className="flex gap-2">
                  {(['In-Person', 'Tele-Consultation'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setConsultType(type)}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        consultType === type
                          ? 'bg-teal-600 text-white border-teal-500'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Symptoms Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                7. Chief Symptoms / Purpose of Consultation
              </label>
              <textarea
                rows={2}
                value={symptomsInput}
                onChange={(e) => setSymptomsInput(e.target.value)}
                placeholder="Briefly describe your symptoms..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Scheme Guarantee Pill */}
            <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="font-bold text-emerald-300">100% Cashless Consultation</span>
                  <span className="text-slate-300 ml-2">• ₹0 Consultation Fee via ABDM Grid</span>
                </div>
              </div>
              <span className="text-emerald-400 font-mono font-bold">₹0.00 DUE</span>
            </div>

            <button
              type="submit"
              id="confirm-booking-btn"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-950 transition-all cursor-pointer"
            >
              CONFIRM APPOINTMENT & GENERATE LIVE TOKEN
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: DOCTORS DIRECTORY */}
      {activeTab === 'doctors' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
                placeholder="Search doctors by name, specialty..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Pulmonology', 'General Medicine'].map((dep) => (
                <button
                  key={dep}
                  onClick={() => setDoctorDeptFilter(dep)}
                  className={`px-3 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                    doctorDeptFilter === dep
                      ? 'bg-teal-600 text-white font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {dep}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-3 transition-all"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-white">{doc.name}</h4>
                    <p className="text-[11px] text-teal-400 font-medium">{doc.department}</p>
                    <p className="text-[10px] text-slate-400">{doc.qualification}</p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 space-y-1 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hospital:</span>
                    <span className="font-medium text-white truncate max-w-[170px]">{doc.hospitalName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Experience:</span>
                    <span className="text-slate-200">{doc.experienceYears} Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">OPD Timings:</span>
                    <span className="text-emerald-400 font-medium">{doc.opdTimings}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold">
                    ★ {doc.rating} <span className="text-slate-500 font-normal">({doc.reviewsCount})</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDocId(doc.id);
                      setSelectedHospitalId(doc.hospitalId);
                      setSelectedDept(doc.department);
                      setActiveTab('booking');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: E-PRESCRIPTIONS & DIAGNOSTIC LAB TESTS */}
      {activeTab === 'records' && (
        <div className="space-y-5">
          {/* Sub-tab Pill Switch */}
          <div className="flex gap-2">
            <button
              onClick={() => setRecordsSubTab('prescriptions')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                recordsSubTab === 'prescriptions'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              Digital E-Prescriptions ({prescriptions.length})
            </button>
            <button
              onClick={() => setRecordsSubTab('labtests')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                recordsSubTab === 'labtests'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              Diagnostic Lab Reports ({labTests.length})
            </button>
          </div>

          {/* PRESCRIPTIONS VIEW */}
          {recordsSubTab === 'prescriptions' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Prescriptions List */}
              <div className="lg:col-span-5 space-y-3">
                {prescriptions.map((rx) => (
                  <button
                    key={rx.id}
                    onClick={() => setSelectedRx(rx)}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedRx?.id === rx.id
                        ? 'bg-teal-950/70 border-teal-500 ring-1 ring-teal-500'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white">{rx.doctorName}</span>
                      <span className="text-[10px] text-teal-400 font-mono">{rx.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium line-clamp-1">{rx.diagnosis}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{rx.hospitalName}</p>
                  </button>
                ))}
              </div>

              {/* Prescription Viewer Card */}
              {selectedRx && (
                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <div className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">
                        Official ABDM E-Prescription
                      </div>
                      <h3 className="text-base font-bold text-white">{selectedRx.doctorName}</h3>
                      <p className="text-[11px] text-slate-400">{selectedRx.doctorSpecialty}</p>
                    </div>
                    <button
                      onClick={() => showToast('Simulating digital signed PDF download...')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-teal-400" />
                      Download PDF
                    </button>
                  </div>

                  {/* Vitals snapshot */}
                  <div className="grid grid-cols-4 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                    <div>
                      <div className="text-[10px] text-slate-400">Blood Pressure</div>
                      <div className="font-bold text-white">{selectedRx.vitals.bp}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Pulse</div>
                      <div className="font-bold text-white">{selectedRx.vitals.pulse} bpm</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">SpO2</div>
                      <div className="font-bold text-emerald-400">{selectedRx.vitals.spo2}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Weight</div>
                      <div className="font-bold text-white">{selectedRx.vitals.weight}</div>
                    </div>
                  </div>

                  {/* Clinical Diagnosis */}
                  <div>
                    <span className="font-bold text-slate-300">Clinical Diagnosis: </span>
                    <span className="text-teal-300 font-semibold">{selectedRx.diagnosis}</span>
                  </div>

                  {/* Medications List */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-300 text-xs uppercase tracking-wider">
                      Prescribed Medications
                    </h4>
                    <div className="space-y-2">
                      {selectedRx.medications.map((med, i) => (
                        <div key={i} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">{med.medicine} ({med.dosage})</span>
                            <span className="text-teal-400 font-mono text-[10px]">{med.duration}</span>
                          </div>
                          <div className="text-[11px] text-slate-300">Frequency: <strong className="text-emerald-400">{med.frequency}</strong></div>
                          <p className="text-[10px] text-slate-400">{med.instructions}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span>ABDM Hash: {selectedRx.digitalSignature}</span>
                    <span className="text-emerald-400 font-bold">✓ Digitally Signed</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* LAB TESTS VIEW */}
          {recordsSubTab === 'labtests' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {labTests.map((test) => (
                  <div
                    key={test.id}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                          {test.category}
                        </span>
                        <span className="text-[10px] text-slate-400">{test.date}</span>
                      </div>
                      <h4 className="font-bold text-xs text-white line-clamp-2">{test.testName}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">{test.hospitalName}</p>
                      {test.resultSummary && (
                        <p className="text-[11px] text-slate-300 bg-slate-950 p-2 rounded-lg border border-slate-800 mt-2">
                          {test.resultSummary}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Report Verified
                      </span>
                      <button
                        onClick={() => setActiveLabReportModal(test)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-medium cursor-pointer"
                      >
                        View Breakdown
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Diagnostic Metrics Modal */}
              {activeLabReportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                  <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-cyan-400 uppercase">
                          ABDM Certified Laboratory Report
                        </span>
                        <h3 className="text-sm font-bold text-white mt-1">{activeLabReportModal.testName}</h3>
                        <p className="text-[10px] text-slate-400">{activeLabReportModal.hospitalName}</p>
                      </div>
                      <button
                        onClick={() => setActiveLabReportModal(null)}
                        className="text-slate-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-2">
                      {activeLabReportModal.metrics?.map((m, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                          <div>
                            <div className="font-bold text-white">{m.parameter}</div>
                            <div className="text-[10px] text-slate-400">Ref: {m.referenceRange} {m.unit}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-sm text-emerald-400">{m.value} {m.unit}</div>
                            <span className="text-[9px] text-emerald-300">Normal Range</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveLabReportModal(null)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl"
                    >
                      Close Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: PERSONALIZED AI DIET PLAN */}
      {activeTab === 'diet' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-1.5">
                <Utensils className="w-3.5 h-3.5 text-amber-400" />
                AI-Tailored Clinical Nutrition Plan
              </div>
              <h2 className="text-lg font-bold text-white">{dietPlan.title}</h2>
              <p className="text-xs text-slate-400 mt-0.5">Target: {dietPlan.conditionTargeted}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400 uppercase">Daily Energy</div>
                <div className="text-lg font-bold text-amber-400">{dietPlan.targetCalories} kcal</div>
              </div>
            </div>
          </div>

          {/* Macro Breakdown Bar */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Macronutrient Target Split</h4>
            <div className="grid grid-cols-4 gap-3 text-center text-xs">
              <div className="bg-slate-900 p-2.5 rounded-lg">
                <div className="text-[10px] text-slate-400">Protein</div>
                <div className="text-base font-bold text-teal-400">{dietPlan.macros.protein}g</div>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg">
                <div className="text-[10px] text-slate-400">Carbs (Complex)</div>
                <div className="text-base font-bold text-amber-400">{dietPlan.macros.carbs}g</div>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg">
                <div className="text-[10px] text-slate-400">Healthy Fats</div>
                <div className="text-base font-bold text-cyan-400">{dietPlan.macros.fats}g</div>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg">
                <div className="text-[10px] text-slate-400">Dietary Fiber</div>
                <div className="text-base font-bold text-emerald-400">{dietPlan.macros.fiber}g</div>
              </div>
            </div>
          </div>

          {/* Daily Schedule Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Today's Meal Progression</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dietPlan.dailySchedule.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{item.meal}</span>
                    <span className="text-[10px] text-amber-400 font-mono font-bold">{item.calories} kcal</span>
                  </div>
                  <ul className="space-y-1">
                    {item.items.map((it, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-teal-400">•</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: AMBULANCE EMERGENCY HUB */}
      {activeTab === 'ambulance' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 text-xs font-semibold border border-rose-500/30 mb-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                Emergency Grid Dispatch Center
              </div>
              <h2 className="text-lg font-bold text-white">Advanced Life Support (ALS) Ambulance Response</h2>
            </div>
            <button
              onClick={() => setEmergencySosModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              {ambulanceRequest ? 'Open Live Radar' : 'One-Touch SOS'}
            </button>
          </div>

          {ambulanceRequest ? (
            <div className="p-5 rounded-xl bg-slate-950 border border-rose-600/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Unit #{ambulanceRequest.ambulanceNumber}</div>
                  <div className="text-xs text-slate-400">Driver: {ambulanceRequest.driverName} ({ambulanceRequest.driverPhone})</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold font-mono text-amber-400">{ambulanceRequest.etaMinutes} mins ETA</div>
                  <div className="text-[10px] text-emerald-400">Status: {ambulanceRequest.status}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-3">
              <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
                <Flame className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white">No active emergency ambulance request</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                In case of critical emergencies (chest pain, trauma, acute breathing distress), press the SOS button to instantly dispatch the nearest hospital vehicle.
              </p>
              <button
                onClick={() => setEmergencySosModalOpen(true)}
                className="mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-rose-950 cursor-pointer"
              >
                REQUEST EMERGENCY ALS AMBULANCE
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 7: BILLING & PM-JAY MEDICAL CLAIMS */}
      {activeTab === 'billing' && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Active Hospital Invoices & Direct Claims</h3>
                <p className="text-xs text-slate-400">Universal Health Coverage Guarantee via PM-JAY</p>
              </div>
              <div className="bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-500/30 text-right">
                <div className="text-[10px] text-emerald-300 font-semibold">Total Patient Liability</div>
                <div className="text-base font-bold text-emerald-400">₹0.00 (100% Cashless)</div>
              </div>
            </div>

            <div className="space-y-4">
              {bills.map((b) => (
                <div key={b.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white">{b.hospitalName}</span>
                      <span className="text-slate-400 ml-2 font-mono text-[10px]">Invoice #{b.billNumber}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30">
                      {b.paymentStatus}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-900">
                    {b.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-slate-300 text-[11px]">
                        <span>{item.description} ({item.category})</span>
                        <span className="font-mono text-slate-200">₹{item.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Applied Scheme Subsidy (PM-JAY):</span>
                    <span className="text-emerald-400 font-bold font-mono">- ₹{b.pmjaySubsidy.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 font-bold text-sm bg-slate-900 p-2.5 rounded-lg">
                    <span className="text-white">Net Out-Of-Pocket Payable:</span>
                    <span className="text-emerald-400 font-mono">₹{b.patientPayable.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
