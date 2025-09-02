'use client';

import PageHeader from '@/components/PageHeader';
import DocSearchForm from '@/components/search/DocSearchForm';
import SearchPageResults from '@/components/search/SearchPageResults';
import { getAllDocumentTypes } from '@/services/documentTypesService';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['document-types'],
    queryFn: getAllDocumentTypes,
  });

  if (isLoading) return <p>Carregando...</p>;

  console.log(data);

  return (
    <div className="w-full min-h-screen px-4 py-6 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">
        <PageHeader />
        <DocSearchForm />
        <SearchPageResults />
      </div>
    </div>
  );
}
