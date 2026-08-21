import React, { useState } from 'react';
import { useHealthGrid } from '../../context/HealthGridContext';
import { MOCK_REGIONAL_NETWORK_STATS } from '../../data/mockData';
import {
  Globe,
  Building2,
  Bed,
  Flame,
  Activity,
  Wind,
  ShieldCheck,
  Zap,
  ArrowRight,
  Radio,
  RefreshCw,
  Layers,
  MapPin,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  const { hospitals, dispatchAmbulance, setEmergencySosModalOpen, showToast } = useHealthGrid();
  const [selectedHospitalForInspection, setSelectedHospitalForInspection] = useState(hospitals[0]);
  const [simulatedPatientLocation, setSimulatedPatientLocation] = useState('South Extension, New Delhi');
  const [simulatedAcuity, setSimulatedAcuity] = useState<'STEMI Cardiac' | 'Severe Poly-Trauma' | 'Acute Stroke'>('STEMI Cardiac');
  const [routingRecommendation, setRoutingRecommendation] = useState<{
    bestHospital: typeof hospitals[0];
    reason: string;
    etaMin: number;
    icuMatch: string;
  } | null>({
    bestHospital: hospitals[0],
    reason: 'Highest available ICU beds (14 free) + Active Cath Lab Team Standby + Optimal 72h Oxygen Reserve',
    etaMin: 7,
    icuMatch: 'Verified 14 / 220 ICU Beds Open'
  });

  const handleSimulateRouting = () => {
    // Find best hospital
    const sorted = [...hospitals].sort((a, b) => {
      // Score = free ICU beds * 2 - distanceKm
      const scoreA = a.icuBedsAvailable * 2 - a.distanceKm;
      const scoreB = b.icuBedsAvailable * 2 - b.distanceKm;
      return scoreB - scoreA;
    });

    const best = sorted[0];
    setRoutingRecommendation({
      bestHospital: best,
      reason: `Auto-routed based on lowest response time (${best.distanceKm}km) & verified ready trauma bay (${best.icuBedsAvailable} ICU beds available).`,
      etaMin: Math.round(best.distanceKm * 1.4) + 3,
      icuMatch: `${best.icuBedsAvailable} ICU Beds verified`
    });
    showToast(`AI Dispatch Engine computed optimal route to: ${best.name}`);
  };

  return (
    <div id="superadmin-dashboard" className="space-y-6 animate-in fade-in duration-300">
      {/* Regional Command Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-rose-500/40 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <Globe className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">National Health Grid — Regional Command Center (Delhi NCR)</h2>
              <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-bold text-[10px] border border-rose-500/30">
                SUPER ADMIN LEVEL 1
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live Inter-Hospital Load Balancing, Emergency Green Corridors, and Centralized Resource Triage
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-emerald-400 font-mono">48 Grid Nodes Online</span>
        </div>
      </div>

      {/* Grid KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Total Available Beds</span>
            <Bed className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{MOCK_REGIONAL_NETWORK_STATS.totalAvailableBeds}</div>
          <div className="text-[11px] text-emerald-400">Across 48 network hospitals</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Free ICU Resuscitation Beds</span>
            <Activity className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400 font-mono">{MOCK_REGIONAL_NETWORK_STATS.totalIcuBedsAvailable}</div>
          <div className="text-[11px] text-slate-400">Verified Level-1 / Level-2 ICU</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Avg Emergency Response</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 font-mono">{MOCK_REGIONAL_NETWORK_STATS.avgEmergencyResponseMin} min</div>
          <div className="text-[11px] text-slate-400">{MOCK_REGIONAL_NETWORK_STATS.activeAmbulancesOnDuty} Active ALS Units</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>PM-JAY Treated Today</span>
            <ShieldCheck className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold text-teal-400 font-mono">
            {MOCK_REGIONAL_NETWORK_STATS.totalPmjayPatientsTreatedToday.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">100% Cashless claims processed</div>
        </div>
      </div>

      {/* 2-Column: Multi-Hospital Visual Node Grid + AI Emergency Routing Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 7 Cols: Interactive Regional Network Hospital Nodes */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-400" />
                Interconnected Hospital Grid & Capacity Node Map
              </h3>
              <p className="text-xs text-slate-400">Live Telemetry & Bed Utilization Matrices</p>
            </div>
            <span className="text-xs text-teal-400 font-mono">Region: Delhi NCR South Grid</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {hospitals.map((hosp) => {
              const isSelected = selectedHospitalForInspection.id === hosp.id;
              const isAccepting = hosp.emergencyStatus === 'Accepting';
              return (
                <div
                  key={hosp.id}
                  onClick={() => setSelectedHospitalForInspection(hosp)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-teal-950/60 border-teal-500 ring-1 ring-teal-500 shadow-md'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-xs text-white">{hosp.name}</h4>
                      <p className="text-[10px] text-slate-400">{hosp.district} • {hosp.traumaLevel}</p>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        isAccepting
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {hosp.emergencyStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] bg-slate-900 p-2 rounded-lg border border-slate-800/80">
                    <div>
                      <div className="text-slate-400">Free Beds</div>
                      <div className="font-bold text-emerald-400">{hosp.availableBeds}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Free ICU</div>
                      <div className="font-bold text-rose-400">{hosp.icuBedsAvailable}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Oxygen</div>
                      <div className="font-bold text-cyan-400">{hosp.oxygenReservesHours}h</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Selected Hospital Inspector Card */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 text-xs">
            <div className="flex justify-between items-center font-bold text-white">
              <span>Selected Node: {selectedHospitalForInspection.name}</span>
              <span className="text-teal-400">{selectedHospitalForInspection.phone}</span>
            </div>
            <div className="text-slate-300 flex flex-wrap gap-2">
              <span className="text-slate-400">Specialties:</span>
              {selectedHospitalForInspection.specialties.map((s, i) => (
                <span key={i} className="px-2 py-0.2 rounded bg-slate-900 border border-slate-800 text-[10px] text-teal-300">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT 5 Cols: AI Intelligent Emergency Routing Engine */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/30 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 text-[10px] font-bold border border-rose-500/30 mb-1">
                <Zap className="w-3 h-3 text-rose-400" />
                AI Smart Routing Engine
              </div>
              <h3 className="text-base font-bold text-white">Intelligent Ambulance Dispatch Simulator</h3>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Simulated Emergency Acuity</label>
              <select
                value={simulatedAcuity}
                onChange={(e) => setSimulatedAcuity(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              >
                <option value="STEMI Cardiac">Acute STEMI Heart Attack (Requires Immediate Cath Lab)</option>
                <option value="Severe Poly-Trauma">Severe Poly-Trauma & Crush Injury (Level 1 Trauma)</option>
                <option value="Acute Stroke">Acute Ischemic Stroke &lt; 3 Hours (Requires Neuro ICU)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Incident GPS Location</label>
              <input
                type="text"
                value={simulatedPatientLocation}
                onChange={(e) => setSimulatedPatientLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <button
              onClick={handleSimulateRouting}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950 flex items-center justify-center gap-2 cursor-pointer transition-transform"
            >
              <Zap className="w-4 h-4" />
              Compute Optimal Verified Hospital Routing
            </button>

            {/* AI Recommendation Result Box */}
            {routingRecommendation && (
              <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/40 space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">
                    AI Recommended Destination
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    ETA ~{routingRecommendation.etaMin} mins
                  </span>
                </div>

                <div className="font-bold text-sm text-white">
                  {routingRecommendation.bestHospital.name}
                </div>

                <div className="text-[11px] text-emerald-400 font-medium">
                  ✓ {routingRecommendation.icuMatch}
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  {routingRecommendation.reason}
                </p>

                <button
                  onClick={() => {
                    dispatchAmbulance(simulatedPatientLocation, routingRecommendation.bestHospital.id, simulatedAcuity);
                    setEmergencySosModalOpen(true);
                  }}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs cursor-pointer shadow"
                >
                  Confirm AI Dispatch & Activate Green Corridor
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
