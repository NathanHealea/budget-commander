'use client';
import { Card, DeckList } from '@/app/evaluation/evaluation.types';

interface IDeckListTableViewProps {
  deckList?: DeckList | null;
}

export default function DeckListTableView(props: IDeckListTableViewProps) {
  const { deckList } = props;

  if(deckList == null || deckList == undefined ){
    return null;
  }

  return (
    <div className='table'>
      <div className='table__header'>
        <div className='table__col--clickable min-w-[4em]'>Count</div>
        <div className='table__col--clickable flex-1'>Name</div>
        <div className='table__col--clickable text-right min-w-[4em]'>Price</div>
      </div>

      {deckList.cards
        .filter((card: Card) => !card.hasError)
        .map((card, index) => (
          <div
            key={index}
            className='table__row table__row--striped'
          >
            <div className='min-w-[4em]'>{card.count}</div>
            <div className='flex-1'>{card.name}</div>
            <div className='flex flex-row justify-center items-center'>
              <div className=' w-4'>$</div>
              <div className=' min-w-[3em] text-right'>
                {card.evaluatedPrintPrice?.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
