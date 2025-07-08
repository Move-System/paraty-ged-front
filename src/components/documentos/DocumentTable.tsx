'use client';

import { DocumentRow } from './DocumentRow';
import { File } from '@/services/types';

interface Props {
  documents: File[];
  isLoading: boolean;
}

export function DocumentTable({ documents, isLoading }: Props) {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-900 text-slate-50">
          <tr>
            <th className="px-4 py-2">Título</th>
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Usuário</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="text-center py-6">
                Carregando...
              </td>
            </tr>
          ) : documents.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-6">
                Nenhum documento encontrado.
              </td>
            </tr>
          ) : (
            documents.map(doc => <DocumentRow key={doc.id} doc={doc} />)
          )}
        </tbody>
      </table>
    </div>
  );
}
