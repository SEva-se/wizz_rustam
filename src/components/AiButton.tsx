import type { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';

interface AiButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export function AiButton({ onClick, isLoading, disabled, children, className }: AiButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={cn(
        "border border-blue text-blue text-[14px] px-5 py-2.5 rounded-lg hover:bg-blue/10 transition-all flex items-center justify-center gap-2",
        (isLoading || disabled) ? "opacity-50 cursor-not-allowed hover:bg-transparent" : "",
        className
      )}
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
