import { Metadata } from 'next/types';

const PAGE_TITLE = 'Rules';
const PAGE_DESCRIPTION =
  'Rules for the commander variant format Budget Commander';

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

export default function RulesPage() {
  return (
    <main className='flex flex-1 flex-col'>
      <section className='hero'>
        <div className='hero__content'>
          <h1 className='hero__title'>Rules</h1>
        </div>
      </section>
      <section className='section'>
        <div className='section__content'>
          <h2></h2>
          <ol className='list'>
            <li className='list__item'>
              Budget Commander follows the{' '}
              <a className='link' href='' target='_blank'>
                Command Format
              </a>{' '}
              rules and ban list.
            </li>
            <li className='list__item'>
              Decks must not exceed $100 USD in total market value.
              <ul className='list p-2 pl-8'>
                <li>The commander contributes to the deck&apos;s value.</li>
              </ul>
            </li>
            <li className='list__item'>
              Card values are based on the cheapest available print&apos;s
              market value.
              <ul className='list-none p-2 pl-8'>
                <li>
                  <em className='text__caption'>
                    Example: Elesh Norn, Grand Cenobite has 11 prints, the most
                    expensive being ~$700 USD (Multiverse Legends ·
                    Doublerainbow) and the cheapest being ~$11 USD (Multiverse
                    Legends · Nonfoil/Foil). Having the ~$700 USD (Multiverse
                    Legends · Doublerainbow) print would only count toward ~$11
                    USD of a deck&apos;s total value.
                  </em>
                </li>
              </ul>
            </li>
            <li className='list__item'>
              Basic and Basic Snow-Covered lands are excluded from the
              deck&apos;s value calculation.
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
