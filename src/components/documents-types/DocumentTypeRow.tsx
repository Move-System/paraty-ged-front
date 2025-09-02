import DocumentType from '@/types/documentType';
import DocumentTypeActions from './DocumentTypeAction';

export function DocumentTypeRow({ documents }: { documents: DocumentType }) {
  return (
    <tr>
      <td className="px-4 py-2">{documents.name}</td>
      <td className="px-4 py-2">{documents.description}</td>
      <td className="px-4 py-2 text-right">
        <div className="flex justify-end gap-2">
          <DocumentTypeActions documentType={documents} />
        </div>
      </td>
    </tr>
  );
}
