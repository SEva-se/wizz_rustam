import { Check } from 'lucide-react';
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
                "px-4 py-2.5 text-[13px] cursor-pointer flex items-center gap-3 transition-all text-left",
                isActive 
                  ? "bg-white/6 border-l-2 border-blue text-white font-semibold" 
                  : isPassed
                    ? "text-white/50 border-l-2 border-transparent hover:bg-white/2"
                    : "text-white/30 border-l-2 border-transparent hover:bg-white/2"
              )}
            >
              <span className="shrink-0 w-4 flex justify-center">
                {isPassed ? (
                  <Check size={12} className="text-success" />
                ) : isActive ? (
                  <span className="font-semibold text-blue text-[11px]">{step.id}</span>
                ) : (
                  null
                )}
              </span>
              <span className="truncate">{step.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
