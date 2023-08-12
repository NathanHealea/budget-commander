import { Card as CardType, CardEntry, Print } from '../evaluation.types';

interface ICardProps {
  count?: any;
  name?: string;
  print?: Print;
  evaluatedPrint?: Print;
  isBasic?: boolean;
  hasError?: boolean;
  message?: string | undefined;
}

export default function Card(props: ICardProps): CardType {
  let count: number = parseInt(props.count);
  let name: string = props.name || '';
  let print: Print | undefined = props.print;
  let evaluatedPrint: Print | undefined = props.evaluatedPrint;
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
    evaluatedPrint,
    isBasic,
    hasError,
    message,
  };
}
