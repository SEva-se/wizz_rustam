import { useState } from 'react';
import { useDiagnostic } from '../context/DiagnosticContext';
import { clearSession } from '../hooks/useAutoSave';
import { exportToPDF } from '../utils/pdfExport';
import { PdfTemplate } from '../components/PdfTemplate';
import { FileText, Loader2, RefreshCw, Check } from 'lucide-react';

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
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-12 relative overflow-hidden">
      {/* Фоновые свечения */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/10 rounded-full blur-[150px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-success/10 rounded-full blur-[120px] animate-float"></div>

      <div className="glass-panel p-12 rounded-3xl w-full max-w-2xl text-center mb-12 relative z-10">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue to-cyan-400 rounded-full flex items-center justify-center shadow-glow animate-float">
            <Check size={40} className="text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gradient">Диагностика завершена</h1>
        <p className="text-muted text-[16px] max-w-md mx-auto">
          Все данные сохранены. Вы можете скачать итоговый PDF-отчет для клиента.
        </p>
      </div>

      <div className="flex gap-4 mb-16 relative z-10">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="bg-gradient-to-r from-blue to-cyan-500 text-white px-8 py-3.5 rounded-lg font-semibold hover:glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:glow-none btn-shine"
        >
          {isExporting ? <Loader2 size={20} className="animate-spin" /> : <FileText size={20} />}
          Скачать PDF-отчет
        </button>
        
        <button
          onClick={handleNewSession}
          className="glass-panel text-white px-8 py-3.5 rounded-lg font-medium hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
        >
          <RefreshCw size={20} />
          Начать новую
        </button>
      </div>
      
      {/* Скрытый шаблон для PDF */}
      <PdfTemplate data={data} />
    </div>
  );
}
