import React from 'react';
import { cn } from '../utils/cn';

interface ScoreSliderProps {
  value: number;
  onChange: (val: number) => void;
}

export function ScoreSlider({ value, onChange }: ScoreSliderProps) {
  const options = [0, 1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-2">
      {options.map((opt) => {
        const isActive = value === opt;
        
        let activeClass = "";
        if (isActive) {
          if (opt <= 1) {
            activeClass = "bg-error border-error text-white";
          } else if (opt <= 3) {
            activeClass = "bg-warning border-warning text-black";
          } else {
            activeClass = "bg-success border-success text-black";
          }
        } else {
          activeClass = "border-white/12 bg-transparent text-muted hover:border-white/30";
        }

        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "w-8 h-8 rounded-full border text-[13px] font-medium transition-all duration-150 flex items-center justify-center",
              activeClass
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
