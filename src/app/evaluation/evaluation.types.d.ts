import * as scryfall from 'scryfall-api';

type Card = {
  count: number;
  name: string;
  print?: scryfall.Card | undefined;
  printPrice?: number | undefined;
  evaluatedPrint?: scryfall.Card;
  evaluatedPrintPrice?: number | undefined;
  isBasic: boolean;
  hasError: boolean;
  message?: string;
};

type CardEntry = {
  count: string;
  name: string;
  // set: string;
  // collectionNumber: string;
};

type DeckList = {
  count: number;
  value: number;
  cards: Array<Card>;
};
