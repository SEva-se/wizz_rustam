import { useDiagnostic } from '../context/DiagnosticContext';
import { Clock } from 'lucide-react';

export function Step03_Goals() {
  const { data, updateData } = useDiagnostic();
  const { goals } = data;

  const updateField = (field: keyof typeof goals, value: string) => {
    updateData((prev) => ({
      ...prev,
      goals: { ...prev.goals, [field]: value }
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">2. Цель и желаемый результат</h2>
        <p className="text-muted text-[14px] flex items-center gap-1.5">
          <Clock size={14} className="text-muted/80" />
          <span>Время: 5–7 минут. Цель: зафиксировать конкретную желаемую точку.</span>
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Желаемый оборот (через 3-6 мес)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted metric">₽</span>
              <input
                type="text"
                value={goals.targetRevenue}
                onChange={(e) => updateField('targetRevenue', e.target.value.replace(/[^\d]/g, ''))}
                className="pl-8 metric"
              />
            </div>
          </div>
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Желаемая прибыль (на руки)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted metric">₽</span>
              <input
                type="text"
                value={goals.targetProfit}
                onChange={(e) => updateField('targetProfit', e.target.value.replace(/[^\d]/g, ''))}
                className="pl-8 metric"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Желаемый чек (планируете менять?)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted metric">₽</span>
            <input
              type="text"
              value={goals.targetCheck}
              onChange={(e) => updateField('targetCheck', e.target.value.replace(/[^\d]/g, ''))}
              className="pl-8 metric"
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Горизонт цели (За какое время достичь?)</label>
          <input
            type="text"
            value={goals.goalHorizon}
            onChange={(e) => updateField('goalHorizon', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Формат бизнеса (Запуски/вечнозеленые/наставничество?)</label>
          <input
            type="text"
            value={goals.businessFormat}
            onChange={(e) => updateField('businessFormat', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Нагрузка (Сколько часов в неделю готовы тратить?)</label>
          <input
            type="text"
            value={goals.weeklyHours}
            onChange={(e) => updateField('weeklyHours', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Роль в бизнесе (Лицо бренда или фон?)</label>
          <input
            type="text"
            value={goals.brandRole}
            onChange={(e) => updateField('brandRole', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Почему важно сейчас?</label>
          <textarea
            value={goals.whyNow}
            onChange={(e) => updateField('whyNow', e.target.value)}
            rows={2}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Цена бездействия (Что будет, если ничего не изменится?)</label>
          <textarea
            value={goals.inactionCost}
            onChange={(e) => updateField('inactionCost', e.target.value)}
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}
