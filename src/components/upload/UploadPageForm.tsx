"use client";

import { ChevronLeftIcon, UploadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { LucideLoader2, Trash } from "lucide-react";

type Props = {
  submitFiles: (files: File[]) => Promise<void>;
};

export default function UploadPageForm({ submitFiles }: Props) {
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (!files || files.length === 0) {
      setSelectedFiles(null);
    } else {
      setSelectedFiles(Array.from(files));
    }
  };

  const removeSelectedFile = (file: File) => {
    if (!selectedFiles) return;
    const filtered = selectedFiles.filter(
      (f) => f.name !== file.name && f.size !== file.size
    );
    if (!filtered || filtered.length === 0) {
      setSelectedFiles(null);
    } else {
      setSelectedFiles(filtered);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    try {
      setIsSubmitting(true);
      await submitFiles(selectedFiles);
      setSelectedFiles(null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='py-6'>
      <div className='bg-white p-4 rounded-md text-center shadow-sm w-full max-w-96'>
        <div className='text-left'>
          <p className='text-sm font-medium'>
            Selecione arquivos para indexar na busca
          </p>

          <small className='text-gray-500 text-xs'>
            <span className='text-red-500'>*</span> Apenas arquivos PDF, com no
            máximo 25mb cada
          </small>
        </div>
        <form className='mt-4'>
          <div className='flex gap-2 justify-center'>
            <Button variant='outline' asChild disabled>
              <Link href='/' aria-disabled>
                <ChevronLeftIcon /> Voltar
              </Link>
            </Button>
            <Button asChild variant='secondary'>
              <label htmlFor='file-input' className='hover:cursor-pointer'>
                <UploadIcon /> Selecionar arquivos
              </label>
            </Button>
          </div>
          <input
            id='file-input'
            name='file-input'
            type='file'
            className='hidden'
            accept='application/pdf'
            multiple
            onChange={handleSelectFiles}
          />
        </form>

        {selectedFiles && (
          <>
            <div className='mt-4 mb-2'>
              <p className='text-sm text-left font-medium'>
                Arquivos selecionados
              </p>
            </div>
            <div className='border rounded-lg p-4'>
              <div className='flex justify-start flex-col gap-2'>
                {selectedFiles?.map((file) => (
                  <div
                    key={file.name}
                    className='flex gap-2 justify-between items-center w-full'>
                    <Button
                      size='icon'
                      variant='outline'
                      className='text-xs'
                      onClick={() => removeSelectedFile(file)}>
                      <Trash />
                    </Button>
                    <div className='text-sm text-left text-ellipsis text-nowrap overflow-hidden grow flex-1'>
                      {file.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='mt-2 text-left'>
              <Button
                className='w-full'
                disabled={isSubmitting}
                onClick={handleSubmit}>
                {isSubmitting && (
                  <LucideLoader2 className='animate-spin' size={25} />
                )}
                Salvar
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
