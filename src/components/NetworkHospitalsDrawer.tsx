import React, { useState } from 'react';
import { useHealthGrid } from '../context/HealthGridContext';
import {
  Building2,
  X,
  Bed,
  Activity,
  Wind,
  Phone,
  MapPin,
  Star,
  Search,
  CheckCircle,
  AlertTriangle,
  Flame,
  ArrowUpRight
} from 'lucide-react';

export const NetworkHospitalsDrawer: React.FC = () => {
  const { hospitalsDrawerOpen, setHospitalsDrawerOpen, hospitals, dispatchAmbulance, setRole } = useHealthGrid();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');

  if (!hospitalsDrawerOpen) return null;

  const allSpecialties = ['All', 'Cardiology', 'Neurology', 'Trauma & Emergency', 'Oncology', 'Orthopedics', 'Pulmonology'];

  const filteredHospitals = hospitals.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSpecialty =
      selectedSpecialty === 'All' || h.specialties.includes(selectedSpecialty);

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div
      id="network-hospitals-drawer"
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-700/80 h-full flex flex-col shadow-2xl text-slate-100 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">Empaneled Network Hospitals</h2>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full">
                  {hospitals.length} Verified Centers
                </span>
              </div>
              <p className="text-xs text-slate-400">Live bed availability and trauma capability matrix</p>
            </div>
          </div>
          <button
            id="close-hospitals-drawer-btn"
            onClick={() => setHospitalsDrawerOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="hospitals-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by hospital name, specialty, or area..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {allSpecialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors cursor-pointer text-xs ${
                  selectedSpecialty === spec
                    ? 'bg-teal-600 text-white font-medium shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Hospital Cards List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredHospitals.map((hosp) => {
            const isAccepting = hosp.emergencyStatus === 'Accepting';
            return (
              <div
                key={hosp.id}
                id={`hospital-card-${hosp.id}`}
                className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all space-y-3.5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-sm font-bold text-white">{hosp.name}</h3>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-amber-300 border border-amber-500/20">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {hosp.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{hosp.location}</span>
                      <span>•</span>
                      <span className="text-teal-300 font-semibold">{hosp.distanceKm} km away</span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      isAccepting
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {isAccepting ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    {hosp.emergencyStatus}
                  </span>
                </div>

                {/* Key Capacity Vitals */}
                <div className="grid grid-cols-3 gap-2 bg-slate-900/90 rounded-lg p-2.5 border border-slate-800/80 text-xs">
                  <div className="text-center border-r border-slate-800">
                    <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                      <Bed className="w-3 h-3 text-teal-400" />
                      Total Free Beds
                    </div>
                    <div className="font-bold text-white text-sm mt-0.5">
                      <span className="text-emerald-400">{hosp.availableBeds}</span>
                      <span className="text-slate-500 text-xs font-normal"> / {hosp.totalBeds}</span>
                    </div>
                  </div>

                  <div className="text-center border-r border-slate-800">
                    <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                      <Activity className="w-3 h-3 text-rose-400" />
                      ICU Beds
                    </div>
                    <div className="font-bold text-white text-sm mt-0.5">
                      <span className="text-rose-400">{hosp.icuBedsAvailable}</span>
                      <span className="text-slate-500 text-xs font-normal"> / {hosp.totalIcuBeds}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                      <Wind className="w-3 h-3 text-cyan-400" />
                      Oxygen Reserve
                    </div>
                    <div className="font-bold text-cyan-400 text-sm mt-0.5">
                      {hosp.oxygenReservesHours} hrs
                    </div>
                  </div>
                </div>

                {/* Specialties Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {hosp.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] rounded bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Phone className="w-3.5 h-3.5 text-teal-400" />
                    <span>{hosp.phone}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        dispatchAmbulance(undefined, hosp.id);
                        setHospitalsDrawerOpen(false);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      <Flame className="w-3 h-3 text-rose-400" />
                      Route Ambulance
                    </button>
                    <button
                      onClick={() => {
                        setRole('patient');
                        setHospitalsDrawerOpen(false);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      Book OPD
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>National Health Grid Telemetry Active</span>
          </div>
          <span className="font-mono text-slate-500">Grid Latency: 14ms</span>
        </div>
      </div>
    </div>
  );
};
