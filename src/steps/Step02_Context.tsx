import { useDiagnostic } from '../context/DiagnosticContext';
import { Clock } from 'lucide-react';

export function Step02_Context() {
  const { data, updateData } = useDiagnostic();
  const { context } = data;

  const updateField = (field: keyof typeof context, value: string) => {
    updateData((prev) => ({
      ...prev,
      context: { ...prev.context, [field]: value }
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">1. Контекст проекта</h2>
        <p className="text-muted text-[14px] flex items-center gap-1.5">
          <Clock size={14} className="text-muted/80" />
          <span>Время: 7–10 минут. Цель: составить картину проекта. Только собирать данные.</span>
        </p>
      </div>

      <div className="grid gap-6">
        <div>
          <label className="block text-[13px] text-muted mb-1.5">Ниша / тема (Чему вы обучаете?)</label>
          <input
            type="text"
            value={context.niche}
            onChange={(e) => updateField('niche', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Целевая аудитория (Кому продаёте?)</label>
          <textarea
            value={context.targetAudience}
            onChange={(e) => updateField('targetAudience', e.target.value)}
            rows={2}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Продукт(ы) (Форматы, длительность?)</label>
          <textarea
            value={context.products}
            onChange={(e) => updateField('products', e.target.value)}
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Средний чек</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted metric">₽</span>
              <input
                type="text"
                value={context.averageCheck}
                onChange={(e) => updateField('averageCheck', e.target.value.replace(/[^\d]/g, ''))}
                className="pl-8 metric"
              />
            </div>
          </div>
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Текущий оборот</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted metric">₽</span>
              <input
                type="text"
                value={context.monthlyRevenue}
                onChange={(e) => updateField('monthlyRevenue', e.target.value.replace(/[^\d]/g, ''))}
                className="pl-8 metric"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Частота продаж (Запуски или вечнозеленые?)</label>
          <input
            type="text"
            value={context.salesFrequency}
            onChange={(e) => updateField('salesFrequency', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Возраст проекта</label>
          <input
            type="text"
            value={context.projectAge}
            onChange={(e) => updateField('projectAge', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Каналы трафика</label>
          <input
            type="text"
            value={context.trafficChannels}
            onChange={(e) => updateField('trafficChannels', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Команда (Одни или есть кто-то?)</label>
          <input
            type="text"
            value={context.team}
            onChange={(e) => updateField('team', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Что пробовали (Из маркетинга/продаж?)</label>
          <textarea
            value={context.triedBefore}
            onChange={(e) => updateField('triedBefore', e.target.value)}
            rows={2}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5 text-error">Что сейчас не работает (Главная проблема)</label>
          <textarea
            value={context.mainProblem}
            onChange={(e) => updateField('mainProblem', e.target.value)}
            rows={3}
          />
        </div>
      </div>

    </div>
  );
}
