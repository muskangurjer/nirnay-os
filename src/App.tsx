import React, { useState } from 'react';
import { HealthGridProvider, useHealthGrid } from './context/HealthGridContext';
import { SplashScreen } from './components/SplashScreen';
import { TopNavbar } from './components/TopNavbar';
import { GovernmentSchemesModal } from './components/GovernmentSchemesModal';
import { NetworkHospitalsDrawer } from './components/NetworkHospitalsDrawer';
import { NirnayAIChatbot } from './components/Chatbot/NirnayAIChatbot';
import { EmergencySosModal } from './components/Modals/EmergencySosModal';
import { PatientDashboard } from './components/Patient/PatientDashboard';
import { DoctorDashboard } from './components/Doctor/DoctorDashboard';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { SuperAdminDashboard } from './components/SuperAdmin/SuperAdminDashboard';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { role, toastMessage } = useHealthGrid();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Navbar */}
      <TopNavbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {role === 'patient' && <PatientDashboard />}
        {role === 'doctor' && <DoctorDashboard />}
        {role === 'admin' && <AdminDashboard />}
        {role === 'superadmin' && <SuperAdminDashboard />}
      </main>

      {/* Global Modals & Floating Tools */}
      <GovernmentSchemesModal />
      <NetworkHospitalsDrawer />
      <EmergencySosModal />
      <NirnayAIChatbot />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          id="global-toast-message"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-teal-500/50 shadow-2xl text-xs font-semibold text-teal-300 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <Info className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>NirnayOS • National Health Grid (Ayushman Bharat Digital Mission - ABDM)</span>
          <span>Emergency Support: Dial 108 / 102 (National Helpline) • 24/7 NHA 14555</span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <HealthGridProvider>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <DashboardContent />
      )}
    </HealthGridProvider>
  );
}
