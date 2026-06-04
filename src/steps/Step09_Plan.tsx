import React from 'react';
import { useDiagnostic } from '../context/DiagnosticContext';

export function Step09_Plan() {
  const { data, updateData } = useDiagnostic();
  const { actionPlan } = data;

  const updateRow = (index: number, field: string, value: string) => {
    updateData((prev) => {
      const newPlan = [...prev.actionPlan];
      newPlan[index] = { ...newPlan[index], [field]: value };
      return { ...prev, actionPlan: newPlan };
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">8. План действий</h2>
        <p className="text-muted text-[14px]">Составьте план действий вместе с клиентом</p>
      </div>


      <div className="overflow-x-auto">
        <table className="w-full text-[13px] border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-white/4 text-[11px] text-muted uppercase tracking-wide">
              <th className="text-left border-b border-white/6 py-3 px-4 w-[100px]">Горизонт</th>
              <th className="text-left border-b border-white/6 py-3 px-4">Что делать</th>
              <th className="text-left border-b border-white/6 py-3 px-4 w-[180px]">Метрика успеха</th>
              <th className="text-left border-b border-white/6 py-3 px-4 w-[160px]">Кто делает</th>
            </tr>
          </thead>
          <tbody>
            {actionPlan.map((row, idx) => (
              <tr key={row.id}>
                <td className="border-b border-white/6 py-3 px-4 font-medium text-white/80">
                  {row.horizon}
                </td>
                <td className="border-b border-white/6 py-2 px-2">
                  <textarea
                    value={row.action}
                    onChange={(e) => updateRow(idx, 'action', e.target.value)}
                    rows={2}
                    className="w-full min-h-[40px] resize-y"
                    placeholder="Описание действия"
                  />
                </td>
                <td className="border-b border-white/6 py-2 px-2">
                  <input
                    type="text"
                    value={row.metric}
                    onChange={(e) => updateRow(idx, 'metric', e.target.value)}
                    placeholder="Напр. +5 лидов"
                  />
                </td>
                <td className="border-b border-white/6 py-2 px-2">
                  <select
                    value={row.executor}
                    onChange={(e) => updateRow(idx, 'executor', e.target.value)}
                  >
                    <option value="Сам">Сам</option>
                    <option value="С поддержкой">С поддержкой</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
