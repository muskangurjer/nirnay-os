import React, { useState } from 'react';
import { useHealthGrid } from '../../context/HealthGridContext';
import { BedItem, StaffMember } from '../../types';
import {
  MOCK_OXYGEN_CONSUMPTION,
  MOCK_OPD_FLOW_TIMELINE
} from '../../data/mockData';
import { AIPredictiveBedAnalytics } from './AIPredictiveBedAnalytics';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Bed,
  Users,
  Wind,
  Layers,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Cpu,
  DollarSign,
  Activity,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sliders,
  Building2,
  BrainCircuit,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    beds,
    updateBedStatus,
    staff,
    updateStaffShift,
    triagePatients,
    prioritizeTriageQueue,
    medicineStocks,
    restockMedicine,
    equipmentList,
    showToast
  } = useHealthGrid();

  const [adminTab, setAdminTab] = useState<
    'beds' | 'predictive' | 'triage' | 'roster' | 'flow' | 'supply' | 'payroll'
  >('beds');

  // Bed filter
  const [bedWardFilter, setBedWardFilter] = useState<'All' | 'ICU' | 'HDU' | 'General' | 'Private'>('All');
  const [bedStatusFilter, setBedStatusFilter] = useState<'All' | 'Available' | 'Occupied' | 'Under Sanitation'>('All');

  const filteredBeds = beds.filter((b) => {
    const matchesWard = bedWardFilter === 'All' || b.wardType === bedWardFilter;
    const matchesStatus = bedStatusFilter === 'All' || b.status === bedStatusFilter;
    return matchesWard && matchesStatus;
  });

  const availableCount = beds.filter((b) => b.status === 'Available').length;
  const occupiedCount = beds.filter((b) => b.status === 'Occupied').length;
  const sanitationCount = beds.filter((b) => b.status === 'Under Sanitation').length;

  return (
    <div id="admin-dashboard" className="space-y-6 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">AIIMS Apex Center — Resource Administration Hub</h2>
            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-bold text-[10px] border border-amber-500/30">
              Admin Level 3
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time Ward Grid, AI Triage Re-balancing, Oxygen & Essential Drug Logistics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400">Total Grid Beds</span>
            <div className="text-sm font-bold text-white">{beds.length} Live Units</div>
          </div>
          <div className="bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-500/30 text-center">
            <span className="text-[10px] text-emerald-300">Available Beds</span>
            <div className="text-sm font-bold text-emerald-400">{availableCount} Free</div>
          </div>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800 text-xs">
        {[
          { id: 'beds', label: 'Real-Time Bed Matrix', icon: <Bed className="w-3.5 h-3.5" /> },
          { id: 'predictive', label: 'AI Predictive Bed & Staffing', icon: <BrainCircuit className="w-3.5 h-3.5 text-amber-400" /> },
          { id: 'triage', label: 'AI Triage & Prioritization', icon: <Zap className="w-3.5 h-3.5" /> },
          { id: 'roster', label: 'Staff Duty & Roster', icon: <Users className="w-3.5 h-3.5" /> },
          { id: 'flow', label: 'OPD Flow Optimization', icon: <Activity className="w-3.5 h-3.5" /> },
          { id: 'supply', label: 'Supply Chain & Oxygen AI', icon: <Wind className="w-3.5 h-3.5" /> },
          { id: 'payroll', label: 'Payroll & Financials', icon: <DollarSign className="w-3.5 h-3.5" /> }
        ].map((tab) => {
          const isActive = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-950 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1.5: AI PREDICTIVE BED & STAFFING ANALYTICS */}
      {adminTab === 'predictive' && <AIPredictiveBedAnalytics />}

      {/* TAB 1: REAL-TIME BED ALLOTMENT MATRIX */}
      {adminTab === 'beds' && (
        <div className="space-y-4">
          {/* AI Bed Surge Alert Callout */}
          <div className="p-3.5 bg-gradient-to-r from-amber-950/60 via-slate-900 to-rose-950/60 border border-amber-500/40 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white shrink-0 shadow animate-pulse">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-white">AI Neural Surge Forecast:</strong>
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    -4 ICU Deficit Risk on Thu-Fri
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Predicted 96% ICU capacity breach due to respiratory smog spike (AQI 380+).
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAdminTab('predictive')}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors shadow-md shadow-amber-950"
            >
              <span>View 7-Day Bed Forecast & Staffing AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bed Filters & Status Tabs */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3.5">
            {/* Row 1: Bed Status Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-slate-400 font-semibold mr-1">Status:</span>
                {[
                  {
                    id: 'All',
                    label: 'All Beds',
                    count: beds.length,
                    activeClass: 'bg-amber-600 text-white shadow-md shadow-amber-950/50 font-bold',
                    badgeClass: 'bg-amber-950 text-amber-200'
                  },
                  {
                    id: 'Available',
                    label: 'Available',
                    count: availableCount,
                    activeClass: 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50 font-bold',
                    badgeClass: 'bg-emerald-950 text-emerald-200'
                  },
                  {
                    id: 'Occupied',
                    label: 'Occupied',
                    count: occupiedCount,
                    activeClass: 'bg-rose-600 text-white shadow-md shadow-rose-950/50 font-bold',
                    badgeClass: 'bg-rose-950 text-rose-200'
                  },
                  {
                    id: 'Under Sanitation',
                    label: 'Under Sanitation',
                    count: sanitationCount,
                    activeClass: 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/50 font-bold',
                    badgeClass: 'bg-amber-900 text-amber-100'
                  }
                ].map((st) => {
                  const isSelected = bedStatusFilter === st.id;
                  return (
                    <button
                      key={st.id}
                      id={`bed-status-tab-${st.id.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setBedStatusFilter(st.id as any)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer border ${
                        isSelected
                          ? `${st.activeClass} border-transparent`
                          : 'bg-slate-800/90 text-slate-300 border-slate-700/80 hover:bg-slate-750 hover:text-white'
                      }`}
                    >
                      <span>{st.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                          isSelected ? st.badgeClass : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        {st.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Showing count indicator */}
              <div className="text-xs text-slate-400">
                Showing <strong className="text-white">{filteredBeds.length}</strong> of <strong className="text-white">{beds.length}</strong> beds
              </div>
            </div>

            {/* Row 2: Ward Category Filter & Quick Reset */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-slate-400 font-semibold mr-1">Ward Category:</span>
                {(['All', 'ICU', 'HDU', 'General', 'Private'] as const).map((w) => {
                  const isSelected = bedWardFilter === w;
                  return (
                    <button
                      key={w}
                      id={`bed-ward-tab-${w.toLowerCase()}`}
                      onClick={() => setBedWardFilter(w)}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer border ${
                        isSelected
                          ? 'bg-teal-600 text-white font-semibold border-teal-500 shadow-sm'
                          : 'bg-slate-800 text-slate-300 border-slate-700/70 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {w === 'All' ? 'All Wards' : `${w} Ward`}
                    </button>
                  );
                })}
              </div>

              {(bedStatusFilter !== 'All' || bedWardFilter !== 'All') && (
                <button
                  id="reset-bed-filters-btn"
                  onClick={() => {
                    setBedStatusFilter('All');
                    setBedWardFilter('All');
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer self-start sm:self-auto"
                >
                  Reset all filters
                </button>
              )}
            </div>
          </div>

          {/* Empty State when no beds match filter */}
          {filteredBeds.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
              <Bed className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">No Beds Found Matching Filters</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                There are currently no beds with status <strong className="text-slate-200">{bedStatusFilter}</strong> in the <strong className="text-slate-200">{bedWardFilter} Ward</strong>.
              </p>
              <button
                onClick={() => {
                  setBedStatusFilter('All');
                  setBedWardFilter('All');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            /* Grid of Bed Items */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredBeds.map((b) => {
                const isAvail = b.status === 'Available';
                const isOccupied = b.status === 'Occupied';
                const isSanitation = b.status === 'Under Sanitation';

                return (
                  <div
                    key={b.id}
                    className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                      isAvail
                        ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-500'
                        : isOccupied
                        ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                        : 'bg-amber-950/20 border-amber-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-white font-mono">{b.bedNumber}</span>
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {b.wardType}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isAvail
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : isOccupied
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1">
                      <div className="text-[11px] text-slate-400">{b.wardNumber}</div>
                      {b.currentPatient ? (
                        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 space-y-1">
                          <div className="font-bold text-white">{b.currentPatient.name}</div>
                          <div className="text-[10px] text-teal-300">{b.currentPatient.diagnosis}</div>
                          <div className="text-[9px] text-slate-400">Dr: {b.currentPatient.attendingDoctor}</div>
                        </div>
                      ) : (
                        <div className="py-2 text-[11px] text-emerald-400 italic">
                          Ready for instant emergency admission
                        </div>
                      )}
                    </div>

                    {/* Quick Action Toggle Status */}
                    <div className="pt-2 border-t border-slate-800 flex gap-1.5">
                      {isAvail ? (
                        <button
                          onClick={() => updateBedStatus(b.id, 'Occupied')}
                          className="flex-1 py-1 px-2 rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-600/40 text-rose-200 text-[10px] font-semibold cursor-pointer"
                        >
                          Admit Patient
                        </button>
                      ) : isOccupied ? (
                        <button
                          onClick={() => updateBedStatus(b.id, 'Under Sanitation')}
                          className="flex-1 py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold cursor-pointer"
                        >
                          Discharge & Sanitize
                        </button>
                      ) : (
                        <button
                          onClick={() => updateBedStatus(b.id, 'Available')}
                          className="flex-1 py-1 px-2 rounded bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200 text-[10px] font-semibold cursor-pointer"
                        >
                          Mark Ready (Available)
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: AI TRIAGE & EMERGENCY PRIORITIZATION ENGINE */}
      {adminTab === 'triage' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 text-xs font-semibold border border-rose-500/30 mb-1.5">
                <Zap className="w-3.5 h-3.5 text-rose-400" />
                Automated Clinical Severity Classifier (ESI Index)
              </div>
              <h3 className="text-base font-bold text-white">AI Emergency Triage Queue Optimizer</h3>
              <p className="text-xs text-slate-400">
                Dynamic queue re-ordering prioritizing unstable resuscitation cases over non-urgent OPD visits.
              </p>
            </div>

            <button
              onClick={prioritizeTriageQueue}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-teal-950 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Re-Calculate AI Priority Matrix
            </button>
          </div>

          <div className="space-y-3">
            {triagePatients.map((tp, idx) => (
              <div
                key={tp.id}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-teal-400">
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{tp.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Token: {tp.token}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                          tp.triageScore === 1 ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                        }`}
                      >
                        ESI Score {tp.triageScore}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">{tp.chiefComplaint}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right text-xs">
                    <span className="text-[10px] text-slate-400">Target Action:</span>
                    <div className="font-bold text-amber-300">{tp.recommendedAction}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 text-xs border border-slate-800">
                    {tp.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STAFF DUTY & ROSTER MANAGEMENT */}
      {adminTab === 'roster' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Clinical & Nursing Staff Allocation Board</h3>
              <p className="text-xs text-slate-400">Shift Coverage, ICU Ratios, and Ward Assignments</p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold">100% Shift Coverage Optimal</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {staff.map((st) => (
              <div key={st.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-white">{st.name}</h4>
                    <p className="text-[11px] text-teal-400 font-medium">{st.role}</p>
                    <p className="text-[10px] text-slate-400">{st.department}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    {st.status}
                  </span>
                </div>

                <div className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ward:</span>
                    <span className="font-medium text-white">{st.assignedWard}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Shift:</span>
                    <span className="text-amber-300 font-medium">{st.currentShift.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
                  <span>Exp: {st.experienceYears} Years</span>
                  <span>{st.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: OPD & DIAGNOSTIC FLOW OPTIMIZATION */}
      {adminTab === 'flow' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">AI OPD & Diagnostic Lifecycle Flow Prediction</h3>
              <p className="text-xs text-slate-400">
                Optimized Patient Journey: OPD Consultation ➔ Lab Test ➔ Report ➔ Follow-up
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-teal-950 text-teal-300 text-xs font-bold border border-teal-500/30">
              Avg Turnaround: 61 min
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_OPD_FLOW_TIMELINE.map((step, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">Stage 0{idx + 1}</span>
                  <span className="px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    {step.status}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-white">{step.step}</h4>
                <div className="flex justify-between text-xs text-slate-300 pt-1">
                  <span>Target Duration:</span>
                  <span className="font-bold text-teal-400 font-mono">{step.durationMin} mins</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Bottleneck Risk: <strong className="text-emerald-400">{step.bottleneckRisk}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SUPPLY CHAIN & OXYGEN AI */}
      {adminTab === 'supply' && (
        <div className="space-y-6">
          {/* Oxygen Consumption AreaChart */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Wind className="w-4 h-4 text-cyan-400" />
                  Liquid Medical Oxygen (LMO) Storage & Flow Telemetry
                </h3>
                <p className="text-xs text-slate-400">Live Cryogenic Tank Level (kL) vs Consumption Rate</p>
              </div>
              <span className="px-3 py-1 rounded-lg bg-cyan-950 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                72 Hours Reserve Remaining
              </span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_OXYGEN_CONSUMPTION} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="oxygenGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="liquidStockKl" name="Liquid Stock (kL)" stroke="#06b6d4" fillOpacity={1} fill="url(#oxygenGrad)" />
                  <Area type="monotone" dataKey="consumptionKl" name="Consumption (kL/hr)" stroke="#f43f5e" fillOpacity={0.2} fill="#f43f5e" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Essential Medicines Stock & 1-click Restock */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Essential Medicines & Predictive Shortage Alerts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {medicineStocks.map((med) => (
                <div key={med.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white text-xs">{med.name}</h4>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        med.status === 'Normal'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : med.status === 'Low Stock'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300 animate-pulse'
                      }`}
                    >
                      {med.status}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Stock: <strong className="text-white">{med.currentStock} {med.unit}</strong></span>
                    <span>Days Left: <strong className="text-amber-400">{med.daysRemaining} d</strong></span>
                  </div>

                  <button
                    onClick={() => restockMedicine(med.id, 200)}
                    className="w-full mt-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-[11px] cursor-pointer"
                  >
                    + Auto-Indent 200 {med.unit} (Jan Aushadhi)
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Status */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">High-Value Medical Equipment Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {equipmentList.map((eq) => (
                <div key={eq.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-white">
                    <span>{eq.name}</span>
                    <span className="text-[10px] text-teal-400">{eq.status}</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">{eq.department}</div>
                  <div className="flex justify-between text-slate-300 text-[11px] pt-1 border-t border-slate-900">
                    <span>Queue: {eq.queueLength} Patients</span>
                    <span>Utilization: {eq.utilizationRatePct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PAYROLL & FINANCIALS */}
      {adminTab === 'payroll' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Hospital Staff Monthly Payroll & DBT Disbursement</h3>
              <p className="text-xs text-slate-400">Direct Benefit Transfer via National Health Grid Escrow</p>
            </div>
            <button
              onClick={() => showToast('Monthly payroll cycle batch processed successfully.')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Run Batch Disbursement
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Total Monthly Salary Outlay</span>
              <div className="text-2xl font-bold text-white mt-1">₹1,84,50,000</div>
              <div className="text-[11px] text-emerald-400 mt-0.5">342 Doctors & Nursing Staff</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Government Scheme Grants Disbursed</span>
              <div className="text-2xl font-bold text-teal-400 mt-1">₹3,40,00,000</div>
              <div className="text-[11px] text-slate-400 mt-0.5">PM-JAY Reimbursement Pool</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Compliance & Tax Filings</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">100% Green</div>
              <div className="text-[11px] text-slate-400 mt-0.5">TDS & PF Reconciled</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
