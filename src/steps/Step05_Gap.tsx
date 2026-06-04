import React, { useMemo } from 'react';
import { useDiagnostic } from '../context/DiagnosticContext';
import { ComputedField } from '../components/ComputedField';
import { calcGap, calcMultiplier, calcAverageCheck, calcConversionRate, calcLTV, formatCurrency } from '../utils/calculations';

export function Step05_Gap() {
  const { data, updateData } = useDiagnostic();
  const { gap, metrics, goals } = data;

  const updateField = (field: keyof typeof gap, value: string | boolean) => {
    updateData((prev) => ({
      ...prev,
      gap: { ...prev.gap, [field]: value }
    }));
  };

  // Вычисления
  const currentCheck = metrics.averageCheck_override ? metrics.averageCheck : calcAverageCheck(Number(metrics.monthlyRevenue), Number(metrics.monthlySales)).toString();
  const currentConv = metrics.conversionRate_override ? metrics.conversionRate : calcConversionRate(Number(metrics.monthlySales), Number(metrics.monthlyLeads)).toFixed(1);
  const currentLTV = metrics.ltv_override ? metrics.ltv : calcLTV(Number(currentCheck), Number(metrics.repeatSalesPercent)).toString();

  const cRevenueGap = useMemo(() => Math.round(calcGap(Number(goals.targetRevenue), Number(metrics.monthlyRevenue))).toString(), [goals.targetRevenue, metrics.monthlyRevenue]);
  const cRevenueMult = useMemo(() => calcMultiplier(Number(goals.targetRevenue), Number(metrics.monthlyRevenue)).toFixed(1), [goals.targetRevenue, metrics.monthlyRevenue]);
  
  const cSalesGap = useMemo(() => Math.round(calcGap(Number(gap.salesGoal), Number(metrics.monthlySales))).toString(), [gap.salesGoal, metrics.monthlySales]);
  const cCheckGap = useMemo(() => Math.round(calcGap(Number(goals.targetCheck), Number(currentCheck))).toString(), [goals.targetCheck, currentCheck]);
  const cLeadsGap = useMemo(() => Math.round(calcGap(Number(gap.leadsGoal), Number(metrics.monthlyLeads))).toString(), [gap.leadsGoal, metrics.monthlyLeads]);
  const cConvGap = useMemo(() => calcGap(Number(gap.conversionGoal), Number(currentConv)).toFixed(1), [gap.conversionGoal, currentConv]);
  const cLTVGap = useMemo(() => Math.round(calcGap(Number(gap.ltvGoal), Number(currentLTV))).toString(), [gap.ltvGoal, currentLTV]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">4. Gap Analysis</h2>
        <p className="text-muted text-[14px]">Цель: визуализировать разрыв. Клиент должен увидеть масштаб пространства между сейчас и хочу.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="bg-white/4 text-[11px] text-muted uppercase tracking-wide">
              <th className="text-left border-b border-white/6 py-3 px-4">Метрика</th>
              <th className="text-right border-b border-white/6 py-3 px-4">Сейчас</th>
              <th className="text-right border-b border-white/6 py-3 px-4">Цель</th>
              <th className="text-right border-b border-white/6 py-3 px-4">Разрыв</th>
              <th className="text-left border-b border-white/6 py-3 px-4">Комментарий</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-white/6 py-3 px-4">Оборот</td>
              <td className="border-b border-white/6 py-3 px-4 text-right metric">{formatCurrency(Number(metrics.monthlyRevenue))}</td>
              <td className="border-b border-white/6 py-3 px-4 text-right metric">{formatCurrency(Number(goals.targetRevenue))}</td>
              <td className="border-b border-white/6 py-3 px-4 text-right">
                <ComputedField
                  value={gap.revenueGap}
                  computedValue={cRevenueGap}
                  isOverridden={gap.revenueGap_override}
                  onOverride={(val) => { updateField('revenueGap', val); updateField('revenueGap_override', true); }}
                  onReset={() => updateField('revenueGap_override', false)}
                />
              </td>
              <td className="border-b border-white/6 py-3 px-4 text-muted">
                В <span className="metric">{cRevenueMult}</span> раз больше
              </td>
            </tr>

            <tr>
              <td className="border-b border-white/6 py-3 px-4">Кол-во продаж</td>
              <td className="border-b border-white/6 py-3 px-4 text-right metric">{metrics.monthlySales}</td>
              <td className="border-b border-white/6 py-3 px-4 text-right">
                <input
                  type="text"
                  value={gap.salesGoal}
                  onChange={(e) => updateField('salesGoal', e.target.value.replace(/[^\d]/g, ''))}
                  className="metric text-right w-24 h-8 p-1"
                />
              </td>
              <td className="border-b border-white/6 py-3 px-4 text-right">
                <ComputedField
                  value={gap.salesGap}
                  computedValue={cSalesGap}
                  isOverridden={gap.salesGap_override}
                  onOverride={(val) => { updateField('salesGap', val); updateField('salesGap_override', true); }}
                  onReset={() => updateField('salesGap_override', false)}
                />
              </td>
              <td className="border-b border-white/6 py-3 px-4 text-muted">-</td>
            </tr>

            <tr>
              <td className="border-b border-white/6 py-3 px-4">Средний чек</td>
              <td className="border-b border-white/6 py-3 px-4 text-right metric">{formatCurrency(Number(currentCheck))}</td>
              <td className="border-b border-white/6 py-3 px-4 text-right metric">{formatCurrency(Number(goals.targetCheck))}</td>
              <td className="border-b border-white/6 py-3 px-4 text-right">
                <ComputedField
                  value={gap.checkGap}
                  computedValue={cCheckGap}
                  isOverridden={gap.checkGap_override}
                  onOverride={(val) => { updateField('checkGap', val); updateField('checkGap_override', true); }}
                  onReset={() => updateField('checkGap_override', false)}
                />
              </td>
              <td className="border-b border-white/6 py-3 px-4 text-muted">-</td>
            </tr>

            <tr>
              <td className="border-b border-white/6 py-3 px-4">Лиды / мес</td>
              <td className="border-b border-white/6 py-3 px-4 text-right metric">{metrics.monthlyLeads}</td>
              <td className="border-b border-white/6 py-3 px-4 text-right">
                <input
                  type="text"
                  value={gap.leadsGoal}
                  onChange={(e) => updateField('leadsGoal', e.target.value.replace(/[^\d]/g, ''))}
                  className="metric text-right w-24 h-8 p-1"
                />
              </td>
              <td className="border-b border-white/6 py-3 px-4 text-right">
                <ComputedField
                  value={gap.leadsGap}
                  computedValue={cLeadsGap}
                  isOverridden={gap.leadsGap_override}
                  onOverride={(val) => { updateField('leadsGap', val); updateField('leadsGap_override', true); }}
                  onReset={() => updateField('leadsGap_override', false)}
                />
              </td>
              <td className="border-b border-white/6 py-3 px-4 text-muted">-</td>
            </tr>

            <tr>
              <td className="border-b border-white/6 py-3 px-4">Конверсия</td>
              <td className="border-b border-white/6 py-3 px-4 text-right metric">{currentConv}%</td>
              <td className="border-b border-white/6 py-3 px-4 text-right flex justify-end">
                <div className="relative w-24">
                  <input
                    type="text"
                    value={gap.conversionGoal}
                    onChange={(e) => updateField('conversionGoal', e.target.value.replace(/[^\d.]/g, ''))}
                    className="metric text-right pr-6 h-8 p-1 w-full"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted metric">%</span>
                </div>
              </td>
              <td className="border-b border-white/6 py-3 px-4 text-right">
                <ComputedField
                  value={gap.conversionGap}
                  computedValue={cConvGap}
                  isOverridden={gap.conversionGap_override}
                  onOverride={(val) => { updateField('conversionGap', val); updateField('conversionGap_override', true); }}
                  onReset={() => updateField('conversionGap_override', false)}
                />
              </td>
              <td className="border-b border-white/6 py-3 px-4 text-muted">-</td>
            </tr>

            <tr>
              <td className="py-3 px-4">LTV</td>
              <td className="py-3 px-4 text-right metric">{formatCurrency(Number(currentLTV))}</td>
              <td className="py-3 px-4 text-right">
                <input
                  type="text"
                  value={gap.ltvGoal}
                  onChange={(e) => updateField('ltvGoal', e.target.value.replace(/[^\d]/g, ''))}
                  className="metric text-right w-24 h-8 p-1"
                />
              </td>
              <td className="py-3 px-4 text-right">
                <ComputedField
                  value={gap.ltvGap}
                  computedValue={cLTVGap}
                  isOverridden={gap.ltvGap_override}
                  onOverride={(val) => { updateField('ltvGap', val); updateField('ltvGap_override', true); }}
                  onReset={() => updateField('ltvGap_override', false)}
                />
              </td>
              <td className="py-3 px-4 text-muted">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
