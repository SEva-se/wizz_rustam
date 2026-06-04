import type { DiagnosticData } from '../types/diagnostic';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4o'; // Используем актуальную и лучшую модель на данный момент

export async function callOpenAI(
  messages: { role: string; content: string }[]
): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('API ключ не найден. Проверьте файл .env');
  }

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1500,
      temperature: 0.7,
      messages,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI API error');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export function buildScoringPrompt(data: DiagnosticData): string {
  const { scoring, context } = data;
  const zones = [
    { name: 'Позиционирование', ...scoring.zones.zone1 },
    { name: 'Целевая аудитория', ...scoring.zones.zone2 },
    { name: 'Оффер', ...scoring.zones.zone3 },
    { name: 'Продукт', ...scoring.zones.zone4 },
    { name: 'Контент и прогрев', ...scoring.zones.zone5 },
    { name: 'Трафик', ...scoring.zones.zone6 },
    { name: 'Воронка', ...scoring.zones.zone7 },
    { name: 'Продажи', ...scoring.zones.zone8 },
    { name: 'Запуски', ...scoring.zones.zone9 },
    { name: 'Аналитика и система', ...scoring.zones.zone10 },
  ];

  const zonesText = zones.map(z =>
    `${z.name}: ${z.total}/20 (${z.percent}%)`
  ).join('\n');

  return `
Контекст клиента:
Ниша: ${context.niche}
Текущий оборот: ${context.monthlyRevenue} ₽/мес
Главная проблема: ${context.mainProblem}

Результаты скоринга:
${zonesText}

Итоговый индекс зрелости: ${scoring.totalScore}/200 (${scoring.totalPercent}%) — ${scoring.projectStatus}

Дай экспертную интерпретацию результатов диагностики.
  `.trim();
}

export function buildSummaryPrompt(data: DiagnosticData): string {
  return `
ДАННЫЕ ДИАГНОСТИКИ:

=== КОНТЕКСТ ===
Ниша: ${data.context.niche}
ЦА: ${data.context.targetAudience}
Продукт: ${data.context.products}
Текущий оборот: ${data.metrics.monthlyRevenue} ₽
Средний чек: ${data.metrics.averageCheck} ₽
Продаж/мес: ${data.metrics.monthlySales}
Лидов/мес: ${data.metrics.monthlyLeads}
Конверсия: ${data.metrics.conversionRate}%
LTV: ${data.metrics.ltv} ₽
Главная проблема: ${data.context.mainProblem}

=== ЦЕЛИ ===
Целевой оборот: ${data.goals.targetRevenue} ₽
Горизонт: ${data.goals.goalHorizon}
Причина важности: ${data.goals.whyNow}

=== GAP ===
Разрыв по обороту: ${data.gap.revenueGap} ₽ (в ${data.gap.revenueMultiplier} раз)

=== СКОРИНГ ===
Итого: ${data.scoring.totalScore}/200 (${data.scoring.totalPercent}%) — ${data.scoring.projectStatus}
AI-интерпретация скоринга: ${data.scoring.aiInterpretation}

=== СКРЫТЫЕ ПОТЕРИ ===
Потери от конверсии: ${data.losses.conversionLoss} ₽
Потери от чека: ${data.losses.checkLoss} ₽
Потери повторных: ${data.losses.repeatLoss} ₽
Потери апсейла: ${data.losses.upsellLoss} ₽
Суммарный потенциал: ${data.losses.totalGrowthPotential} ₽
Главная зона потерь: ${data.losses.topLoss1}

=== ТОП-3 ПРОБЛЕМЫ ===
1. ${data.top3Problems[0]}
2. ${data.top3Problems[1]}
3. ${data.top3Problems[2]}

Составь итоговое резюме диагностики.
  `.trim();
}
