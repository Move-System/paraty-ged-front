'use client';

import { useState } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getAllUser } from '@/services/userService';
import { UserTable } from './userTable';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '../ui/button';
import { UserPaginationResponse } from '@/services/types';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';

type Props = {
  search?: string;
};

export function UserList({ search }: Props) {
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const queryOptions: UseQueryOptions<
    UserPaginationResponse, // tipo do retorno
    Error, // tipo do erro
    UserPaginationResponse, // tipo dos dados finais
    [string, string, number] // tipo do queryKey
  > = {
    queryKey: ['users', debouncedSearch || '', page],
    queryFn: () => getAllUser(debouncedSearch, page, 10),
  };

  const { data, isLoading, isFetching } = useQuery(queryOptions);

  function handleNext() {
    if (page < (data as UserPaginationResponse)?.totalPages) setPage(prev => prev + 1);
  }

  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  if (isLoading) return <p>Carregando usuários...</p>;

  return (
    <div className="space-y-4">
      <UserTable users={(data as UserPaginationResponse)?.data} />

      <div className="flex justify-between items-center">
        <Button onClick={handlePrev} disabled={page === 1}>
          <ArrowLeft className="w-4 h-4 " />
        </Button>

        <span className="text-sm text-muted-foreground">
          Página {page} de {(data as UserPaginationResponse)?.totalPages}
        </span>

        <Button
          onClick={handleNext}
          disabled={page === (data as UserPaginationResponse)?.totalPages}
        >
          <ArrowRight className="w-4 h-4 " />
        </Button>
      </div>

      {isFetching && <p className="text-sm text-muted-foreground">Atualizando...</p>}
    </div>
  );
}

export const UserListDynamic = dynamic(() => Promise.resolve(UserList), { ssr: false });
