import DocumentType from '@/types/documentType';
import { DocumentTypeRow } from './DocumentTypeRow';

interface Props {
  documentType: DocumentType[];
}

export function DocumentTypeList({ documentType }: Props) {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-slate-900 text-slate-50">
          <tr>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {documentType.map(doc => (
            <DocumentTypeRow key={doc.id} documents={doc} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DocumentTypeList;
