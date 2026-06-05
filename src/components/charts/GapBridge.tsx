import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/calculations';

interface GapBridgeProps {
  currentRevenue: number;
  targetRevenue: number;
}

export function GapBridge({ currentRevenue, targetRevenue }: GapBridgeProps) {
  const gap = Math.max(0, targetRevenue - currentRevenue);
  const multiplier = currentRevenue > 0 ? (targetRevenue / currentRevenue).toFixed(1) : '∞';

  const maxH = 200;
  
  // Рассчитываем высоту столбиков относительно максимума (maxH)
  const targetHeight = maxH;
  const currentHeight = targetRevenue > 0 ? Math.max((currentRevenue / targetRevenue) * maxH, 20) : 20;

  return (
    <div className="w-full glass-panel rounded-2xl p-8 mb-8 relative overflow-hidden flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-8 text-center w-full">Визуализация разрыва (Gap)</h3>
      
      <div className="flex items-end justify-between w-full max-w-2xl h-[200px] relative px-4">
        
        {/* Текущий оборот */}
        <div className="flex flex-col items-center z-10 w-32">
          <motion.div 
            className="w-16 bg-white/20 border border-white/30 rounded-t-lg backdrop-blur-sm relative"
            initial={{ height: 0 }}
            animate={{ height: currentHeight }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="absolute -top-8 w-full text-center whitespace-nowrap metric text-[13px] text-white/80">
              {formatCurrency(currentRevenue)}
            </div>
          </motion.div>
          <span className="text-[13px] text-muted mt-3">Сейчас</span>
        </div>

        {/* Разрыв (Мост) */}
        <div className="flex-1 flex flex-col justify-end items-center relative h-full">
          {/* Пунктирная линия соединения */}
          <svg className="absolute w-full h-full inset-0 pointer-events-none" style={{ top: -currentHeight }}>
            <motion.path 
              d={`M 0,${maxH} Q 50%,${maxH - (targetHeight - currentHeight)/2} 100%,${maxH - (targetHeight - currentHeight)}`}
              fill="none"
              stroke="rgba(0, 113, 227, 0.5)"
              strokeWidth="2"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>

          {/* Плашка с разрывом */}
          <motion.div 
            className="absolute top-1/3 flex flex-col items-center justify-center p-3 rounded-xl bg-blue/10 border border-blue/30 glow-blue backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <span className="text-[12px] text-blue uppercase tracking-wider font-semibold mb-1">Разрыв (Gap)</span>
            <span className="text-xl font-bold text-white metric">{formatCurrency(gap)}</span>
            <span className="text-[12px] text-blue/80 mt-1">x{multiplier} рост</span>
          </motion.div>
        </div>

        {/* Целевой оборот */}
        <div className="flex flex-col items-center z-10 w-32">
          <motion.div 
            className="w-16 bg-gradient-to-t from-blue/40 to-cyan-400/80 border border-cyan-400/50 rounded-t-lg shadow-glow relative"
            initial={{ height: 0 }}
            animate={{ height: targetHeight }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          >
            <div className="absolute -top-8 w-full text-center whitespace-nowrap metric font-semibold text-[14px] text-white">
              {formatCurrency(targetRevenue)}
            </div>
          </motion.div>
          <span className="text-[13px] text-muted mt-3 font-medium">Точка Б</span>
        </div>

      </div>
    </div>
  );
}
