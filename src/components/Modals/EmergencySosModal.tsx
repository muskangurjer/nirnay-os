import React, { useState } from 'react';
import { useHealthGrid } from '../../context/HealthGridContext';
import {
  Flame,
  X,
  PhoneCall,
  Shield,
  MapPin,
  Clock,
  Radio,
  User,
  CheckCircle2,
  Navigation,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export const EmergencySosModal: React.FC = () => {
  const {
    emergencySosModalOpen,
    setEmergencySosModalOpen,
    ambulanceRequest,
    dispatchAmbulance,
    cancelAmbulance,
    patient,
    hospitals
  } = useHealthGrid();

  const [selectedHospitalId, setSelectedHospitalId] = useState<string>('hosp-aiims');
  const [emergencyReason, setEmergencyReason] = useState<string>('Acute chest pain & shortness of breath');
  const [pickupAddress, setPickupAddress] = useState<string>(patient.address);

  if (!emergencySosModalOpen) return null;

  const handleTriggerDispatch = () => {
    dispatchAmbulance(pickupAddress, selectedHospitalId, emergencyReason);
  };

  return (
    <div
      id="emergency-sos-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-slate-900 border border-rose-600/50 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header with flashing emergency banner */}
        <div className="p-4 bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border-b border-rose-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-900/60 animate-pulse">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  National Emergency Ambulance SOS Hub
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-full animate-ping">
                  DIAL 108 / 102
                </span>
              </div>
              <p className="text-xs text-rose-200">
                100% Cashless Advanced Life Support (ALS) under Ayushman Bharat PM-JAY
              </p>
            </div>
          </div>
          <button
            id="close-sos-modal-btn"
            onClick={() => setEmergencySosModalOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          {/* If an active ambulance is dispatched */}
          {ambulanceRequest ? (
            <div className="space-y-4">
              {/* Status Banner */}
              <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/50 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-600 flex items-center justify-center text-white animate-bounce">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{ambulanceRequest.ambulanceNumber}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/30 text-rose-300 border border-rose-500/40">
                        {ambulanceRequest.ambulanceType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Destination: {ambulanceRequest.destinationHospital.name} (Trauma Ready)
                    </p>
                  </div>
                </div>
                <div className="text-right bg-slate-900 px-4 py-2 rounded-lg border border-rose-500/30">
                  <div className="text-[10px] text-slate-400 uppercase">Estimated Arrival</div>
                  <div className="text-xl font-bold font-mono text-amber-400">
                    {ambulanceRequest.etaMinutes} mins
                  </div>
                </div>
              </div>

              {/* Simulated Live GPS Map Tracker Grid */}
              <div className="relative w-full h-56 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
                {/* SVG Radar Map Visualization */}
                <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                  <defs>
                    <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#334155" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                  <circle cx="50%" cy="50%" r="90" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
                  <circle cx="50%" cy="50%" r="45" fill="none" stroke="#10b981" strokeWidth="1" />
                </svg>

                {/* Patient GPS Pin */}
                <div className="absolute left-[30%] top-[45%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-lg shadow-emerald-500 animate-ping" />
                  <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-lg shadow-emerald-500 absolute top-0" />
                  <span className="mt-5 px-2 py-0.5 rounded bg-slate-900/90 border border-emerald-500/40 text-[10px] font-bold text-emerald-300 whitespace-nowrap shadow">
                    Pickup: {patient.name}
                  </span>
                </div>

                {/* Animated Moving Ambulance Pin */}
                <div className="absolute right-[28%] top-[35%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl shadow-rose-900 border-2 border-white">
                    <Navigation className="w-4 h-4 rotate-45" />
                  </div>
                  <span className="mt-1 px-2 py-0.5 rounded bg-slate-900/90 border border-rose-500/40 text-[10px] font-bold text-rose-300 whitespace-nowrap shadow">
                    ALS Unit #12 (En Route)
                  </span>
                </div>

                {/* Destination Hospital Pin */}
                <div className="absolute right-[15%] bottom-[15%] flex flex-col items-center">
                  <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center border border-teal-300">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="mt-1 px-1.5 py-0.5 rounded bg-slate-900/90 text-[9px] text-teal-300 whitespace-nowrap">
                    AIIMS Trauma
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  Live GPS Telemetry Active • 28.5494° N, 77.2001° E
                </div>
              </div>

              {/* Driver & Paramedic Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{ambulanceRequest.driverName}</div>
                      <div className="text-[10px] text-slate-400">Certified EMT & Critical Care Driver</div>
                    </div>
                  </div>
                  <a
                    href={`tel:${ambulanceRequest.driverPhone}`}
                    className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                    title="Call Paramedic"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>

                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                    Scheme & Billing Summary
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">Government Guarantee (PM-JAY):</span>
                    <span className="font-bold text-emerald-400">100% Free (₹0)</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>Base Fare + ALS Monitoring:</span>
                    <span className="line-through">₹3,500</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={cancelAmbulance}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors cursor-pointer"
                >
                  Cancel Request
                </button>
                <button
                  onClick={() => setEmergencySosModalOpen(false)}
                  className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold transition-colors cursor-pointer"
                >
                  Keep Tracking in Background
                </button>
              </div>
            </div>
          ) : (
            /* Dispatch Config Form */
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-200">
                  <strong>Priority Emergency Response:</strong> The National Health Grid algorithm will auto-route to the nearest hospital with verified open ICU beds and trauma standby.
                </div>
              </div>

              {/* Pickup Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Patient Current Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Enter pickup address or landmark..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <p className="text-[10px] text-teal-400 mt-1 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse" /> Auto-detected via GPS: Hauz Khas, New Delhi (Accuracy: 5m)
                </p>
              </div>

              {/* Destination Hospital Choice */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Destination Hospital (AI Recommended)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {hospitals.slice(0, 4).map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setSelectedHospitalId(h.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedHospitalId === h.id
                          ? 'bg-rose-950/60 border-rose-500 text-white ring-1 ring-rose-500'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">{h.name.split(' ')[0]} Hospital</span>
                        <span className="text-[10px] text-emerald-400">{h.icuBedsAvailable} ICU Beds</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {h.distanceKm} km • {h.traumaLevel} Trauma Center
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chief Emergency Reason */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Chief Emergency Complaint / Symptoms
                </label>
                <textarea
                  rows={2}
                  value={emergencyReason}
                  onChange={(e) => setEmergencyReason(e.target.value)}
                  placeholder="Describe patient status (e.g. severe chest pain, loss of consciousness, trauma)..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Scheme Benefit Guarantee Box */}
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="font-bold text-xs text-emerald-300">PM-JAY / CGHS Emergency Guarantee</div>
                    <div className="text-[10px] text-slate-300">₹0 Patient Payable • 100% Cashless DBT</div>
                  </div>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  VERIFIED
                </span>
              </div>

              {/* Action Dispatch Button */}
              <div className="pt-2">
                <button
                  id="confirm-ambulance-dispatch-btn"
                  onClick={handleTriggerDispatch}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-xl shadow-rose-950 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-[0.99]"
                >
                  <Flame className="w-5 h-5" />
                  CONFIRM & DISPATCH ADVANCED LIFE SUPPORT AMBULANCE NOW
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
