import React, { useState } from 'react';
import { useHealthGrid } from '../context/HealthGridContext';
import { UserRole } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/translations';
import {
  Activity,
  User,
  Stethoscope,
  Building,
  Globe,
  ShieldCheck,
  Building2,
  PhoneCall,
  Languages,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Bed,
  HeartPulse,
  Bot,
  Layers,
  Zap,
  FileText,
  Clock,
  Radio,
  Ambulance,
  Lock,
  Cpu,
  BarChart3,
  Network
} from 'lucide-react';

export const RoleSelectionLanding: React.FC = () => {
  const {
    selectRole,
    language,
    setLanguage,
    t,
    setSchemesModalOpen,
    setHospitalsDrawerOpen,
    setEmergencySosModalOpen,
    setChatbotOpen,
    hospitals,
    beds
  } = useHealthGrid();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const totalAvailableBeds = beds.filter((b) => b.status === 'Available').length;

  const roleOptions: {
    id: UserRole;
    title: string;
    badge: string;
    tagline: string;
    description: string;
    icon: React.ReactNode;
    colorTheme: {
      border: string;
      hoverBorder: string;
      gradient: string;
      badgeBg: string;
      badgeText: string;
      iconBg: string;
      iconColor: string;
      buttonBg: string;
      accentShadow: string;
    };
    features: { icon: React.ReactNode; text: string }[];
    metrics: string;
  }[] = [
    {
      id: 'patient',
      title: 'Patient Dashboard',
      badge: 'ABHA & PM-JAY Integrated',
      tagline: 'Citizen Healthcare & Personal Health Record',
      description:
        'Live OPD token queue tracking, specialist appointments, ABDM health locker, digital prescriptions, AI diet planner & 108 SOS ambulance dispatch.',
      icon: <User className="w-7 h-7 text-teal-400" />,
      colorTheme: {
        border: 'border-teal-500/30',
        hoverBorder: 'hover:border-teal-400 hover:shadow-teal-500/10',
        gradient: 'from-slate-900 via-slate-900 to-teal-950/40',
        badgeBg: 'bg-teal-950 text-teal-300 border-teal-500/30',
        badgeText: 'text-teal-300',
        iconBg: 'bg-teal-500/10 border-teal-500/30',
        iconColor: 'text-teal-400',
        buttonBg: 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-teal-950/60',
        accentShadow: 'group-hover:shadow-teal-500/20'
      },
      features: [
        { icon: <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />, text: '14-Digit ABHA ID & Health Locker' },
        { icon: <Clock className="w-3.5 h-3.5 text-teal-400" />, text: 'Live OPD Token Queue & Wait Times' },
        { icon: <FileText className="w-3.5 h-3.5 text-teal-400" />, text: 'E-Prescriptions & Lab Test Reports' },
        { icon: <Sparkles className="w-3.5 h-3.5 text-teal-400" />, text: 'AI Personalized Nutrition & Diet' },
        { icon: <Ambulance className="w-3.5 h-3.5 text-teal-400" />, text: '108 Cashless Emergency SOS' }
      ],
      metrics: 'Active ABHA: 14-8921-4820-9182'
    },
    {
      id: 'doctor',
      title: 'Doctor Dashboard',
      badge: 'Clinical Decision Support',
      tagline: 'Outpatient Clinic & Emergency Consultation',
      description:
        'Inbound live token queue, critical emergency admission buzzer alert, instant ABHA medical history retrieval, vitals trend visualizer & e-Rx generation.',
      icon: <Stethoscope className="w-7 h-7 text-cyan-400" />,
      colorTheme: {
        border: 'border-cyan-500/30',
        hoverBorder: 'hover:border-cyan-400 hover:shadow-cyan-500/10',
        gradient: 'from-slate-900 via-slate-900 to-cyan-950/40',
        badgeBg: 'bg-cyan-950 text-cyan-300 border-cyan-500/30',
        badgeText: 'text-cyan-300',
        iconBg: 'bg-cyan-500/10 border-cyan-500/30',
        iconColor: 'text-cyan-400',
        buttonBg: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-950/60',
        accentShadow: 'group-hover:shadow-cyan-500/20'
      },
      features: [
        { icon: <HeartPulse className="w-3.5 h-3.5 text-cyan-400" />, text: 'Emergency Admission Buzzer Alert' },
        { icon: <Clock className="w-3.5 h-3.5 text-cyan-400" />, text: 'Real-Time Inbound OPD Queue' },
        { icon: <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />, text: 'ABHA 14-Digit Medical History' },
        { icon: <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />, text: 'Vitals Timeline & Chronic Analytics' },
        { icon: <FileText className="w-3.5 h-3.5 text-cyan-400" />, text: 'ABDM Verified E-Prescriptions' }
      ],
      metrics: 'Dr. Alok Verma • Cardiology OPD'
    },
    {
      id: 'admin',
      title: 'Admin Dashboard',
      badge: 'AI Resource Management',
      tagline: 'Hospital Bed & Clinical Operations Matrix',
      description:
        'Real-time bed allotment matrix (ICU, HDU, General), AI triage queue rebalancing, clinical staff rosters, oxygen analytics, medicine stocks & payroll.',
      icon: <Building className="w-7 h-7 text-amber-400" />,
      colorTheme: {
        border: 'border-amber-500/30',
        hoverBorder: 'hover:border-amber-400 hover:shadow-amber-500/10',
        gradient: 'from-slate-900 via-slate-900 to-amber-950/40',
        badgeBg: 'bg-amber-950 text-amber-300 border-amber-500/30',
        badgeText: 'text-amber-300',
        iconBg: 'bg-amber-500/10 border-amber-500/30',
        iconColor: 'text-amber-400',
        buttonBg: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-950/60',
        accentShadow: 'group-hover:shadow-amber-500/20'
      },
      features: [
        { icon: <Bed className="w-3.5 h-3.5 text-amber-400" />, text: 'Real-Time Bed Allotment Matrix' },
        { icon: <Zap className="w-3.5 h-3.5 text-amber-400" />, text: 'AI Emergency Triage Re-balancing' },
        { icon: <Layers className="w-3.5 h-3.5 text-amber-400" />, text: 'Clinical Staff Shifts & Rosters' },
        { icon: <Activity className="w-3.5 h-3.5 text-amber-400" />, text: 'Oxygen Reserve & Stock Tracking' },
        { icon: <Lock className="w-3.5 h-3.5 text-amber-400" />, text: 'Institutional Payroll & Claims' }
      ],
      metrics: 'AIIMS Main Campus • 24 Live Wards'
    },
    {
      id: 'superadmin',
      title: 'Super Admin Dashboard',
      badge: 'National Health Surveillance',
      tagline: 'Multi-Hospital Command & Trauma Load Grid',
      description:
        'Interconnected telemetry across 6 regional hospitals, automated trauma diversion engine, critical ICU load redistribution & outbreak heatmaps.',
      icon: <Globe className="w-7 h-7 text-rose-400" />,
      colorTheme: {
        border: 'border-rose-500/30',
        hoverBorder: 'hover:border-rose-400 hover:shadow-rose-500/10',
        gradient: 'from-slate-900 via-slate-900 to-rose-950/40',
        badgeBg: 'bg-rose-950 text-rose-300 border-rose-500/30',
        badgeText: 'text-rose-300',
        iconBg: 'bg-rose-500/10 border-rose-500/30',
        iconColor: 'text-rose-400',
        buttonBg: 'bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white shadow-rose-950/60',
        accentShadow: 'group-hover:shadow-rose-500/20'
      },
      features: [
        { icon: <Network className="w-3.5 h-3.5 text-rose-400" />, text: 'Multi-Hospital Real-Time Telemetry' },
        { icon: <Cpu className="w-3.5 h-3.5 text-rose-400" />, text: 'Intelligent Trauma Diversion Engine' },
        { icon: <Bed className="w-3.5 h-3.5 text-rose-400" />, text: 'Regional ICU & Ventilator Load Balance' },
        { icon: <Radio className="w-3.5 h-3.5 text-rose-400" />, text: 'Regional Epidemic & Outbreak Heatmap' },
        { icon: <Ambulance className="w-3.5 h-3.5 text-rose-400" />, text: 'Centralized 108 Fleet Routing' }
      ],
      metrics: 'NCR Health Grid • 6 Empaneled Hubs'
    }
  ];

  return (
    <div
      id="role-selection-landing-screen"
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white relative overflow-x-hidden"
    >
      {/* Ambient background grid pattern and subtle glowing glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-35 pointer-events-none" />
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg shadow-teal-900/30 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-teal-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center">
                  Nirnay<span className="text-teal-400">OS</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full bg-teal-950 text-teal-300 border border-teal-500/30">
                  National Health Grid
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Ayushman Bharat Digital Mission (ABDM) • Unified Clinical Grid
              </p>
            </div>
          </div>

          {/* Quick Actions & Language */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Government Schemes Button */}
            <button
              id="landing-schemes-btn"
              onClick={() => setSchemesModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('govSchemes')}</span>
            </button>

            {/* Empaneled Hospitals */}
            <button
              id="landing-hospitals-btn"
              onClick={() => setHospitalsDrawerOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-teal-400" />
              <span>{t('networkHospitals')}</span>
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-teal-950 text-teal-300 border border-teal-500/30">
                {hospitals.length}
              </span>
            </button>

            {/* Emergency SOS 108 Hotline */}
            <button
              id="landing-emergency-sos-btn"
              onClick={() => setEmergencySosModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-600/40 text-xs font-bold text-rose-200 transition-colors cursor-pointer shadow-sm shadow-rose-950/50"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span className="hidden xs:inline">108 SOS</span>
            </button>

            {/* Multi-Language Dropdown */}
            <div className="relative">
              <button
                id="landing-language-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
              >
                <Languages className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden sm:inline">
                  {SUPPORTED_LANGUAGES.find((l) => l.code === language)?.nativeName || 'English'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div
                  id="landing-language-dropdown"
                  className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-700/90 rounded-xl shadow-2xl py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                    Select Language
                  </div>
                  {SUPPORTED_LANGUAGES.map((langOpt) => (
                    <button
                      key={langOpt.code}
                      onClick={() => {
                        setLanguage(langOpt.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 flex items-center justify-between transition-colors ${
                        language === langOpt.code
                          ? 'bg-teal-950/80 text-teal-300 font-bold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span>{langOpt.nativeName}</span>
                      <span className="text-[10px] text-slate-500">{langOpt.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Nirnay AI Trigger */}
            <button
              id="landing-chatbot-trigger-btn"
              onClick={() => setChatbotOpen(true)}
              className="p-2 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 text-white shadow-md shadow-teal-900/40 hover:scale-105 transition-transform cursor-pointer"
              title="Open Nirnay AI Assistant"
            >
              <Bot className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero & Role Selection Central Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center">
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-teal-500/30 text-teal-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Ayushman Bharat Digital Mission (ABDM) Interoperable Architecture</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t('selectDashboardTitle')}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {t('selectDashboardSubtitle')}
          </p>

          {/* Quick Network Status Ticker */}
          <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2 flex-wrap font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              6 Hospitals Connected
            </span>
            <span className="flex items-center gap-1.5 text-teal-400 bg-teal-950/40 px-2.5 py-1 rounded-lg border border-teal-500/20">
              <Bed className="w-3.5 h-3.5" />
              {totalAvailableBeds} Live Beds Available
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/20">
              <Radio className="w-3.5 h-3.5" />
              ABDM Gateway v3.2 Active
            </span>
          </div>
        </div>

        {/* Central 4 Dashboard Cards Grid */}
        <div
          id="dashboard-options-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {roleOptions.map((opt) => (
            <div
              key={opt.id}
              id={`role-card-${opt.id}`}
              onClick={() => selectRole(opt.id)}
              className={`group relative rounded-2xl border bg-gradient-to-b ${opt.colorTheme.gradient} ${opt.colorTheme.border} ${opt.colorTheme.hoverBorder} p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-xl shadow-slate-950/80 hover:shadow-2xl`}
            >
              {/* Card Header & Icon */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300 ${opt.colorTheme.iconBg}`}
                  >
                    {opt.icon}
                  </div>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${opt.colorTheme.badgeBg}`}
                  >
                    {opt.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                    {opt.title}
                  </h3>
                  <div className={`text-xs font-semibold mt-0.5 ${opt.colorTheme.badgeText}`}>
                    {opt.tagline}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                {/* Key Capabilities List */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Core Capabilities
                  </div>
                  <div className="space-y-1.5">
                    {opt.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        {feat.icon}
                        <span className="truncate">{feat.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer & Enter CTA Button */}
              <div className="pt-5 mt-5 border-t border-slate-800/80 space-y-3">
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Context:</span>
                  <span className="text-slate-300 font-semibold truncate max-w-[170px]">
                    {opt.metrics}
                  </span>
                </div>

                <button
                  id={`enter-dashboard-btn-${opt.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectRole(opt.id);
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer group-hover:opacity-95 ${opt.colorTheme.buttonBg}`}
                >
                  <span>Launch {opt.title.replace(' Dashboard', '')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/90 py-5 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-semibold text-slate-300">NirnayOS</span>
            <span>•</span>
            <span>National Health Grid (Ayushman Bharat Digital Mission - ABDM)</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>National Emergency Toll-Free: <strong className="text-rose-400">108 / 102</strong></span>
            <span>NHA Helpline: <strong className="text-teal-400">14555</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
};
