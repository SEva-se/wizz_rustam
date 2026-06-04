import { useState, useEffect } from 'react';
import { useDiagnostic } from '../context/DiagnosticContext';
import { loadSession } from '../hooks/useAutoSave';

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
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface border border-white/6 rounded-2xl p-8">
        <h1 className="text-2xl font-semibold mb-6">Диагностическая Карта</h1>
        
        {hasSession && (
          <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
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
          </div>
        )}

        <div className="space-y-4">
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
        </div>

        {!hasSession && (
          <button
            onClick={handleStart}
            className="w-full mt-8 bg-blue text-white py-3 rounded-lg font-medium hover:bg-blue/90 transition-colors"
          >
            Начать диагностику
          </button>
        )}
      </div>
    </div>
  );
}
