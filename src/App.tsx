import { useState } from 'react';
import { ParticlesBackground } from './components/ParticlesBackground';
import { DiagnosticProvider } from './context/DiagnosticContext';
import { StartScreen } from './screens/StartScreen';
import { WizardScreen } from './screens/WizardScreen';
import { FinalScreen } from './screens/FinalScreen';

import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 }
};

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'wizard' | 'final'>('start');

  return (
    <AnimatePresence mode="wait">
      {currentScreen === 'start' && (
        <motion.div key="start" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
          <StartScreen onStart={() => setCurrentScreen('wizard')} />
        </motion.div>
      )}
      {currentScreen === 'wizard' && (
        <motion.div key="wizard" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
          <WizardScreen onFinish={() => setCurrentScreen('final')} />
        </motion.div>
      )}
      {currentScreen === 'final' && (
        <motion.div key="final" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
          <FinalScreen onRestart={() => setCurrentScreen('start')} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}



export default function App() {
  return (
    <DiagnosticProvider>
      <ParticlesBackground />
      <AppContent />
    </DiagnosticProvider>
  );
}
