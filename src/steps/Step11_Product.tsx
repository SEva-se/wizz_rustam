import React from 'react';
import { useDiagnostic } from '../context/DiagnosticContext';

export function Step11_Product() {
  const { data, updateData } = useDiagnostic();
  const { product } = data;

  const updateField = (field: keyof typeof product, value: string) => {
    updateData((prev) => ({
      ...prev,
      product: { ...prev.product, [field]: value }
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">10. Презентация продукта</h2>
        <p className="text-muted text-[14px]">Параметры и наполнение предлагаемого решения.</p>
      </div>

      <div className="grid gap-6">
        <div>
          <label className="block text-[13px] text-muted mb-1.5">Название продукта</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => updateField('name', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-[13px] text-muted mb-1.5">Для кого</label>
          <input
            type="text"
            value={product.forWhom}
            onChange={(e) => updateField('forWhom', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-[13px] text-muted mb-1.5">Какую проблему решает</label>
          <textarea
            value={product.problemSolved}
            onChange={(e) => updateField('problemSolved', e.target.value)}
            rows={2}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Формат работы</label>
            <input
              type="text"
              value={product.format}
              onChange={(e) => updateField('format', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Длительность</label>
            <input
              type="text"
              value={product.duration}
              onChange={(e) => updateField('duration', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Что входит</label>
          <textarea
            value={product.includes}
            onChange={(e) => updateField('includes', e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Как проходит работа (процесс)</label>
          <textarea
            value={product.process}
            onChange={(e) => updateField('process', e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Ожидаемые результаты / метрики</label>
          <textarea
            value={product.expectedResults}
            onChange={(e) => updateField('expectedResults', e.target.value)}
            rows={2}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Стоимость</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted metric">₽</span>
              <input
                type="text"
                value={product.price}
                onChange={(e) => updateField('price', e.target.value.replace(/[^\d]/g, ''))}
                className="pl-8 metric"
              />
            </div>
          </div>
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Следующий шаг (напр. предоплата)</label>
            <input
              type="text"
              value={product.nextStep}
              onChange={(e) => updateField('nextStep', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
