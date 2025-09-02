'use client';

import { Suspense } from 'react';
import { useQueryState } from 'nuqs';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { getFilesRequest } from '@/services/requests';
import ResultsPagination from './ResultsPagination';
import SearchResultItem from './SearchResultItem';
import { SEARCH_QUERY_PARAM, SEARCH_QUERY_PAGE_PARAM } from '@/config';
import type { ApiFile } from '@/services/types';

const DOC_TYPE_PARAM = 'documentTypeId';
const YEAR_PARAM = 'originalFileYear';

const SearchPageResults = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<ApiFile[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery] = useQueryState(SEARCH_QUERY_PARAM);
  const [pageParam, setPageParam] = useQueryState(SEARCH_QUERY_PAGE_PARAM);
  const [docTypeParam] = useQueryState(DOC_TYPE_PARAM);
  const [yearParam] = useQueryState(YEAR_PARAM);

  const [currentPage, setCurrentPage] = useState<number>(Number(pageParam) || 1);
  const abortRef = useRef<AbortController | null>(null);

  // ✅ tem algum filtro ativo?
  const hasAnyFilter = useMemo(
    () => !!searchQuery?.trim() || !!docTypeParam || !!yearParam,
    [searchQuery, docTypeParam, yearParam],
  );

  // reset page ao mudar filtros/termo
  useEffect(() => {
    if (!hasAnyFilter) {
      setSearchResults(null);
      setTotalPages(1);
      setCurrentPage(1);
      setPageParam(null);
      return;
    }
    setCurrentPage(1);
    setPageParam(null);
  }, [hasAnyFilter, setPageParam]);

  const searchForFiles = useCallback(async () => {
    if (!hasAnyFilter) return;

    // cancelar chamada anterior
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    try {
      const page = Number(pageParam) || 1;
      const content = searchQuery?.trim() || undefined;
      const documentTypeId = docTypeParam ? Number(docTypeParam) : undefined;
      const originalFileYear = yearParam ? Number(yearParam) : undefined;

      console.log('🔎 disparando busca', { content, page, documentTypeId, originalFileYear });

      const res = await getFilesRequest(
        content,
        page,
        { documentTypeId, originalFileYear },
        { signal: controller.signal },
      );

      setTotalPages(res.totalPages ?? 1);
      setSearchResults(res.data ?? []);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e?.name !== 'AbortError') {
        console.error(e);
        setSearchResults([]);
        setTotalPages(1);
      }
    } finally {
      setIsLoading(false);
    }
  }, [hasAnyFilter, pageParam, searchQuery, docTypeParam, yearParam]);

  useEffect(() => {
    if (!hasAnyFilter) return;
    searchForFiles();
    return () => abortRef.current?.abort();
  }, [searchForFiles, hasAnyFilter]);

  const changeResultsPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setPageParam(String(page));
      window?.scrollTo?.({ top: 0, behavior: 'smooth' });
    },
    [setPageParam],
  );

  // ✅ não retorna null — mostra dica quando não há filtros
  if (!hasAnyFilter) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Use o campo de busca e/ou filtros para começar.
      </p>
    );
  }

  if (isLoading) return <p className="text-center">Buscando documentos...</p>;

  const noResults = !isLoading && (!searchResults || searchResults.length === 0);

  return (
    <div className="h-full py-6 w-full">
      <div className="mb-8 text-center">
        <h3 className="font-semibold uppercase">Resultados da busca</h3>
        <p className="text-sm text-muted-foreground">
          {searchQuery ? `“${searchQuery}”` : 'Sem termo'}
          {yearParam ? ` · Ano: ${yearParam}` : ''}
        </p>
      </div>

      {noResults && <p className="text-center">Nenhum documento encontrado</p>}

      {!noResults && searchResults && (
        <div className="flex flex-col gap-2">
          {searchResults.map(file => (
            <SearchResultItem item={file} key={file.id} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="py-4">
          <ResultsPagination
            activePage={currentPage}
            changePage={changeResultsPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Carregando...</div>}>
    <SearchPageResults />
  </Suspense>
);

export default SuspenseWrapper;
