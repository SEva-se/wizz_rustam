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
    <div className="flex h-[calc(100vh-80px)] overflow-hidden relative border-t border-borderLight z-10">
      
      {/* Sidebar Navigation */}
      <div className="border-r border-borderLight bg-white hidden md:block">
        <StepNavigation currentStep={currentStep} onStepClick={setCurrentStep} />
      </div>
      
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <header className="sticky top-0 z-20 bg-bg/95 border-b border-borderLight py-4 px-8 md:px-12 flex flex-col gap-2 shrink-0">
          <div className="flex justify-between items-center w-full">
            <div className="text-[10px] font-bold tracking-widest uppercase font-mono text-muted">
              [ {currentStep} / {TOTAL_STEPS} ]
            </div>
            <div className="text-sm font-black uppercase tracking-tight text-dark">
              {currentStepTitle}
            </div>
          </div>
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </header>
        
        <main className="flex-1 overflow-y-auto px-6 md:px-12 py-10 max-w-4xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <footer className="px-6 md:px-12 py-6 border-t border-borderLight bg-white flex justify-between shrink-0 z-20">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="btn-dark px-6 disabled:opacity-30 disabled:cursor-not-allowed bg-transparent text-dark border-borderLight hover:bg-dark hover:text-white"
          >
            ← Назад
          </button>
          
          <button
            onClick={handleNext}
            className="btn-primary px-10"
          >
            {currentStep === TOTAL_STEPS ? 'Завершить →' : 'Далее →'}
          </button>
        </footer>
      </div>
    </div>
  );
}
