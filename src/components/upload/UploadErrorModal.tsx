"use client";

import { FailedFiles } from "@/services/types";
import { File } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  error: {
    message: string;
    failedFiles?: FailedFiles;
  };
};

export default function UploadErrorModal({ isOpen, onClose, error }: Props) {
  const handleOnOpenChange = (open: boolean) => {
    if (open) return;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <div className='flex flex-col'>
          <DialogHeader className='mb-4'>
            <DialogTitle>Ocorreu um erro ao adicionar os arquivos</DialogTitle>
          </DialogHeader>
          <div className='text-red-900 text-sm'>{error.message}</div>
          {error.failedFiles && error.failedFiles.length !== 0 && (
            <div className='mt-6'>
              <p className='font-medium text-sm mb-2'>
                Arquivos que não puderam ser adicionados:
              </p>
              <ul className='list-inside flex flex-col gap-2'>
                {error.failedFiles.map((file) => (
                  <li key={file} className='text-sm flex items-center gap-2'>
                    <File size={22} /> {file}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
