import { useState } from 'react';
import { useDiagnostic } from '../context/DiagnosticContext';
import { AiButton } from '../components/AiButton';
import { callOpenAI, buildSummaryPrompt } from '../services/openai';
import { cn } from '../utils/cn';

export function Step13_Summary() {
  const { data, updateData } = useDiagnostic();
  const { finalSummary, scoring } = data;
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const updateField = (field: keyof typeof finalSummary, value: string) => {
    updateData((prev) => ({
      ...prev,
      finalSummary: { ...prev.finalSummary, [field]: value }
    }));
  };

  const handleAiCall = async () => {
    setIsAiLoading(true);
    setAiError('');

    try {
      const prompt = buildSummaryPrompt(data);
      const sysPrompt = `Ты — эксперт-консультант по инфобизнесу. Ты провёл полную диагностику проекта клиента.
На основе всех данных диагностики составь структурированное итоговое резюме созвона.
Отвечай на русском языке.

Структура резюме:
1. Текущая ситуация клиента (2-3 предложения с ключевыми цифрами)
2. Желаемая точка и горизонт (1-2 предложения)
3. Ключевой разрыв (конкретные цифры: текущее → цель)
4. Три главные проблемы, которые блокируют рост (каждая — 2-3 предложения с объяснением последствий)
5. Главная возможность роста (конкретно, с цифрами из расчёта скрытых потерь)
6. Что произойдёт, если ничего не менять (честно, без запугивания)
7. Рекомендованный следующий шаг

Пиши профессионально, конкретно, с цифрами. Без воды. Без markdown.
Дисклеймер в конце: "Все расчёты потенциала роста являются сценарными оценками и не являются гарантией конкретного финансового результата."`;

      const response = await callOpenAI([
        { role: 'system', content: sysPrompt },
        { role: 'user', content: prompt }
      ]);

      updateField('aiGeneratedSummary', response);
    } catch (err: any) {
      setAiError(err.message || 'Ошибка API');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">12. Финальный вывод</h2>
        <p className="text-muted text-[14px]">Итоговое резюме по результатам диагностики.</p>
      </div>


      <div className="grid gap-6">
        <div>
          <label className="block text-[13px] text-muted mb-1.5">Текущая ситуация</label>
          <textarea
            value={finalSummary.currentSituation}
            onChange={(e) => updateField('currentSituation', e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Желаемая точка</label>
          <textarea
            value={finalSummary.desiredPoint}
            onChange={(e) => updateField('desiredPoint', e.target.value)}
            rows={2}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Главный разрыв (₽ в месяц)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted metric">₽</span>
            <input
              type="text"
              value={finalSummary.mainGap}
              onChange={(e) => updateField('mainGap', e.target.value.replace(/[^\d]/g, ''))}
              className="pl-8 pr-20 metric"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted text-[13px]">в месяц</span>
          </div>
        </div>

        <div className="grid gap-4 bg-white/4 p-6 rounded-xl border border-white/6">
          <h3 className="font-medium text-white mb-2">Ключевые проблемы</h3>
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Проблема #1</label>
            <input
              type="text"
              value={finalSummary.problem1}
              onChange={(e) => updateField('problem1', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Проблема #2</label>
            <input
              type="text"
              value={finalSummary.problem2}
              onChange={(e) => updateField('problem2', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Проблема #3</label>
            <input
              type="text"
              value={finalSummary.problem3}
              onChange={(e) => updateField('problem3', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Главная возможность роста</label>
          <textarea
            value={finalSummary.mainGrowthOpportunity}
            onChange={(e) => updateField('mainGrowthOpportunity', e.target.value)}
            rows={2}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Что будет, если ничего не менять (6 мес)</label>
          <textarea
            value={finalSummary.inactionConsequence}
            onChange={(e) => updateField('inactionConsequence', e.target.value)}
            rows={2}
          />
        </div>

        <div>
          <label className="block text-[13px] text-muted mb-1.5">Рекомендованный следующий шаг</label>
          <textarea
            value={finalSummary.recommendedNextStep}
            onChange={(e) => updateField('recommendedNextStep', e.target.value)}
            rows={2}
          />
        </div>

        <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-lg">
          <span className="text-[14px] text-muted">Индекс зрелости проекта (из скоринга):</span>
          <span className="font-semibold text-[16px] flex items-center gap-2">
            <span className="metric">{scoring.totalScore}/200 ({scoring.totalPercent}%)</span>
            <span className={cn(
              "text-[14px]",
              scoring.totalPercent <= 40 ? "text-error" : scoring.totalPercent <= 60 ? "text-warning" : "text-success"
            )}>- {scoring.projectStatus || 'Не определен'}</span>
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4">
            <AiButton onClick={handleAiCall} isLoading={isAiLoading}>
              🤖 Сгенерировать резюме
            </AiButton>
            {aiError && <span className="text-error text-[13px]">{aiError}</span>}
          </div>

          <textarea
            value={finalSummary.aiGeneratedSummary}
            onChange={(e) => updateField('aiGeneratedSummary', e.target.value)}
            className="w-full min-h-[300px] leading-relaxed"
            placeholder="Здесь появится сгенерированное AI резюме..."
          />
        </div>
      </div>
    </div>
  );
}
