
import type { Metadata } from "next";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/Context/Auth/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Câmara Municipal de Paraty - Busca de Documentos",
  description: "Sistema de busca de documentos da Câmara Municipal de Paraty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br'>
      <body className={`${inter.className} antialiased bg-neutral-100`}>
        <NuqsAdapter>
          <AuthProvider>
          <div className='w-full max-w-[720px] mx-auto px-4'>{children}</div>
          </AuthProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}


