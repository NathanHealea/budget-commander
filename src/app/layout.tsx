import '../styles/globals.css';

import type { Metadata } from 'next';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Navbar, { Link } from '@/components/Header';
import Footer from '@/components/Footer';

config.autoAddCss = false;

const DEFAULT_TITLE = 'Budget Commander';
const DEFAULT_DESCRIPTION =
  'Magic the Gather Commander game variant where total deck value must be under $100.';
const DEFAULT_SITE_COLOR = '#222222';

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  themeColor: DEFAULT_SITE_COLOR,
  // manifest: '',
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    site: '@nathanhealea',
    siteId: '2654889620',
    creator: '@nathanhealea',
    creatorId: '2654889620',
    images: [], // TODO: find photos for my twitter card,
  },
  openGraph: {
    type: 'website',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: 'https://nathanhealea.com',
    images: [], // TODO: find images for my open Graph.
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  other: {
    'msapplicatoin-Title-Color': DEFAULT_SITE_COLOR,
  },
};

const Links: Array<Link> = [
  { name: 'Home', href: '/' },
  { name: 'Rules', href: '/rules' },
  { name: 'Deck Evaluation Tool', href: '/evaluation' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className=''>
        <Navbar links={Links} />
        {children}
        <Footer />
      </body>
    </html>
  );
}

