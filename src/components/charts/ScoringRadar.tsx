import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ZoneData {
  title: string;
  percent: number;
}

interface ScoringRadarProps {
  zones: ZoneData[];
}

export function ScoringRadar({ zones }: ScoringRadarProps) {
  const size = 300;
  const center = size / 2;
  const radius = (size / 2) - 40; // отступы для текста

  // Построение полигонов
  const buildPoints = (radiusFactor: number, dataMode: boolean = false) => {
    return zones.map((zone, i) => {
      const angle = (Math.PI * 2 * i) / zones.length - Math.PI / 2;
      const r = dataMode ? radius * (zone.percent / 100) : radius * radiusFactor;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  const currentPolygon = useMemo(() => buildPoints(1, true), [zones, radius, center]);
  const levels = [0.2, 0.4, 0.6, 0.8, 1]; // 5 уровней сетки

  return (
    <div className="flex flex-col items-center bg-white/40 backdrop-blur-md border border-white/80 shadow-sm rounded-2xl p-6 relative overflow-hidden">
      <h3 className="text-[14px] font-bold text-dark mb-1">Баланс проекта</h3>
      <p className="text-dark/50 text-[11px] mb-4">Визуальное распределение по 10 зонам</p>
      
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Сетка (Окружности/Многоугольники) */}
        {levels.map((level, i) => (
          <polygon
            key={i}
            points={buildPoints(level)}
            fill="none"
            stroke="rgba(0, 0, 0, 0.06)"
            strokeWidth={1}
          />
        ))}

        {/* Оси */}
        {zones.map((zone, i) => {
          const angle = (Math.PI * 2 * i) / zones.length - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          
          // Позиционирование текста
          const textX = center + (radius + 22) * Math.cos(angle);
          const textY = center + (radius + 22) * Math.sin(angle);
          
          // Выравнивание текста в зависимости от стороны
          const textAnchor = Math.cos(angle) > 0.1 ? 'start' : Math.cos(angle) < -0.1 ? 'end' : 'middle';

          return (
            <g key={`axis-${i}`}>
              <line x1={center} y1={center} x2={x} y2={y} stroke="rgba(0, 0, 0, 0.08)" strokeWidth={1} />
              <text 
                x={textX} 
                y={textY} 
                fill="rgba(0, 0, 0, 0.6)" 
                fontSize="9" 
                fontWeight="800"
                textAnchor={textAnchor}
                alignmentBaseline="middle"
                className="font-mono"
              >
                {zone.title.split('.')[0]} {/* Только номер */}
              </text>
            </g>
          );
        })}

        {/* Данные (Многоугольник) */}
        <motion.polygon
          points={currentPolygon}
          fill="rgba(229, 255, 0, 0.25)"
          stroke="#0A0A0A"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          style={{ originX: '50%', originY: '50%' }}
        />
        
        {/* Точки на узлах */}
        {zones.map((zone, i) => {
          const angle = (Math.PI * 2 * i) / zones.length - Math.PI / 2;
          const r = radius * (zone.percent / 100);
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={x}
              cy={y}
              r="4.5"
              fill="#E5FF00"
              stroke="#0A0A0A"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            />
          );
        })}
      </svg>
    </div>
  );
}
