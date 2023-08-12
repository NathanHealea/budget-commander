'use client';

import Hero from './components/Hero';
import { useState } from 'react';

import DeckListEvaluationForm from './components/DeckEvaluationForm';
import DeckEvaluationSpinner from './components/DeckEvaluationSpinner';
import DeckEvaluation from './services/DeckEvaluation';
import { DeckList } from './evaluation.types';
import DeckEvaluationDetails from './components/DeckEvaluationDetails';
import DeckEvaluationErrors from './components/DeckEvaluationErrors';
import { Metadata } from 'next';

type State = {
  isSubmitting: boolean;
  deckList: DeckList | null;
};

const PAGE_TITLE = 'Deck Evaluation Tool';
const PAGE_DESCRIPTION =
  'Tool to check the current market value of a deck given the Budget Commander format rules';

export const metadata: Metadata = {
  title: `Budget Commander - ${PAGE_TITLE}`,
  description: PAGE_DESCRIPTION,
  twitter: {
    card: 'summary_large_image',
    title: `Budget Commander - ${PAGE_TITLE}`,
    description: PAGE_DESCRIPTION,
    site: '@nathanhealea',
    siteId: '2654889620',
    creator: '@nathanhealea',
    creatorId: '2654889620',
    images: [], // TODO: find photos for my twitter card,
  },
  openGraph: {
    type: 'website',
    title: `Budget Commander - ${PAGE_TITLE}`,
    description: PAGE_DESCRIPTION,
    url: 'https://buget-commander.nathanhealea.com',
    images: [], // TODO: find images for my open Graph.
  },
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
