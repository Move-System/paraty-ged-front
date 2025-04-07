'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Users, History, Settings, Search, Upload } from "lucide-react";
import PageHeader from "../PageHeader";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
    { href: "/admin/documentos", label: "Documentos", icon: <FileText  size={16} /> },
    { href: "/admin/historico", label: "Histórico", icon: <History size={16} /> },
    { href: "/admin/usuarios", label: "Usuários", icon: <Users size={16} /> },
    { href: "/admin/configuracoes", label: "Configurações", icon: <Settings size={16} /> },
    { href: "/admin/search", label: "Busca", icon: <Search size={16} /> },
    { href: "/admin/upload", label: "Upload", icon: <Upload size={16} /> },


  ];

  return (
  <aside className="bg-slate-950 w-60 p-4 shadow min-h-screen">
      <PageHeader  width={120} height={100}/>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
  key={link.href}
  href={link.href}
  className={`text-sm flex items-center gap-2 p-2 rounded-md transition-all duration-150
    ${
      pathname === link.href
        ? "bg-slate-800 text-white font-semibold"
        : "text-slate-50 hover:bg-slate-800 hover:text-white"
    }`}
>
  <span className="flex items-center">{link.icon}</span>
  <span>{link.label}</span>
</Link>
        ))}
      </nav>
    </aside>
  );
}
