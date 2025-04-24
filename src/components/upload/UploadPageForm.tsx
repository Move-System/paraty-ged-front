// UploadComponent.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LucideLoader2, Trash, ChevronDown, ChevronRight } from 'lucide-react';
import { UploadIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';

export type UploadFile = {
  file: File;
  title: string;
};

type Props = {
  onUpload: (data: UploadFile[]) => Promise<void>;
};

export default function UploadPageForm({ onUpload }: Props) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      title: file.name.replace(/\.[^/.]+$/, ''),
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: true,
  });

  const handleTitleChange = (index: number, title: string) => {
    setFiles(prev => {
      const updated = [...prev];
      updated[index].title = title;
      return updated;
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
      console.log('files', files);
      await onUpload(files);
      setFiles([]);
      toast.success('Arquivos enviados com sucesso!');
    } catch (e) {
      console.error(e);
      toast.error('Ocorreu um erro ao enviar os arquivos');
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="bg-white p-4 rounded shadow-md border">
        <div
          {...getRootProps()}
          className={`p-4 border-2 border-dashed rounded cursor-pointer text-center ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          <UploadIcon className="inline-block mb-2" />
          <p>{isDragActive ? 'Solte os arquivos aqui...' : ' clique para selecionar'}</p>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-3">
            {files.map((item, index) => (
              <div key={index} className="rounded border shadow-sm bg-slate-50">
                <div
                  className="flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-slate-100 transition"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <p className="text-sm font-medium truncate">{item.file.name}</p>
                  {openIndex === index ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
                {openIndex === index && (
                  <div className="border-t px-4 py-3 space-y-2 bg-white">
                    <Input
                      value={item.title}
                      onChange={e => handleTitleChange(index, e.target.value)}
                      placeholder="Título do documento"
                    />
                    <div className="flex justify-end">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <Trash size={18} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isUploading && (
              <div className="w-full h-2 mt-4 bg-slate-200 rounded overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            <Button className="w-full mt-4" onClick={handleUpload} disabled={isUploading}>
              {isUploading && <LucideLoader2 className="animate-spin mr-2" size={20} />}
              {isUploading ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
