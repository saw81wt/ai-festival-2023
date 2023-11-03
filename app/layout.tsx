// app/layout.tsx
'use client';
import './globals.css';

import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='bg-emerald-200'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
