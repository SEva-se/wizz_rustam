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
        <motion.div key="start" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="h-full">
          <StartScreen onStart={() => setCurrentScreen('wizard')} />
        </motion.div>
      )}
      {currentScreen === 'wizard' && (
        <motion.div key="wizard" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="h-full">
          <WizardScreen onFinish={() => setCurrentScreen('final')} />
        </motion.div>
      )}
      {currentScreen === 'final' && (
        <motion.div key="final" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="h-full">
          <FinalScreen onRestart={() => setCurrentScreen('start')} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { Menu } from 'lucide-react';

function TopNav() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 text-dark bg-white/30 backdrop-blur-md border-b border-white/50">
      <div className="font-black text-2xl tracking-tighter">RUSTAM®</div>
      <div className="hidden md:flex gap-12 text-xs font-bold uppercase tracking-widest text-dark/80">
        <span className="hover:text-dark transition-colors cursor-pointer">BUSINESS DIAGNOSTICS</span>
        <span className="hover:text-dark transition-colors cursor-pointer">SYSTEMIC GROWTH</span>
      </div>
      <button className="flex items-center gap-2 border border-dark/20 px-4 py-2 hover:bg-dark hover:text-white transition-colors font-bold text-xs uppercase tracking-wider rounded-lg bg-white/50">
        <Menu size={16} /> MENU
      </button>
    </header>
  );
}

export default function App() {
  return (
    <DiagnosticProvider>
      <ParticlesBackground />
      <TopNav />
      <div className="pt-20 h-screen overflow-hidden">
        <AppContent />
      </div>
    </DiagnosticProvider>
  );
}
