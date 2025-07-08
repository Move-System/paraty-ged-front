'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export function PaginationControls({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-50"
      >
        <ArrowLeft className="w-4 h-4 " />
      </button>

      <span className="text-sm text-gray-600">
        Página {page} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-50"
      >
        <ArrowRight className="w-4 h-4 " />
      </button>
    </div>
  );
}
