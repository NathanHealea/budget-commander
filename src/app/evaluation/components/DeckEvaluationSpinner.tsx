'use client';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Transition } from '@headlessui/react';
import classNames from 'classnames';

export type DeckEvaluationSpinnerProps = {
  isSubmitting?: boolean;
};

const DeckEvaluationSpinner = (props: DeckEvaluationSpinnerProps) => {
  const { isSubmitting } = props;
  return (
    <Transition
      as='section'
      className='card w-full flex-1 shadow-xl bg-base-100'
      show={isSubmitting}
      enter='transition-opacity duration-75'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-150'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div className='card-body justify-center items-center gap-8'>
        <span className='loading loading-dots loading-lg'></span>
        <h4> Evaluating Deck... </h4>
      </div>
    </Transition>
  );
};

export default DeckEvaluationSpinner;
