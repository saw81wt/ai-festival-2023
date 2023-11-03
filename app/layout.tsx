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
      <head>
        <meta charSet="utf-8" />
        <title>KIRAKU</title>
        <meta name="description" content="KIRAKU" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-emerald-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
