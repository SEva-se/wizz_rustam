import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useDiagnostic } from '../context/DiagnosticContext';
import { loadSession } from '../hooks/useAutoSave';
import premiumAbstract from '../assets/premium_abstract.png';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
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
    <div className="h-full flex flex-col lg:flex-row items-stretch relative z-10 overflow-hidden">
      
      {/* Left side: Configurator Form & Typography */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col justify-center p-8 lg:p-12 xl:p-20 bg-white/40 backdrop-blur-md z-10 shadow-2xl border-r border-black/5 overflow-y-auto h-full"
      >
        <div className="max-w-xl w-full mx-auto lg:mx-0 py-6">
          <motion.div variants={itemVariants} className="mb-4">
            <span className="font-mono text-xs font-black tracking-[0.2em] text-dark/50 uppercase border border-dark/10 px-3 py-1 rounded-full">
              [01] НАЧАЛО РАБОТЫ_
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="heading-large text-dark mb-4 tracking-tighter"
          >
            СИСТЕМНАЯ <br/>
            <span className="font-light italic text-dark/70">АРХИТЕКТУРА</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-base font-semibold text-dark/80 mb-8 leading-relaxed">
            Мы создаем индивидуальные системы, которые автоматизируют рутину, чтобы вы могли сосредоточиться на росте.
          </motion.p>
          
          <motion.div variants={itemVariants} className="space-y-6 bg-white/60 p-6 md:p-8 rounded-2xl shadow-sm border border-white/50">
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-dark/70 mb-4 border-b border-dark/10 pb-2">ПАРАМЕТРЫ СЕССИИ</h2>
              
              {hasSession ? (
                <div className="p-5 bg-dark text-white rounded-xl shadow-lg border border-dark/20">
                  <p className="text-xs mb-4 font-black uppercase tracking-widest text-[#E5FF00]">Найдена незавершенная сессия</p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleStart}
                      className="flex-1 bg-white text-dark py-3 font-bold uppercase text-xs tracking-widest hover:bg-[#E5FF00] transition-colors rounded-lg"
                    >
                      Продолжить
                    </button>
                    <button
                      onClick={handleRestart}
                      className="flex-1 border border-white/20 text-white py-3 font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-colors rounded-lg"
                    >
                      Заново
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-dark/60 mb-2">Имя клиента</label>
                    <input
                      type="text"
                      value={data.clientName}
                      onChange={(e) => updateData({ clientName: e.target.value })}
                      placeholder="Например, Иван Иванов"
                      className="w-full bg-white/50 border-white/80 focus:bg-white focus:border-dark text-dark placeholder:text-dark/30 rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-dark/60 mb-2">Дата диагностики</label>
                    <input
                      type="date"
                      value={data.sessionDate}
                      onChange={(e) => updateData({ sessionDate: e.target.value })}
                      className="w-full bg-white/50 border-white/80 focus:bg-white focus:border-dark text-dark rounded-xl"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleStart}
                      className="w-full bg-dark text-white font-black uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-dark/90 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-xl shadow-dark/20"
                    >
                      Начать диагностику
                      <span className="font-mono">→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Right side: Premium 3D Visual (Configurator Viewport) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="hidden lg:flex flex-1 relative items-center justify-center pointer-events-none p-12 xl:p-20"
      >
        <div className="w-full max-w-xl aspect-square bg-white/30 backdrop-blur-md rounded-3xl border border-white/50 p-6 shadow-2xl flex items-center justify-center overflow-hidden">
          <motion.img 
            src={premiumAbstract} 
            alt="Premium Abstract Visual" 
            className="w-full h-full object-contain rounded-2xl shadow-inner"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
