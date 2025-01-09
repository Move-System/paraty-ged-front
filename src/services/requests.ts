import { API_CONFIG } from "@/config";
import { getApiClient } from "./apiClient";
import {
  ApiSearchResponse,
  EnqueuedFile,
  FailedFiles,
  UploadFilesApiResponse,
  UploadFilesRequestResponseData,
} from "./types";
import { isAxiosError } from "axios";

const client = getApiClient();

export const getFilesRequest = async (content: string, page?: number) => {
  const res = await client.get<ApiSearchResponse>(API_CONFIG.paths.search, {
    params: {
      content,
      page,
    },
  });
  return res.data;
};

export const uploadFilesRequest = async (
  files: File[]
): Promise<UploadFilesRequestResponseData> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const { data } = await client.post<UploadFilesApiResponse>(
      API_CONFIG.paths.upload,
      formData
    );
    return {
      success: true,
      enqueuedFiles: data.enqueuedFiles,
      message: data.message,
    };
  } catch (e) {
    if (!isAxiosError(e) || !e.response?.data) {
      throw e;
    }

    const message =
      (e.response.data.message as string) ??
      "Ocorreu um erro ao subir os arquivos";

    if (e.response.status === 503) {
      return {
        success: false,
        message,
      };
    }

    const { data } = e.response;
    const enqueuedFiles = (data.enqueuedFiles as EnqueuedFile[]) ?? null;
    const failedFiles = (data.failedFiles as FailedFiles) ?? null;

    if (e.response.status === 507) {
      return {
        success: false,
        message,
        ...(enqueuedFiles && { enqueuedFiles }),
        ...(failedFiles && { failedFiles }),
      };
    }

    return {
      success: false,
      message,
    };
  }
};
