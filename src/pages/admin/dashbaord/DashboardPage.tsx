'use client';

import dynamic from 'next/dynamic';
import { FileText, Users, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardSummary } from '@/services/dashboardService';
import UploadsChart from './UploadsChart';
import TableRecentDocuments from '@/components/dashboard/TableRecentDocuments';

function DashboardPage() {
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
      <TableRecentDocuments recentDocuments={data?.recentDocuments} />
    </div>
  );
}

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

// exporta usando dynamic, desabilitando o SSR
export default dynamic(() => Promise.resolve(DashboardPage), { ssr: false });
