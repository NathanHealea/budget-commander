'use client';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { FormEvent, useState } from 'react';

type DeckListEvaluationFormProps = {
  isSubmitting?: boolean;
  onSubmit: (decklist: string) => void;
};

const DeckListEvaluationForm = (props: DeckListEvaluationFormProps) => {
  const { isSubmitting, onSubmit } = props;
  const [decklist, setDeckList] = useState<string>('');

  const handleDeckListOnChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setDeckList(e.currentTarget.value);
  };

  const handleEvaluationButtonOnClick = () => {
    onSubmit(decklist);
  };

  return (
    <section className='collapse w-full shadow-xl bg-base-100'>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className='collapse-title flex-row flex items-center  gap-8 px-8 font-bold '>
              <ChevronUpIcon
                className={classNames(
                  'h-8 w-8 transition-all ease-in-out duration-75',
                  open ? 'rotate-180' : '',
                )}
              />
              <h5>Deck Importer</h5>
            </Disclosure.Button>
            <Transition
              enter='transition duration-100 ease-out'
              enterFrom='transform scale-95 opacity-0'
              enterTo='transform scale-100 opacity-100'
              leave='transition duration-75 ease-out'
              leaveFrom='transform scale-100 opacity-100'
              leaveTo='transform scale-95 opacity-0'
            >
              <Disclosure.Panel className='collapse-body flex flex-col justify-center gap-8 p-8 pt-0'>
                <textarea
                  className={classNames(
                    'textarea textarea-bordered',
                    isSubmitting ? 'textarea-disabled' : '',
                  )}
                  rows={12}
                  placeholder={
                    'Supported Formats: \r\n  Elesh Norn, Grand Cenobite \r\n  1 Elesh Norn, Grand Cenobite \r\n  1x Elesh Norn, Grand Cenobite \r\n  1x Elesh Norn, Grand Cenobite (MUL) 113 \r\n'
                  }
                  spellCheck='false'
                  value={decklist}
                  onChange={handleDeckListOnChange}
                  onBlur={handleDeckListOnChange}
                />
                <button
                  type='button'
                  className={classNames(
                    'btn btn-primary',
                    isSubmitting ? 'btn-disabled' : '',
                  )}
                  disabled={isSubmitting}
                  onClick={handleEvaluationButtonOnClick}
                >
                  Evaluate Deck
                </button>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </section>
  );
};

export default DeckListEvaluationForm;
