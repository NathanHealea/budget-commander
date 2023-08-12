import { Metadata } from 'next';

import Hero from './components/Hero';
import DeckEvaluationTool from './components/DeckEvaluationTool';

const PAGE_TITLE = 'Deck Evaluation Tool';
const PAGE_DESCRIPTION =
  'Tool to check the current market value of a deck given the Budget Commander format rules';

export const metadata: Metadata = {
  title: `Budget Commander - ${PAGE_TITLE}`,
  description: PAGE_DESCRIPTION,
  twitter: {
    card: 'summary_large_image',
    title: `Budget Commander - ${PAGE_TITLE}`,
    description: PAGE_DESCRIPTION,
    site: '@nathanhealea',
    siteId: '2654889620',
    creator: '@nathanhealea',
    creatorId: '2654889620',
    images: [], // TODO: find photos for my twitter card,
  },
  openGraph: {
    type: 'website',
    title: `Budget Commander - ${PAGE_TITLE}`,
    description: PAGE_DESCRIPTION,
    url: 'https://buget-commander.nathanhealea.com',
    images: [], // TODO: find images for my open Graph.
  },
};

export default function DeckEvaluationPage() {
  return (
    <main className='flex flex-1 flex-col items-center justify-center '>
      <Hero />

      <DeckEvaluationTool />
    </main>
  );
}
