'use client';

import { DocumentTypeActionHeader } from '@/components/documents-types/DocumentTypeActionHeader';
import { getAllDocumentTypes } from '@/services/documentTypesService';
import { useQuery } from '@tanstack/react-query';
import { DocumentTypeList } from '@/components/documents-types/DocumentTypeList';
import dynamic from 'next/dynamic';
function TiposDocumentosPage() {
  const { data: tiposDocumentos, isLoading } = useQuery({
    queryKey: ['tiposDocumentos'],
    queryFn: getAllDocumentTypes,
  });

  if (isLoading) return <p>Carregando...</p>;

  console.log('Tipos de documentos:', tiposDocumentos);

  return (
    <div className="flex flex-col gap-6">
      {/* Topo */}
      <DocumentTypeActionHeader />

      <DocumentTypeList documentType={tiposDocumentos} />
    </div>
  );
}

export default dynamic(() => Promise.resolve(TiposDocumentosPage), { ssr: false });
