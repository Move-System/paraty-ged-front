"use client";

import { useQueryState } from "nuqs";
import { ChangeEventHandler, FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SEARCH_QUERY_PARAM } from "@/config";

export default function DocSearchForm() {
  const [searchQuery, setSearchQuery] = useQueryState(SEARCH_QUERY_PARAM);
  const [searchInput, setSearchInput] = useState(searchQuery ?? "");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setSearchInput(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim() ?? null);
  };

  const submitButtonDisabled = searchQuery === searchInput || !searchInput;

  return (
    <div className='w-full py-6'>
      <div className='pb-4'>
        <h1 className='text-sm font-medium text-center'>
          Busca de documentos por conteúdo
        </h1>
      </div>
      <div className='w-full bg-white shadow-sm rounded-md px-4 py-4'>
        <form method='POST' onSubmit={handleSubmit}>
          <div className='flex gap-2 w-full'>
            <Input
              className='flex-1'
              placeholder='Conteúdo do documento'
              onChange={handleInputChange}
              value={searchInput}
            />
            <Button type='submit' disabled={submitButtonDisabled}>
              Buscar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
