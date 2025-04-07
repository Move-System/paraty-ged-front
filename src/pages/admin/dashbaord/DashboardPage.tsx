'use client';

import { FileText, Users, Clock, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  // Simulação de documentos recentes
  const recentDocuments = [
    {
      id: 1,
      title: "Lei Complementar 012",
      type: "Lei",
      author: "João Vitor",
      date: "04/04/2025",
    },
    {
      id: 2,
      title: "Requerimento 22",
      type: "Requerimento",
      author: "Maria Silva",
      date: "03/04/2025",
    },
    {
      id: 3,
      title: "Ofício 77",
      type: "Ofício",
      author: "Carlos Alberto",
      date: "02/04/2025",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card icon={<FileText size={24} />} title="Documentos" value="8.452" />
        <Card icon={<UploadCloud size={24} />} title="Hoje" value="12 uploads" />
        <Card icon={<Clock size={24} />} title="Pendentes" value="4 documentos" />
        <Card icon={<Users size={24} />} title="Usuários ativos" value="28" />
      </div>

      {/* Mini tabela */}
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <div className="bg-slate-900 text-white px-4 py-2 font-medium text-sm">
          Documentos Recentes
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Autor</th>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2 text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {recentDocuments.map((doc) => (
              <tr key={doc.id} className="border-t hover:bg-slate-50">
                <td className="px-4 py-2">{doc.title}</td>
                <td className="px-4 py-2">{doc.type}</td>
                <td className="px-4 py-2">{doc.author}</td>
                <td className="px-4 py-2">{doc.date}</td>
                <td className="px-4 py-2 text-right">
                  <Button size="sm" variant="outline">
                    Ver
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Card Component
function Card({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 bg-white border rounded-lg p-4 shadow-sm">
      <div className="p-2 bg-slate-900 text-white rounded">{icon}</div>
      <div>
        <p className="text-xs text-slate-500">{title}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}
