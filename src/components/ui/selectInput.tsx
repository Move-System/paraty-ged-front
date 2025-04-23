// Select.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps<T = string> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: T }[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder = 'Selecione uma opção', ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'flex h-9 w-full rounded-md border border-slate-200 bg-white dark:bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
          className,
        )}
        {...props}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  },
);

Select.displayName = 'Select';

export { Select };
