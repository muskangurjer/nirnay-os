import React, { useState } from 'react';
import {
  MOCK_WEEKLY_BED_FORECAST,
  MOCK_STAFFING_RECOMMENDATIONS,
  MOCK_EQUIPMENT_RECOMMENDATIONS
} from '../../data/aiPredictiveData';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';
import {
  Bed,
  Users,
  AlertTriangle,
  TrendingUp,
  BrainCircuit,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Zap,
  Activity,
  Sliders,
  Send,
  PlusCircle,
  Stethoscope
} from 'lucide-react';
import { useHealthGrid } from '../../context/HealthGridContext';

export const AIPredictiveBedAnalytics: React.FC = () => {
  const { showToast } = useHealthGrid();

  const [selectedWardView, setSelectedWardView] = useState<'All' | 'ICU' | 'General' | 'HDU'>('All');
  const [selectedForecastDay, setSelectedForecastDay] = useState(MOCK_WEEKLY_BED_FORECAST[3]); // Default Thursday peak
  const [appliedStaffingIds, setAppliedStaffingIds] = useState<string[]>([]);
  const [reservedEquipmentIds, setReservedEquipmentIds] = useState<string[]>([]);
  const [overflowWardActive, setOverflowWardActive] = useState(false);

  // Peak metrics calculation
  const maxIcuShortage = Math.min(...MOCK_WEEKLY_BED_FORECAST.map((d) => d.projectedShortage));
  const peakDay = MOCK_WEEKLY_BED_FORECAST.reduce((prev, curr) =>
    curr.predictedSurgeRisk > prev.predictedSurgeRisk ? curr : prev
  );

  const handleApplyStaffing = (id: string, role: string) => {
    if (appliedStaffingIds.includes(id)) {
      showToast(`Roster adjustment already approved for ${role}.`);
      return;
    }
    setAppliedStaffingIds([...appliedStaffingIds, id]);
    showToast(`AI Roster Adjustment Applied: Float staffing mobilized for ${role}.`);
  };

  const handleReserveEquipment = (id: string, eqName: string) => {
    if (reservedEquipmentIds.includes(id)) {
      showToast(`Equipment buffer already requisitioned for ${eqName}.`);
      return;
    }
    setReservedEquipmentIds([...reservedEquipmentIds, id]);
    showToast(`AI Equipment Requisition Confirmed: Standby buffer allocated for ${eqName}.`);
  };

  const handleToggleOverflowWard = () => {
    setOverflowWardActive(!overflowWardActive);
    if (!overflowWardActive) {
      showToast('Emergency Annex Ward 4B Activated: +18 Flex-ICU & Step-down beds online!');
    } else {
      showToast('Emergency Annex Ward 4B returned to Standby mode.');
    }
  };

  return (
    <div id="ai-predictive-bed-analytics" className="space-y-6 animate-in fade-in duration-300">
      {/* AI Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-indigo-950/70 border border-amber-500/40 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
              <BrainCircuit className="w-4 h-4 text-amber-400 animate-pulse" />
              Nirnay AI 7-Day Predictive Neural Core
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Hospital Bed Demand Forecasting & Resource Staffing AI
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Multi-variant neural projection utilizing regional AQI smog indices, infectious vector telemetry,
              historical OPD admissions, and emergency 108 trauma inflow to predict bed shortages and optimize staffing 7 days ahead.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
            <button
              onClick={handleToggleOverflowWard}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                overflowWardActive
                  ? 'bg-emerald-600 text-white shadow-emerald-950 border border-emerald-400'
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950'
              }`}
            >
              <Zap className="w-4 h-4" />
              {overflowWardActive ? 'Annex Ward 4B Active (+18 Beds)' : 'Activate Flex Overflow Annex'}
            </button>
          </div>
        </div>
      </div>

      {/* 4 Key Predictive KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Peak Surge Day */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1.5 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Forecasted Peak Surge</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 font-mono">
            {peakDay.day}, {peakDay.date}
          </div>
          <div className="text-[11px] text-rose-300 font-semibold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            Surge Risk: {peakDay.predictedSurgeRisk}% Probability
          </div>
          <div className="text-[10px] text-slate-400 truncate mt-1">
            Driver: {peakDay.primarySurgeDriver.split('&')[0]}
          </div>
        </div>

        {/* Metric 2: Max ICU Bed Deficit Alert */}
        <div className="bg-slate-900/90 border border-rose-600/40 rounded-xl p-4 space-y-1.5 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Projected ICU Shortage</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400 font-mono">
            {maxIcuShortage} ICU Beds (Thu-Fri)
          </div>
          <div className="text-[11px] text-amber-300 font-semibold">
            {overflowWardActive ? 'Mitigated by Flex Annex' : 'Requires Pre-emptive Re-balancing'}
          </div>
          <div className="text-[10px] text-slate-400 truncate mt-1">
            Capacity: 14 Beds vs 18 Projected Influx
          </div>
        </div>

        {/* Metric 3: Net Inpatient Admissions */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>7-Day Net Admissions</span>
            <Activity className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">+1,272 Patients</div>
          <div className="text-[11px] text-teal-300 font-semibold">
            ↑ 26% higher than 4-week moving average
          </div>
          <div className="text-[10px] text-slate-400 truncate mt-1">
            Avg Inpatient Stay: 4.8 Days
          </div>
        </div>

        {/* Metric 4: AI Model Confidence */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Neural Projection Accuracy</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-indigo-400 font-mono">94.8% Confidence</div>
          <div className="text-[11px] text-emerald-400 font-semibold">
            Grounded in 36-Month Clinical Telemetry
          </div>
          <div className="text-[10px] text-slate-400 truncate mt-1">
            Refreshed 12 mins ago with live 108 GPS data
          </div>
        </div>
      </div>

      {/* SECTION 1: 7-DAY BED FORECASTING CHART & DAILY MATRIX */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5">
        {/* Controls & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bed className="w-4 h-4 text-amber-400" />
                7-Day Inpatient & Critical Care Bed Demand vs Capacity Projection
              </h3>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                AI FORECAST
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Compare projected daily demand across General, ICU, and HDU wards against existing licensed capacity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Filter Ward:</span>
            {(['All', 'ICU', 'General', 'HDU'] as const).map((ward) => (
              <button
                key={ward}
                onClick={() => setSelectedWardView(ward)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  selectedWardView === ward
                    ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-950'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {ward === 'All' ? 'Combined Grid' : `${ward} Ward`}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Forecast Chart */}
        <div className="h-72 w-full bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_WEEKLY_BED_FORECAST} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGeneral" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorIcu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorHdu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#f8fafc'
                }}
                formatter={(value: any, name: any) => [
                  `${value} Beds`,
                  name === 'generalDemand'
                    ? 'General Bed Demand'
                    : name === 'icuDemand'
                    ? 'ICU Bed Demand'
                    : name === 'hduDemand'
                    ? 'HDU Bed Demand'
                    : name
                ]}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                formatter={(val) => {
                  if (val === 'generalDemand') return 'General Demand';
                  if (val === 'icuDemand') return 'ICU Critical Demand';
                  if (val === 'hduDemand') return 'HDU Step-down Demand';
                  if (val === 'generalCapacity') return 'General Capacity (184 Beds)';
                  if (val === 'icuCapacity') return 'ICU Capacity (14 Beds)';
                  return val;
                }}
              />

              {/* Demand Areas */}
              {(selectedWardView === 'All' || selectedWardView === 'General') && (
                <Area
                  type="monotone"
                  dataKey="generalDemand"
                  stroke="#0ea5e9"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorGeneral)"
                />
              )}
              {(selectedWardView === 'All' || selectedWardView === 'HDU') && (
                <Area
                  type="monotone"
                  dataKey="hduDemand"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorHdu)"
                />
              )}
              {(selectedWardView === 'All' || selectedWardView === 'ICU') && (
                <Area
                  type="monotone"
                  dataKey="icuDemand"
                  stroke="#f43f5e"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorIcu)"
                />
              )}

              {/* Threshold Lines */}
              {(selectedWardView === 'All' || selectedWardView === 'General') && (
                <Line
                  type="monotone"
                  dataKey="generalCapacity"
                  stroke="#38bdf8"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  dot={false}
                />
              )}
              {(selectedWardView === 'All' || selectedWardView === 'ICU') && (
                <Line
                  type="monotone"
                  dataKey="icuCapacity"
                  stroke="#fda4af"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  dot={false}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 7-Day Day-by-Day Forecast Cards */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Day-by-Day Forecast Breakdown (Click day to inspect surge factors)
            </h4>
            <span className="text-[11px] text-slate-400">
              Selected: <strong className="text-amber-400">{selectedForecastDay.day}, {selectedForecastDay.date}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {MOCK_WEEKLY_BED_FORECAST.map((fDay) => {
              const isSelected = selectedForecastDay.day === fDay.day;
              const hasIcuDeficit = fDay.projectedShortage < 0;
              const isSurgeHigh = fDay.predictedSurgeRisk >= 75;

              return (
                <button
                  key={fDay.day}
                  type="button"
                  onClick={() => setSelectedForecastDay(fDay)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-amber-950/70 border-amber-500 ring-2 ring-amber-500/50 shadow-lg'
                      : hasIcuDeficit
                      ? 'bg-rose-950/30 border-rose-600/40 hover:border-rose-500'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{fDay.day}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{fDay.date}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">ICU:</span>
                      <span
                        className={`font-bold font-mono ${
                          hasIcuDeficit ? 'text-rose-400' : 'text-emerald-400'
                        }`}
                      >
                        {fDay.icuDemand}/{fDay.icuCapacity}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">General:</span>
                      <span className="font-mono text-slate-300">
                        {fDay.generalDemand}/{fDay.generalCapacity}
                      </span>
                    </div>
                  </div>

                  {/* Surge Probability Pill */}
                  <div
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded text-center truncate ${
                      isSurgeHigh
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {fDay.predictedSurgeRisk}% Risk
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Deep Dive Inspection Card */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                Detailed Influx Analysis: {selectedForecastDay.day}, {selectedForecastDay.date}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  selectedForecastDay.projectedShortage < 0
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {selectedForecastDay.projectedShortage < 0
                  ? `DEFICIT WARNING (${selectedForecastDay.projectedShortage} ICU BEDS)`
                  : `SAFE CAPACITY (+${selectedForecastDay.projectedShortage} BUFFER)`}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Confidence Score: <strong className="text-teal-400">{selectedForecastDay.confidenceScore}%</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-900 p-3 rounded-lg space-y-1">
              <span className="text-slate-400 text-[10px]">Primary Surge Driver</span>
              <div className="font-semibold text-amber-300">{selectedForecastDay.primarySurgeDriver}</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg space-y-1">
              <span className="text-slate-400 text-[10px]">ICU vs HDU Allocation</span>
              <div className="font-semibold text-white">
                ICU Demand: <span className="text-rose-400">{selectedForecastDay.icuDemand}</span> | HDU Demand: <span className="text-amber-400">{selectedForecastDay.hduDemand}</span>
              </div>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg space-y-1">
              <span className="text-slate-400 text-[10px]">Recommended Action</span>
              <div className="font-semibold text-emerald-300">
                {selectedForecastDay.projectedShortage < 0
                  ? 'Convert 4 HDU step-down units to full ICU ventilators'
                  : 'Maintain standard elective admission schedules'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: AI RESOURCE & STAFFING RECOMMENDATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Staffing Recommendations */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <h3 className="text-base font-bold text-white">
                  AI Duty Roster & Staffing Allocation Suggestions
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic nurse-to-patient and specialist rebalancing to prevent emergency shift fatigue.
              </p>
            </div>
            <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
              {MOCK_STAFFING_RECOMMENDATIONS.length} PROPOSALS
            </span>
          </div>

          <div className="space-y-3">
            {MOCK_STAFFING_RECOMMENDATIONS.map((rec) => {
              const isApplied = appliedStaffingIds.includes(rec.id);
              const isCritical = rec.priority === 'Critical';

              return (
                <div
                  key={rec.id}
                  className={`p-4 rounded-xl border space-y-3 transition-all ${
                    isApplied
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : isCritical
                      ? 'bg-slate-950/80 border-rose-600/40 hover:border-rose-500'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{rec.roleType}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            rec.priority === 'Critical'
                              ? 'bg-rose-600 text-white'
                              : rec.priority === 'High'
                              ? 'bg-amber-600 text-white'
                              : 'bg-indigo-600 text-white'
                          }`}
                        >
                          {rec.priority} Priority
                        </span>
                      </div>
                      <span className="text-xs text-indigo-300 font-medium">{rec.shiftTarget}</span>
                    </div>

                    <div className="text-right bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400">Current / Target: </span>
                      <strong className="text-xs font-mono text-white">
                        {rec.currentStaffing} → <span className="text-emerald-400">{rec.recommendedStaffing}</span>
                      </strong>
                      <div className="text-[10px] font-bold text-rose-400">+{rec.deficit} Staff Deficit</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
                    <strong className="text-slate-200">AI Rationale:</strong> {rec.rationale}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                    <span className="text-[11px] text-teal-300 font-medium">
                      💡 <strong>Proposed Action:</strong> {rec.suggestedAction}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleApplyStaffing(rec.id, rec.roleType)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                        isApplied
                          ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-950'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Roster Approved
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Apply AI Roster
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Equipment & Ventilator Buffer Logistics */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-400" />
                <h3 className="text-base font-bold text-white">
                  Equipment Buffering Suggestions
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Pre-allocate ventilators, oxygen devices & crash carts before peak.
              </p>
            </div>
            <span className="px-2 py-1 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/30">
              LOGISTICS AI
            </span>
          </div>

          <div className="space-y-3">
            {MOCK_EQUIPMENT_RECOMMENDATIONS.map((eq) => {
              const isReserved = reservedEquipmentIds.includes(eq.id);
              const isUrgent = eq.urgency === 'Immediate Action';

              return (
                <div
                  key={eq.id}
                  className={`p-3.5 rounded-xl border space-y-2.5 transition-all ${
                    isReserved
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : isUrgent
                      ? 'bg-slate-950/80 border-amber-500/40'
                      : 'bg-slate-950/80 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-white">{eq.equipmentName}</h4>
                      <span className="text-[10px] text-teal-400">{eq.category}</span>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        eq.urgency === 'Immediate Action'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : eq.urgency === 'Warning'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {eq.urgency}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-900 p-2 rounded-lg text-center text-[10px]">
                    <div>
                      <span className="text-slate-400">Available</span>
                      <div className="font-bold text-white font-mono">{eq.currentAvailable}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Est. Demand</span>
                      <div className="font-bold text-rose-400 font-mono">{eq.projectedDemand}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">AI Buffer</span>
                      <div className="font-bold text-emerald-400 font-mono">+{eq.recommendedBuffer}</div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300">{eq.actionRequired}</p>

                  <button
                    type="button"
                    onClick={() => handleReserveEquipment(eq.id, eq.equipmentName)}
                    className={`w-full py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                      isReserved
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                        : 'bg-teal-600 hover:bg-teal-500 text-white'
                    }`}
                  >
                    {isReserved ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Buffer Reserved
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-3.5 h-3.5" />
                        Requisition +{eq.recommendedBuffer} Standby Buffer
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
