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
    <div className="w-[260px] h-full bg-bg border-r border-borderLight flex flex-col py-6 overflow-y-auto shrink-0 z-10">
      <div className="px-6 mb-8 mt-20">
        <h2 className="text-dark font-black tracking-tighter text-lg uppercase">ДИАГНОСТИКА</h2>
      </div>
      
      <div className="flex flex-col gap-1 px-4">
        {STEPS.map((step) => {
          const isActive = currentStep === step.id;
          const isPassed = currentStep > step.id;
          
          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={cn(
                "px-3 py-3 text-[12px] font-bold uppercase tracking-wider cursor-pointer flex items-center gap-3 transition-all text-left relative group rounded-md",
                isActive 
                  ? "text-dark bg-black/5" 
                  : isPassed
                    ? "text-dark/60 hover:text-dark/90"
                    : "text-dark/30 hover:text-dark/60"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeStep"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="shrink-0 w-5 flex justify-center relative z-10">
                {isPassed ? (
                  <Check size={14} className="text-dark" />
                ) : isActive ? (
                  <span className="text-dark bg-accent px-1">{(step.id).toString().padStart(2, '0')}</span>
                ) : (
                  <span className="group-hover:text-dark/60 transition-colors">{(step.id).toString().padStart(2, '0')}</span>
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
