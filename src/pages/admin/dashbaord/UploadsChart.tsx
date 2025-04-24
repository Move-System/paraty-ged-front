'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

type Props = {
  data: { date: string; count: number }[];
};

export default function UploadsChart({ data }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow-md border w-full">
      <h2 className="text-sm font-medium mb-4 text-slate-800">Uploads por dia (últimos 7 dias)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={str => {
              const date = parseISO(str);
              return format(date, 'dd/MM');
            }}
          />
          <YAxis allowDecimals={false} />
          <Tooltip
            labelFormatter={label => {
              const date = parseISO(label);
              return `Data: ${format(date, 'dd/MM/yyyy')}`;
            }}
          />
          <Bar dataKey="count" fill="#020617" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
