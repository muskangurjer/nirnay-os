import React, { useState } from 'react';
import { useHealthGrid } from '../../context/HealthGridContext';
import {
  MOCK_PATIENT_VITALS_TIMELINE
} from '../../data/mockData';
import { AIPatientInfluxInsights } from './AIPatientInfluxInsights';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  Users,
  Calendar,
  Activity,
  AlertOctagon,
  Search,
  CheckCircle,
  PlusCircle,
  FilePlus,
  Clock,
  HeartPulse,
  Flame,
  ShieldAlert,
  ArrowRight,
  Stethoscope,
  ChevronRight,
  Filter,
  Sparkles,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  const {
    emergencyBuzzerAlert,
    dismissBuzzerAlert,
    patient,
    prescriptions,
    addPrescription,
    triagePatients,
    showToast
  } = useHealthGrid();

  const [activeDoctorTab, setActiveDoctorTab] = useState<'queue' | 'lookup' | 'influx' | 'schedule'>('queue');
  const [patientSearchQuery, setPatientSearchQuery] = useState('91-9482-1029-4821@abdm');
  const [isPatientDetailOpen, setIsPatientDetailOpen] = useState(false);
  const [isAddRxModalOpen, setIsAddRxModalOpen] = useState(false);

  // New Rx Form State
  const [newRxDiagnosis, setNewRxDiagnosis] = useState('');
  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');
  const [newMedFreq, setNewMedFreq] = useState('1-0-1 (Twice Daily)');
  const [newMedDuration, setNewMedDuration] = useState('14 Days');

  const handleCreatePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRxDiagnosis || !newMedName) {
      showToast('Please enter diagnosis and medication name');
      return;
    }

    addPrescription({
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      doctorName: 'Dr. Vikramaditya Sen',
      doctorSpecialty: 'Senior Consultant, Cardiology (AIIMS)',
      hospitalName: 'AIIMS New Delhi',
      diagnosis: newRxDiagnosis,
      vitals: {
        bp: '124/80 mmHg',
        pulse: 72,
        spo2: 99,
        temp: '98.4 °F',
        weight: '73.5 kg'
      },
      medications: [
        {
          medicine: newMedName,
          dosage: newMedDosage || '50 mg',
          frequency: newMedFreq,
          duration: newMedDuration,
          instructions: 'Take strictly as instructed.'
        }
      ],
      instructions: 'Review in 2 weeks. Maintain low sodium diet.'
    });

    setIsAddRxModalOpen(false);
    setNewRxDiagnosis('');
    setNewMedName('');
    setNewMedDosage('');
  };

  return (
    <div id="doctor-dashboard" className="space-y-6 animate-in fade-in duration-300">
      {/* Emergency Buzzer Alert Banner (if active) */}
      {emergencyBuzzerAlert.active && (
        <div
          id="doctor-emergency-buzzer-banner"
          className="relative bg-gradient-to-r from-rose-950 via-red-900 to-rose-950 border-2 border-rose-500 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-rose-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-pulse text-white"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-950">
              <ShieldAlert className="w-7 h-7 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-extrabold text-[10px] uppercase tracking-wider">
                  EMERGENCY BUZZER ALERT
                </span>
                <h3 className="font-bold text-sm sm:text-base text-white">{emergencyBuzzerAlert.title}</h3>
              </div>
              <p className="text-xs text-rose-100 mt-1 max-w-2xl leading-relaxed">
                {emergencyBuzzerAlert.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
            <button
              onClick={() => showToast('Trauma Team Standby activated at Gate 1.')}
              className="px-4 py-2 rounded-xl bg-white text-rose-950 font-bold text-xs hover:bg-rose-100 transition-colors cursor-pointer"
            >
              Prepare Trauma Bay
            </button>
            <button
              onClick={dismissBuzzerAlert}
              className="px-3 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-400/40 text-xs text-rose-200 transition-colors cursor-pointer"
            >
              Acknowledge & Mute
            </button>
          </div>
        </div>
      )}

      {/* KPI Metrics Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Total Patients Today</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">42</div>
          <div className="text-[11px] text-emerald-400">↑ 14% vs yesterday</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>OPD Patients In Queue</span>
            <Clock className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold text-teal-400">28</div>
          <div className="text-[11px] text-slate-400">Avg consultation: 12 min</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Surgeries Scheduled</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">4 Slots</div>
          <div className="text-[11px] text-slate-400">Cath Lab OT-2 & OT-4</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Emergency Admissions</span>
            <AlertOctagon className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400">5 Cases</div>
          <div className="text-[11px] text-rose-300">2 In Resuscitation Bay</div>
        </div>
      </div>

      {/* Doctor Tabs Switcher */}
      <div className="flex items-center gap-1.5 border-b border-slate-800 pb-1 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveDoctorTab('queue')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeDoctorTab === 'queue'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          Priority Patient Queue & Triage
        </button>
        <button
          onClick={() => setActiveDoctorTab('influx')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeDoctorTab === 'influx'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
          <span>AI Patient Influx & Surge Trends</span>
        </button>
        <button
          onClick={() => setActiveDoctorTab('lookup')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeDoctorTab === 'lookup'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          ABHA Patient Lookup & Vitals Timeline
        </button>
        <button
          onClick={() => setActiveDoctorTab('schedule')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeDoctorTab === 'schedule'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          Weekly Clinical Schedule & Rounds
        </button>
      </div>

      {/* TAB: AI PATIENT INFLUX & DISEASE SURGE INSIGHTS */}
      {activeDoctorTab === 'influx' && <AIPatientInfluxInsights />}

      {/* TAB 1: PRIORITY PATIENT QUEUE */}
      {activeDoctorTab === 'queue' && (
        <div className="space-y-4">
          {/* AI Influx Advisory Callout */}
          <div className="p-3.5 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-teal-950/60 border border-indigo-500/40 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-white">AI Epidemiological Surge Alert:</strong>
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    +38% Respiratory / COPD Surge Expected
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  PM2.5 spike (380+) triggering acute broncho-constriction and elderly exacerbations.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveDoctorTab('influx')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors shadow-md shadow-indigo-950"
            >
              <span>View Disease Influx Forecast</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-indigo-400" />
              Live Emergency Triage & OPD Queue (AI Prioritized)
            </h3>
            <span className="text-xs text-slate-400">
              Auto-sorted by Emergency Severity Index (ESI 1 = Highest Acuity)
            </span>
          </div>

          <div className="space-y-3">
            {triagePatients.map((tp) => {
              const isCritical = tp.triageScore <= 2;
              return (
                <div
                  key={tp.id}
                  className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                    isCritical
                      ? 'bg-rose-950/40 border-rose-600/60 shadow-md shadow-rose-950/40'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-white">{tp.name}</span>
                      <span className="text-xs text-slate-400 font-mono">({tp.age}y / {tp.gender})</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          tp.triageScore === 1
                            ? 'bg-rose-600 text-white'
                            : tp.triageScore === 2
                            ? 'bg-orange-500 text-white'
                            : tp.triageScore === 3
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        ESI-{tp.triageScore} • {tp.triageCategory}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">Arrived: {tp.arrivalTime}</span>
                    </div>

                    <p className="text-xs text-slate-300 font-medium">
                      <strong>Complaint:</strong> {tp.chiefComplaint}
                    </p>

                    {/* Vitals Bar */}
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono pt-1">
                      <span>BP: <strong className="text-white">{tp.vitals.bp}</strong></span>
                      <span>HR: <strong className="text-white">{tp.vitals.hr} bpm</strong></span>
                      <span>SpO2: <strong className={tp.vitals.spo2 < 92 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>{tp.vitals.spo2}%</strong></span>
                      <span>Temp: <strong className="text-white">{tp.vitals.temp}°F</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setPatientSearchQuery(tp.abhaId);
                        setIsPatientDetailOpen(true);
                        setActiveDoctorTab('lookup');
                      }}
                      className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                    >
                      ABHA File
                    </button>
                    <button
                      onClick={() => showToast(`Calling Token ${tp.token} to Consultation Room 1`)}
                      className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Call Next
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PATIENT LOOKUP & VITALS TIMELINE */}
      {activeDoctorTab === 'lookup' && (
        <div className="space-y-6">
          {/* Search Header */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-400" />
              National ABDM Patient Electronic Health Record (EHR) Lookup
            </h3>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={patientSearchQuery}
                onChange={(e) => setPatientSearchQuery(e.target.value)}
                placeholder="Enter 14-digit ABHA ID or mobile number..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
              <button
                onClick={() => {
                  setIsPatientDetailOpen(true);
                  showToast('ABDM Record fetched successfully.');
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Fetch EHR Record
              </button>
            </div>
          </div>

          {/* Patient Details & Charts Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">{patient.name}</h2>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold text-xs border border-emerald-500/30">
                    ABHA Verified
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  ID: {patient.abhaId} • Age: {patient.age}y • Blood: {patient.bloodGroup}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddRxModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold cursor-pointer"
                >
                  <FilePlus className="w-4 h-4" />
                  Write E-Prescription
                </button>
              </div>
            </div>

            {/* Active Allergies & Clinical Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  Active Drug Allergies & Warnings
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {patient.allergies.map((al, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 text-xs font-semibold border border-rose-500/30">
                      ⚠ {al}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  Chronic Medical Conditions
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {patient.activeConditions.map((cond, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 text-xs border border-slate-700">
                      • {cond}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Vitals Trends LineChart (Recharts) */}
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Longitudinal Vitals Trends Analysis (Past 7 Days)
                  </h4>
                  <p className="text-[11px] text-slate-400">Systolic & Diastolic Blood Pressure (mmHg) vs Heart Rate (BPM)</p>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                  Hemodynamically Stable
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MOCK_PATIENT_VITALS_TIMELINE} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} domain={[60, 160]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Line type="monotone" dataKey="bpSystolic" name="BP Systolic (mmHg)" stroke="#f43f5e" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="bpDiastolic" name="BP Diastolic (mmHg)" stroke="#38bdf8" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="hr" name="Heart Rate (BPM)" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Past Prescriptions History */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Past Prescriptions on Grid</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {prescriptions.map((rx) => (
                  <div key={rx.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-white">
                      <span>{rx.diagnosis}</span>
                      <span className="text-slate-400 text-[10px]">{rx.date}</span>
                    </div>
                    <div className="space-y-1">
                      {rx.medications.map((m, i) => (
                        <div key={i} className="text-slate-300 text-[11px] flex justify-between">
                          <span>• {m.medicine} ({m.dosage})</span>
                          <span className="text-slate-400">{m.frequency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WEEKLY SCHEDULE & CALENDAR */}
      {activeDoctorTab === 'schedule' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Weekly Clinical Roster & Shift Schedule</h3>
              <p className="text-xs text-slate-400">Cardiology Super-Specialty Unit • AIIMS Block 3</p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-indigo-950 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              Morning Shift (08:00 - 16:00)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 text-xs">
            {[
              { day: 'Mon', date: '18 Aug', task: 'OPD Clinic Room 104', time: '09:00 - 13:30', count: '32 Patients' },
              { day: 'Tue', date: '19 Aug', task: 'Cath Lab Angioplasties', time: '08:30 - 14:00', count: '4 Surgeries' },
              { day: 'Wed', date: '20 Aug', task: 'ICU Grand Rounds & Triage', time: '09:00 - 16:00', count: '18 Beds' },
              { day: 'Thu (Today)', date: '21 Aug', task: 'OPD Super-Clinic', time: '09:00 - 14:00', count: '28 Patients', isToday: true },
              { day: 'Fri', date: '22 Aug', task: 'Electrophysiology Lab', time: '10:00 - 15:30', count: '3 Cases' },
              { day: 'Sat', date: '23 Aug', task: 'Emergency Trauma Call', time: '08:00 - 20:00', count: 'On-Call' },
              { day: 'Sun', date: '24 Aug', task: 'Weekly Rest / Tele-OPD', time: '10:00 - 12:00', count: 'Tele-Care' }
            ].map((slot, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 ${
                  slot.isToday
                    ? 'bg-indigo-950/70 border-indigo-500 ring-1 ring-indigo-500 text-white'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex justify-between font-bold text-xs">
                    <span className={slot.isToday ? 'text-indigo-400' : 'text-white'}>{slot.day}</span>
                    <span className="text-[10px] text-slate-400">{slot.date}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-200 mt-2 line-clamp-2">{slot.task}</div>
                </div>
                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  <div>{slot.time}</div>
                  <div className="text-teal-400 font-medium">{slot.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WRITE E-PRESCRIPTION MODAL */}
      {isAddRxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4 text-xs text-slate-100 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FilePlus className="w-4 h-4 text-teal-400" />
                Issue ABDM Digitally Signed E-Prescription
              </h3>
              <button onClick={() => setIsAddRxModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreatePrescription} className="space-y-3.5">
              <div>
                <label className="block text-slate-400 mb-1">Clinical Diagnosis</label>
                <input
                  type="text"
                  required
                  value={newRxDiagnosis}
                  onChange={(e) => setNewRxDiagnosis(e.target.value)}
                  placeholder="e.g. Essential Hypertension Stage 1 (Controlled)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Medicine Name</label>
                  <input
                    type="text"
                    required
                    value={newMedName}
                    onChange={(e) => setNewMedName(e.target.value)}
                    placeholder="e.g. Telmisartan Tablets IP"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Dosage</label>
                  <input
                    type="text"
                    value={newMedDosage}
                    onChange={(e) => setNewMedDosage(e.target.value)}
                    placeholder="e.g. 40 mg"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Frequency</label>
                  <select
                    value={newMedFreq}
                    onChange={(e) => setNewMedFreq(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="1-0-0 (Morning)">1-0-0 (Morning)</option>
                    <option value="1-0-1 (Twice Daily)">1-0-1 (Twice Daily)</option>
                    <option value="0-0-1 (Bedtime)">0-0-1 (Bedtime)</option>
                    <option value="SOS (As Needed)">SOS (As Needed)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newMedDuration}
                    onChange={(e) => setNewMedDuration(e.target.value)}
                    placeholder="e.g. 30 Days"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddRxModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-white font-bold"
                >
                  Sign & Sync to ABHA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
