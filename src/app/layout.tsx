import type { Metadata } from 'next';
import { Exo_2 } from 'next/font/google';
import './globals.css';

const exo_2 = Exo_2({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'For My Srisakhi',
  description: 'For My Srisakhi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={exo_2.className}>
      <body>{children}</body>
    </html>
  );
}
