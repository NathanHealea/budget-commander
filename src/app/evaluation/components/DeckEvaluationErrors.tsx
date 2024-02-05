'use client';

import { useEffect, useState } from 'react';
import { Card, DeckList } from '../evaluation.types';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/16/solid';
import classNames from 'classnames';

interface IDeckEvaluationErrorsProps {
  isSubmitting?: boolean;
  deckList?: DeckList | null;
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
    <section className='collapse w-full shadow-xl bg-base-100'>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className='collapse-title flex-row flex items-center  gap-8 px-8 font-bold bg-warning text-warning-content '>
              <ChevronUpIcon
                className={classNames(
                  'h-8 w-8 transition-all ease-in-out duration-75',
                  open ? 'rotate-180' : '',
                )}
              />
              <h5 className='flex w-full'>
                <span className='font-bold'>Evaluation Errors</span>{' '}
                <span className='flex-1' />
                <span>{errorList.length}</span>
              </h5>
            </Disclosure.Button>
            <Transition
              enter='transition duration-100 ease-out'
              enterFrom='transform scale-95 opacity-0'
              enterTo='transform scale-100 opacity-100'
              leave='transition duration-75 ease-out'
              leaveFrom='transform scale-100 opacity-100'
              leaveTo='transform scale-95 opacity-0'
            >
              <Disclosure.Panel className='collapse-body flex flex-col justify-center gap-8 p-8'>
                <table className='table table-xs table-zebra-zebra table-pin-rows '>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {errorList
                      .filter((card: Card) => card.hasError)
                      .map((card, index) => (
                        <tr key={`table-view-${index}`}>
                          <td>{card.name}</td>
                          <td>{card.message}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </section>
    // <section className='section'>
    //   <div className='section__content'>
    //     <div className='rounded bg-black bg-opacity-50 text-white p-4 flex flex-col w-full'>
    //       <Disclosure>
    //         {({ open }) => (
    //           <>
    //             <Disclosure.Button className='text__h6 flex flex-row justify-center items-center'>
    //               <div>Errors</div>
    //               <div className='p-2'>{errorList.length}</div>
    //               <span className='flex-1'></span>
    //               {open ? <>Chevron up</> : <>Chevron down</>}
    //             </Disclosure.Button>
    //             <Disclosure.Panel className=''>
    //               <div className='flex flex-col text__body'>
    //                 {errorList
    //                   .filter((card: Card) => card.hasError)
    //                   .map((card, index) => (
    //                     <div
    //                       key={index}
    //                       className='flex flex-row gap-4 justify-center items-center p-2'
    //                     >
    //                       <div className=''>{card.name}</div>
    //                       <div className='flex-1'>{card.message}</div>
    //                     </div>
    //                   ))}
    //               </div>
    //             </Disclosure.Panel>
    //           </>
    //         )}
    //       </Disclosure>
    //     </div>
    //   </div>
    // </section>
  );
}
