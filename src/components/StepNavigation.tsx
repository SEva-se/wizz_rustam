import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface StepNavigationProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const STEPS = [
  { id: 1, title: 'Контекст проекта' },
  { id: 2, title: 'Цель и результат' },
  { id: 3, title: 'Текущие метрики' },
  { id: 4, title: 'Gap Analysis' },
  { id: 5, title: 'Скоринг по зонам' },
  { id: 6, title: 'Скрытые потери' },
  { id: 7, title: 'Приоритизация' },
  { id: 8, title: 'План действий' },
  { id: 9, title: 'Мост к офферу' },
  { id: 10, title: 'Презентация продукта' },
  { id: 11, title: 'Возражения' },
  { id: 12, title: 'Финальный вывод' },
];

export function StepNavigation({ currentStep, onStepClick }: StepNavigationProps) {
  return (
    <div className="w-[220px] h-screen bg-[#0d0d0d] border-r border-white/6 flex flex-col py-6 overflow-y-auto shrink-0">
      <div className="px-4 mb-6">
        <h2 className="text-white font-semibold text-[14px]">Диагностика</h2>
      </div>
      
      <div className="flex flex-col">
        {STEPS.map((step) => {
          const isActive = currentStep === step.id;
          const isPassed = currentStep > step.id;
          
          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={cn(
                "px-4 py-3 text-[13px] cursor-pointer flex items-center gap-3 transition-all text-left relative group",
                isActive 
                  ? "text-white font-semibold" 
                  : isPassed
                    ? "text-white/50 hover:text-white/80"
                    : "text-white/30 hover:text-white/60"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeStep"
                  className="absolute inset-0 bg-blue/15 border-l-2 border-blue"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="shrink-0 w-4 flex justify-center relative z-10">
                {isPassed ? (
                  <Check size={12} className="text-success" />
                ) : isActive ? (
                  <span className="font-semibold text-blue text-[11px] drop-shadow-[0_0_8px_rgba(0,113,227,0.8)]">{step.id}</span>
                ) : (
                  <span className="group-hover:text-white/60 transition-colors">{step.id}</span>
                )}
              </span>
              <span className="truncate relative z-10">{step.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
