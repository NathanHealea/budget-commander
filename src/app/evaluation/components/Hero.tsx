import classNames from 'classnames';
import Link from 'next/link';

export type HeroProps = {};

export default function Hero(props: HeroProps) {
  return (
    <header className='hero w-full items-center justify-center my-8 text-center'>
      <div className='hero-content  flex-col'>
        <h1 className='font-bold'>Deck Evaluation Tool</h1>
        <p>
          Use this tool to get a market evaluation fo you deck according to the{' '}
          <Link className='link link-primary no-underline' href='/rules'>
            Budget Commander Rules
          </Link>
          .
        </p>
      </div>
    </header>
  );
}
