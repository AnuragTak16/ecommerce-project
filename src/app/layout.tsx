import type React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/component/query-provider';
import Header from '@/component/header';

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'Simple e-commerce product listing',
  generator: 'v0.app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='font-sans antialiased'>
        <QueryProvider>
          <Header />
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
