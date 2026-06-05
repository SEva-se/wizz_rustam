import { useState } from 'react';
import { useDiagnostic } from '../context/DiagnosticContext';
import { clearSession } from '../hooks/useAutoSave';
import { exportToPDF } from '../utils/pdfExport';
import { PdfTemplate } from '../components/PdfTemplate';
import { FileText, Loader2, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface FinalScreenProps {
  onRestart: () => void;
}

export function FinalScreen({ onRestart }: FinalScreenProps) {
  const { data, resetData } = useDiagnostic();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const filename = `Диагностика_${data.clientName || 'Клиент'}_${data.sessionDate}.pdf`;
      await exportToPDF('pdf-template', filename);
    } catch (e) {
      console.error(e);
      alert('Ошибка при генерации PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const handleNewSession = () => {
    if (confirm('Все текущие данные будут удалены. Начать заново?')) {
      clearSession();
      resetData();
      onRestart();
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white/20 backdrop-blur-sm flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
      <div className="w-full max-w-4xl flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 flex items-center justify-center w-24 h-24 bg-accent rounded-full border-4 border-dark"
        >
          <CheckCircle2 size={48} className="text-dark" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="heading-mega text-dark mb-6"
        >
          ГОТОВО.
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-bold max-w-xl mb-12 text-dark"
        >
          Все данные успешно сохранены. Теперь вы можете выгрузить отчет или начать новую сессию.
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="btn-primary flex-1 sm:flex-none text-base px-8 py-4"
          >
            {isExporting ? <Loader2 size={24} className="animate-spin" /> : <FileText size={24} />}
            СКАЧАТЬ PDF
          </button>
          
          <button
            onClick={handleNewSession}
            className="btn-dark flex-1 sm:flex-none text-base px-8 py-4 bg-transparent text-dark border-dark hover:bg-dark hover:text-white"
          >
            <RefreshCw size={24} />
            НОВАЯ СЕССИЯ
          </button>
        </motion.div>

      </div>
      
      {/* Скрытый шаблон для PDF */}
      <PdfTemplate data={data} />
    </div>
  );
}
