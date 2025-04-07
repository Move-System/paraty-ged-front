// app/(admin)/layout.tsx
import AdminLayout from "@/components/layout/AdminLayout";

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
