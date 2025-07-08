'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getAllFiles } from '@/services/files';
import { DocumentFilters } from '@/components/documentos/DocumentFilters';
import { DocumentTable } from '@/components/documentos/DocumentTable';
import { PaginationControls } from '@/components/documentos/PaginationsControls';
import { File } from '@/services/types';
import { Suspense } from 'react'; // Importe o Suspense

const ITEMS_PER_PAGE = 10;

interface FilesResponse {
  items: File[];
  total: number;
}

// Componente principal que envolve tudo em Suspense
export default function DocumentListPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <DocumentListContent />
    </Suspense>
  );
}

// Componente interno que usa useSearchParams
function DocumentListContent() {
  const searchParams = useSearchParams()!;
  const router = useRouter();

  const page = Number(searchParams.get('page')) || 1;
  const type = searchParams.get('type') || '';
  const date = searchParams.get('date') || '';

  const { data, isLoading }: UseQueryResult<FilesResponse> = useQuery({
    queryKey: ['documents', page, type, date],
    queryFn: () =>
      getAllFiles({
        page,
        limit: ITEMS_PER_PAGE,
        type,
        date,
      }),
  });

  const updateFilters = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) newParams.set(key, value);
    else newParams.delete(key);

    if (key !== 'page') newParams.set('page', '1');
    router.push(`/admin/documentos?${newParams.toString()}`);
  };

  const total = data?.total || 0;
  const documents = data?.items || [];
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-4">Todos os Documentos</h1>

      <DocumentFilters type={type} date={date} onFilterChange={updateFilters} />

      <DocumentTable documents={documents} isLoading={isLoading} />

      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={newPage => updateFilters('page', String(newPage))}
      />
    </div>
  );
}
