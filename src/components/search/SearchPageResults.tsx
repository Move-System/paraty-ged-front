"use client";

import { Suspense } from "react";
import { useQueryState } from "nuqs";
import { useState, useEffect, useCallback } from "react";
import { getFilesRequest } from "@/services/requests";
import ResultsPagination from "./ResultsPagination";
import SearchResultItem from "./SearchResultItem";
import { SEARCH_QUERY_PARAM, SEARCH_QUERY_PAGE_PARAM } from "@/config";
import { ApiFile } from "@/services/types";

const SearchPageResults = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery] = useQueryState(SEARCH_QUERY_PARAM);
  const [pageParam, setPageParam] = useQueryState(SEARCH_QUERY_PAGE_PARAM);
  const [currentPage, setCurrentPage] = useState(Number(pageParam) || 1);
  const [searchResults, setSearchResults] = useState<ApiFile[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const searchForFiles = useCallback(async () => {
    if (!searchQuery) return;
    setIsLoading(true);
    try {
      const page = Number(pageParam);
      const res = await getFilesRequest(searchQuery, page || undefined);
      setTotalPages(res.totalPages);
      setSearchResults(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [pageParam, searchQuery]);

  const changeResultsPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setPageParam(String(page));
    },
    [setPageParam]
  );

  useEffect(() => {
    if (!searchQuery) return;
    (async () => {
      await searchForFiles();
    })();
  }, [searchForFiles, searchQuery, pageParam]);

  if (!searchQuery) return null;
  if (isLoading) {
    return <p className="text-center">Buscando documentos...</p>;
  }

  return (
    <div className="h-full py-6 w-full">
      <div className="mb-8 text-center">
        <h3 className="font-semibold uppercase">Resultados da busca</h3>
      </div>
      {!isLoading && (!searchResults || searchResults.length === 0) && (
        <p className="text-center">Nenhum documento encontrado</p>
      )}
      {searchResults && searchResults.length !== 0 && (
        <div className="flex flex-col gap-2">
          {searchResults.map((file) => (
            <SearchResultItem item={file} key={file.id} />
          ))}
        </div>
      )}
      {totalPages && totalPages > 1 && (
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