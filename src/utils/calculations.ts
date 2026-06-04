export function calcAverageCheck(revenue: number, sales: number): number {
  if (!sales || sales === 0) return 0;
  return revenue / sales;
}

export function calcConversionRate(sales: number, leads: number): number {
  if (!leads || leads === 0) return 0;
  return (sales / leads) * 100;
}

export function calcLTV(averageCheck: number, repeatPercent: number): number {
  return averageCheck * (repeatPercent / 100);
}

export function calcGap(goal: number, current: number): number {
  return goal - current;
}

export function calcMultiplier(goal: number, current: number): number {
  if (!current || current === 0) return 0;
  return goal / current;
}

export function calcConversionLoss(
  leads: number,
  currentConv: number,
  targetConv: number,
  check: number
): number {
  return leads * ((targetConv - currentConv) / 100) * check;
}

export function calcCheckLoss(
  sales: number,
  currentCheck: number,
  targetCheck: number
): number {
  return sales * (targetCheck - currentCheck);
}

export function calcRepeatLoss(
  clients: number,
  repeatPercent: number,
  repeatCheck: number
): number {
  return clients * (repeatPercent / 100) * repeatCheck;
}

export function calcUpsellLoss(
  sales: number,
  upsellPercent: number,
  upsellCheck: number
): number {
  return sales * (upsellPercent / 100) * upsellCheck;
}

export function calcPriority(
  impact: number,
  urgency: number,
  speed: number,
  difficulty: number
): number {
  if (!difficulty || difficulty === 0) return 0;
  return (impact * urgency * speed) / difficulty;
}

export function calcZoneTotal(q1: number, q2: number, q3: number, q4: number): number {
  return q1 + q2 + q3 + q4;
}

export function calcZonePercent(total: number): number {
  return (total / 20) * 100;
}

export function calcTotalScore(zones: number[]): number {
  return zones.reduce((sum, z) => sum + z, 0);
}

export function calcTotalPercent(totalScore: number): number {
  return (totalScore / 200) * 100;
}

export function calcProjectStatus(percent: number): string {
  if (percent <= 40) return 'Кризис';
  if (percent <= 60) return 'Слабая система';
  if (percent <= 80) return 'Есть основа';
  return 'Зрелый проект';
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(Math.round(value));
}
