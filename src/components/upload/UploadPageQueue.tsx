"use client";

import { getSocketClient } from "@/services/socketClient";
import { EnqueuedFile, JobStatusUpdateEventData } from "@/services/types";
import { LucideLoader2, CheckCircle, XCircle } from "lucide-react";
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
    console.log("Enqueued files", enqueuedFiles);

    const socket = getSocketClient();

    socket.on("job-status-update", (data: JobStatusUpdateEventData) => {
      console.log("Status atualizado:", data);
      updateEnqueuedFileStatus(data);
    });

    return () => {
      socket.off("job-status-update");
    };
  }, [enqueuedFiles, updateEnqueuedFileStatus]);

  if (!enqueuedFiles || enqueuedFiles.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="">
        <h2 className="text-sm font-medium">Arquivos em processamento</h2>
        <small className="text-gray-500">
          Os arquivos estão sendo processados no servidor, você já pode fechar
          essa janela
        </small>
      </div>
      {enqueuedFiles.map((file) => (
        <div
          className="bg-white p-4 rounded-md flex gap-4 justify-between items-center"
          key={file.fileName}
        >
          <div className="text-ellipsis text-nowrap overflow-hidden grow w-full">
            {file.fileName}
          </div>
          <div className="shrink-0">
            {file.status === "queued" && (
              <div className="bg-yellow-100 text-yellow-800 rounded-lg py-1 px-2 text-sm flex gap-1 items-center">
                <LucideLoader2 className="animate-spin" size={22} />
                Na fila
              </div>
            )}
            {file.status === "processing" && (
              <div className="bg-blue-100 text-blue-800 rounded-lg py-1 px-2 text-sm flex gap-1 items-center">
                <LucideLoader2 className="animate-spin" size={22} />
                Processando
              </div>
            )}
            {file.status === "complete" && (
              <div className="bg-green-100 text-green-800 rounded-lg py-1 px-2 text-sm flex gap-1 items-center">
                <CheckCircle size={22} />
                Concluído
              </div>
            )}
            {file.status === "failed" && (
              <div className="bg-red-100 text-red-800 rounded-lg py-1 px-2 text-sm flex gap-1 items-center">
                <XCircle size={22} />
                Erro
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
