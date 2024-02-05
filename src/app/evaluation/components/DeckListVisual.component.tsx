'use client';
import { Card, DeckList } from '../evaluation.types';
import Image from 'next/image';
import CardPrint from './CardPrint.components';
type DeckListVisualProps = {
  deckList?: Array<Card>;
};

const DeckListVisual = (props: DeckListVisualProps) => {
  const { deckList } = props;
  if (!deckList) {
    return null;
  }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-8 just'>
      {deckList
        .filter((card: Card) => !card.hasError)
        .map((card, index) => (
          <div
            key={`visual-${index}`}
            className='flex justify-center items-center'
          >
            <div className='relative rounded-xl  w-[126px] text-center flex gap-4 flex-col'>
              <CardPrint {...card.print} />

              <div className='absolute flex justify-center items-center -top-1 -right-1 h-8 w-8 rounded-full badge-primary'>
                <span className='text-xs'>{card.count}</span>
              </div>
              <p className='h-8'>
                {!card.isBasic && `$${card.evaluatedPrintPrice?.toFixed(2)}`}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DeckListVisual;
