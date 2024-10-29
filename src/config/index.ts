export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  paths: {
    search: "/search",
    upload: "/upload",
  },
};

export const SEARCH_QUERY_PARAM = "search-term";
export const SEARCH_QUERY_PAGE_PARAM = "page";
