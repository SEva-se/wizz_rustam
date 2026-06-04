import { Pencil, RotateCcw } from 'lucide-react';
import { cn } from '../utils/cn';

interface ComputedFieldProps {
  value: string;
  computedValue: string;
  isOverridden: boolean;
  onOverride: (value: string) => void;
  onReset: () => void;
  prefix?: string;
  suffix?: string;
  label?: string;
}

export function ComputedField({
  value,
  computedValue,
  isOverridden,
  onOverride,
  onReset,
  prefix,
  suffix,
  label
}: ComputedFieldProps) {
  const displayValue = isOverridden ? value : computedValue;

  return (
    <div className="flex flex-col gap-1 w-full relative">
      {label && <label className="text-[13px] text-muted mb-1 block">{label}</label>}
      <div className="relative flex items-center group">
        {prefix && (
          <span className="absolute left-3.5 text-muted metric z-10">{prefix}</span>
        )}
        <input
          type="text"
          value={displayValue}
          onChange={(e) => {
            // allow only numbers and dots
            const val = e.target.value.replace(/[^\d.]/g, '');
            onOverride(val);
          }}
          disabled={!isOverridden}
          className={cn(
            "metric w-full",
            prefix ? "pl-8" : "",
            suffix ? "pr-14" : "pr-10",
            !isOverridden
              ? "border-dashed border-white/10 bg-surface text-muted cursor-default"
              : "border-solid border-white/20 text-white"
          )}
        />
        {suffix && (
          <span className="absolute right-10 text-muted metric">{suffix}</span>
        )}
        
        <div className="absolute right-2 flex items-center">
          {isOverridden ? (
            <button
              type="button"
              onClick={onReset}
              className="p-1.5 text-muted hover:text-white transition-colors"
              title="Сбросить к авторасчету"
            >
              <RotateCcw size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onOverride(computedValue)}
              className="p-1.5 text-muted opacity-40 group-hover:opacity-100 hover:text-white transition-all cursor-pointer"
              title="Переопределить значение"
            >
              <Pencil size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
