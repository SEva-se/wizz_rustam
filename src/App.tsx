import React, { useState } from 'react';
import { DiagnosticProvider } from './context/DiagnosticContext';
import { StartScreen } from './screens/StartScreen';
import { WizardScreen } from './screens/WizardScreen';
import { FinalScreen } from './screens/FinalScreen';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'wizard' | 'final'>('start');

  if (currentScreen === 'start') {
    return <StartScreen onStart={() => setCurrentScreen('wizard')} />;
  }

  if (currentScreen === 'wizard') {
    return <WizardScreen onFinish={() => setCurrentScreen('final')} />;
  }

  if (currentScreen === 'final') {
    return <FinalScreen onRestart={() => setCurrentScreen('start')} />;
  }

  return null;
}

export default function App() {
  return (
    <DiagnosticProvider>
      <AppContent />
    </DiagnosticProvider>
  );
}
