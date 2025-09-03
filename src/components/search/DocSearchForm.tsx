/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { Suspense } from 'react';
import { useQueryState } from 'nuqs';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { SEARCH_QUERY_PARAM } from '@/config';
import { getAllDocumentTypes } from '@/services/documentTypesService';
import { useQuery } from '@tanstack/react-query';

const DOC_TYPE_PARAM = 'documentTypeId';
const YEAR_PARAM = 'originalFileYear';

function DocSearchForm() {
  const { data, isLoading } = useQuery({
    queryKey: ['document-types'],
    queryFn: getAllDocumentTypes,
  });

  if (isLoading) return <p>Carregando...</p>;

  console.log(data);

  // query params (nuqs)
  const [searchQuery, setSearchQuery] = useQueryState(SEARCH_QUERY_PARAM);
  const [qpDocTypeId, setQpDocTypeId] = useQueryState(DOC_TYPE_PARAM);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [qpYear, setQpYear] = useQueryState(YEAR_PARAM);

  // estados locais (form)
  const [searchInput, setSearchInput] = useState(searchQuery ?? '');
  const [selectedDocTypeId, setSelectedDocTypeId] = useState<string>(qpDocTypeId ?? '');
  const [selectedYear, setSelectedYear] = useState<string>(qpYear ?? '');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleDocTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDocTypeId(e.target.value);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // content
    const content = searchInput.trim() || null;
    setSearchQuery(content);

    // tipo de documento (envia null para remover do URL quando “Todos”)
    setQpDocTypeId(selectedDocTypeId || null);

    // ano (envia null para remover do URL quando “Todos”)
    setQpYear(selectedYear || null);
  };

  const handleClear = () => {
    setSearchInput('');
    setSelectedDocTypeId('');
    setSelectedYear('');
    setSearchQuery(null);
    setQpDocTypeId(null);
    setQpYear(null);
  };

  // desabilita submit se nada mudou
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const submitDisabled = useMemo(() => {
    const contentEq = (searchQuery ?? '') === (searchInput.trim() ?? '');
    const docTypeEq = (qpDocTypeId ?? '') === (selectedDocTypeId ?? '');
    const yearEq = (qpYear ?? '') === (selectedYear ?? '');
    const emptyAll =
      !searchInput.trim() &&
      !selectedDocTypeId &&
      !selectedYear &&
      !searchQuery &&
      !qpDocTypeId &&
      !qpYear;
    return (contentEq && docTypeEq && yearEq) || emptyAll;
  }, [searchQuery, searchInput, qpDocTypeId, selectedDocTypeId, qpYear, selectedYear]);

  // opções de ano: do atual voltando até 1990 (ajuste se quiser)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const yearOptions = useMemo(() => {
    const current = new Date().getFullYear();
    const years: number[] = [];
    for (let y = current; y >= 1930; y--) years.push(y);
    return years;
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto py-6">
      <div className="mb-4 text-center">
        <h2 className="text-base font-semibold tracking-tight">Buscar documentos</h2>
        <p className="text-sm text-muted-foreground">Digite um termo e/ou filtre por ano e tipo</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-white rounded-md shadow-sm border p-4"
      >
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Buscar por conteúdo..."
            value={searchInput}
            onChange={handleInputChange}
            className="flex-1"
          />
          <Button type="submit" disabled={submitDisabled}>
            Buscar
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Select Tipo de Documento */}
          <select
            value={selectedDocTypeId}
            onChange={handleDocTypeChange}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Todos os tipos</option>
            {data?.map((dt: any) => (
              <option key={dt.id} value={String(dt.id)}>
                {dt.name}
              </option>
            ))}
          </select>

          {/* Select Ano */}
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Todos os anos</option>
            {yearOptions.map(y => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={handleClear}>
            Limpar filtros
          </Button>
        </div>
      </form>
    </div>
  );
}

const SuspenseWrapper = () => (
  <Suspense
    fallback={<div className="text-center text-sm text-muted-foreground">Carregando busca...</div>}
  >
    <DocSearchForm />
  </Suspense>
);

export default SuspenseWrapper;
