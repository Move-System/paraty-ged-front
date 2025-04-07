// components/layout/AdminLayout.tsx
'use client';

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-neutral-100">
          {children}
        </main>
      </div>
    </div>
  );
}
