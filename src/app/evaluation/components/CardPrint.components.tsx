import * as ScryFall from 'scryfall-sdk';
import Image from 'next/image';
import classNames from 'classnames';
import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
export type CardPrintProps = ScryFall.Card;

type CardFace = 'front' | 'back';

const CardPrint = (props: CardPrintProps) => {
  const [cardFace, setCardFace] = useState<CardFace>('front');

  const handleSwapCardFaceOnClick = () => {
    setCardFace(cardFace === 'front' ? 'back' : 'front');
  };

  if (props.card_faces.length >= 2) {
    return (
      <div className='relative'>
        <button
          type='button'
          className='btn btn-primary absolute bottom-0 left-0 btn-sm opacity-60 hover:opacity-100 w-full '
          onClick={handleSwapCardFaceOnClick}
        >
          <ArrowPathIcon className='w-4 h-4' /> flip
        </button>
        {props.card_faces.map((card: ScryFall.CardFace, index) => {
          if (index == 0) {
            return (
              <Image
                key={`${card.oracle_id}-${index}`}
                src={card.image_uris?.normal || '/mtg-card-background.jpeg'}
                alt={props.name}
                width={488}
                height={680}
                className={classNames(
                  'rounded-xl w-[128px] h-[178px] overflow-hidden',
                  cardFace === 'front' ? 'block' : 'hidden',
                )}
              />
            );
          }
          if (index == 1) {
            return (
              <Image
                key={`${card.oracle_id}-${index}`}
                src={card.image_uris?.normal || '/mtg-card-background.jpeg'}
                alt={props.name}
                width={488}
                height={680}
                className={classNames(
                  'rounded-xl w-[128px] h-[178px] overflow-hidden',
                  cardFace === 'back' ? 'block' : 'hidden',
                )}
                onClick={handleSwapCardFaceOnClick}
              />
            );
          }
        })}
      </div>
    );
  }

  return (
    <Image
      key={props.oracle_id}
      src={props.image_uris?.normal || '/mtg-card-background.jpeg'}
      alt={props.name}
      width={488}
      height={680}
      className={classNames('rounded-xl w-[128px] h-[178px] overflow-hidden')}
    />
  );
};

export default CardPrint;
