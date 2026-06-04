import { useState } from 'react';
import { StepNavigation, STEPS } from '../components/StepNavigation';
import { ProgressBar } from '../components/ProgressBar';

import { AnimatePresence, motion } from 'framer-motion';

import { 
  Step02_Context, Step03_Goals, Step04_Metrics, 
  Step05_Gap, Step06_Scoring, Step07_Losses, Step08_Priority, 
  Step09_Plan, Step10_Bridge, Step11_Product, Step12_Objections, 
  Step13_Summary 
} from '../steps';

interface WizardScreenProps {
  onFinish: () => void;
}

const TOTAL_STEPS = 12;

export function WizardScreen({ onFinish }: WizardScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const currentStepTitle = STEPS.find(s => s.id === currentStep)?.title || '';

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step02_Context />;
      case 2: return <Step03_Goals />;
      case 3: return <Step04_Metrics />;
      case 4: return <Step05_Gap />;
      case 5: return <Step06_Scoring />;
      case 6: return <Step07_Losses />;
      case 7: return <Step08_Priority />;
      case 8: return <Step09_Plan />;
      case 9: return <Step10_Bridge />;
      case 10: return <Step11_Product />;
      case 11: return <Step12_Objections />;
      case 12: return <Step13_Summary />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-bg text-accent overflow-hidden">
      <StepNavigation currentStep={currentStep} onStepClick={setCurrentStep} />
      
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <header className="sticky top-0 z-20 bg-bg/85 backdrop-blur-md border-b border-white/6 py-4 px-12 flex justify-between items-center shrink-0">
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          
          <div className="text-[13px] text-muted font-medium">
            Шаг {currentStep} из {TOTAL_STEPS} — {currentStepTitle}
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto px-12 py-10 max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <footer className="px-12 py-6 border-t border-white/6 flex justify-between shrink-0 bg-bg z-10">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="border border-white/15 text-white font-medium text-[15px] px-8 py-3 rounded-lg hover:bg-white/5 transition-all disabled:opacity-30 cursor-pointer"
          >
            ← Назад
          </button>
          
          <button
            onClick={handleNext}
            className="bg-white text-black font-semibold text-[15px] px-8 py-3 rounded-lg hover:bg-white/90 transition-all cursor-pointer"
          >
            {currentStep === TOTAL_STEPS ? 'Завершить и перейти к PDF →' : 'Далее →'}
          </button>
        </footer>
      </div>
    </div>
  );
}
