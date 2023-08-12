'use client';
import { FormEvent, useState } from 'react';

interface IDeckListEvaluationForm {
  isSubmitting?: boolean;
  onSubmit: (decklist: string) => void;
}

export default function DeckListEvaluationForm(props: IDeckListEvaluationForm) {
  const { isSubmitting, onSubmit } = props;
  const [decklist, setDeckList] = useState<string>('');

  const handleDeckListOnChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setDeckList(e.currentTarget.value);
  };

  const handleEvaluationButtonOnClick = () => {
    onSubmit(decklist);
  };

  if (isSubmitting) {
    return null;
  }

  return (
    <div className='section'>
      <div className='section__content'>
        <textarea
          className=' h-full input'
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
          className='button-contained'
          onClick={handleEvaluationButtonOnClick}
        >
          Evaluate Deck
        </button>
      </div>
    </div>
  );
}
