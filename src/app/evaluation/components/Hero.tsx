import classNames from 'classnames';
import Link from 'next/link';

interface IHeroProps {
  hidden?: boolean;
}

export default function Hero(props: IHeroProps) {
  const { hidden } = props;

  return (
    <div className={classNames(hidden ? 'hidden' : 'hero', 'transition-all ease-in-out')}>
      <div className='hero__content'>
        <h1 className='hero__title'>Deck Evaluation Tool</h1>
        <p className='hero__subtitle'>
          Use this tool to get a market evaluation of your deck according to the{' '}
          <Link className='link' href='/rules'>
            Budget Commander Rules
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
