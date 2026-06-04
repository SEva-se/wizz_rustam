import React, { useMemo } from 'react';
import { useDiagnostic } from '../context/DiagnosticContext';
import { ComputedField } from '../components/ComputedField';
import { calcAverageCheck, calcConversionRate, calcLTV } from '../utils/calculations';
import { Clock } from 'lucide-react';

export function Step04_Metrics() {
  const { data, updateData } = useDiagnostic();
  const { metrics } = data;

  const updateField = (field: keyof typeof metrics, value: string | boolean) => {
    updateData((prev) => ({
      ...prev,
      metrics: { ...prev.metrics, [field]: value }
    }));
  };

  // Вычисления
  const computedAverageCheck = useMemo(() => {
    return Math.round(calcAverageCheck(Number(metrics.monthlyRevenue), Number(metrics.monthlySales))).toString();
  }, [metrics.monthlyRevenue, metrics.monthlySales]);

  const computedConversion = useMemo(() => {
    return calcConversionRate(Number(metrics.monthlySales), Number(metrics.monthlyLeads)).toFixed(1);
  }, [metrics.monthlySales, metrics.monthlyLeads]);

  const computedLTV = useMemo(() => {
    const check = metrics.averageCheck_override ? Number(metrics.averageCheck) : Number(computedAverageCheck);
    return Math.round(calcLTV(check, Number(metrics.repeatSalesPercent))).toString();
  }, [metrics.averageCheck, metrics.averageCheck_override, computedAverageCheck, metrics.repeatSalesPercent]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">3. Текущая точка (Цифры)</h2>
        <p className="text-muted text-[14px] flex items-center gap-1.5">
          <Clock size={14} className="text-muted/80" />
          <span>Время: 5–7 минут. Цель: получить реальные метрики.</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-[13px] text-muted mb-1.5">Оборот / мес (средний)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted metric">₽</span>
            <input
              type="text"
              value={metrics.monthlyRevenue}
              onChange={(e) => updateField('monthlyRevenue', e.target.value.replace(/[^\d]/g, ''))}
              className="pl-8 metric"
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Кол-во продаж / мес</label>
          <input
            type="text"
            value={metrics.monthlySales}
            onChange={(e) => updateField('monthlySales', e.target.value.replace(/[^\d]/g, ''))}
            className="metric"
          />
        </div>

        <ComputedField
          label="Средний чек"
          value={metrics.averageCheck}
          computedValue={computedAverageCheck}
          isOverridden={metrics.averageCheck_override}
          onOverride={(val) => { updateField('averageCheck', val); updateField('averageCheck_override', true); }}
          onReset={() => updateField('averageCheck_override', false)}
          prefix="₽"
        />

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Лиды в месяц (в воронку/созвоны)</label>
          <input
            type="text"
            value={metrics.monthlyLeads}
            onChange={(e) => updateField('monthlyLeads', e.target.value.replace(/[^\d]/g, ''))}
            className="metric"
          />
        </div>

        <ComputedField
          label="Конверсия в продажу"
          value={metrics.conversionRate}
          computedValue={computedConversion}
          isOverridden={metrics.conversionRate_override}
          onOverride={(val) => { updateField('conversionRate', val); updateField('conversionRate_override', true); }}
          onReset={() => updateField('conversionRate_override', false)}
          suffix="%"
        />

        <div>
          <label className="block text-[13px] text-muted mb-1.5">База подписчиков</label>
          <input
            type="text"
            value={metrics.subscriberBase}
            onChange={(e) => updateField('subscriberBase', e.target.value.replace(/[^\d]/g, ''))}
            className="metric"
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Охват контента</label>
          <input
            type="text"
            value={metrics.contentReach}
            onChange={(e) => updateField('contentReach', e.target.value.replace(/[^\d]/g, ''))}
            className="metric"
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Расходы на трафик</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted metric">₽</span>
            <input
              type="text"
              value={metrics.trafficSpend}
              onChange={(e) => updateField('trafficSpend', e.target.value.replace(/[^\d]/g, ''))}
              className="pl-8 metric"
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Повторные продажи</label>
          <div className="relative">
            <input
              type="text"
              value={metrics.repeatSalesPercent}
              onChange={(e) => updateField('repeatSalesPercent', e.target.value.replace(/[^\d]/g, ''))}
              className="pr-8 metric"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted metric">%</span>
          </div>
        </div>

        <ComputedField
          label="LTV клиента (за всё время)"
          value={metrics.ltv}
          computedValue={computedLTV}
          isOverridden={metrics.ltv_override}
          onOverride={(val) => { updateField('ltv', val); updateField('ltv_override', true); }}
          onReset={() => updateField('ltv_override', false)}
          prefix="₽"
        />
      </div>
    </div>
  );
}
