import axios from 'axios';
import * as scryfall from 'scryfall-api';
import { Card, CardEntry, DeckList, Print } from '../evaluation.types';
import { default as createCard } from '../models/Card.model';
/***
 * @reference: https://github.com/SpaceCowMedia/commander-spellbook-site/blob/main/frontend/lib/decklist-parser.ts#L75
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

function getPrintPrice(card: any): number | null {
  const price = parseFloat(
    (card.finishes.includes('etched') && card.prices.usd_etched) ||
      (card.finishes.includes('foil') &&
        !card.finishes.includes('nonfoil') &&
        card.prices.usd_foil) ||
      card.prices.usd,
  );

  // No price for the card has been determined, so return NaN
  if (Number.isNaN(price)) {
    return null;
  }

  return price;
}

/**
 * Gets all prints of a card
 * @param {string} url scryfall url for retrieving prints.
 */
async function getAllPrints(url?: string): Promise<Array<Print>> {
  let scryfallCardPrints: Array<any> = [];
  let prints: Array<Print> = [];
  let has_more = false;

  if (!url || isStringEmpty(url)) {
    return [];
  }

  do {
    let response = await axios.get(url);

    if (response.status != 200) {
      console.error(
        `Get Print Request Failed: ${response.status} - ${response.statusText}`,
      );

      break;
    }

    let results = response.data;

    has_more = results.has_more;

    scryfallCardPrints = scryfallCardPrints.concat(results.data);
  } while (has_more);

  prints = scryfallCardPrints
    .filter((card) => !card.digital && card.games.includes('paper'))
    .map(
      (card) =>
        ({
          imageUri: card.image_uris,
          price: getPrintPrice(card),
          set: card.set,
          collectionNumber: card.collector_number,
        }) as Print,
    );
  return prints;
}

function findPrint(
  prints: Array<Print>,
  set?: string,
  collectorNumber?: string,
): Print {
  const defaultPrint: Print = { ...prints[0] };
  if (!set || isStringEmpty(set)) {
    return defaultPrint;
  }

  const doesMatch = (valueOne?: string, valueTwo?: string): boolean => {
    if (isStringEmpty(valueOne) || isStringEmpty(valueTwo)) {
      return false;
    }

    return valueOne?.toLocaleLowerCase() === valueTwo?.toLocaleLowerCase();
  };

  const printSetResult = prints.find(
    (card) =>
      (doesMatch(card.set, set) &&
        doesMatch(card.collectionNumber, collectorNumber)) ||
      doesMatch(card.set, set),
  );

  return printSetResult || defaultPrint;
}

function processCard(cardEntry: CardEntry): Promise<Card> {
  return new Promise((res, rej) => {
    setTimeout(async () => {
      try {
        const scryfallCard = await scryfall.Cards.byName(cardEntry.name, true);

        if (scryfallCard == undefined) {
          throw new Error(`${cardEntry.name} - was not found`);
        }

        // TODO check for Basic and Basic Snow-Covered Lands

        if (scryfallCard.type_line.includes('Basic')) {
          res(
            createCard({
              count: cardEntry.count,
              name: cardEntry.name,
              isBasic: true,
            }),
          );
        } else {
          const scryfallCardPrints = await getAllPrints(
            scryfallCard.prints_search_uri,
          );

          // Find the cheapest print
          const evaluatedPrint = scryfallCardPrints
            .filter((card: Print) => card.price !== null)
            .reduce((prev, curr) => (curr.price < prev.price ? curr : prev));

          res(
            createCard({
              count: cardEntry.count,
              name: cardEntry.name,
              evaluatedPrint: evaluatedPrint,
            }),
          );
        }
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
    if (curr.hasError || curr.evaluatedPrint == undefined) {
      return prev;
    }

    return prev + curr.count * curr.evaluatedPrint.price;
  }, 0.0);

  return deckListReturn;
}

const DeckEvaluationService = {
  evaluate,
};

export default DeckEvaluationService;
