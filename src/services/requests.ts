import { API_CONFIG } from "@/config";
import { getApiClient } from "./apiClient";
import { ApiSearchResponse } from "./types";

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
