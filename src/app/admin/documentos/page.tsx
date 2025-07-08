'use client';

export const dynamic = 'force-dynamic'; // 👈 FORÇA renderização no client

import DocumentListPage from '@/components/documentos/DocumentosListPage';
export default function Page() {
  return <DocumentListPage />;
}
