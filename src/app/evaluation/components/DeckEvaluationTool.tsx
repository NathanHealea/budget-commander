'use client';
import { useState } from 'react';
import DeckEvaluationDetails from './DeckEvaluationDetails';
import DeckEvaluationErrors from './DeckEvaluationErrors';
import DeckListEvaluationForm from './DeckEvaluationForm';
import DeckEvaluationSpinner from './DeckEvaluationSpinner';
import { DeckList } from '../evaluation.types';
import DeckEvaluationService from '../services/deckEvaluation';
import initializeDeckList from '../utilities/initializeDeckList';

type DeckEvaluationToolState = {
  isSubmitting: boolean;
  deckList?: DeckList;
};

export type DeckEvaluationToolProps = {};

const DeckEvaluationTool = (props: DeckEvaluationToolProps) => {
  const [state, setState] = useState<DeckEvaluationToolState>(() => ({
    isSubmitting: false,
    deckList: initializeDeckList(),
  }));

  const handleDeckListEvaluation = async (decklist: string) => {
    setState({
      ...state,
      isSubmitting: true,
    });

    const deckList = await DeckEvaluationService.evaluate(decklist);

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
};

export default DeckEvaluationTool;
