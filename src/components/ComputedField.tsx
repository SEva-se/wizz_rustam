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
    <div className="flex flex-col gap-1.5 w-full relative">
      {label && <label className="text-[13px] text-dark/70 font-bold mb-0.5 block">{label}</label>}
      <div className="relative flex items-center group">
        {prefix && (
          <span className="absolute left-3.5 text-dark/60 font-bold metric z-10">{prefix}</span>
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
            "metric w-full rounded-xl py-3 px-4 transition-all duration-200",
            prefix ? "pl-8" : "",
            suffix ? "pr-14" : "pr-10",
            !isOverridden
              ? "border-dashed border-dark/20 bg-dark/5 text-dark/60 cursor-default font-semibold"
              : "border-solid border-accent bg-accent/5 text-dark font-black shadow-[0_0_12px_rgba(229,255,0,0.15)] focus:shadow-[0_0_15px_rgba(229,255,0,0.3)]"
          )}
        />
        {suffix && (
          <span className="absolute right-10 text-dark/60 font-semibold metric">{suffix}</span>
        )}
        
        <div className="absolute right-3.5 flex items-center">
          {isOverridden ? (
            <button
              type="button"
              onClick={onReset}
              className="p-1.5 text-dark/50 hover:text-error-hover hover:scale-110 transition-all"
              title="Сбросить к авторасчету"
            >
              <RotateCcw size={15} className="text-dark/60 hover:text-red-600" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onOverride(computedValue)}
              className="p-1.5 text-dark/30 opacity-60 group-hover:opacity-100 hover:text-dark hover:scale-110 transition-all cursor-pointer"
              title="Переопределить значение"
            >
              <Pencil size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
