import React, { useState } from 'react';
import { MOCK_DISEASE_TREND_FORECASTS } from '../../data/aiPredictiveData';
import { DiseaseTrendForecast } from '../../types';
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
  Legend
} from 'recharts';
import {
  TrendingUp,
  AlertTriangle,
  Activity,
  HeartPulse,
  Wind,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  Flame,
  PlusCircle,
  Clock,
  Layers,
  Thermometer,
  Pill,
  Droplets
} from 'lucide-react';
import { useHealthGrid } from '../../context/HealthGridContext';

export const AIPatientInfluxInsights: React.FC = () => {
  const { showToast } = useHealthGrid();

  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>('disease-respiratory');
  const [fastTrackProtocolActive, setFastTrackProtocolActive] = useState<Record<string, boolean>>({
    'disease-respiratory': true
  });
  const [orderedLabBundleIds, setOrderedLabBundleIds] = useState<string[]>([]);

  const selectedDisease: DiseaseTrendForecast =
    MOCK_DISEASE_TREND_FORECASTS.find((d) => d.id === selectedDiseaseId) ||
    MOCK_DISEASE_TREND_FORECASTS[0];

  const totalForecastedCases = MOCK_DISEASE_TREND_FORECASTS.reduce(
    (acc, curr) => acc + curr.projectedWeeklyCases,
    0
  );

  const handleToggleProtocol = (id: string, name: string) => {
    const nextState = !fastTrackProtocolActive[id];
    setFastTrackProtocolActive({
      ...fastTrackProtocolActive,
      [id]: nextState
    });
    if (nextState) {
      showToast(`AI Fast-Track Protocol Activated for ${name}: OPD Triage Priority & Pre-orders Enabled.`);
    } else {
      showToast(`Fast-Track Protocol for ${name} returned to Standard triage.`);
    }
  };

  const handleOrderLabBundle = (diseaseName: string) => {
    if (orderedLabBundleIds.includes(selectedDisease.id)) {
      showToast(`Emergency diagnostic test bundle already dispatched to central pathology lab.`);
      return;
    }
    setOrderedLabBundleIds([...orderedLabBundleIds, selectedDisease.id]);
    showToast(`Diagnostic Pre-stock Order Placed: 200 units reserved for ${diseaseName}.`);
  };

  return (
    <div id="ai-patient-influx-insights" className="space-y-6 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-teal-950/70 border border-indigo-500/40 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              Nirnay Clinical Epidemiological Intelligence
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              AI Patient Influx & Disease Surge Trends
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Predictive forecasting of upcoming outpatient and inpatient disease patterns across NCR. Allows clinical staff to prepare OPD triage, diagnostic lab inventories, and ICU resuscitation bays ahead of epidemic waves.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <button
              onClick={() => showToast('Epidemiological Summary PDF report generated and downloaded.')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer border border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              Export Weekly Clinical Brief
            </button>
          </div>
        </div>
      </div>

      {/* 4 Disease Influx Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_DISEASE_TREND_FORECASTS.map((disease) => {
          const isSelected = selectedDiseaseId === disease.id;
          const isSurge = disease.trendDirection === 'surge';
          const isModerate = disease.trendDirection === 'moderate';

          return (
            <button
              key={disease.id}
              type="button"
              onClick={() => setSelectedDiseaseId(disease.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
                isSelected
                  ? 'bg-indigo-950/70 border-indigo-500 ring-2 ring-indigo-500/50 shadow-xl'
                  : isSurge
                  ? 'bg-rose-950/20 border-rose-600/30 hover:border-rose-500'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-xs text-white line-clamp-1">{disease.shortName}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    disease.riskLevel === 'Severe Alert'
                      ? 'bg-rose-600 text-white animate-pulse'
                      : disease.riskLevel === 'Moderate Warning'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {disease.riskLevel}
                </span>
              </div>

              <div>
                <div className="text-2xl font-bold font-mono text-white flex items-baseline gap-2">
                  {disease.projectedWeeklyCases}
                  <span
                    className={`text-xs font-semibold ${
                      isSurge ? 'text-rose-400' : isModerate ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    +{disease.percentageChange}% surge
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Baseline avg: {disease.historicalWeeklyAvg} cases/wk
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                <span className="text-slate-400">Target Group:</span>
                <span className="text-teal-300 font-medium truncate max-w-[140px]">
                  {disease.ageGroupVulnerability.split('(')[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Forecast & Clinical Response Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Projection Chart */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">
                  7-Day Projected Influx Curve vs Historical Baseline: {selectedDisease.shortName}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Calculated via Gaussian epidemic dispersion + weather telemetry
              </p>
            </div>
            <span className="text-xs font-bold text-amber-400 font-mono">
              Peak: Fri (+92% over baseline)
            </span>
          </div>

          {/* Chart */}
          <div className="h-64 w-full bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selectedDisease.dailyTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
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
                  formatter={(val: any, name: any) => [
                    `${val} Admissions/Day`,
                    name === 'cases' ? 'Projected Daily Cases' : 'Historical Normal Baseline'
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Area
                  type="monotone"
                  dataKey="cases"
                  name="Projected Surge Cases"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCases)"
                />
                <Line
                  type="monotone"
                  dataKey="baseline"
                  name="Historical Baseline"
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Environmental / Causal Drivers */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5">
            <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Thermometer className="w-3.5 h-3.5" />
              Key Epidemiological & Environmental Drivers
            </h4>
            <ul className="space-y-1.5">
              {selectedDisease.environmentalDrivers.map((driver, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>{driver}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Doctor Actionable Protocols & Pre-orders */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-teal-400" />
                <h3 className="text-base font-bold text-white">
                  Clinical Action Recommendations
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Precautionary preparedness protocols for medical officers
              </p>
            </div>
            <button
              onClick={() => handleToggleProtocol(selectedDisease.id, selectedDisease.shortName)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                fastTrackProtocolActive[selectedDisease.id]
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {fastTrackProtocolActive[selectedDisease.id] ? 'Active Protocol' : 'Enable Fast Track'}
            </button>
          </div>

          {/* Clinical Steps */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Department Preparedness Actions
            </h4>
            <div className="space-y-2">
              {selectedDisease.clinicalPreparednessActions.map((act, i) => (
                <div key={i} className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fast-Track Diagnostic Tests */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                Recommended Rapid Lab Tests
              </h4>
              <button
                onClick={() => handleOrderLabBundle(selectedDisease.shortName)}
                className={`text-[11px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  orderedLabBundleIds.includes(selectedDisease.id)
                    ? 'bg-emerald-600/30 text-emerald-300'
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                }`}
              >
                {orderedLabBundleIds.includes(selectedDisease.id) ? '✓ Pre-ordered' : '+ Pre-stock Bundles'}
              </button>
            </div>

            <div className="space-y-1.5">
              {selectedDisease.fastTrackLabTests.map((test, i) => (
                <div key={i} className="px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300 flex justify-between items-center">
                  <span>{test}</span>
                  <span className="text-[10px] text-slate-400">Emergency TAT &lt;20m</span>
                </div>
              ))}
            </div>
          </div>

          {/* Essential Drug Buffers */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5 text-amber-400" />
              Essential Drug Buffers to Maintain
            </h4>
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1.5">
              {selectedDisease.recommendedMedicationBuffer.map((med, i) => (
                <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{med}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
