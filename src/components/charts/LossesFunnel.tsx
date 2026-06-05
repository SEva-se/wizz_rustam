import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/calculations';

interface LossesFunnelProps {
  lostConversion: number;
  lostCheck: number;
  lostRepeat: number;
}

export function LossesFunnel({ lostConversion, lostCheck, lostRepeat }: LossesFunnelProps) {
  const totalLoss = lostConversion + lostCheck + lostRepeat;

  return (
    <div className="w-full glass-panel rounded-2xl p-8 mb-8 flex flex-col md:flex-row gap-8 items-center justify-between overflow-hidden relative">
      
      {/* Левая часть: Воронка */}
      <div className="flex-1 max-w-sm flex flex-col items-center relative z-10">
        <h3 className="text-lg font-semibold mb-6">Дырявое ведро (Скрытые потери)</h3>
        
        <div className="relative w-full h-[240px] flex justify-center">
          {/* Воронка (SVG) */}
          <svg className="w-full h-full" viewBox="0 0 200 240" preserveAspectRatio="none">
            {/* Базовая форма воронки */}
            <path 
              d="M 10,0 L 190,0 L 140,80 L 140,160 L 110,240 L 90,240 L 60,160 L 60,80 Z" 
              fill="rgba(0, 113, 227, 0.1)"
              stroke="rgba(0, 113, 227, 0.4)"
              strokeWidth="2"
            />
            {/* Вода/Трафик внутри воронки */}
            <motion.path 
              d="M 20,0 L 180,0 L 135,75 L 135,155 L 105,235 L 95,235 L 65,155 L 65,75 Z" 
              fill="rgba(0, 113, 227, 0.3)"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ originY: 1 }}
            />
          </svg>

          {/* Утечка 1: Трафик */}
          {lostConversion > 0 && (
            <motion.div 
              className="absolute top-[60px] -right-4 flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <div className="h-0.5 w-8 bg-error/50 relative">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-error absolute -top-0.5" 
                  animate={{ x: [0, 30], opacity: [1, 0] }} 
                  transition={{ duration: 1, repeat: Infinity }} 
                />
              </div>
              <div className="text-[12px] text-error font-medium">Конверсия</div>
            </motion.div>
          )}

          {/* Утечка 2: Продажи */}
          {lostCheck > 0 && (
            <motion.div 
              className="absolute top-[140px] -left-8 flex items-center gap-2 flex-row-reverse"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
            >
               <div className="h-0.5 w-8 bg-error/50 relative">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-error absolute -top-0.5" 
                  animate={{ x: [0, -30], opacity: [1, 0] }} 
                  transition={{ duration: 1, repeat: Infinity }} 
                />
              </div>
              <div className="text-[12px] text-error font-medium">Чек / Апсейл</div>
            </motion.div>
          )}

          {/* Утечка 3: LTV */}
          {lostRepeat > 0 && (
            <motion.div 
              className="absolute top-[200px] -right-2 flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, type: "spring" }}
            >
              <div className="h-0.5 w-8 bg-error/50 relative">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-error absolute -top-0.5" 
                  animate={{ x: [0, 30], opacity: [1, 0] }} 
                  transition={{ duration: 1, repeat: Infinity }} 
                />
              </div>
              <div className="text-[12px] text-error font-medium">Повторные</div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Правая часть: Упущенная выгода */}
      <div className="flex-1 z-10 flex flex-col justify-center items-center md:items-start pl-0 md:pl-12 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0">
        <h4 className="text-[13px] text-muted mb-2 uppercase tracking-wide">Общая сумма потерь:</h4>
        <motion.div 
          className="text-4xl lg:text-5xl font-bold text-error metric drop-shadow-[0_0_15px_rgba(255,69,58,0.5)]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          {formatCurrency(totalLoss)}
        </motion.div>
        <p className="text-muted text-[13px] mt-4 max-w-[280px]">
          Это те деньги, которые ваш бизнес уже мог бы генерировать ежемесячно, если просто "залатать дыры" в текущей воронке.
        </p>
      </div>

      {/* Фоновое свечение красным для драматизма */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-error/10 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}
