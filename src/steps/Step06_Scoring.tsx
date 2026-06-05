import { useState } from 'react';
import { useDiagnostic } from '../context/DiagnosticContext';
import { ScoreSlider } from '../components/ScoreSlider';
import { AiButton } from '../components/AiButton';
import { ScoringRadar } from '../components/charts/ScoringRadar';
import { calcZoneTotal, calcZonePercent, calcTotalScore, calcTotalPercent, calcProjectStatus } from '../utils/calculations';
import { callOpenAI, buildScoringPrompt } from '../services/openai';
import { cn } from '../utils/cn';
import { Clock } from 'lucide-react';

export const ZONES_META = [
  {
    id: 'zone1', title: '1. Позиционирование', questions: [
      { id: 'q1', text: 'Как вы объясняете, чем занимаетесь, в одном предложении?', flag: '"Я помогаю людям стать лучше" — слишком размыто' },
      { id: 'q2', text: 'Чем вы отличаетесь от других экспертов в теме?', flag: 'Нет чёткого отличия' },
      { id: 'q3', text: 'Ваша ЦА сразу понимает, для кого вы?', flag: '"Для всех" = ни для кого' },
      { id: 'q4', text: 'Есть ли у вас сформулированный УТП / угол атаки?', flag: 'Нет или очень общий' }
    ], lowScoreText: 'У тебя нет чёткого позиционирования — это значит, что потенциальные клиенты не понимают, зачем идти именно к тебе. Любой трафик в эту воронку будет сливаться.'
  },
  {
    id: 'zone2', title: '2. Целевая аудитория', questions: [
      { id: 'q1', text: 'Опишите своего идеального клиента: кто он, что его беспокоит, чего хочет?', flag: 'Размытое описание или "все взрослые"' },
      { id: 'q2', text: 'Вы знаете, какие слова использует ваша ЦА для описания своей проблемы?', flag: 'Нет — пишут "экспертным языком"' },
      { id: 'q3', text: 'Вы проводили исследования ЦА, кастдевы, опросы?', flag: 'Никогда не делали' },
      { id: 'q4', text: 'Вы знаете, где ваша ЦА "тусуется" онлайн?', flag: 'Не знают или не используют' }
    ]
  },
  {
    id: 'zone3', title: '3. Оффер', questions: [
      { id: 'q1', text: 'Как звучит ваш основной оффер в одном предложении?', flag: 'Описывают процесс, а не результат' },
      { id: 'q2', text: 'Клиент сразу понимает, что получит и за сколько?', flag: '"Зависит от ситуации" — нет конкретики' },
      { id: 'q3', text: 'Оффер "болезненно конкретен" — есть измеримый результат?', flag: 'Размытые обещания без цифр' },
      { id: 'q4', text: 'Тестировали разные версии оффера?', flag: 'Никогда не тестировали' }
    ]
  },
  {
    id: 'zone4', title: '4. Продукт', questions: [
      { id: 'q1', text: 'Есть ли у вас продуктовая лестница?', flag: 'Один продукт без лестницы' },
      { id: 'q2', text: 'Продукт закрывает конкретный результат или это просто информация?', flag: '"Я даю знания" — нет трансформации' },
      { id: 'q3', text: 'Есть ли повторные продажи / апсейлы / даунсейлы?', flag: 'Нет никаких' },
      { id: 'q4', text: 'Получаете ли вы обратную связь после обучения?', flag: 'Нет системы сбора ОБ' }
    ]
  },
  {
    id: 'zone5', title: '5. Контент и прогрев', questions: [
      { id: 'q1', text: 'Есть ли контент-план и регулярность публикаций?', flag: 'Публикуют "когда есть настроение"' },
      { id: 'q2', text: 'Контент прогревает: вскрывает боли, показывает экспертность?', flag: 'Только "полезный" контент без продаж' },
      { id: 'q3', text: 'Есть ли механика прогрева к запускам?', flag: 'Запускают без прогрева — "в лоб"' },
      { id: 'q4', text: 'Анализируете, какой контент даёт продажи?', flag: 'Нет аналитики' }
    ]
  },
  {
    id: 'zone6', title: '6. Трафик', questions: [
      { id: 'q1', text: 'Откуда приходят лиды?', flag: 'Один канал или "сарафан"' },
      { id: 'q2', text: 'Есть ли платный трафик? Какой ROI?', flag: 'Нет платного или ROI < 1' },
      { id: 'q3', text: 'Отслеживаете, откуда пришёл каждый клиент?', flag: 'Нет UTM и аналитики' },
      { id: 'q4', text: 'Есть ли коллаборации, партнёрства, кросс-промо?', flag: 'Нет' }
    ]
  },
  {
    id: 'zone7', title: '7. Воронка', questions: [
      { id: 'q1', text: 'Опишите путь клиента от первого касания до покупки.', flag: '"Видят пост — пишут мне"' },
      { id: 'q2', text: 'Есть ли автоматическая воронка?', flag: 'Нет автоматизации' },
      { id: 'q3', text: 'Знаете конверсию на каждом этапе воронки?', flag: 'Нет замеров' },
      { id: 'q4', text: 'Есть ли механика возврата "потерявшихся" лидов?', flag: 'Нет' }
    ]
  },
  {
    id: 'zone8', title: '8. Продажи', questions: [
      { id: 'q1', text: 'Как проходит процесс продажи? Есть ли скрипт или структура?', flag: 'Продают "как получится"' },
      { id: 'q2', text: 'Какая конверсия переговоров/созвонов в продажу?', flag: 'Ниже 30% — тревожный сигнал' },
      { id: 'q3', text: 'Умеете закрывать возражения экологично?', flag: 'Теряются на "я подумаю"' },
      { id: 'q4', text: 'Есть ли CRM или хотя бы таблица учёта лидов?', flag: 'Всё в голове' }
    ]
  },
  {
    id: 'zone9', title: '9. Запуски', questions: [
      { id: 'q1', text: 'Как часто делаете запуски? По какой схеме?', flag: 'Редко, спонтанно' },
      { id: 'q2', text: 'Есть ли план-календарь запусков на квартал?', flag: 'Нет' },
      { id: 'q3', text: 'Анализируете результаты запусков?', flag: 'Нет разбора' },
      { id: 'q4', text: 'Тестируете гипотезы между запусками?', flag: 'Нет тестирования' }
    ]
  },
  {
    id: 'zone10', title: '10. Аналитика и система', questions: [
      { id: 'q1', text: 'Какие метрики отслеживаете еженедельно?', flag: '"Никакие" или только оборот' },
      { id: 'q2', text: 'Есть ли дашборд или хотя бы таблица с KPI?', flag: 'Нет' },
      { id: 'q3', text: 'Принимаете решения на основе данных?', flag: '"На ощущениях"' },
      { id: 'q4', text: 'Есть ли планирование на 3–6 месяцев вперёд?', flag: 'Живут "от запуска к запуску"' }
    ]
  }
];

export function Step06_Scoring() {
  const { data, updateData } = useDiagnostic();
  const { scoring } = data;
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  // Обновление ответов с авторасчетом тоталов
  const handleScoreChange = (zoneId: string, qId: string, val: number) => {
    updateData((prev) => {
      const zoneKey = zoneId as keyof typeof prev.scoring.zones;
      const zoneData = { ...prev.scoring.zones[zoneKey], [qId]: val } as any;
      
      zoneData.total = calcZoneTotal(zoneData.q1, zoneData.q2, zoneData.q3, zoneData.q4);
      zoneData.percent = calcZonePercent(zoneData.total);

      const newZones = { ...prev.scoring.zones, [zoneId]: zoneData };
      const zonesArr = Object.values(newZones).map(z => z.total);
      const newTotalScore = calcTotalScore(zonesArr);
      const newTotalPercent = calcTotalPercent(newTotalScore);
      const newStatus = calcProjectStatus(newTotalPercent);

      return {
        ...prev,
        scoring: {
          ...prev.scoring,
          zones: newZones,
          totalScore: newTotalScore,
          totalPercent: newTotalPercent,
          projectStatus: newStatus
        }
      };
    });
  };

  const handleAiCall = async () => {
    setIsAiLoading(true);
    setAiError('');

    try {
      const prompt = buildScoringPrompt(data);
      const sysPrompt = `Ты — эксперт по диагностике инфобизнеса. Ты получаешь результаты скоринга проекта по 10 зонам.
Твоя задача — дать краткую экспертную интерпретацию результатов.
Отвечай на русском языке.
Структура ответа:
1. Общий вывод (2-3 предложения): индекс зрелости проекта, общая оценка ситуации
2. Сильные стороны (если есть зоны с баллом 70%+): коротко перечислить
3. Критические узкие места (зоны с баллом ниже 50%): для каждой — 1-2 предложения о последствиях
4. Топ-3 зоны для приоритетной работы: с кратким обоснованием
Не используй markdown заголовки. Пиши сплошным профессиональным текстом с абзацами.`;

      const response = await callOpenAI([
        { role: 'system', content: sysPrompt },
        { role: 'user', content: prompt }
      ]);

      updateData(prev => ({
        ...prev,
        scoring: { ...prev.scoring, aiInterpretation: response }
      }));
    } catch (err: any) {
      setAiError(err.message || 'Ошибка API');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-2xl font-semibold mb-2">5. Скоринг по 10 зонам</h2>
        <p className="text-muted text-[14px] flex items-center gap-1.5">
          <Clock size={14} className="text-muted/80" />
          <span>Время: 15–20 минут. Выставляйте балл по ответам клиента (0=нет, 5=сильно).</span>
        </p>
      </div>


      <div className="space-y-12">
        {ZONES_META.map((zone) => {
          const zoneState = scoring.zones[zone.id as keyof typeof scoring.zones] as any;
          
          return (
            <div key={zone.id} className="bg-white/50 backdrop-blur-md border border-white/80 shadow-sm rounded-xl overflow-hidden">
              <div className="bg-dark/5 px-6 py-4 border-b border-dark/10 flex justify-between items-center">
                <h3 className="font-bold text-[15px] text-dark">{zone.title}</h3>
                <div className="text-[14px] flex gap-4 text-dark/80">
                  <span>Балл: <span className="metric font-semibold text-dark">{zoneState.total}/20</span></span>
                  <span className={cn(
                    "metric font-semibold",
                    zoneState.percent < 50 ? "text-error" : zoneState.percent < 70 ? "text-warning" : "text-success"
                  )}>
                    {zoneState.percent}%
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {zone.questions.map((q) => (
                  <div key={q.id} className="flex gap-4 justify-between items-start">
                    <div className="flex-1">
                      <p className="text-[14px] text-dark mb-1.5">{q.text}</p>
                      <p className="text-[12px] text-error/80 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-error inline-block" />
                        {q.flag}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <ScoreSlider 
                        value={zoneState[q.id]}
                        onChange={(val) => handleScoreChange(zone.id, q.id, val)}
                      />
                    </div>
                  </div>
                ))}

                {zone.lowScoreText && zoneState.percent > 0 && zoneState.percent < 50 && (
                  <div className="mt-6 bg-error/10 border border-error/20 rounded-lg p-4 text-[13px] text-error">
                    <strong>Вывод:</strong> {zone.lowScoreText}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white/50 backdrop-blur-md border border-white/80 shadow-sm rounded-xl p-6 mt-4 flex flex-col xl:flex-row gap-8">
        
        {/* График Радара */}
        <div className="flex-1 xl:max-w-md">
          <ScoringRadar 
            zones={ZONES_META.map(z => {
              const zState = scoring.zones[z.id as keyof typeof scoring.zones] as any;
              return { title: z.title, percent: zState.percent || 0 };
            })}
          />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-lg text-dark mb-6">Сводная таблица</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse mb-6">
            <thead>
              <tr className="bg-dark/5 text-[11px] text-dark/60 uppercase tracking-wide">
                <th className="text-left border-b border-dark/10 py-3 px-4">Зона</th>
                <th className="text-right border-b border-dark/10 py-3 px-4">Балл</th>
                <th className="text-right border-b border-dark/10 py-3 px-4">Макс</th>
                <th className="text-right border-b border-dark/10 py-3 px-4">%</th>
              </tr>
            </thead>
            <tbody>
              {ZONES_META.map((z) => {
                const zState = scoring.zones[z.id as keyof typeof scoring.zones] as any;
                return (
                  <tr key={z.id}>
                    <td className="border-b border-dark/10 py-2.5 px-4 text-dark/95">{z.title}</td>
                    <td className="border-b border-dark/10 py-2.5 px-4 text-right metric text-dark/95 font-semibold">{zState.total}</td>
                    <td className="border-b border-dark/10 py-2.5 px-4 text-right metric text-dark/80">20</td>
                    <td className={cn(
                      "border-b border-dark/10 py-2.5 px-4 text-right metric font-semibold",
                      zState.percent < 50 ? "text-error" : zState.percent < 70 ? "text-warning" : "text-success"
                    )}>{zState.percent}%</td>
                  </tr>
                );
              })}
              <tr className="bg-dark/2">
                <td className="py-3 px-4 font-bold text-dark">ИТОГО</td>
                <td className="py-3 px-4 text-right metric font-bold text-dark">{scoring.totalScore}</td>
                <td className="py-3 px-4 text-right metric text-dark/80 font-bold">200</td>
                <td className="py-3 px-4 text-right metric font-bold text-dark">{scoring.totalPercent}%</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center bg-dark/5 border border-dark/10 p-4 rounded-lg">
          <span className="text-[14px] text-dark/70 font-semibold">Статус проекта:</span>
          <span className={cn(
            "font-black text-[16px] tracking-wide",
            scoring.totalPercent <= 40 ? "text-error" : scoring.totalPercent <= 60 ? "text-warning" : "text-success"
          )}>
            {scoring.projectStatus || 'Не определен'}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4">
            <AiButton onClick={handleAiCall} isLoading={isAiLoading}>
              🤖 Интерпретировать результаты
            </AiButton>
            {aiError && <span className="text-error text-[13px]">{aiError}</span>}
          </div>

          <textarea
            value={scoring.aiInterpretation}
            onChange={(e) => updateData(prev => ({ ...prev, scoring: { ...prev.scoring, aiInterpretation: e.target.value } }))}
            className="w-full min-h-[200px] leading-relaxed"
            placeholder="Здесь появится интерпретация AI..."
          />
        </div>
        </div>
      </div>
    </div>
  );
}
