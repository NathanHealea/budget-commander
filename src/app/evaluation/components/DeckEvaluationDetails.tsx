'use client';

import { useEffect, useState } from 'react';
import { Card, DeckList, Print } from '../evaluation.types';

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

  // const handleCardSearchOnChange = (e: FormEvent<HTMLInputElement>) => {
  //   const value = e.currentTarget.value;
  //   setFilter(value);
  // };

  /**
   * Gets the price of a card print
   * @param {Print} print Card print
   * @returns 0.00 if print is undefined or null, otherwise gets the price of print.
   */
  const getCardPrintPrice = (print?: Print | null) => {
    if (print == undefined || print == null) {
      return '0.00';
    }

    return print.price.toFixed(2);
  };

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

        <div className='flex flex-col text__body'>
          {deckList.cards
            .filter((card: Card) => !card.hasError)
            .map((card, index) => (
              <div
                key={index}
                className='flex flex-row gap-4 justify-center items-center p-2'
              >
                <div className=''>{card.count}</div>
                <div className='flex-1'>{card.name}</div>
                <div className='flex flex-row justify-center items-center'>
                  <div className=' w-4'>$</div>
                  <div className=' min-w-[4em] text-right'>
                    {getCardPrintPrice(card.evaluatedPrint)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
