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
    <div className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-center p-6 lg:p-16 gap-12 relative z-10">
      
      {/* Left side: Huge typography */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 max-w-3xl"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <span className="font-mono text-sm font-bold tracking-widest text-dark uppercase">
            [01] НАЧАЛО РАБОТЫ_
          </span>
        </motion.div>
        <motion.h1 
          variants={itemVariants} 
          className="heading-mega text-dark mb-8"
        >
          ТОЧНАЯ <br/>ДИАГНОСТИКА <span className="text-accent bg-dark px-2">[100%]</span><br/>РЕЗУЛЬТАТ.
        </motion.h1>
        <motion.p variants={itemVariants} className="text-xl md:text-2xl font-medium max-w-xl">
          Мы создаем индивидуальные системы, которые автоматизируют рутину, чтобы вы могли сосредоточиться на росте.
        </motion.p>
      </motion.div>
      
      {/* Right side: Dark form card (like the calculator reference) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full lg:w-[480px] bg-dark text-white p-8 md:p-10 shadow-2xl relative overflow-hidden dark-section"
      >
        <div className="absolute inset-0 pointer-events-none bg-grid-dark opacity-30" />
        
        <div className="relative z-10">
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">Параметры сессии</h2>
            <p className="text-white/60 text-sm">Введите данные клиента для старта</p>
          </motion.div>
          
          {hasSession && (
            <motion.div variants={itemVariants} className="mb-8 p-4 bg-white/5 border border-white/10">
              <p className="text-sm mb-4 font-bold uppercase tracking-wider text-accent">Найдена незавершенная сессия</p>
              <div className="flex gap-3">
                <button
                  onClick={handleStart}
                  className="flex-1 bg-white text-dark py-2 font-bold uppercase text-xs tracking-wider hover:bg-accent transition-colors"
                >
                  Продолжить
                </button>
                <button
                  onClick={handleRestart}
                  className="flex-1 border border-white/20 text-white py-2 font-bold uppercase text-xs tracking-wider hover:bg-white/10 transition-colors"
                >
                  Заново
                </button>
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <label>Имя клиента</label>
              <input
                type="text"
                value={data.clientName}
                onChange={(e) => updateData({ clientName: e.target.value })}
                placeholder="Например, Иван Иванов"
              />
            </div>
            
            <div>
              <label>Дата сессии</label>
              <input
                type="date"
                value={data.sessionDate}
                onChange={(e) => updateData({ sessionDate: e.target.value })}
              />
            </div>
          </motion.div>

          {!hasSession && (
            <motion.div variants={itemVariants} className="mt-10">
              <button
                onClick={handleStart}
                className="w-full btn-primary"
              >
                Начать диагностику
                <span className="font-mono ml-2">→</span>
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
