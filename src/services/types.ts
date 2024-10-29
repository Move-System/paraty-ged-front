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
