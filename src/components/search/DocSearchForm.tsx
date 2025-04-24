'use client';

import { Suspense } from 'react';
import { useQueryState } from 'nuqs';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { SEARCH_QUERY_PARAM } from '@/config';

function DocSearchForm() {
  const [searchQuery, setSearchQuery] = useQueryState(SEARCH_QUERY_PARAM);
  const [searchInput, setSearchInput] = useState(searchQuery ?? '');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim() || null);
  };

  const submitDisabled = !searchInput.trim() || searchQuery === searchInput.trim();

  return (
    <div className="w-full max-w-xl mx-auto py-6">
      <div className="mb-4 text-center">
        <h2 className="text-base font-semibold tracking-tight">Buscar documentos</h2>
        <p className="text-sm text-muted-foreground">
          Digite um termo para buscar dentro do conteúdo dos documentos
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 bg-white rounded-md shadow-sm border px-4 py-3"
      >
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
