import { useEffect, useState } from 'react';
import { Card, DeckList } from '../evaluation.types';
import { Disclosure } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface IDeckEvaluationErrorsProps {
  isSubmitting?: boolean;
  deckList?: DeckList;
}

export default function DeckEvaluationErrors(
  props: IDeckEvaluationErrorsProps,
) {
  const { isSubmitting, deckList } = props;
  const [errorList, setErrorList] = useState<Array<Card>>([]);

  useEffect(() => {
    if (deckList !== null && deckList !== undefined) {
      setErrorList(deckList.cards.filter((card) => card.hasError));
    } else {
      setErrorList([]);
    }
  }, [deckList]);

  if (isSubmitting || errorList.length == 0) {
    return null;
  }

  return (
    <section className='section'>
      <div className='section__content'>
        <div className='rounded bg-black bg-opacity-50 text-white p-4 flex flex-col w-full'>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='text__h6 flex flex-row justify-center items-center'>
                  <div>Errors</div>
                  <div className='p-2'>{errorList.length}</div>
                  <span className='flex-1'></span>
                  {open ? (
                    <FontAwesomeIcon
                      icon={faChevronUp}
                      className='block h-6 w-6'
                      aria-hidden='true'
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className='block h-6 w-6'
                      aria-hidden='true'
                    />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className=''>
                  <div className='flex flex-col text__body'>
                    {deckList.cards
                      .filter((card: Card) => card.hasError)
                      .map((card, index) => (
                        <div
                          key={index}
                          className='flex flex-row gap-4 justify-center items-center p-2'
                        >
                          <div className=''>{card.name}</div>
                          <div className='flex-1'>{card.message}</div>
                        </div>
                      ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </section>
  );
}
