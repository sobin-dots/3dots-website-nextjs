import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

import { Providers } from '@/components/Providers';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: '3dots | Your Virtual CTO',
  description: 'We handle all the software development domain of any company. Software Development, Startup Launch Pad, Workflow Automation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans antialiased bg-brand-50 text-slate-800`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
