import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { AuthProvider } from '@/Context/Auth/AuthContext';
import { Providers } from '@/components/Providers';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Câmara Municipal de Paraty - Busca de Documentos',
  description: 'Sistema de busca de documentos da Câmara Municipal de Paraty',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className}  bg-neutral-100 text-slate-950`}>
        <Providers>
          <NuqsAdapter>
            <AuthProvider>
              {children}
              <Toaster richColors position="top-right" />
            </AuthProvider>
          </NuqsAdapter>
        </Providers>
      </body>
    </html>
  );
}
