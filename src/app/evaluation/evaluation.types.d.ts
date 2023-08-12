import * as scryfall from 'scryfall-api';

type Print = {
  imageUri?: scryfall.ImageUris;
  set: string;
  collectionNumber: string;
  price: number;
};

type Card = {
  count: number;
  name: string;
  print?: Print;
  evaluatedPrint?: Print;
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
