import * as scryfall from 'scryfall-sdk';
import { Card as CardType } from '../evaluation.types';

interface ICardProps {
  count?: any;
  name?: string;
  print?: scryfall.Card;
  printPrice?: number;
  evaluatedPrint?: scryfall.Card;
  evaluatedPrintPrice?: number;
  isBasic?: boolean;
  hasError?: boolean;
  message?: string | undefined;
}

export default function Card(props: ICardProps): CardType {
  let count: number = parseInt(props.count);
  let name: string = props.name || '';
  let print: scryfall.Card | undefined = props.print;
  let printPrice: number | undefined = props.printPrice;
  let evaluatedPrint: scryfall.Card | undefined = props.evaluatedPrint;
  let evaluatedPrintPrice: number | undefined = props.evaluatedPrintPrice;
  let isBasic: boolean = props.isBasic || false;
  let hasError: boolean = props.hasError || false;
  let message: string = props.message || '';

  // set card count
  if (!isBasic && Number.isNaN(count) && evaluatedPrint !== undefined) {
    count = 1;
  }

  if (Number.isNaN(count)) {
    count = 0;
    hasError = true;
    message += '\r\n Card quantity cannot be determined.';
  }

  return {
    count,
    name,
    print,
    printPrice,
    evaluatedPrint,
    evaluatedPrintPrice,
    isBasic,
    hasError,
    message,
  };
}
