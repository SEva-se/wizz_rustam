import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useDiagnostic } from '../context/DiagnosticContext';
import { loadSession } from '../hooks/useAutoSave';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const { data, updateData, resetData } = useDiagnostic();
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const session = loadSession();
    if (session) {
      setHasSession(true);
    }
  }, []);

  const handleStart = () => {
    onStart();
  };

  const handleRestart = () => {
    resetData();
    onStart();
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Фоновые акценты */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] animate-float"></div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md glass-panel rounded-2xl p-8 relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-gradient">Диагностическая Карта</h1>
          <p className="text-muted text-[14px]">Заполните базовую информацию для начала сессии</p>
        </motion.div>
        
        {hasSession && (
          <motion.div variants={itemVariants} className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-[14px] mb-3">Найдена незавершенная сессия. Хотите продолжить?</p>
            <div className="flex gap-3">
              <button
                onClick={handleStart}
                className="flex-1 bg-white text-black py-2 rounded-lg font-medium text-[13px] hover:bg-white/90"
              >
                Продолжить
              </button>
              <button
                onClick={handleRestart}
                className="flex-1 border border-white/15 text-white py-2 rounded-lg font-medium text-[13px] hover:bg-white/10"
              >
                Начать заново
              </button>
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="space-y-4">
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Имя клиента</label>
            <input
              type="text"
              value={data.clientName}
              onChange={(e) => updateData({ clientName: e.target.value })}
              placeholder="Например, Иван Иванов"
            />
          </div>
          
          <div>
            <label className="block text-[13px] text-muted mb-1.5">Дата сессии</label>
            <input
              type="date"
              value={data.sessionDate}
              onChange={(e) => updateData({ sessionDate: e.target.value })}
            />
          </div>
        </motion.div>

        {!hasSession && (
          <motion.div variants={itemVariants}>
            <button
              onClick={handleStart}
              className="w-full mt-8 bg-gradient-to-r from-blue to-cyan-500 text-white py-3.5 rounded-lg font-semibold hover:glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 btn-shine"
            >
              Начать диагностику
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
