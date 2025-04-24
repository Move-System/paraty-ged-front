'use client';

import { useAuth } from '@/Context/Auth/AuthContext';
import { UserAvatar } from '../ui/Avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, User } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-slate-950 text-slate-50 shadow">
      <h1 className="text-lg">Câmara Municipal de Paraty</h1>

      {user && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="focus:outline-none">
              <UserAvatar name={user.name} />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content
            sideOffset={8}
            className="z-50 min-w-[160px] rounded-md bg-white shadow-md p-1 text-sm text-slate-800"
          >
            <DropdownMenu.Item
              className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 cursor-pointer"
              onSelect={() => console.log('Ir para perfil')}
            >
              <User size={16} />
              Perfil
            </DropdownMenu.Item>

            <DropdownMenu.Separator className="h-px bg-slate-200 my-1" />

            <DropdownMenu.Item
              className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 cursor-pointer text-red-600"
              onSelect={logout}
            >
              <LogOut size={16} />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </header>
  );
}
