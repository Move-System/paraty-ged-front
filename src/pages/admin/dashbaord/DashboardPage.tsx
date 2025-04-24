'use client';

import { FileText, Users, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardSummary } from '@/services/dashboardService';
import { formatDateBR } from '@/lib/utils';
import UploadsChart from './UploadsChart';

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: getDashboardSummary,
  });

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className="flex flex-col gap-8">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        <Card
          icon={<FileText size={24} />}
          title="Total de Documentos"
          value={data?.totalDocuments.toString()}
        />
        <Card icon={<Calendar size={24} />} title="Hoje" value={data?.uploadsToday} />
        <Card icon={<Users size={24} />} title="Usuários ativos" value={data?.activeUsers} />
      </div>

      {/* Gráfico */}
      {data?.uploadsByDay && <UploadsChart data={data.uploadsByDay} />}

      {/* Mini tabela */}
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <div className="bg-slate-900 text-white px-4 py-2 font-medium text-sm">
          Documentos Recentes
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">Usuário</th>
            </tr>
          </thead>
          <tbody>
            {data?.recentDocuments.map(
              doc => (
                console.log(doc),
                (
                  <tr key={doc.id} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-2">{doc.title}</td>
                    <td className="px-4 py-2">{formatDateBR(doc.createdAt)}</td>
                    <td className="px-4 py-2">
                      {doc.uploader.name === null ? 'Desconhecido' : doc.uploader.name}
                    </td>
                  </tr>
                )
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Card Component
function Card({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
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
