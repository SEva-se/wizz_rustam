import { useMemo } from 'react';
import { useDiagnostic } from '../context/DiagnosticContext';
import { ScoringRadar } from './charts/ScoringRadar';
import { ZONES_META } from '../steps/Step06_Scoring';
import { formatCurrency } from '../utils/calculations';
import { User, Calendar, Award, TrendingUp, AlertTriangle } from 'lucide-react';

export function LiveConsole() {
  const { data } = useDiagnostic();
  const { clientName, sessionDate, metrics, goals, scoring, top3Problems } = data;

  // Calculate revenue gap
  const revenueNow = Number(metrics.monthlyRevenue) || 0;
  const targetRevenue = Number(goals.targetRevenue) || 0;
  const revenueGap = Math.max(0, targetRevenue - revenueNow);

  // Radar zones
  const radarZones = useMemo(() => {
    return ZONES_META.map(z => {
      const zState = scoring.zones[z.id as keyof typeof scoring.zones] as any;
      return { title: z.title, percent: zState?.percent || 0 };
    });
  }, [scoring.zones]);

  return (
    <div className="flex flex-col gap-6 w-full text-dark">
      {/* Session Title */}
      <div>
        <h3 className="text-xs font-black tracking-[0.2em] text-dark/40 uppercase mb-1">
          КОНСОЛЬ СТАТУСА_
        </h3>
        <h2 className="text-xl font-black uppercase tracking-tighter">Диагностика LIVE</h2>
      </div>

      {/* Client Meta Box */}
      <div className="bg-white/50 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-dark/5 rounded-lg text-dark/70">
            <User size={16} />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-dark/40">Имя клиента</div>
            <div className="text-[13.5px] font-extrabold text-dark truncate max-w-[240px]">
              {clientName || 'Не указано'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-dark/5 pt-3">
          <div className="p-2 bg-dark/5 rounded-lg text-dark/70">
            <Calendar size={16} />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-dark/40">Дата сессии</div>
            <div className="text-[13.5px] font-extrabold text-dark">
              {sessionDate ? new Date(sessionDate).toLocaleDateString('ru-RU') : 'Не указана'}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Gap Indicator */}
      {(revenueNow > 0 || targetRevenue > 0) && (
        <div className="bg-white/50 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-dark/5 pb-2">
            <div className="flex items-center gap-2 text-[12px] font-bold text-dark/60 uppercase tracking-wide">
              <TrendingUp size={14} />
              <span>Финансовые цели</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-dark/2 p-2.5 rounded-xl border border-dark/5">
              <div className="text-[9px] uppercase font-bold text-dark/45">Сейчас</div>
              <div className="text-[13px] font-black metric mt-0.5">{formatCurrency(revenueNow)}</div>
            </div>
            <div className="bg-accent/10 p-2.5 rounded-xl border border-accent/30">
              <div className="text-[9px] uppercase font-bold text-dark/65">Цель</div>
              <div className="text-[13px] font-black metric mt-0.5 text-dark">{formatCurrency(targetRevenue)}</div>
            </div>
          </div>

          {revenueGap > 0 && (
            <div className="bg-[#ff453a]/5 border border-[#ff453a]/15 p-3 rounded-xl flex flex-col gap-0.5">
              <div className="text-[10px] uppercase font-bold text-[#ff453a]/75 tracking-wider">Финансовый разрыв:</div>
              <div className="text-[16px] font-black metric text-[#ff453a]">{formatCurrency(revenueGap)}</div>
            </div>
          )}
        </div>
      )}

      {/* Live Scoring Progress */}
      <div className="space-y-3">
        <div className="bg-white/50 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2 text-[12px] font-bold text-dark/60 uppercase tracking-wide">
              <Award size={15} />
              <span>Баланс системности</span>
            </div>
            <div className="text-right">
              <span className="metric font-black text-dark text-[15px]">{scoring.totalPercent}%</span>
            </div>
          </div>

          {/* Simple progress bar */}
          <div className="w-full bg-dark/10 h-2 rounded-full overflow-hidden mb-2">
            <div 
              className="bg-accent h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(229,255,0,0.5)] border-r border-dark/20" 
              style={{ width: `${scoring.totalPercent}%` }}
            />
          </div>
          
          <div className="text-[11px] text-dark/50 flex justify-between font-bold">
            <span>Качество системы:</span>
            <span className={scoring.totalPercent < 45 ? "text-error" : scoring.totalPercent < 65 ? "text-warning" : "text-success"}>
              {scoring.projectStatus || 'Не определен'}
            </span>
          </div>
        </div>

        {/* Live Radar Chart */}
        <div className="scale-90 origin-top">
          <ScoringRadar zones={radarZones} />
        </div>
      </div>

      {/* Top Problems summary */}
      {top3Problems.some(p => p.trim() !== '') && (
        <div className="bg-white/50 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-sm space-y-2.5">
          <div className="flex items-center gap-2 text-[12px] font-bold text-dark/60 uppercase tracking-wide border-b border-dark/5 pb-2">
            <AlertTriangle size={14} className="text-red-500" />
            <span>Критичные точки</span>
          </div>
          <div className="space-y-2">
            {top3Problems.map((prob, idx) => prob.trim() !== '' && (
              <div key={idx} className="flex gap-2 items-start text-[12.5px] leading-relaxed">
                <span className="font-mono font-black text-[10px] bg-dark/5 border border-dark/10 rounded px-1.5 py-0.5 shrink-0 mt-0.5 text-dark/60">
                  {idx + 1}
                </span>
                <span className="text-dark/85 font-medium">{prob}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
