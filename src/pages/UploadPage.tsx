// UploadPage.tsx
'use client';

import PageHeader from '@/components/PageHeader';
import UploadErrorModal from '@/components/upload/UploadErrorModal';
import UploadPageQueue, { UploadPageQueueProps } from '@/components/upload/UploadPageQueue';
import UploadPageForm, { UploadFile } from '@/components/upload/UploadPageForm';
import { uploadFilesRequest } from '@/services/requests';
import { useCallback, useState } from 'react';
import { JobStatusUpdateEventData } from '@/services/types';

export default function UploadPage() {
  const [enqueuedFiles, setEnqueuedFiles] = useState<UploadPageQueueProps['enqueuedFiles']>([]);
  const [uploadError, setUploadError] = useState<{
    message: string;
    failedFiles?: string[];
  } | null>(null);

  const handleUpload = useCallback(async (files: UploadFile[]) => {
    try {
      const res = await uploadFilesRequest(files);
      if (res.enqueuedFiles) {
        setEnqueuedFiles(current => [...current, ...res.enqueuedFiles!]);
      }
      if (!res.success) {
        setUploadError({
          message: res.message,
          failedFiles: res.failedFiles,
        });
      }
    } catch (e) {
      console.error('Erro ao fazer upload:', e);
    }
  }, []);

  const updateEnqueuedFileStatus = useCallback((data: JobStatusUpdateEventData) => {
    setEnqueuedFiles(prev => {
      const updated = [...prev];
      const idx = updated.findIndex(file => file.jobId === data.jobId);
      if (idx !== -1) {
        updated[idx].status = data.status;
      }
      return updated;
    });
  }, []);

  return (
    <div className="w-full min-h-screen px-4 py-6 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">
        <PageHeader />
        <UploadPageForm onUpload={handleUpload} />
        <UploadPageQueue
          updateEnqueuedFileStatus={updateEnqueuedFileStatus}
          enqueuedFiles={enqueuedFiles}
        />
        {uploadError && (
          <UploadErrorModal isOpen onClose={() => setUploadError(null)} error={uploadError} />
        )}
      </div>
    </div>
  );
}
