import '../styles/globals.css';

import type { Metadata } from 'next';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Navbar, { Link } from '@/components/Header';
import Footer from '@/components/Footer';

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Budget Commander',
  description: 'Commander variant where deck total cannot be over $100.',
};

const Links: Array<Link> = [
  { name: 'Home', href: '/' },
  { name: 'Rules', href: '/rules' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='flex flex-col text-slate min-h-screen bg-gradient-to-tr from-purple-200 via-purple-400 to-purple-800'>
        <Navbar links={Links} />
        {children}
        <Footer />
      </body>
    </html>
  );
}

