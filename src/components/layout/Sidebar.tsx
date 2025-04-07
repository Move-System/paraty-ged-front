'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Users, History, Settings } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard /> },
    { href: "/admin/documentos", label: "Documentos", icon: <FileText /> },
    { href: "/admin/historico", label: "Histórico", icon: <History /> },
    { href: "/admin/usuarios", label: "Usuários", icon: <Users /> },
    { href: "/admin/configuracoes", label: "Configurações", icon: <Settings /> },
  ];

  return (
    <aside className="">
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 ${
              pathname === link.href ? " font-medium" : "text-gray-700"
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
