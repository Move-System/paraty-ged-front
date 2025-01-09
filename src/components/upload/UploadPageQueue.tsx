"use client";

import { getSocketClient } from "@/services/socketClient";
import { EnqueuedFile, JobStatusUpdateEventData } from "@/services/types";
import { LucideLoader2 } from "lucide-react";
import { useEffect } from "react";

export type UploadPageQueueProps = {
  enqueuedFiles: EnqueuedFile[];
  updateEnqueuedFileStatus: (data: JobStatusUpdateEventData) => void;
};

export default function UploadPageQueue({
  enqueuedFiles,
  updateEnqueuedFileStatus,
}: UploadPageQueueProps) {
  useEffect(() => {
    if (!enqueuedFiles || enqueuedFiles.length === 0) return;
    const socket = getSocketClient();
    socket.on("job-status-update", (data: JobStatusUpdateEventData) => {
      updateEnqueuedFileStatus(data);
    });
  }, [enqueuedFiles, updateEnqueuedFileStatus]);

  if (!enqueuedFiles || enqueuedFiles.length === 0) return null;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className=''>
        <h2 className='text-sm font-medium'>Arquivos em processamento</h2>
        <small className='text-gray-500'>
          Os arquivos estão sendo processados no servidor, você já pode fechar
          essa janela
        </small>
      </div>
      {enqueuedFiles.map((file) => (
        <div
          className='bg-white p-4 rounded-md flex gap-4 justify-between'
          key={file.fileName}>
          <div className='text-ellipsis text-nowrap overflow-hidden grow w-full'>
            {file.fileName}
          </div>
          <div className='bg-lime-100 rounded-lg py-1 px-2 text-sm flex gap-1 items-center text-slate-600 shrink-0'>
            <LucideLoader2 className='animate-spin' size={22} />
            Na fila
          </div>
        </div>
      ))}
    </div>
  );
}
