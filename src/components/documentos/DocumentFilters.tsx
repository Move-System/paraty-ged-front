'use client';

import { getAllDocumentTypes } from '@/services/documentTypesService';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface Props {
  type: string;
  date: string;
  onFilterChange: (key: string, value: string) => void;
}

export function DocumentFilters({ type, date, onFilterChange }: Props) {
  const { data: TiposDocumentos, isLoading } = useQuery({
    queryKey: ['tiposDocumentos'],
    queryFn: getAllDocumentTypes,
  }) as { data: DocumentType[]; isLoading: boolean };

  if (isLoading) return <p>Carregando...</p>;

  console.log(TiposDocumentos);

  return (
    <div className="flex gap-4 mb-6">
      <select
        value={type}
        onChange={e => onFilterChange('type', e.target.value)}
        className="w-full max-w-xs rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Todos os Tipos</option>
        {TiposDocumentos.map(({ name }) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={e => onFilterChange('date', e.target.value)}
        className="w-full max-w-xs rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
