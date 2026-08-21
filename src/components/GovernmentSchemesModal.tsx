import React, { useState } from 'react';
import { useHealthGrid } from '../context/HealthGridContext';
import { Shield, X, CheckCircle2, ExternalLink, Calculator, Award, Building, Sparkles } from 'lucide-react';

export const GovernmentSchemesModal: React.FC = () => {
  const { schemesModalOpen, setSchemesModalOpen, schemes, patient, showToast } = useHealthGrid();
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(schemes[0]?.id || 'scheme-pmjay');
  const [checkAbhaInput, setCheckAbhaInput] = useState(patient.abhaId);
  const [familyMembersCount, setFamilyMembersCount] = useState(4);
  const [eligibilityResult, setEligibilityResult] = useState<{
    status: 'Verified' | 'Pending';
    coverage: string;
    schemeName: string;
  } | null>({
    status: 'Verified',
    coverage: '₹5,00,000 / family / year (100% Cashless Coverage)',
    schemeName: 'Ayushman Bharat PM-JAY'
  });

  if (!schemesModalOpen) return null;

  const activeScheme = schemes.find((s) => s.id === selectedSchemeId) || schemes[0];

  const handleCheckEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    setEligibilityResult({
      status: 'Verified',
      coverage: '₹5,00,000 / family / year (100% Cashless Coverage)',
      schemeName: activeScheme.name
    });
    showToast(`Eligibility verified for ABHA: ${checkAbhaInput}`);
  };

  return (
    <div
      id="government-schemes-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-900/40">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">National Health Protection & Assurance Schemes</h2>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                  100% Cashless Grid
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Empowering 55+ Crore citizens under Ayushman Bharat (PM-JAY), CGHS, and State Health Frameworks.
              </p>
            </div>
          </div>
          <button
            id="close-schemes-modal-btn"
            onClick={() => setSchemesModalOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Scheme Selection Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {schemes.map((scheme) => {
              const isSelected = scheme.id === selectedSchemeId;
              return (
                <button
                  key={scheme.id}
                  id={`scheme-tab-${scheme.id}`}
                  onClick={() => setSelectedSchemeId(scheme.id)}
                  className={`flex flex-col text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-950/60 border-teal-500 shadow-md shadow-teal-950/40 ring-1 ring-teal-500'
                      : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-900 text-teal-400 border border-teal-500/20">
                      {scheme.code}
                    </span>
                    <span className="text-[10px] text-slate-400">{scheme.type}</span>
                  </div>
                  <h3 className="text-xs font-bold text-white line-clamp-2 mb-1">{scheme.name}</h3>
                  <p className="text-[11px] text-emerald-400 font-medium mt-auto">{scheme.coverageLimit}</p>
                </button>
              );
            })}
          </div>

          {/* Active Scheme Detailed Card */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold border border-emerald-600/30 mb-2">
                  <Award className="w-3.5 h-3.5" />
                  {activeScheme.badge}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">{activeScheme.name}</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {activeScheme.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                <div className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-center">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Annual Limit</div>
                  <div className="text-sm font-bold text-emerald-400">{activeScheme.coverageLimit}</div>
                </div>
                <div className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-center">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Beneficiaries</div>
                  <div className="text-sm font-bold text-teal-400">{activeScheme.beneficiariesCount}</div>
                </div>
              </div>
            </div>

            {/* Eligibility & Benefits Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Building className="w-4 h-4 text-teal-400" />
                  Eligibility Criteria
                </h4>
                <ul className="space-y-2">
                  {activeScheme.eligibleCriteria.map((criterion, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Key Program Benefits
                </h4>
                <ul className="space-y-2">
                  {activeScheme.keyBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive ABHA Eligibility Checker */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-5 h-5 text-teal-400" />
              <h4 className="text-sm font-bold text-white">Live Instant Scheme & Benefit Verification</h4>
            </div>
            <form onSubmit={handleCheckEligibility} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-6">
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  ABHA ID / Ayushman Card No.
                </label>
                <input
                  type="text"
                  value={checkAbhaInput}
                  onChange={(e) => setCheckAbhaInput(e.target.value)}
                  placeholder="e.g. 91-9482-1029-4821@abdm"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-xs font-medium text-slate-400 mb-1">Family Members</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={familyMembersCount}
                  onChange={(e) => setFamilyMembersCount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="sm:col-span-3">
                <button
                  type="submit"
                  id="verify-scheme-eligibility-btn"
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-teal-900/40"
                >
                  Verify Status
                </button>
              </div>
            </form>

            {eligibilityResult && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-emerald-300">Status: {eligibilityResult.status}</span>
                  <span className="text-xs text-slate-300">• {eligibilityResult.schemeName}</span>
                </div>
                <div className="text-xs font-bold text-emerald-400">
                  {eligibilityResult.coverage}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>National Health Authority (NHA) Helpdesk:</span>
            <span className="font-semibold text-teal-400">Toll Free 14555</span>
          </div>
          <button
            onClick={() => setSchemesModalOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
