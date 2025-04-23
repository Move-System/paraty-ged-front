// UploadComponent.tsx
'use client';

import React, { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { LucideLoader2, Trash } from 'lucide-react';
import { UploadIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export type UploadFile = {
  file: File;
  title: string;
  // Campos adicionais futuros
};

type Props = {
  onUpload: (data: UploadFile[]) => Promise<void>;
};

export default function UploadPageForm({ onUpload }: Props) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    const newFiles = selected.map(file => ({
      file,
      title: file.name.replace(/\.[^/.]+$/, ''),
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

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
    try {
      await onUpload(files);
      setFiles([]);
    } catch (e) {
      console.error(e);
      toast.error('Ocorreu um erro ao enviar os arquivos');
    } finally {
      setIsUploading(false);
      toast.success('Arquivos enviados com sucesso!');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <div className="bg-white p-4 rounded shadow-md border">
        <div className="mb-2">
          <label htmlFor="file-input" className="flex items-center gap-2 cursor-pointer">
            <UploadIcon /> <span>Selecionar arquivos (PDF)</span>
          </label>
          <input
            id="file-input"
            type="file"
            className="hidden"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>

        {files.length > 0 && (
          <div className="space-y-3">
            {files.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="flex items-center gap-2">
                  <span>{item.file.name}</span>
                  <Button size="icon" variant="ghost" onClick={() => removeFile(index)}>
                    <Trash size={18} />
                  </Button>
                </div>
                <Input
                  value={item.title}
                  onChange={e => handleTitleChange(index, e.target.value)}
                  placeholder="Título do documento"
                />
                <Button size="icon" variant="ghost" onClick={() => removeFile(index)}>
                  <Trash size={18} />
                </Button>
              </div>
            ))}

            <Button className="w-full mt-4" onClick={handleUpload} disabled={isUploading}>
              {isUploading && <LucideLoader2 className="animate-spin mr-2" size={20} />}
              Enviar arquivos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
