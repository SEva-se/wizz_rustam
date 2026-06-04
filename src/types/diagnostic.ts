export interface DiagnosticData {
  // Мета
  clientName: string;
  sessionDate: string;

  // Блок 2: Контекст
  context: {
    niche: string;
    targetAudience: string;
    products: string;
    averageCheck: string;
    monthlyRevenue: string;
    salesFrequency: string;
    projectAge: string;
    trafficChannels: string;
    team: string;
    triedBefore: string;
    mainProblem: string;
  };

  // Блок 3: Цели
  goals: {
    targetRevenue: string;
    targetProfit: string;
    targetCheck: string;
    goalHorizon: string;
    businessFormat: string;
    weeklyHours: string;
    brandRole: string;
    whyNow: string;
    inactionCost: string;
  };

  // Блок 4: Метрики (текущая точка)
  metrics: {
    monthlyRevenue: string;
    monthlySales: string;
    averageCheck: string;
    averageCheck_override: boolean;
    monthlyLeads: string;
    conversionRate: string;
    conversionRate_override: boolean;
    subscriberBase: string;
    contentReach: string;
    trafficSpend: string;
    repeatSalesPercent: string;
    ltv: string;
    ltv_override: boolean;
  };

  // Блок 5: Gap Analysis
  gap: {
    revenueNow: string;
    revenueGoal: string;
    revenueGap: string;
    revenueGap_override: boolean;
    revenueMultiplier: string;
    revenueMultiplier_override: boolean;

    salesNow: string;
    salesGoal: string;
    salesGap: string;
    salesGap_override: boolean;

    checkNow: string;
    checkGoal: string;
    checkGap: string;
    checkGap_override: boolean;

    leadsNow: string;
    leadsGoal: string;
    leadsGap: string;
    leadsGap_override: boolean;

    conversionNow: string;
    conversionGoal: string;
    conversionGap: string;
    conversionGap_override: boolean;

    ltvNow: string;
    ltvGoal: string;
    ltvGap: string;
    ltvGap_override: boolean;
  };

  // Блок 6: Скоринг
  scoring: {
    zones: {
      zone1: { q1: number; q2: number; q3: number; q4: number; total: number; percent: number; };
      zone2: { q1: number; q2: number; q3: number; q4: number; total: number; percent: number; };
      zone3: { q1: number; q2: number; q3: number; q4: number; total: number; percent: number; };
      zone4: { q1: number; q2: number; q3: number; q4: number; total: number; percent: number; };
      zone5: { q1: number; q2: number; q3: number; q4: number; total: number; percent: number; };
      zone6: { q1: number; q2: number; q3: number; q4: number; total: number; percent: number; };
      zone7: { q1: number; q2: number; q3: number; q4: number; total: number; percent: number; };
      zone8: { q1: number; q2: number; q3: number; q4: number; total: number; percent: number; };
      zone9: { q1: number; q2: number; q3: number; q4: number; total: number; percent: number; };
      zone10: { q1: number; q2: number; q3: number; q4: number; total: number; percent: number; };
    };
    totalScore: number;
    totalPercent: number;
    projectStatus: string;
    aiInterpretation: string;
  };

  // Блок 7: Скрытые потери
  losses: {
    targetConversionRate: string;
    targetCheck: string;
    repeatSalesPercent: string;
    upsellPercent: string;
    upsellCheck: string;

    conversionLoss: string;
    conversionLoss_override: boolean;
    checkLoss: string;
    checkLoss_override: boolean;
    repeatLoss: string;
    repeatLoss_override: boolean;
    upsellLoss: string;
    upsellLoss_override: boolean;

    totalGrowthPotential: string;
    topLoss1: string;
    topLoss2: string;
  };

  // Блок 8: Приоритизация
  priorities: Array<{
    id: string; // added to help react rendering
    problem: string;
    impact: number;
    urgency: number;
    difficulty: number;
    speed: number;
    priority: number;
  }>;
  top3Problems: [string, string, string];

  // Блок 9: План действий
  actionPlan: Array<{
    id: string;
    horizon: '7 дней' | '30 дней' | '90 дней';
    action: string;
    metric: string;
    executor: 'Сам' | 'С поддержкой';
  }>;

  // Блок 11: Продукт
  product: {
    name: string;
    forWhom: string;
    problemSolved: string;
    format: string;
    duration: string;
    includes: string;
    process: string;
    expectedResults: string;
    price: string;
    nextStep: string;
  };

  // Блок 13: Финальный вывод
  finalSummary: {
    currentSituation: string;
    desiredPoint: string;
    mainGap: string;
    problem1: string;
    problem2: string;
    problem3: string;
    mainGrowthOpportunity: string;
    inactionConsequence: string;
    recommendedNextStep: string;
    scoringIndex: string;
    aiGeneratedSummary: string;
  };
}
