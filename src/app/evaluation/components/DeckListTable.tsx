import { Card, DeckList } from '../evaluation.types';

type DeckListTableProps = {
  deckList?: Array<Card>;
};

const DeckListTable = (props: DeckListTableProps) => {
  const { deckList } = props;

  if (!deckList) {
    return null;
  }

  return (
    <table className='table table-xs table-zebra-zebra table-pin-rows '>
      <thead>
        <tr>
          <th className='w-24'>Count</th>
          <th>Name</th>
          <th className='w-24 text-right'>Price</th>
          {/* <th className='w-24 text-right'>Print Price</th> */}
        </tr>
      </thead>
      <tbody>
        {deckList
          .filter((card: Card) => !card.hasError)
          .map((card, index) => (
            <tr key={`table-view-${index}`}>
              <td className='w-24'>{card.count}</td>
              <td>{card.name}</td>
              <td className='w-24 text-right'>
                {!card.isBasic && card.evaluatedPrintPrice?.toFixed(2)}
              </td>
              {/* <td className='w-24 text-right'>
                {!card.isBasic && card.printPrice?.toFixed(2)}
              </td> */}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default DeckListTable;
