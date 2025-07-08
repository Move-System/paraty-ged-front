'use client';

import { useQuery } from '@tanstack/react-query';
import { getFileById } from '@/services/files';
import { formatDateBR } from '@/lib/utils';
import { use, useEffect, useState } from 'react';
import PDFViewerModal from '@/components/PDFViewerModal';
import { Button } from '@/components/ui/button';
import { DownloadIcon, PencilIcon, SaveIcon, XIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { updateFile } from '@/services/files';
import { toast } from 'sonner';
import { getAllDocumentTypes } from '@/services/documentTypesService';
import { DocumetType } from '@/services/types';

export default function DocumentPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params);

  const { data: document, isLoading } = useQuery({
    queryKey: ['document', id],
    queryFn: () => getFileById(id),
    staleTime: 1000 * 60,
  });

  const { data: documentTypes } = useQuery({
    queryKey: ['document-types'],
    queryFn: getAllDocumentTypes,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState(0);
  const [visible, setVisble] = useState('');

  useEffect(() => {
    if (document) {
      console.log(document);
      setTitle(document.title);
      setVisble(document.visible);
      setType(document.documentType?.id ?? 0);
      console.log(document);
    }
  }, [document]);

  const handleSave = async () => {
    console.log('Salvar alterações...');

    const res = await updateFile(id, title, visible, type);
    if (res) {
      toast.success('Documento atualizado com sucesso!');
    } else {
      toast.error('Ocorreu um erro ao atualizar o documento');
    }

    // await updateFile({ id: document.id, title, type });
    setIsEditing(false);
  };

  if (isLoading || !document) return <p className="p-4">Carregando documento...</p>;

  return (
    <div className="max-w-12xl mx-auto mt-10 px-4 flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold truncate">Documento/ {document.title}</h1>

        {!isEditing ? (
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
            <PencilIcon className="w-4 h-4 mr-1" />
            Editar
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" variant="default" onClick={handleSave}>
              <SaveIcon className="w-4 h-4 mr-1" />
              Salvar
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setTitle(document.title);
                setType(document.documentType?.name || '');
                setIsEditing(false);
              }}
            >
              <XIcon className="w-4 h-4 mr-1" />
              Cancelar
            </Button>
          </div>
        )}
      </header>

      <section className="bg-white p-6 rounded-lg shadow-md border space-y-5">
        {/* Título */}
        <div>
          <label className="block text-m font-medium mb-1">Título</label>
          {isEditing ? (
            <input
              className="w-full border rounded px-3 py-2"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          ) : (
            <p className="text-sm text-gray-800">{title}</p>
          )}
        </div>
        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium mb-1">Tipo</label>
          {isEditing ? (
            <select
              className="w-full max-w-xs rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={type}
              onChange={e => setType(parseInt(e.target.value, 10))}
            >
              <option value="">Selecione...</option>
              {documentTypes?.map((type: DocumetType) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-sm text-gray-800">
              {documentTypes?.find((dt: DocumetType) => dt.id === type)?.name || 'Outro'}
            </p>
          )}
        </div>
        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium mb-1">Visibilidade</label>
          {isEditing ? (
            <select
              className="w-full max-w-xs rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={visible}
              onChange={e => setVisble(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="PUBLIC">Publico</option>
              <option value="PRIVATE">Privado</option>
            </select>
          ) : (
            <p className="text-sm text-gray-800">
              {visible === 'PUBLIC' ? (
                <>
                  <span className="flex items-center ">
                    Publico <EyeIcon className="w-4 h-4 ml-1 p-0" />
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center ">
                    Privado <EyeOffIcon className="w-4 h-4 ml-1 p-0" />
                  </span>
                </>
              )}
            </p>
          )}
        </div>
        {/* Info extra */}
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>Data de criação:</strong> {formatDateBR(document.createdAt)}
          </p>
          <p>
            <strong>Enviado por:</strong> {document.uploader?.name ?? 'Desconhecido'}
          </p>
        </div>
        {/* Ações */}

        {/* <DocumentTimeline relations={document.relationsFrom ?? []} /> */}

        <div className="mt-4 flex gap-2 flex-wrap">
          <PDFViewerModal buttonText="Visualizar" url={document.url} filename={document.title} />
          <Button variant="secondary" asChild>
            <a
              href={document.url}
              target="_blank"
              download
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <DownloadIcon className="w-4 h-4" />
              Baixar PDF
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
