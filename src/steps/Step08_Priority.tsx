import { useDiagnostic } from '../context/DiagnosticContext';
import { calcPriority } from '../utils/calculations';
import { cn } from '../utils/cn';

export function Step08_Priority() {
  const { data, updateData } = useDiagnostic();
  const { priorities, top3Problems } = data;

  const updateRow = (index: number, field: string, value: string | number) => {
    updateData((prev) => {
      const newPriorities = [...prev.priorities];
      const item = { ...newPriorities[index], [field]: value };
      item.priority = calcPriority(item.impact, item.urgency, item.speed, item.difficulty);
      newPriorities[index] = item as any;
      return { ...prev, priorities: newPriorities };
    });
  };

  const updateTopProblem = (index: number, value: string) => {
    updateData((prev) => {
      const newTop = [...prev.top3Problems];
      newTop[index] = value;
      return { ...prev, top3Problems: newTop as [string, string, string] };
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">7. Приоритизация</h2>
        <p className="text-muted text-[14px]">Цель: на основе scoring и gap analysis выделить 3–5 главных узких мест.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px] border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-white/4 text-[11px] text-muted uppercase tracking-wide">
              <th className="text-left border-b border-white/6 py-3 px-4 w-1/3">Проблема / зона</th>
              <th className="text-center border-b border-white/6 py-3 px-2">Влияние на деньги (1-5)</th>
              <th className="text-center border-b border-white/6 py-3 px-2">Срочность (1-5)</th>
              <th className="text-center border-b border-white/6 py-3 px-2">Сложность (1-5)</th>
              <th className="text-center border-b border-white/6 py-3 px-2">Скорость эфф. (1-5)</th>
              <th className="text-center border-b border-white/6 py-3 px-4">Приоритет</th>
            </tr>
          </thead>
          <tbody>
            {priorities.map((row, idx) => (
              <tr key={row.id}>
                <td className="border-b border-white/6 py-2 px-2">
                  <input
                    type="text"
                    value={row.problem}
                    onChange={(e) => updateRow(idx, 'problem', e.target.value)}
                    placeholder="Название проблемы"
                  />
                </td>
                <td className="border-b border-white/6 py-2 px-2 text-center">
                  <input
                    type="number"
                    min="1" max="5"
                    value={row.impact || ''}
                    onChange={(e) => updateRow(idx, 'impact', Number(e.target.value))}
                    className="w-16 text-center metric mx-auto"
                  />
                </td>
                <td className="border-b border-white/6 py-2 px-2 text-center">
                  <input
                    type="number"
                    min="1" max="5"
                    value={row.urgency || ''}
                    onChange={(e) => updateRow(idx, 'urgency', Number(e.target.value))}
                    className="w-16 text-center metric mx-auto"
                  />
                </td>
                <td className="border-b border-white/6 py-2 px-2 text-center">
                  <input
                    type="number"
                    min="1" max="5"
                    value={row.difficulty || ''}
                    onChange={(e) => updateRow(idx, 'difficulty', Number(e.target.value))}
                    className="w-16 text-center metric mx-auto"
                  />
                </td>
                <td className="border-b border-white/6 py-2 px-2 text-center">
                  <input
                    type="number"
                    min="1" max="5"
                    value={row.speed || ''}
                    onChange={(e) => updateRow(idx, 'speed', Number(e.target.value))}
                    className="w-16 text-center metric mx-auto"
                  />
                </td>
                <td className="border-b border-white/6 py-2 px-4 text-center">
                  <div className={cn(
                    "metric font-medium px-2 py-1 inline-block rounded",
                    row.priority >= 15 ? "bg-success/20 text-success" : row.priority >= 8 ? "bg-warning/20 text-warning" : "bg-white/5 text-muted"
                  )}>
                    {row.priority > 0 ? row.priority.toFixed(1) : '-'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-surface border border-white/6 rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-4">ТОП-3 приоритетных проблемы для клиента</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[13px] text-muted mb-1.5">1 приоритет</label>
            <textarea
              value={top3Problems[0]}
              onChange={(e) => updateTopProblem(0, e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <label className="block text-[13px] text-muted mb-1.5">2 приоритет</label>
            <textarea
              value={top3Problems[1]}
              onChange={(e) => updateTopProblem(1, e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <label className="block text-[13px] text-muted mb-1.5">3 приоритет</label>
            <textarea
              value={top3Problems[2]}
              onChange={(e) => updateTopProblem(2, e.target.value)}
              rows={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
