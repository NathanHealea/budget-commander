'use client';

import { useEffect, useState } from 'react';
import { Card, DeckList } from '../evaluation.types';
import DeckListTableView from './DeckListTableView';

interface IDeckEvaluationDetailsProps {
  isSubmitting?: boolean;
  deckList?: DeckList | null;
}

export default function DeckEvaluationDetails(
  props: IDeckEvaluationDetailsProps,
) {
  const { isSubmitting, deckList: defaultDeckList } = props;
  const [deckList, setDeckList] = useState<DeckList | null>(
    defaultDeckList || null,
  );

  useEffect(() => {
    setDeckList(defaultDeckList || null);
  }, [defaultDeckList]);

  if (isSubmitting || deckList == null || deckList == undefined) {
    return null;
  }

  return (
    <section className='section'>
      <div className='section__content'>
        <h1 className='section__title text-center'>
          Deck value ${deckList.value.toFixed(2)}
        </h1>
        <h2 className='section__subtitle text-center'>
          Card Count {deckList.count}
        </h2>

        {/* <div className='flex flex-col md:flex-row'>
          <div className='flex-1'>
            <input
              className='input'
              type='text'
              placeholder='Card Name'
              onChange={handleCardSearchOnChange}
            />
          </div>
        </div> */}

        <DeckListTableView deckList={deckList} />
      </div>
    </section>
  );
}
