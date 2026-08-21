import React, { useState, useMemo } from 'react';
import {
  MOCK_EMERGENCY_TYPES,
  computeSmartHospitalMatches
} from '../../data/aiPredictiveData';
import { useHealthGrid } from '../../context/HealthGridContext';
import {
  Sparkles,
  MapPin,
  Clock,
  Bed,
  CheckCircle2,
  Shield,
  HeartPulse,
  Flame,
  Zap,
  Wind,
  AlertTriangle,
  ShieldAlert,
  Navigation,
  Radio,
  ArrowRight,
  ChevronRight,
  Building2,
  Activity,
  SlidersHorizontal
} from 'lucide-react';

interface AISmartHospitalRecommendationProps {
  selectedHospitalId: string;
  onSelectHospital: (hospitalId: string, emergencyComplaint?: string) => void;
  pickupLocation: string;
  compactMode?: boolean;
}

export const AISmartHospitalRecommendation: React.FC<AISmartHospitalRecommendationProps> = ({
  selectedHospitalId,
  onSelectHospital,
  pickupLocation,
  compactMode = false
}) => {
  const { hospitals, showToast } = useHealthGrid();

  const [selectedEmergencyTypeId, setSelectedEmergencyTypeId] = useState<string>('emer-cardiac');
  const [activeFilter, setActiveFilter] = useState<'All' | 'ICU_High' | 'Golden_Hour'>('All');

  // Compute live AI matched recommendations
  const rankedRecommendations = useMemo(() => {
    return computeSmartHospitalMatches(selectedEmergencyTypeId, pickupLocation, hospitals);
  }, [selectedEmergencyTypeId, pickupLocation, hospitals]);

  const selectedEmergency =
    MOCK_EMERGENCY_TYPES.find((e) => e.id === selectedEmergencyTypeId) ||
    MOCK_EMERGENCY_TYPES[0];

  const filteredRecommendations = rankedRecommendations.filter((rec) => {
    if (activeFilter === 'ICU_High') return rec.icuBedsAvailable >= 10;
    if (activeFilter === 'Golden_Hour') return rec.etaMinutes <= 10;
    return true;
  });

  const handleSelectEmergency = (emId: string) => {
    setSelectedEmergencyTypeId(emId);
    const em = MOCK_EMERGENCY_TYPES.find((e) => e.id === emId);
    if (em) {
      // Auto recommend the top 1 hospital
      const topMatches = computeSmartHospitalMatches(emId, pickupLocation, hospitals);
      if (topMatches.length > 0) {
        onSelectHospital(topMatches[0].hospital.id, em.defaultComplaint);
        showToast(`AI Recalibrated: ${topMatches[0].hospital.name} is the #1 matched facility for ${em.name}`);
      }
    }
  };

  const getEmergencyIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="w-4 h-4" />;
      case 'Flame':
        return <Flame className="w-4 h-4" />;
      case 'Zap':
        return <Zap className="w-4 h-4" />;
      case 'Wind':
        return <Wind className="w-4 h-4" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-4 h-4" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4" id="ai-smart-hospital-recommendation-module">
      {/* Header Banner */}
      <div className="p-3.5 bg-gradient-to-r from-rose-950/60 via-slate-950 to-indigo-950/60 border border-rose-500/40 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-900 animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-xs sm:text-sm text-white">
                AI Smart Routing & Target Hospital Match Engine
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                REAL-TIME TELEMETRY
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Evaluates live ICU beds, green corridor travel times, and emergency specialty readiness.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto text-[10px] text-teal-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
          <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>Grid Sync: 100% Active</span>
        </div>
      </div>

      {/* Emergency Chief Complaint Category Pills */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-300">
          Step 1: Select Chief Emergency Category (for specialized facility matching):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {MOCK_EMERGENCY_TYPES.map((em) => {
            const isSelected = selectedEmergencyTypeId === em.id;
            return (
              <button
                key={em.id}
                type="button"
                onClick={() => handleSelectEmergency(em.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-rose-950/70 border-rose-500 text-white shadow-md ring-1 ring-rose-500'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {getEmergencyIcon(em.iconName)}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs truncate text-white">{em.name.split('/')[0]}</div>
                  <div className="text-[10px] text-rose-300 truncate">{em.urgencyLevel}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Required Facilities & Criteria Card */}
      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Required Specialty & Critical Care Infrastructure:
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold">
            {selectedEmergency.matchingSpecialties.join(', ')}
          </span>
        </div>
        <p className="text-slate-200 font-medium">
          {selectedEmergency.requiredFacility}
        </p>
      </div>

      {/* Filter Tabs & Count */}
      <div className="flex items-center justify-between pt-1">
        <label className="text-xs font-semibold text-slate-300">
          Step 2: AI Recommended Target Hospitals (Ranked by Match Score):
        </label>
        <div className="flex items-center gap-1">
          {[
            { id: 'All', label: 'All Ranked' },
            { id: 'Golden_Hour', label: '⚡ <10 min ETA' },
            { id: 'ICU_High', label: '🛏️ 10+ ICU Beds' }
          ].map((flt) => (
            <button
              key={flt.id}
              type="button"
              onClick={() => setActiveFilter(flt.id as any)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer border ${
                activeFilter === flt.id
                  ? 'bg-rose-600 text-white border-rose-500 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital Recommendation Cards List */}
      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredRecommendations.map((rec) => {
          const isSelected = selectedHospitalId === rec.hospital.id;
          const isTopRank = rec.rank === 1;
          const isGoldenHour = rec.etaMinutes <= 10;

          return (
            <div
              key={rec.hospital.id}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-rose-950/70 border-rose-500 ring-2 ring-rose-500/60 shadow-xl'
                  : isTopRank
                  ? 'bg-slate-900/90 border-emerald-500/50 hover:border-emerald-400 shadow-md'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
              onClick={() => onSelectHospital(rec.hospital.id, selectedEmergency.defaultComplaint)}
            >
              {/* Top Banner Row */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isTopRank
                        ? 'bg-emerald-600 text-white shadow'
                        : isSelected
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    #{rec.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-xs sm:text-sm text-white">{rec.hospital.name}</h4>
                      {isTopRank && (
                        <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          TOP AI MATCH
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {rec.hospital.location}
                    </p>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="text-right shrink-0">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span className="font-mono font-extrabold text-xs text-amber-400">
                      {rec.matchScorePct}% Match
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-2 bg-slate-950/90 p-2 rounded-lg text-center text-xs mb-2 border border-slate-800/80">
                <div>
                  <div className="text-[9px] text-slate-400 uppercase">Live ETA</div>
                  <div className={`font-bold font-mono ${isGoldenHour ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {rec.etaMinutes} mins
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase">ICU Beds</div>
                  <div className="font-bold font-mono text-cyan-400">
                    {rec.icuBedsAvailable} Open
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase">Distance</div>
                  <div className="font-bold font-mono text-slate-200">
                    {rec.distanceKm} km
                  </div>
                </div>
              </div>

              {/* Facility Readiness & Matching Reason Chips */}
              <div className="space-y-1.5">
                <div className="text-[11px] text-slate-300 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <strong className="text-emerald-300">Readiness:</strong> {rec.facilityMatch.readinessStatus}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {rec.recommendationReasons.map((reason, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1"
                    >
                      {reason}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Select Footer */}
              <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  100% Cashless DBT Verified (PM-JAY)
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectHospital(rec.hospital.id, selectedEmergency.defaultComplaint);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Target Selected
                    </>
                  ) : (
                    <>
                      <span>Select Target Hospital</span>
                      <ChevronRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
