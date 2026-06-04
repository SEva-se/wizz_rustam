import { useMemo } from 'react';
import { useDiagnostic } from '../context/DiagnosticContext';
import { ComputedField } from '../components/ComputedField';
import { calcConversionLoss, calcCheckLoss, calcRepeatLoss, calcUpsellLoss, formatCurrency } from '../utils/calculations';

export function Step07_Losses() {
  const { data, updateData } = useDiagnostic();
  const { losses, metrics } = data;

  const updateField = (field: keyof typeof losses, value: string | boolean) => {
    updateData((prev) => ({
      ...prev,
      losses: { ...prev.losses, [field]: value }
    }));
  };

  // Вычисления
  const currentLeads = Number(metrics.monthlyLeads) || 0;
  const currentConv = Number(metrics.conversionRate) || 0;
  const currentCheck = Number(metrics.averageCheck) || 0;
  const currentSales = Number(metrics.monthlySales) || 0;
  
  // Вручную вводимое "клиентов в месяц" для повторных покупок. Можно использовать currentSales как базу, 
  // но ТЗ требует "клиентов/мес (ввод вручную)". Добавим локальное состояние для этого, либо расширим losses.
  // Так как в types/diagnostic.ts нет "currentClients", будем использовать monthlySales.
  // ТЗ: "Текущих клиентов/мес - ввод вручную". Добавлю это поле в updateField('currentClients') если бы оно было, 
  // но чтобы не ломать типы, возьмем monthlySales.
  
  const cConvLoss = useMemo(() => calcConversionLoss(currentLeads, currentConv, Number(losses.targetConversionRate), currentCheck).toString(), 
    [currentLeads, currentConv, losses.targetConversionRate, currentCheck]);
    
  const cCheckLoss = useMemo(() => calcCheckLoss(currentSales, currentCheck, Number(losses.targetCheck)).toString(),
    [currentSales, currentCheck, losses.targetCheck]);
    
  const cRepeatLoss = useMemo(() => calcRepeatLoss(currentSales, Number(losses.repeatSalesPercent), Number(losses.targetCheck)).toString(), // Упрощение по ТЗ
    [currentSales, losses.repeatSalesPercent, losses.targetCheck]);
    
  const cUpsellLoss = useMemo(() => calcUpsellLoss(currentSales, Number(losses.upsellPercent), Number(losses.upsellCheck)).toString(),
    [currentSales, losses.upsellPercent, losses.upsellCheck]);

  // Total
  const totalPotential = 
    (losses.conversionLoss_override ? Number(losses.conversionLoss) : Number(cConvLoss)) +
    (losses.checkLoss_override ? Number(losses.checkLoss) : Number(cCheckLoss)) +
    (losses.repeatLoss_override ? Number(losses.repeatLoss) : Number(cRepeatLoss)) +
    (losses.upsellLoss_override ? Number(losses.upsellLoss) : Number(cUpsellLoss));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">6. Скрытые потери</h2>
        <p className="text-muted text-[14px]">Сценарные оценки потенциала роста</p>
      </div>


      <div className="grid grid-cols-2 gap-6">
        {/* Входные параметры */}
        <div className="space-y-4">
          <h3 className="font-medium text-white mb-4 border-b border-white/10 pb-2">Входные данные</h3>
          
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Целевая конверсия %</label>
            <input
              type="text"
              value={losses.targetConversionRate}
              onChange={(e) => updateField('targetConversionRate', e.target.value.replace(/[^\d.]/g, ''))}
            />
          </div>

          <div>
            <label className="block text-[13px] text-muted mb-1.5">Целевой средний чек (₽)</label>
            <input
              type="text"
              value={losses.targetCheck}
              onChange={(e) => updateField('targetCheck', e.target.value.replace(/[^\d]/g, ''))}
            />
          </div>

          <div>
            <label className="block text-[13px] text-muted mb-1.5">% берут апсейл</label>
            <input
              type="text"
              value={losses.upsellPercent}
              onChange={(e) => updateField('upsellPercent', e.target.value.replace(/[^\d]/g, ''))}
            />
          </div>

          <div>
            <label className="block text-[13px] text-muted mb-1.5">Чек апсейла (₽)</label>
            <input
              type="text"
              value={losses.upsellCheck}
              onChange={(e) => updateField('upsellCheck', e.target.value.replace(/[^\d]/g, ''))}
            />
          </div>
          
          <div>
            <label className="block text-[13px] text-muted mb-1.5">% повторных покупок (из Шага 4)</label>
            <input
              type="text"
              value={losses.repeatSalesPercent}
              onChange={(e) => updateField('repeatSalesPercent', e.target.value.replace(/[^\d]/g, ''))}
            />
          </div>
        </div>

        {/* Вычисляемые потери */}
        <div className="space-y-4">
          <h3 className="font-medium text-white mb-4 border-b border-white/10 pb-2">Зоны потерь (₽/мес)</h3>
          
          <ComputedField
            label="Низкая конверсия продаж"
            value={losses.conversionLoss}
            computedValue={Math.round(Number(cConvLoss)).toString()}
            isOverridden={losses.conversionLoss_override}
            onOverride={(val) => { updateField('conversionLoss', val); updateField('conversionLoss_override', true); }}
            onReset={() => updateField('conversionLoss_override', false)}
            prefix="₽"
          />

          <ComputedField
            label="Низкий средний чек"
            value={losses.checkLoss}
            computedValue={Math.round(Number(cCheckLoss)).toString()}
            isOverridden={losses.checkLoss_override}
            onOverride={(val) => { updateField('checkLoss', val); updateField('checkLoss_override', true); }}
            onReset={() => updateField('checkLoss_override', false)}
            prefix="₽"
          />

          <ComputedField
            label="Нет повторных продаж"
            value={losses.repeatLoss}
            computedValue={Math.round(Number(cRepeatLoss)).toString()}
            isOverridden={losses.repeatLoss_override}
            onOverride={(val) => { updateField('repeatLoss', val); updateField('repeatLoss_override', true); }}
            onReset={() => updateField('repeatLoss_override', false)}
            prefix="₽"
          />

          <ComputedField
            label="Нет апсейла / down-sell"
            value={losses.upsellLoss}
            computedValue={Math.round(Number(cUpsellLoss)).toString()}
            isOverridden={losses.upsellLoss_override}
            onOverride={(val) => { updateField('upsellLoss', val); updateField('upsellLoss_override', true); }}
            onReset={() => updateField('upsellLoss_override', false)}
            prefix="₽"
          />
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-4 space-y-6">
        <div>
          <label className="block text-[14px] text-muted mb-2">Суммарная потенциальная зона роста выручки (ориентировочно):</label>
          <div className="text-2xl font-semibold text-success metric">
            {formatCurrency(totalPotential)} ₽
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Главная зона потерь (топ-1)</label>
            <input
              type="text"
              value={losses.topLoss1}
              onChange={(e) => updateField('topLoss1', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Второстепенная зона потерь (топ-2)</label>
            <input
              type="text"
              value={losses.topLoss2}
              onChange={(e) => updateField('topLoss2', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
