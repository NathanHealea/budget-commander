import * as scryfall from 'scryfall-sdk';
import { Card, CardEntry, DeckList } from '../evaluation.types';
import { default as createCard } from '../models/Card.model';

/***
 * @reference: https://github.com/SpaceCowMedia/commander-spellbook-site/blob/main/frontend/lib/decklist-parser.ts#L75
 * TODO: Expand DECK ENTRY REGEX to include collection number and finish.
 */
const DECK_ENTRY_REGEX =
  // /^\s*(?:(?<count>\d+)[xX]?\s+)?(?<name>[^/\s].+?)\s*\((?<set>[^)]+)\)\s*(?<print>\d+)/;
  // /^\s*(?:(?<count>\d+)[xX]?\s+)?(?<name>[^/\s].+?)(?:\s*\((?<set>[^)]+)\)\s*(?<collection_number>\d+))?\s*$/;
  /^\s*(?:(?<count>\d+)[xX]?\s+)?(?<name>[^/\s].+?)\s*(?:[(#].*)?$/;

function isStringEmpty(value?: string): boolean {
  return (
    value == undefined ||
    value == null ||
    value == undefined ||
    value.trim().length === 0
  );
}

/**
 * Parses deck list card information into a card entity.
 * @param {string} cardrow card deck list entry
 * @returns {Card}
 */
function parseCardEntry(cardrow: string): CardEntry {
  return (cardrow.match(DECK_ENTRY_REGEX)?.groups || {}) as CardEntry;
}

/**
 * Gets the lowest finished price of a card
 * @param {scryfall.Card} card scryfall card object
 * @returns null: no price was determined, number: lowest finished card price (etched, foil,non-foil)
 */
function getCardPrice(card: scryfall.Card): number | null {
  let scryfallPrice = '';

  if (card.finishes.includes('etched')) {
    scryfallPrice = card.prices.usd_etched || '';
  }

  if (card.finishes.includes('foil')) {
    scryfallPrice = card.prices.usd_foil || '';
  }

  if (card.finishes.includes('nonfoil')) {
    scryfallPrice = card.prices.usd || '';
  }

  const price = parseFloat(scryfallPrice);

  if (Number.isNaN(price)) {
    return null;
  }

  return price;
}

function processCard(cardEntry: CardEntry): Promise<Card> {
  return new Promise((res, rej) => {
    setTimeout(async () => {
      try {
        const scryfallCard: scryfall.Card = await scryfall.Cards.byName(
          cardEntry.name,
          true,
        );

        if (scryfallCard == undefined) {
          throw new Error(`${cardEntry.name} - was not found`);
        }

        const scryfallCardPrints = (await scryfallCard.getPrints())
          // Filter out any prints that where digital release.
          .filter((card) => !card.digital);

        const evaluatedPrint = scryfallCardPrints.reduce(
          (prev, curr) => {
            if (
              (prev.price == undefined && prev.print == undefined) ||
              prev.price == null
            ) {
              return {
                price: getCardPrice(curr),
                print: curr,
              } as { price?: number; print?: scryfall.Card };
            }
            const currCardPrice = getCardPrice(curr);

            if (currCardPrice == null) {
              return prev;
            }

            return prev.price < currCardPrice
              ? prev
              : ({ print: curr, price: currCardPrice } as {
                  price?: number;
                  print?: scryfall.Card;
                });
          },
          {} as { price?: number; print?: scryfall.Card },
        );

        // TODO: determine card price of the card listed in the card entry.
        // const getPrintPrice = () => {
        //   let cardFinish = scryfallCard.fini

        //   let price = '';

        //   if(scryfallCard.)

        //   if (!price) {
        //     return undefined;
        //   }

        //   return parseFloat(price);
        // };

        res(
          createCard({
            count: cardEntry.count,
            name: scryfallCard.name,
            isBasic: scryfallCard.type_line.includes('Basic') ? true : false,
            evaluatedPrint: evaluatedPrint.print,
            evaluatedPrintPrice: evaluatedPrint.price,
            print: scryfallCard,
            // printPrice: getPrintPrice(),
          }),
        );
        // }
      } catch (error: any) {
        // card card to deck list with error
        res(
          createCard({
            name: cardEntry.name,
            hasError: true,
            message: 'Card could not be processed, an unknown error occurred.',
          }),
        );
      }
    }, 75);
  });
}

async function evaluate(deckList: string) {
  const deckListReturn: DeckList = { count: 0, value: 0.0, cards: [] };

  const deckListParsed = deckList
    .split('\n')
    .filter((deckListEntry) => deckListEntry.trim().length > 0)
    .map((cardEntry) => parseCardEntry(cardEntry));

  for (let cardEntry of deckListParsed) {
    deckListReturn.cards.push(await processCard(cardEntry));
  }

  // Get Deck Count
  deckListReturn.count = deckListReturn.cards.reduce((prev, curr) => {
    return prev + curr.count;
  }, 0);

  // Calculate deck value
  deckListReturn.value = deckListReturn.cards.reduce((prev, curr) => {
    if (
      curr.hasError ||
      curr.evaluatedPrint == undefined ||
      curr.evaluatedPrintPrice == undefined ||
      curr.isBasic
    ) {
      return prev;
    }

    return prev + curr.count * curr.evaluatedPrintPrice;
  }, 0.0);

  return deckListReturn;
}

const DeckEvaluationService = {
  evaluate,
};

export default DeckEvaluationService;
