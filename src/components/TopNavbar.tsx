import React, { useState } from 'react';
import { useHealthGrid } from '../context/HealthGridContext';
import { UserRole } from '../types';
import { SUPPORTED_LANGUAGES, LanguageCode } from '../data/translations';
import {
  Activity,
  Shield,
  Building2,
  User,
  Stethoscope,
  Building,
  Globe,
  Bot,
  AlertCircle,
  PhoneCall,
  Sparkles,
  Languages,
  ChevronDown
} from 'lucide-react';

export const TopNavbar: React.FC = () => {
  const {
    role,
    setRole,
    language,
    setLanguage,
    t,
    setSchemesModalOpen,
    setHospitalsDrawerOpen,
    setChatbotOpen,
    patient,
    ambulanceRequest,
    setEmergencySosModalOpen
  } = useHealthGrid();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const roleConfigs: { id: UserRole; labelKey: string; icon: React.ReactNode }[] = [
    { id: 'patient', labelKey: 'patientPortal', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'doctor', labelKey: 'doctorOpd', icon: <Stethoscope className="w-3.5 h-3.5" /> },
    { id: 'admin', labelKey: 'hospitalAdmin', icon: <Building className="w-3.5 h-3.5" /> },
    { id: 'superadmin', labelKey: 'regionalCommand', icon: <Globe className="w-3.5 h-3.5" /> }
  ];

  return (
    <header
      id="top-navbar"
      className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Platform Title */}
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
                <span className="hidden md:inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full bg-teal-950 text-teal-300 border border-teal-500/30">
                  National Health Grid
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Unified Clinical Operating System • Ayushman Bharat (ABDM)
              </p>
            </div>
          </div>

          {/* Quick Hub Navigation & Schemes */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Government Schemes Button */}
            <button
              id="nav-schemes-btn"
              onClick={() => setSchemesModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-colors cursor-pointer shadow-sm"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>{t('govSchemes')}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </button>

            {/* Empaneled Hospitals Drawer Button */}
            <button
              id="nav-hospitals-btn"
              onClick={() => setHospitalsDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-colors cursor-pointer shadow-sm"
            >
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>{t('networkHospitals')}</span>
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-teal-950 text-teal-300 border border-teal-500/30">
                6 Live
              </span>
            </button>

            {/* Emergency 108 Hotline */}
            <button
              id="nav-emergency-sos-btn"
              onClick={() => setEmergencySosModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900/90 border border-rose-600/40 text-xs font-bold text-rose-200 transition-colors cursor-pointer shadow-sm shadow-rose-950/50"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>{t('emergencySos')}</span>
            </button>
          </div>

          {/* Role Switcher, Language & Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Multi-Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
                title="Change Language"
              >
                <Languages className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden sm:inline">
                  {SUPPORTED_LANGUAGES.find((l) => l.code === language)?.nativeName || 'Language'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div
                  id="language-dropdown-menu"
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

            {/* Global Role Switcher Pill Bar */}
            <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800">
              {roleConfigs.map((r) => {
                const isActive = role === r.id;
                return (
                  <button
                    key={r.id}
                    id={`role-switch-${r.id}`}
                    onClick={() => setRole(r.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-md shadow-teal-950'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {r.icon}
                    <span className="hidden sm:inline">{t(r.labelKey)}</span>
                  </button>
                );
              })}
            </div>

            {/* Nirnay AI Quick Trigger */}
            <button
              id="nav-chatbot-btn"
              onClick={() => setChatbotOpen(true)}
              className="relative p-2 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 text-white shadow-md shadow-teal-900/40 hover:scale-105 transition-transform cursor-pointer"
              title="Open Nirnay AI Assistant"
            >
              <Bot className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-bar for Schemes & Hospitals */}
        <div className="flex lg:hidden items-center justify-between py-2 border-t border-slate-900 text-xs overflow-x-auto gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSchemesModalOpen(true)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-emerald-400"
            >
              <Shield className="w-3 h-3" /> Schemes (PM-JAY)
            </button>
            <button
              onClick={() => setHospitalsDrawerOpen(true)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-teal-400"
            >
              <Building2 className="w-3 h-3" /> Hospitals (6)
            </button>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            ABHA: {patient.name.split(' ')[0]}
          </div>
        </div>
      </div>

      {/* Live Ambulance Header Banner (if active) */}
      {ambulanceRequest && (
        <div
          id="active-ambulance-banner"
          onClick={() => setEmergencySosModalOpen(true)}
          className="bg-rose-900/90 border-t border-b border-rose-600 text-white px-4 py-1.5 text-xs font-semibold flex items-center justify-between cursor-pointer hover:bg-rose-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span>
              EMERGENCY AMBULANCE ACTIVE: Unit #{ambulanceRequest.ambulanceNumber} is {ambulanceRequest.status}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-rose-950 px-2 py-0.5 rounded text-amber-300 font-mono">
              ETA: {ambulanceRequest.etaMinutes} mins
            </span>
            <span className="underline text-[11px]">Track Map &rarr;</span>
          </div>
        </div>
      )}
    </header>
  );
};
