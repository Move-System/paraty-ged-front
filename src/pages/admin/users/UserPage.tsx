'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserList } from "@/components/users/userList";


export default function UserPage() {
  const [search, setSearch] = useState("");

 
  
  return (
    <div className="flex flex-col gap-6">
      {/* Topo */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <Button>Novo Usuário</Button>
      </div>

      {/* Campo de busca */}
      <div className="w-full max-w-sm">
        <Input
          placeholder="Buscar por nome ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    <UserList />
    </div>
  );
}