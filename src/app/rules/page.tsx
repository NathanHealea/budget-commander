import Link from 'next/link';
import { Metadata } from 'next/types';
import Rule, {
  RuleTitle,
  RuleDetail,
  RuleExample,
} from './components/Rule.component';

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
    <main className='page gap-16'>
      <header className='hero w-full items-center justify-center my-8 text-center'>
        <div className='hero-content'>
          <h1 className='text-center font-bold'>Play Rules and Modifiers</h1>
        </div>
      </header>

      <Rule>
        <RuleDetail>
          Budget Commander follows the{' '}
          <Link
            className='link link-primary no-underline'
            href='https://magic.wizards.com/en/formats/commander'
            target='_blank'
          >
            Command Format
          </Link>{' '}
          rules and ban list.
        </RuleDetail>
      </Rule>

      <Rule>
        <RuleTitle>Deck Value</RuleTitle>
        <RuleDetail>
          Decks must not exceed $100 USD in total market value.
        </RuleDetail>
        <RuleDetail>
          The commander contributes to the deck&apos;s total value.
        </RuleDetail>
        <RuleDetail>
          Basic and Basic Snow-Covered lands are excluded from the deck&apos;s
          value calculation.
        </RuleDetail>
      </Rule>

      <Rule>
        <RuleTitle>Card Evaluation</RuleTitle>
        <RuleDetail>
          Card values are based on the cheapest available print&apos;s market
          value.
        </RuleDetail>
        <RuleExample>
          Example: Elesh Norn, Grand Cenobite has 11 prints. The most expensive
          being ~$700 USD (Multiverse Legends · Doublerainbow) and the cheapest
          being ~$11 USD (Multiverse Legends · Nonfoil/Foil). Having the ~$700
          USD (Multiverse Legends · Doublerainbow) print would only add ~$11 USD
          to the deck&apos;s total value.
        </RuleExample>
      </Rule>
    </main>
  );
}
