export type ApiFile = {
  id: number;
  public_id: string;
  filename: string;
  url: string;
  raw_content: string;
  pages_content: string[];
  created_at: string;
  updated_at: string;
};

export type ApiSearchResponse = {
  totalPages: number;
  totalRecords: number;
  data: ApiFile[];
};

type EnqueuedFileStatus = 'queued' | 'processing' | 'saving' | 'complete' | 'failed';

export type EnqueuedFile = {
  fileName: string;
  jobId: string | number;
  status: EnqueuedFileStatus;
};

export type FailedFiles = string[];

export type UploadFilesApiResponse = {
  message: string;
  enqueuedFiles: EnqueuedFile[];
};

export type UploadFilesRequestResponseData =
  | ({
      success: true;
    } & UploadFilesApiResponse)
  | {
      success: false;
      message: string;
      failedFiles?: FailedFiles;
      enqueuedFiles?: EnqueuedFile[];
    };

export type JobStatusUpdateEventData = {
  jobId: string | number;
  status: EnqueuedFileStatus;
};

export type CreateUserDTO = {
  name: string;
  email: string;
  password?: string;
  role: string;
};

export type UpdateUserDTO = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
};

export type UserPaginationResponse = {
  data: User[];
  total: number;
  totalPages: number;
};
