'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { UserList } from "@/components/users/userList";
import { UserActionHeader } from "@/components/users/userActionHeader";


export default function UserPage() {
  const [search, setSearch] = useState("");

  
 
  
  return (
    <div className="flex flex-col gap-6">
      {/* Topo */}
      <UserActionHeader />

      {/* Campo de busca */}
      <div className="w-full max-w-sm">
        <Input
          placeholder="Buscar por nome ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    <UserList search={search} />
    </div>
  );
}