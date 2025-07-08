import { formatDateBR } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RecentDocument {
  id: string;
  title: string;
  createdAt: Date;
  uploader: { name: string | null };
  documentType: { name: string | null };
  visible: string;
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
            <th className="px-4 py-2">Tipo do Documento</th>
            <th className="px-4 py-2">Data do upload</th>
            <th className="px-4 py-2">Visibilidade</th>

            <th className="px-4 py-2">Usuário</th>
          </tr>
        </thead>
        <tbody>
          {recentDocuments.map(
            document => (
              console.log(document),
              (
                <tr
                  role="button"
                  onClick={() => {
                    router.push(`admin/documentos/${document.id}`);
                  }}
                  key={document.id}
                  className="border-t hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-2">{document.title}</td>
                  <td className="px-4 py-2">{document.documentType?.name ?? 'Outro'}</td>
                  <td className="px-4 py-2">{formatDateBR(document.createdAt)}</td>
                  <td className="px-4 py-2  flex items-center ">
                    {document.visible === 'PUBLIC' ? (
                      <>
                        <span className="text-black-500 flex gap-2">
                          Público <EyeIcon className="h-4 w-4 flex " />
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-black-500 flex gap-2">
                          Privado <EyeOffIcon className="h-4 w-4 flex mt-1" />{' '}
                        </span>
                      </>
                    )}
                  </td>
                  <td className="px-4 py-2">{document.uploader?.name ?? 'Desconhecido'}</td>
                </tr>
              )
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
