"use client";

import PageHeader from "@/components/PageHeader";
import UploadErrorModal from "@/components/upload/UploadErrorModal";
import { UploadPageQueueProps } from "@/components/upload/UploadPageQueue";
import UploadPageForm from "@/components/upload/UploadPageForm";
import { uploadFilesRequest } from "@/services/requests";
import { useCallback, useState } from "react";
import UploadPageQueue from "@/components/upload/UploadPageQueue";
import { JobStatusUpdateEventData } from "@/services/types";

export default function UploadPage() {
  const [enqueuedFiles, setEnqueuedFiles] = useState<
    UploadPageQueueProps["enqueuedFiles"]
  >([]);
  const [uploadError, setUploadError] = useState<{
    message: string;
    failedFiles?: string[];
  } | null>(null);

  const handleSubmit = useCallback(async (files: File[]) => {
    try {
      const res = await uploadFilesRequest(files);
      if (res.enqueuedFiles) {
        setEnqueuedFiles((current) => [...current, ...res.enqueuedFiles!]);
      }
      if (!res.success) {
        setUploadError({
          message: res.message,
          failedFiles: res.failedFiles,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const updateEnqueuedFileStatus = useCallback(
    (data: JobStatusUpdateEventData) => {
      const files = [...enqueuedFiles];
      const idx = files.findIndex((file) => file.jobId === data.jobId);

      if (idx === -1) return;

      files[idx].status = data.status;
      setEnqueuedFiles(files);
    },
    [enqueuedFiles]
  );

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      <PageHeader />
      <UploadPageForm submitFiles={handleSubmit} />
      <UploadPageQueue
        updateEnqueuedFileStatus={updateEnqueuedFileStatus}
        enqueuedFiles={enqueuedFiles}
      />
      {uploadError && (
        <UploadErrorModal
          isOpen
          onClose={() => setUploadError(null)}
          error={uploadError}
        />
      )}
    </div>
  );
}
