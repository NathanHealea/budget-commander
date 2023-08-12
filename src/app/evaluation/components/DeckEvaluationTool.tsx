'use client';
import { useState } from 'react';
import DeckEvaluationDetails from './DeckEvaluationDetails';
import DeckEvaluationErrors from './DeckEvaluationErrors';
import DeckListEvaluationForm from './DeckEvaluationForm';
import DeckEvaluationSpinner from './DeckEvaluationSpinner';
import { DeckList } from '../evaluation.types';
import DeckEvaluationService from '../services/DeckEvaluationService';

type State = {
  isSubmitting: boolean;
  deckList: DeckList | null;
};

export default function DeckEvaluationTool() {
  const [state, setState] = useState<State>({
    isSubmitting: false,
    deckList: null,
  });

  const handleDeckListEvaluation = async (decklist: string) => {
    setState({
      ...state,
      isSubmitting: true,
    });

    const deckList = await DeckEvaluationService.evaluate(decklist);
    console.log(deckList);
    setState({
      ...state,
      isSubmitting: false,
      deckList: deckList,
    });
  };

  return (
    <>
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
    </>
  );
}
