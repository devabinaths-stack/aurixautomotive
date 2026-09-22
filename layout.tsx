import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AURIX | Engineered to Move',
  description: 'Discover AURIX — a new expression of automotive performance, technology and design.',
  openGraph: { title: 'AURIX | Engineered to Move', description: 'A new expression of performance, technology and design.', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
