'use client';

import { useAuth } from "@/Context/Auth/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-slate-950 text-slate-50 shadow">
      <h1 className="text-lg  text-slate-50">Câmara Municipal de Paraty</h1>
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
