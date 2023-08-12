'use client';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

interface IDeckEvaluationSpinner {
  isSubmitting?: boolean;
}

export default function DeckEvaluationSpinner(props: IDeckEvaluationSpinner) {
  const { isSubmitting } = props;
  return (
    <div className={classNames(isSubmitting ? 'section' : 'hidden')}>
      <div className='section__content'>
        <div className='card '>
          <div className='card__content justify-center items-center gap-2'>
            <FontAwesomeIcon
              icon={faSpinner}
              spin={true}
              className='block h-6 w-6'
            />
            Evaluating deck..
          </div>
        </div>
      </div>
    </div>
  );
}
