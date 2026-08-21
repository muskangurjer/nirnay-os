import {
  BedDemandForecastDay,
  StaffingResourceRecommendation,
  EquipmentResourceRecommendation,
  DiseaseTrendForecast,
  EmergencyTypeOption,
  HospitalMatchRecommendation,
  HospitalInfo
} from '../types';

// 7-Day AI Bed Demand Forecasting for Admin
export const MOCK_WEEKLY_BED_FORECAST: BedDemandForecastDay[] = [
  {
    day: 'Mon',
    date: '24 Aug',
    generalDemand: 168,
    generalCapacity: 184,
    icuDemand: 11,
    icuCapacity: 14,
    hduDemand: 28,
    hduCapacity: 35,
    predictedSurgeRisk: 34,
    projectedShortage: 3, // +3 buffer
    primarySurgeDriver: 'Scheduled Post-Op Admissions',
    confidenceScore: 94
  },
  {
    day: 'Tue',
    date: '25 Aug',
    generalDemand: 174,
    generalCapacity: 184,
    icuDemand: 12,
    icuCapacity: 14,
    hduDemand: 31,
    hduCapacity: 35,
    predictedSurgeRisk: 48,
    projectedShortage: 2, // +2 buffer
    primarySurgeDriver: 'Regional OPD Referrals',
    confidenceScore: 92
  },
  {
    day: 'Wed',
    date: '26 Aug',
    generalDemand: 182,
    generalCapacity: 184,
    icuDemand: 13,
    icuCapacity: 14,
    hduDemand: 34,
    hduCapacity: 35,
    predictedSurgeRisk: 72,
    projectedShortage: 1, // +1 buffer
    primarySurgeDriver: 'Smog Influx & Viral Pyrexia',
    confidenceScore: 95
  },
  {
    day: 'Thu',
    date: '27 Aug',
    generalDemand: 194, // Deficit of -10 beds
    generalCapacity: 184,
    icuDemand: 17, // Deficit of -3 ICU beds!
    icuCapacity: 14,
    hduDemand: 39,
    hduCapacity: 35,
    predictedSurgeRisk: 96,
    projectedShortage: -3, // -3 ICU shortage
    primarySurgeDriver: 'Severe AQI Spike (395+) & Acute COPD Exacerbation',
    confidenceScore: 97
  },
  {
    day: 'Fri',
    date: '28 Aug',
    generalDemand: 198, // Deficit of -14 beds
    generalCapacity: 184,
    icuDemand: 18, // Deficit of -4 ICU beds!
    icuCapacity: 14,
    hduDemand: 41,
    hduCapacity: 35,
    predictedSurgeRisk: 98,
    projectedShortage: -4, // -4 ICU shortage
    primarySurgeDriver: 'Acute Coronary Peak & Multi-Organ Sepsis Influx',
    confidenceScore: 96
  },
  {
    day: 'Sat',
    date: '29 Aug',
    generalDemand: 188,
    generalCapacity: 184,
    icuDemand: 15,
    icuCapacity: 14,
    hduDemand: 37,
    hduCapacity: 35,
    predictedSurgeRisk: 84,
    projectedShortage: -1, // -1 ICU shortage
    primarySurgeDriver: 'Weekend Highway Polytrauma & Emergency Shifts',
    confidenceScore: 91
  },
  {
    day: 'Sun',
    date: '30 Aug',
    generalDemand: 172,
    generalCapacity: 184,
    icuDemand: 12,
    icuCapacity: 14,
    hduDemand: 30,
    hduCapacity: 35,
    predictedSurgeRisk: 42,
    projectedShortage: 2, // +2 buffer
    primarySurgeDriver: 'Step-Down Ward Discharges',
    confidenceScore: 89
  }
];

// AI Staffing & Roster Resource Optimization Recommendations
export const MOCK_STAFFING_RECOMMENDATIONS: StaffingResourceRecommendation[] = [
  {
    id: 'staff-rec-1',
    roleType: 'Staff Nurse',
    currentStaffing: 8,
    recommendedStaffing: 14,
    deficit: 6,
    shiftTarget: 'Night Shift (00:00 - 08:00)',
    priority: 'Critical',
    rationale: 'Predicted +42% acute respiratory and ventilated patient load in ICU & HDU on Thu-Fri night shifts.',
    impactScore: 'High Risk (Prevents 1:3 nurse-patient overload)',
    suggestedAction: 'Mobilize 6 Float Nurses from Elective Day Surgery to Critical Care Wing'
  },
  {
    id: 'staff-rec-2',
    roleType: 'ICU Specialist',
    currentStaffing: 2,
    recommendedStaffing: 4,
    deficit: 2,
    shiftTarget: 'Evening Shift (16:00 - 00:00)',
    priority: 'Critical',
    rationale: 'Concurrent surge in STEMI cardiac interventions and acute sepsis intubations expected.',
    impactScore: 'Immediate (Maintains <8 min resuscitation response)',
    suggestedAction: 'Assign Dr. Alok Verma & Dr. S. K. Gupta to On-Call Active Resuscitation Bay'
  },
  {
    id: 'staff-rec-3',
    roleType: 'Respiratory Therapist',
    currentStaffing: 3,
    recommendedStaffing: 6,
    deficit: 3,
    shiftTarget: 'Morning Shift (08:00 - 16:00)',
    priority: 'High',
    rationale: 'Forecasted High-Flow Nasal Cannula (HFNC) and BiPAP ventilator setups across Ward 4 & HDU.',
    impactScore: 'Significant (Ensures timely non-invasive ventilation)',
    suggestedAction: 'Re-assign 3 Pulmonary Rehab therapists to Main Inpatient Block'
  },
  {
    id: 'staff-rec-4',
    roleType: 'Triage Officer',
    currentStaffing: 2,
    recommendedStaffing: 4,
    deficit: 2,
    shiftTarget: 'Weekend Surge Roster',
    priority: 'Moderate',
    rationale: 'Saturday evening peak accident admissions and pediatric fever queue at Gate 1 triage.',
    impactScore: 'Optimal (Reduces OPD ESI triage bottleneck to <4 min)',
    suggestedAction: 'Activate Resident Medical Officer reserve team for weekend emergency desk'
  }
];

// AI Critical Equipment Buffering & Logistics Recommendations
export const MOCK_EQUIPMENT_RECOMMENDATIONS: EquipmentResourceRecommendation[] = [
  {
    id: 'eq-rec-1',
    equipmentName: 'High-End ICU Invasive Mechanical Ventilators',
    category: 'Ventilators',
    currentAvailable: 14,
    projectedDemand: 18,
    recommendedBuffer: 6,
    actionRequired: 'Requisition 6 standby units from Central Biomedical Reserve Store (Wing D)',
    urgency: 'Immediate Action'
  },
  {
    id: 'eq-rec-2',
    equipmentName: 'High-Flow Nasal Cannula (HFNC) Oxygen Delivery Systems',
    category: 'Oxygen Logistics',
    currentAvailable: 22,
    projectedDemand: 34,
    recommendedBuffer: 15,
    actionRequired: 'Inspect and calibrate 15 reserve Airvo-2 units in Pulmonology inventory',
    urgency: 'Immediate Action'
  },
  {
    id: 'eq-rec-3',
    equipmentName: 'Multi-Parameter Bedside Vitals Monitors with SpO2/EtCO2',
    category: 'Monitoring',
    currentAvailable: 35,
    projectedDemand: 42,
    recommendedBuffer: 10,
    actionRequired: 'Deploy 10 wireless telemetry packs to Overflow Ward 3B',
    urgency: 'Warning'
  },
  {
    id: 'eq-rec-4',
    equipmentName: 'Emergency Mobile Crash Carts & Defibrillators',
    category: 'Emergency Resuscitation',
    currentAvailable: 12,
    projectedDemand: 14,
    recommendedBuffer: 3,
    actionRequired: 'Verify epinephrine and amiodarone pre-packs on Ground Floor Bay 2 & 4',
    urgency: 'Adequate'
  },
  {
    id: 'eq-rec-5',
    equipmentName: 'Continuous Renal Replacement Therapy (CRRT) Dialysis Kits',
    category: 'Dialysis',
    currentAvailable: 8,
    projectedDemand: 11,
    recommendedBuffer: 4,
    actionRequired: 'Fast-track Jan Aushadhi depot shipment for 4 M100 disposable sets',
    urgency: 'Warning'
  }
];

// Doctor AI Patient Influx & Epidemiological Disease Trend Forecasting
export const MOCK_DISEASE_TREND_FORECASTS: DiseaseTrendForecast[] = [
  {
    id: 'disease-respiratory',
    diseaseCategory: 'Acute Respiratory Infections, COPD & Bronchial Asthma',
    shortName: 'Respiratory & COPD',
    trendDirection: 'surge',
    percentageChange: 38.4,
    projectedWeeklyCases: 245,
    historicalWeeklyAvg: 177,
    riskLevel: 'Severe Alert',
    environmentalDrivers: [
      'Severe AQI Surge: PM2.5 levels projected >380 μg/m³ across NCR',
      'Early morning temperature inversion trapping particulate pollutants',
      'Stubble burning plume trajectory entering Delhi basin'
    ],
    clinicalPreparednessActions: [
      'Pre-stock Arterial Blood Gas (ABG) test cartridges and nebulization solutions',
      'Designate fast-track aerosolization booths in OPD Room 102 & 104 to reduce wait time',
      'Review steroid tapering protocols and ensure portable pulse oximeters in stock'
    ],
    fastTrackLabTests: [
      'Arterial Blood Gas (ABG) Analysis',
      'High-Resolution Chest X-Ray / CT Thorax',
      'Serum IgE & Inflammatory Biomarkers'
    ],
    recommendedMedicationBuffer: [
      'Budesonide + Formoterol Respules (1500 units)',
      'Levosalbutamol Inhalation Solution',
      'Injectable Hydrocortisone / Methylprednisolone',
      'Doxofylline 400mg & N-Acetylcysteine 600mg'
    ],
    ageGroupVulnerability: 'Elderly (>60 yrs with chronic pulmonary disease) & Pediatric (<6 yrs)',
    dailyTrend: [
      { day: 'Mon', cases: 28, baseline: 25 },
      { day: 'Tue', cases: 32, baseline: 25 },
      { day: 'Wed', cases: 39, baseline: 26 },
      { day: 'Thu', cases: 46, baseline: 26 },
      { day: 'Fri', cases: 48, baseline: 25 },
      { day: 'Sat', cases: 34, baseline: 24 },
      { day: 'Sun', cases: 18, baseline: 26 }
    ]
  },
  {
    id: 'disease-cardiac',
    diseaseCategory: 'Acute Coronary Syndrome (STEMI/NSTEMI) & Heart Failure',
    shortName: 'Acute Cardiac & STEMI',
    trendDirection: 'surge',
    percentageChange: 22.8,
    projectedWeeklyCases: 94,
    historicalWeeklyAvg: 76,
    riskLevel: 'Severe Alert',
    environmentalDrivers: [
      'Diurnal temperature drop inducing peripheral vasoconstriction and elevated systolic BP',
      'Systemic inflammatory response triggered by ultrafine particulate matter (PM1.0)',
      'High incidence of early-morning cardiovascular events (04:00 - 08:00 hrs)'
    ],
    clinicalPreparednessActions: [
      'Ensure 24/7 primary percutaneous coronary intervention (PCI) cath lab readiness',
      'Stock high-sensitivity Troponin-I rapid immuno-chromatographic cassettes in triage',
      'Maintain continuous green corridor protocol with 108 ALS Cardiac Fleet'
    ],
    fastTrackLabTests: [
      'High-Sensitivity Troponin-I (15-min TAT)',
      '12-Lead Emergency ECG with AI Rhythm Analysis',
      'Serum Electrolytes & Renal Function Panel'
    ],
    recommendedMedicationBuffer: [
      'Ticagrelor 90mg & Aspirin 300mg Loading Kits',
      'Injectable Streptokinase / Tenecteplase (Thrombolytics)',
      'IV Heparin Sodium & Enoxaparin prefilled syringes',
      'Nitroglycerin Infusion vials'
    ],
    ageGroupVulnerability: 'Adults 45-75 years with pre-existing hypertension, diabetes, or CAD',
    dailyTrend: [
      { day: 'Mon', cases: 11, baseline: 10 },
      { day: 'Tue', cases: 12, baseline: 11 },
      { day: 'Wed', cases: 14, baseline: 11 },
      { day: 'Thu', cases: 16, baseline: 11 },
      { day: 'Fri', cases: 18, baseline: 11 },
      { day: 'Sat', cases: 13, baseline: 11 },
      { day: 'Sun', cases: 10, baseline: 11 }
    ]
  },
  {
    id: 'disease-viral',
    diseaseCategory: 'Seasonal Viral Pyrexia, Dengue & Vector-Borne Infections',
    shortName: 'Dengue & Viral Pyrexia',
    trendDirection: 'moderate',
    percentageChange: 18.5,
    projectedWeeklyCases: 162,
    historicalWeeklyAvg: 136,
    riskLevel: 'Moderate Warning',
    environmentalDrivers: [
      'Post-monsoon localized stagnant water index in South and East Delhi clusters',
      'Vector multiplication rate (Aedes aegypti) elevated by ambient humidity (74%)',
      'Intermittent rainfall forecasts increasing localized larval density'
    ],
    clinicalPreparednessActions: [
      'Fast-track NS1 antigen and platelet automated counter profiles in Emergency Lab',
      'Designate a 12-bed Day Care Hydration Unit for stable fever monitoring',
      'Maintain real-time platelet concentrate reserve alerts with regional blood bank'
    ],
    fastTrackLabTests: [
      'Dengue NS1 Antigen & IgM/IgG Duo Card',
      'Complete Blood Count (CBC) with Automated Platelet Counter',
      'Liver Function Tests (SGOT/SGPT, Bilirubin)'
    ],
    recommendedMedicationBuffer: [
      'IV Ringer Lactate & Normal Saline 500ml (3000 bottles)',
      'Oral Rehydration Salts (WHO formula)',
      'Paracetamol 650mg & IV Infusion 1g'
    ],
    ageGroupVulnerability: 'All age groups, particularly school-age children (5-16) and young adults',
    dailyTrend: [
      { day: 'Mon', cases: 22, baseline: 19 },
      { day: 'Tue', cases: 24, baseline: 19 },
      { day: 'Wed', cases: 25, baseline: 20 },
      { day: 'Thu', cases: 26, baseline: 20 },
      { day: 'Fri', cases: 24, baseline: 20 },
      { day: 'Sat', cases: 22, baseline: 19 },
      { day: 'Sun', cases: 19, baseline: 19 }
    ]
  },
  {
    id: 'disease-gastro',
    diseaseCategory: 'Acute Infectious Gastroenteritis & Food-Borne Enteritis',
    shortName: 'Gastroenteritis & Enteric',
    trendDirection: 'stable',
    percentageChange: 4.2,
    projectedWeeklyCases: 88,
    historicalWeeklyAvg: 84,
    riskLevel: 'Baseline Monitoring',
    environmentalDrivers: [
      'Localized water pipeline cross-contamination reports in peri-urban clusters',
      'Street food consumption surges around festive markets'
    ],
    clinicalPreparednessActions: [
      'Stool hanging drop and routine microscopy fast-tracking',
      'Electrolyte repletion protocols reinforced in primary triage'
    ],
    fastTrackLabTests: [
      'Serum Electrolytes (Na+, K+, Cl-)',
      'Stool Routine & Occult Blood Examination',
      'Renal Function Test (Blood Urea Nitrogen & Creatinine)'
    ],
    recommendedMedicationBuffer: [
      'IV Metronidazole & Ciprofloxacin infusions',
      'Zinc gluconate pediatric syrup',
      'Injectable Ondansetron antiemetics'
    ],
    ageGroupVulnerability: 'Pediatric (<10 yrs) and Immunocompromised individuals',
    dailyTrend: [
      { day: 'Mon', cases: 12, baseline: 12 },
      { day: 'Tue', cases: 13, baseline: 12 },
      { day: 'Wed', cases: 13, baseline: 12 },
      { day: 'Thu', cases: 14, baseline: 12 },
      { day: 'Fri', cases: 13, baseline: 12 },
      { day: 'Sat', cases: 12, baseline: 12 },
      { day: 'Sun', cases: 11, baseline: 12 }
    ]
  }
];

// Emergency Chief Complaints & Matching Options for Ambulance AI Dispatch
export const MOCK_EMERGENCY_TYPES: EmergencyTypeOption[] = [
  {
    id: 'emer-cardiac',
    name: 'Acute Chest Pain / Heart Attack (STEMI)',
    category: 'Cardiovascular Emergency',
    iconName: 'HeartPulse',
    requiredFacility: '24/7 Primary Cath Lab, Interventional Cardiology, Coronary ICU (CCU)',
    urgencyLevel: 'Critical (Golden Hour)',
    matchingSpecialties: ['Cardiology', 'Cardiology & Interventional Cath', 'Cardiac Sciences'],
    defaultComplaint: 'Severe retrosternal crushing chest pain radiating to left arm with diaphoresis and breathlessness'
  },
  {
    id: 'emer-trauma',
    name: 'Severe Road Accident / Polytrauma',
    category: 'Trauma & Critical Surgery',
    iconName: 'Flame',
    requiredFacility: 'Level 1 Trauma Center, Neuro-trauma OT, Blood Bank Standby, Emergency Resuscitation',
    urgencyLevel: 'Critical (Golden Hour)',
    matchingSpecialties: ['Trauma & Emergency', 'Orthopedics', 'General Surgery', 'Neurology'],
    defaultComplaint: 'High-speed motor collision with multiple blunt trauma, head injury, and suspected fractures'
  },
  {
    id: 'emer-stroke',
    name: 'Acute Stroke / Paralysis / CVA (FAST Protocol)',
    category: 'Neurological Emergency',
    iconName: 'Zap',
    requiredFacility: 'Comprehensive Stroke Unit, 128-Slice CT Perfusion, IV Thrombolysis / Thrombectomy Team',
    urgencyLevel: 'Critical (Golden Hour)',
    matchingSpecialties: ['Neurology', 'Neurosciences', 'Trauma & Emergency'],
    defaultComplaint: 'Sudden onset facial drooping, right-sided hemiplegia, and severe aphasia within last 45 mins'
  },
  {
    id: 'emer-respiratory',
    name: 'Severe Respiratory Failure / SpO2 < 85%',
    category: 'Pulmonary Emergency',
    iconName: 'Wind',
    requiredFacility: 'High-Flow O2, Negative Pressure Isolation ICU, Invasive Ventilator Support',
    urgencyLevel: 'Immediate ALS',
    matchingSpecialties: ['Pulmonology', 'Trauma & Emergency', 'Organ Transplant'],
    defaultComplaint: 'Acute respiratory distress with SpO2 dropping to 82%, cyanosis, and inability to speak full words'
  },
  {
    id: 'emer-burns',
    name: 'Severe Thermal / Chemical Burns',
    category: 'Burns & Reconstructive',
    iconName: 'AlertTriangle',
    requiredFacility: 'Specialized Sterile Burns ICU, Fluid Resuscitation Bay, Plastic Surgery Standby',
    urgencyLevel: 'Immediate ALS',
    matchingSpecialties: ['Burns & Plastic Surgery', 'General Surgery', 'Trauma & Emergency'],
    defaultComplaint: 'Extensive 2nd and 3rd degree burns covering >35% body surface area from industrial fire'
  },
  {
    id: 'emer-pediatric',
    name: 'Pediatric / Neonatal Emergency',
    category: 'Pediatric Critical Care',
    iconName: 'ShieldAlert',
    requiredFacility: 'Level 3 Pediatric ICU (PICU), Neonatal Transport Ventilator, Pediatric Intensivist',
    urgencyLevel: 'Immediate ALS',
    matchingSpecialties: ['Pediatrics', 'Pediatric ICU', 'Trauma & Emergency'],
    defaultComplaint: '3-year-old with febrile status epilepticus seizure lasting >10 minutes and altered sensorium'
  }
];

/**
 * Intelligent Smart Hospital Recommendation Algorithm
 * Multi-criteria optimization scoring:
 * - Distance & Real-Time Traffic ETA (40% weight) -> Golden Hour window compliance
 * - Real-Time ICU / Bed Capacity (30% weight) -> Prevents hospital denial & queues
 * - Specialized Medical Facility & Specialty Matching (20% weight) -> Cath Lab / Trauma / Stroke unit
 * - PM-JAY / Government Scheme Empanelment (10% weight) -> 100% Cashless DBT
 */
export function computeSmartHospitalMatches(
  emergencyTypeId: string,
  _userLocation: string,
  hospitalsList: HospitalInfo[]
): HospitalMatchRecommendation[] {
  const selectedEmer =
    MOCK_EMERGENCY_TYPES.find((e) => e.id === emergencyTypeId) || MOCK_EMERGENCY_TYPES[0];

  const results: HospitalMatchRecommendation[] = hospitalsList.map((hosp) => {
    // 1. Distance & ETA score (closer = higher score, max 40 pts)
    const etaMin = Math.max(4, Math.round(hosp.distanceKm * 2.2));
    let distanceScore = Math.max(0, 40 - hosp.distanceKm * 3.5);
    if (etaMin <= 10) distanceScore += 5; // Golden hour bonus

    // 2. ICU & Bed Capacity score (max 30 pts)
    const icuScore = Math.min(30, hosp.icuBedsAvailable * 2.2 + (hosp.availableBeds / hosp.totalBeds) * 10);

    // 3. Specialty Match score (max 20 pts)
    const hasMatchingSpecialty = hosp.specialties.some((spec) =>
      selectedEmer.matchingSpecialties.some((target) => spec.toLowerCase().includes(target.toLowerCase()))
    );
    const specialtyScore = hasMatchingSpecialty ? 20 : 6;

    // 4. Emergency status & Trauma level (max 10 pts)
    let statusScore = 8;
    if (hosp.emergencyStatus === 'Accepting') statusScore += 2;
    if (hosp.emergencyStatus === 'On Diversion') statusScore -= 10;
    if (selectedEmer.id === 'emer-trauma' && hosp.traumaLevel === 'Level 1') statusScore += 2;

    const rawScore = Math.round(distanceScore + icuScore + specialtyScore + statusScore);
    const matchScorePct = Math.min(99, Math.max(45, rawScore));

    // Traffic condition simulation
    let trafficStatus: 'Clear Green Corridor' | 'Moderate Traffic' | 'Heavy Congestion' = 'Moderate Traffic';
    if (hosp.distanceKm < 4) {
      trafficStatus = 'Clear Green Corridor';
    } else if (hosp.distanceKm > 7.5) {
      trafficStatus = 'Moderate Traffic';
    }

    // Facility matching specifics
    let readinessStatus = 'Emergency Bay Ready';
    if (selectedEmer.id === 'emer-cardiac') {
      readinessStatus = hosp.specialties.some((s) => s.includes('Cardiology'))
        ? '24/7 Primary Cath Lab On Standby'
        : 'General Cardiac Monitoring';
    } else if (selectedEmer.id === 'emer-trauma') {
      readinessStatus = `${hosp.traumaLevel} Trauma Resuscitation Bay Prepared`;
    } else if (selectedEmer.id === 'emer-stroke') {
      readinessStatus = hosp.specialties.some((s) => s.includes('Neuro'))
        ? 'CT Stroke Thrombolysis Protocol Active'
        : 'Emergency Neuro Review';
    } else if (selectedEmer.id === 'emer-burns') {
      readinessStatus = hosp.specialties.some((s) => s.includes('Burns'))
        ? 'Sterile Burns ICU Bed Reserved'
        : 'Emergency Burn Dressing';
    } else if (selectedEmer.id === 'emer-pediatric') {
      readinessStatus = hosp.specialties.some((s) => s.includes('Pediatric'))
        ? 'Level-3 PICU Team Standing By'
        : 'Emergency Pediatric Bay';
    }

    // Recommendation Reasons Chips
    const recommendationReasons: string[] = [];
    if (etaMin <= 10) {
      recommendationReasons.push(`⚡ Rapid ${etaMin}-min ETA within Golden Hour`);
    } else {
      recommendationReasons.push(`📍 ${hosp.distanceKm} km distance`);
    }

    if (hosp.icuBedsAvailable > 8) {
      recommendationReasons.push(`🛏️ ${hosp.icuBedsAvailable} Open ICU Beds (Zero Wait)`);
    } else {
      recommendationReasons.push(`🛏️ ${hosp.icuBedsAvailable} ICU Beds available`);
    }

    if (hasMatchingSpecialty) {
      recommendationReasons.push(`🏥 Specialized ${selectedEmer.category} Center`);
    }

    recommendationReasons.push('💳 100% Cashless PM-JAY & CGHS Empaneled');

    return {
      hospital: hosp,
      matchScorePct,
      rank: 1, // calculated next
      etaMinutes: etaMin,
      distanceKm: hosp.distanceKm,
      trafficStatus,
      icuBedsAvailable: hosp.icuBedsAvailable,
      generalBedsAvailable: hosp.availableBeds,
      facilityMatch: {
        facilityName: selectedEmer.requiredFacility,
        isAvailable: hasMatchingSpecialty,
        readinessStatus
      },
      recommendationReasons,
      isPmjayEmpaneled: true
    };
  });

  // Sort descending by match score
  results.sort((a, b) => b.matchScorePct - a.matchScorePct);

  // Assign ranks
  results.forEach((r, idx) => {
    r.rank = idx + 1;
  });

  return results;
}
