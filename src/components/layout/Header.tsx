'use client';

import { useAuth } from "@/Context/Auth/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
      <h1 className="text-lg font-semibold">Câmara Municipal de Paraty</h1>
      <div>
        {user ? (
          <>
            <span className="mr-2">Bem-vindo, {user.name}</span>
            <button className="text-sm text-red-500" onClick={logout}>
              Sair
            </button>
          </>
        ) : (
          <button className="text-sm text-red-500" onClick={logout}>
            Sair
          </button>
        )}        
      </div>
    </header>
  );
}
