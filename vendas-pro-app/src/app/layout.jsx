// src/app/layout.jsx

import { Inter } from 'next/font/google';
import './globals.css'; // A importação TEM que estar aqui.

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mister Ottani Vendas PRO',
  description: 'Sistema de gestão de vendas e CRM.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}