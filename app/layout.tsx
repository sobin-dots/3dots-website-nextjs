import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

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
      <body className={`${outfit.variable} font-sans antialiased bg-[#F8FAFC] text-slate-800`}>
        {children}
      </body>
    </html>
  );
}
