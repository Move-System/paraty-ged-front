'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export default function UserPage() {
  const [search, setSearch] = useState("");

  // Placeholder de usuários
  const users = [
    { id: 1, name: "João Vitor", email: "joao@email.com", role: "Admin" },
    { id: 2, name: "Maria Silva", email: "maria@email.com", role: "User" },
  ];

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

      {/* Tabela */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-slate-900 text-slate-50">
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Cargo</th>
              <th className="px-4 py-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-slate-50 transition-colors"
              >
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <Pencil size={16} />
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}