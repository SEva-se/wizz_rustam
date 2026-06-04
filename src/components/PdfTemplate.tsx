import React from 'react';
import type { DiagnosticData } from '../types/diagnostic';
import { formatCurrency } from '../utils/calculations';

interface PdfTemplateProps {
  data: DiagnosticData;
}

export function PdfTemplate({ data }: PdfTemplateProps) {
  // Helpers for table rows
  const TableRow = ({ label, value }: { label: string, value: string | number }) => (
    <tr>
      <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{label}</td>
      <td style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: 'right', fontWeight: 'bold' }}>{value}</td>
    </tr>
  );

  return (
    <div id="pdf-template" style={{ display: 'none', backgroundColor: 'white', color: '#1a1a1a', padding: '40px', fontFamily: 'sans-serif', fontSize: '14px', lineHeight: '1.5' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '10px', color: '#000' }}>Диагностическая Карта</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>Клиент: <strong>{data.clientName || 'Не указано'}</strong> | Дата: <strong>{data.sessionDate}</strong></p>
      </div>

      {/* 2. Контекст проекта */}
      <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#000', borderBottom: '2px solid #0071e3', paddingBottom: '5px' }}>1. Контекст проекта</h2>
      <div style={{ marginBottom: '30px' }}>
        <p><strong>Ниша:</strong> {data.context.niche}</p>
        <p><strong>Целевая аудитория:</strong> {data.context.targetAudience}</p>
        <p><strong>Продукт(ы):</strong> {data.context.products}</p>
        <p><strong>Средний чек:</strong> {formatCurrency(Number(data.context.averageCheck))} ₽</p>
        <p><strong>Текущий оборот:</strong> {formatCurrency(Number(data.context.monthlyRevenue))} ₽/мес</p>
        <p><strong>Главная проблема:</strong> {data.context.mainProblem}</p>
      </div>

      {/* 3. Цели */}
      <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#000', borderBottom: '2px solid #0071e3', paddingBottom: '5px' }}>2. Цель и желаемый результат</h2>
      <div style={{ marginBottom: '30px' }}>
        <p><strong>Желаемый оборот:</strong> {formatCurrency(Number(data.goals.targetRevenue))} ₽</p>
        <p><strong>Желаемая прибыль:</strong> {formatCurrency(Number(data.goals.targetProfit))} ₽</p>
        <p><strong>Горизонт:</strong> {data.goals.goalHorizon}</p>
        <p><strong>Почему важно сейчас:</strong> {data.goals.whyNow}</p>
        <p><strong>Цена бездействия:</strong> {data.goals.inactionCost}</p>
      </div>

      {/* 4. Текущие метрики */}
      <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#000', borderBottom: '2px solid #0071e3', paddingBottom: '5px' }}>3. Текущие метрики</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
        <tbody>
          <TableRow label="Оборот / мес" value={`${formatCurrency(Number(data.metrics.monthlyRevenue))} ₽`} />
          <TableRow label="Кол-во продаж / мес" value={data.metrics.monthlySales} />
          <TableRow label="Средний чек" value={`${formatCurrency(Number(data.metrics.averageCheck))} ₽`} />
          <TableRow label="Лиды / мес" value={data.metrics.monthlyLeads} />
          <TableRow label="Конверсия в продажу" value={`${data.metrics.conversionRate}%`} />
          <TableRow label="LTV клиента" value={`${formatCurrency(Number(data.metrics.ltv))} ₽`} />
        </tbody>
      </table>

      {/* 5. Gap Analysis */}
      <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#000', borderBottom: '2px solid #0071e3', paddingBottom: '5px' }}>4. Gap Analysis</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Метрика</th>
            <th style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Разрыв</th>
          </tr>
        </thead>
        <tbody>
          <TableRow label="Разрыв по обороту" value={`${formatCurrency(Number(data.gap.revenueGap))} ₽ (в ${data.gap.revenueMultiplier} раз)`} />
          <TableRow label="Разрыв по продажам" value={data.gap.salesGap} />
          <TableRow label="Разрыв по чеку" value={`${formatCurrency(Number(data.gap.checkGap))} ₽`} />
          <TableRow label="Разрыв по конверсии" value={`${data.gap.conversionGap}%`} />
        </tbody>
      </table>

      {/* 6. Индекс зрелости */}
      <div style={{ pageBreakBefore: 'always' }} />
      <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#000', borderBottom: '2px solid #0071e3', paddingBottom: '5px' }}>5. Индекс зрелости проекта (Scoring)</h2>
      <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f0f7ff', borderRadius: '8px' }}>
        <p style={{ margin: 0, fontSize: '16px' }}>
          Итоговый балл: <strong>{data.scoring.totalScore} / 200</strong> ({data.scoring.totalPercent}%)
          <br/>
          Статус: <strong>{data.scoring.projectStatus}</strong>
        </p>
      </div>

      <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>AI-Интерпретация:</h3>
      <div style={{ marginBottom: '30px', whiteSpace: 'pre-wrap', color: '#444' }}>
        {data.scoring.aiInterpretation || 'Интерпретация не сгенерирована.'}
      </div>

      {/* 7. Скрытые потери */}
      <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#000', borderBottom: '2px solid #0071e3', paddingBottom: '5px' }}>6. Скрытые потери (Потенциал роста)</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
        <tbody>
          <TableRow label="Потери от низкой конверсии" value={`${formatCurrency(Number(data.losses.conversionLoss))} ₽`} />
          <TableRow label="Потери от низкого чека" value={`${formatCurrency(Number(data.losses.checkLoss))} ₽`} />
          <TableRow label="Потери от отсутствия повторных продаж" value={`${formatCurrency(Number(data.losses.repeatLoss))} ₽`} />
          <TableRow label="Потери от отсутствия апсейлов" value={`${formatCurrency(Number(data.losses.upsellLoss))} ₽`} />
          <tr style={{ backgroundColor: '#f0fdf4' }}>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd', fontWeight: 'bold', color: '#166534' }}>Суммарный потенциал роста</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'right', fontWeight: 'bold', color: '#166534' }}>
              {formatCurrency(Number(data.losses.conversionLoss) + Number(data.losses.checkLoss) + Number(data.losses.repeatLoss) + Number(data.losses.upsellLoss))} ₽
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{ marginBottom: '30px' }}><strong>Главная зона потерь:</strong> {data.losses.topLoss1}</p>

      {/* 8. Топ-3 проблемы */}
      <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#000', borderBottom: '2px solid #0071e3', paddingBottom: '5px' }}>7. ТОП-3 приоритетных проблемы</h2>
      <ol style={{ marginBottom: '30px', paddingLeft: '20px' }}>
        {data.top3Problems.map((p, i) => p && <li key={i} style={{ marginBottom: '8px' }}>{p}</li>)}
      </ol>

      {/* 9. План действий */}
      <div style={{ pageBreakBefore: 'always' }} />
      <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#000', borderBottom: '2px solid #0071e3', paddingBottom: '5px' }}>8. План действий</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Горизонт</th>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Действие</th>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Метрика</th>
          </tr>
        </thead>
        <tbody>
          {data.actionPlan.map((p, i) => p.action && (
            <tr key={i}>
              <td style={{ padding: '8px', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>{p.horizon}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{p.action}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{p.metric}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 13. Итоговое резюме & AI */}
      <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#000', borderBottom: '2px solid #0071e3', paddingBottom: '5px' }}>9. Итоговое резюме созвона</h2>
      
      {data.finalSummary.aiGeneratedSummary ? (
        <div style={{ marginBottom: '30px', whiteSpace: 'pre-wrap', color: '#222' }}>
          {data.finalSummary.aiGeneratedSummary}
        </div>
      ) : (
        <div style={{ marginBottom: '30px' }}>
          <p><strong>Текущая ситуация:</strong> {data.finalSummary.currentSituation}</p>
          <p><strong>Желаемая точка:</strong> {data.finalSummary.desiredPoint}</p>
          <p><strong>Главный разрыв:</strong> {data.finalSummary.mainGap} ₽ в месяц</p>
          <p><strong>Главная возможность роста:</strong> {data.finalSummary.mainGrowthOpportunity}</p>
          <p><strong>Цена бездействия:</strong> {data.finalSummary.inactionConsequence}</p>
          <p><strong>Рекомендованный следующий шаг:</strong> {data.finalSummary.recommendedNextStep}</p>
        </div>
      )}

      <div style={{ marginTop: '40px', padding: '15px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
          Все расчёты скрытых потерь и потенциала роста являются сценарными оценками и не являются гарантией конкретного финансового результата. Результат зависит от множества факторов, в том числе от действий и усилий самого клиента.
        </p>
      </div>
    </div>
  );
}
