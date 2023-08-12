'use client';

import Hero from './components/Hero';
import { useState } from 'react';

import DeckListEvaluationForm from './components/DeckEvaluationForm';
import DeckEvaluationSpinner from './components/DeckEvaluationSpinner';
import DeckEvaluation from './services/DeckEvaluation';
import { DeckList } from './evaluation.types';
import DeckEvaluationDetails from './components/DeckEvaluationDetails';
import DeckEvaluationErrors from './components/DeckEvaluationErrors';

type State = {
  isSubmitting: boolean;
  deckList: DeckList | null;
};

export default function DeckEvaluationPage() {
  const [state, setState] = useState<State>({
    isSubmitting: false,
    deckList: null,
  });

  const handleDeckListEvaluation = async (decklist: string) => {
    setState({
      ...state,
      isSubmitting: true,
    });

    const deckList = await DeckEvaluation.evaluate(decklist);
    console.log(deckList);
    setState({
      ...state,
      isSubmitting: false,
      deckList: deckList,
    });
  };

  return (
    <main className='flex flex-1 flex-col items-center justify-center '>
      <Hero />

      <DeckListEvaluationForm
        isSubmitting={state.isSubmitting}
        onSubmit={handleDeckListEvaluation}
      />

      <DeckEvaluationSpinner isSubmitting={state.isSubmitting} />
      <DeckEvaluationErrors
        isSubmitting={state.isSubmitting}
        deckList={state.deckList}
      />
      <DeckEvaluationDetails
        isSubmitting={state.isSubmitting}
        deckList={state.deckList}
      />
    </main>
  );
}
