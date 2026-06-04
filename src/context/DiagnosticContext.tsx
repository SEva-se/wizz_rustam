import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { DiagnosticData } from '../types/diagnostic';
import { saveSession, loadSession } from '../hooks/useAutoSave';

export const initialDiagnosticData: DiagnosticData = {
  clientName: '',
  sessionDate: new Date().toISOString().split('T')[0],
  context: {
    niche: '', targetAudience: '', products: '', averageCheck: '', monthlyRevenue: '', salesFrequency: '', projectAge: '', trafficChannels: '', team: '', triedBefore: '', mainProblem: ''
  },
  goals: {
    targetRevenue: '', targetProfit: '', targetCheck: '', goalHorizon: '', businessFormat: '', weeklyHours: '', brandRole: '', whyNow: '', inactionCost: ''
  },
  metrics: {
    monthlyRevenue: '', monthlySales: '', averageCheck: '', averageCheck_override: false, monthlyLeads: '', conversionRate: '', conversionRate_override: false, subscriberBase: '', contentReach: '', trafficSpend: '', repeatSalesPercent: '', ltv: '', ltv_override: false
  },
  gap: {
    revenueNow: '', revenueGoal: '', revenueGap: '', revenueGap_override: false, revenueMultiplier: '', revenueMultiplier_override: false, salesNow: '', salesGoal: '', salesGap: '', salesGap_override: false, checkNow: '', checkGoal: '', checkGap: '', checkGap_override: false, leadsNow: '', leadsGoal: '', leadsGap: '', leadsGap_override: false, conversionNow: '', conversionGoal: '', conversionGap: '', conversionGap_override: false, ltvNow: '', ltvGoal: '', ltvGap: '', ltvGap_override: false
  },
  scoring: {
    zones: {
      zone1: { q1: 0, q2: 0, q3: 0, q4: 0, total: 0, percent: 0 },
      zone2: { q1: 0, q2: 0, q3: 0, q4: 0, total: 0, percent: 0 },
      zone3: { q1: 0, q2: 0, q3: 0, q4: 0, total: 0, percent: 0 },
      zone4: { q1: 0, q2: 0, q3: 0, q4: 0, total: 0, percent: 0 },
      zone5: { q1: 0, q2: 0, q3: 0, q4: 0, total: 0, percent: 0 },
      zone6: { q1: 0, q2: 0, q3: 0, q4: 0, total: 0, percent: 0 },
      zone7: { q1: 0, q2: 0, q3: 0, q4: 0, total: 0, percent: 0 },
      zone8: { q1: 0, q2: 0, q3: 0, q4: 0, total: 0, percent: 0 },
      zone9: { q1: 0, q2: 0, q3: 0, q4: 0, total: 0, percent: 0 },
      zone10: { q1: 0, q2: 0, q3: 0, q4: 0, total: 0, percent: 0 },
    },
    totalScore: 0, totalPercent: 0, projectStatus: '', aiInterpretation: ''
  },
  losses: {
    targetConversionRate: '', targetCheck: '', repeatSalesPercent: '', upsellPercent: '', upsellCheck: '', conversionLoss: '', conversionLoss_override: false, checkLoss: '', checkLoss_override: false, repeatLoss: '', repeatLoss_override: false, upsellLoss: '', upsellLoss_override: false, totalGrowthPotential: '', topLoss1: '', topLoss2: ''
  },
  priorities: [
    { id: '1', problem: '', impact: 0, urgency: 0, difficulty: 1, speed: 0, priority: 0 },
    { id: '2', problem: '', impact: 0, urgency: 0, difficulty: 1, speed: 0, priority: 0 },
    { id: '3', problem: '', impact: 0, urgency: 0, difficulty: 1, speed: 0, priority: 0 },
    { id: '4', problem: '', impact: 0, urgency: 0, difficulty: 1, speed: 0, priority: 0 },
    { id: '5', problem: '', impact: 0, urgency: 0, difficulty: 1, speed: 0, priority: 0 },
  ],
  top3Problems: ['', '', ''],
  actionPlan: [
    { id: '1', horizon: '7 дней', action: '', metric: '', executor: 'Сам' },
    { id: '2', horizon: '7 дней', action: '', metric: '', executor: 'Сам' },
    { id: '3', horizon: '30 дней', action: '', metric: '', executor: 'Сам' },
    { id: '4', horizon: '30 дней', action: '', metric: '', executor: 'Сам' },
    { id: '5', horizon: '90 дней', action: '', metric: '', executor: 'Сам' },
    { id: '6', horizon: '90 дней', action: '', metric: '', executor: 'Сам' },
  ],
  product: {
    name: '', forWhom: '', problemSolved: '', format: '', duration: '', includes: '', process: '', expectedResults: '', price: '', nextStep: ''
  },
  finalSummary: {
    currentSituation: '', desiredPoint: '', mainGap: '', problem1: '', problem2: '', problem3: '', mainGrowthOpportunity: '', inactionConsequence: '', recommendedNextStep: '', scoringIndex: '', aiGeneratedSummary: ''
  }
};

interface DiagnosticContextType {
  data: DiagnosticData;
  updateData: (newData: Partial<DiagnosticData> | ((prev: DiagnosticData) => DiagnosticData)) => void;
  resetData: () => void;
}

export const DiagnosticContext = createContext<DiagnosticContextType | undefined>(undefined);

export function DiagnosticProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DiagnosticData>(() => {
    const saved = loadSession();
    return saved || initialDiagnosticData;
  });

  useEffect(() => {
    saveSession(data);
  }, [data]);

  const updateData = (newData: Partial<DiagnosticData> | ((prev: DiagnosticData) => DiagnosticData)) => {
    setData((prev) => {
      if (typeof newData === 'function') {
        return newData(prev);
      }
      return { ...prev, ...newData };
    });
  };

  const resetData = () => {
    setData(initialDiagnosticData);
  };

  return (
    <DiagnosticContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </DiagnosticContext.Provider>
  );
}

export function useDiagnostic() {
  const context = useContext(DiagnosticContext);
  if (context === undefined) {
    throw new Error('useDiagnostic must be used within a DiagnosticProvider');
  }
  return context;
}
