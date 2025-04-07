// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next";
import { AuthProvider } from "@/Context/Auth/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Câmara Municipal de Paraty - Busca de Documentos",
  description: "Sistema de busca de documentos da Câmara Municipal de Paraty",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} antialiased bg-neutral-100`}>
        <NuqsAdapter>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
