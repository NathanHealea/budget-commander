import { Card, DeckList } from '../evaluation.types';

const initializeDeckList = (): DeckList => {
  return {
    count: 0,
    value: 0,
    cards: [] as Array<Card>,
  } as DeckList;
};

export default initializeDeckList;
