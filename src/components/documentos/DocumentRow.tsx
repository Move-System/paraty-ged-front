'use client';

import { useRouter } from 'next/navigation';
import { formatDateBR } from '@/lib/utils';

interface Props {
  doc: {
    id: string;
    title: string;
    createdAt: string;
    documentType?: { name: string };
    uploader?: { name: string };
  };
}

export function DocumentRow({ doc }: Props) {
  const router = useRouter();

  return (
    <tr
      onClick={() => router.push(`/admin/documentos/${doc.id}`)}
      className="border-t hover:bg-slate-50 cursor-pointer transition-colors"
    >
      <td className="px-4 py-2">{doc.title}</td>
      <td className="px-4 py-2">{formatDateBR(doc.createdAt)}</td>
      <td className="px-4 py-2">{doc.documentType?.name ?? 'Outro'}</td>
      <td className="px-4 py-2">{doc.uploader?.name ?? 'Desconhecido'}</td>
    </tr>
  );
}
