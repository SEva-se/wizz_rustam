import React, { useState } from 'react';
import { useDiagnostic } from '../context/DiagnosticContext';
import { clearSession } from '../hooks/useAutoSave';
import { exportToPDF } from '../utils/pdfExport';
import { PdfTemplate } from '../components/PdfTemplate';
import { FileText, Loader2, RefreshCw } from 'lucide-react';

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
    <div className="min-h-screen bg-bg flex flex-col items-center p-12">
      <div className="w-full max-w-2xl text-center mb-12">
        <h1 className="text-3xl font-semibold mb-4">Диагностика завершена</h1>
        <p className="text-muted text-[15px]">
          Все данные сохранены. Вы можете скачать итоговый PDF-отчет для клиента.
        </p>
      </div>

      <div className="flex gap-4 mb-16">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="bg-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-blue/90 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isExporting ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
          Скачать PDF
        </button>
        
        <button
          onClick={handleNewSession}
          className="border border-white/15 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Начать новую
        </button>
      </div>
      
      {/* Скрытый шаблон для PDF */}
      <PdfTemplate data={data} />
    </div>
  );
}
