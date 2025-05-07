import { formatDateBR } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface RecentDocument {
  id: string;
  title: string;
  createdAt: Date;
  uploader: { name: string | null };
}

export default function TableRecentDocuments({
  recentDocuments,
}: {
  recentDocuments: RecentDocument[];
}) {
  const router = useRouter();

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <div className="bg-slate-900 text-white px-4 py-2 font-medium text-sm">
        Documentos Recentes
      </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-2">Título</th>
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2">Usuário</th>
          </tr>
        </thead>
        <tbody>
          {recentDocuments.map(document => (
            <tr
              role="button"
              onClick={() => {
                router.push(`/documentos/${document.id}`);
              }}
              key={document.id}
              className="border-t hover:bg-slate-50 transition-colors"
            >
              <td className="px-4 py-2">{document.title}</td>
              <td className="px-4 py-2">{formatDateBR(document.createdAt)}</td>
              <td className="px-4 py-2">{document.uploader.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
