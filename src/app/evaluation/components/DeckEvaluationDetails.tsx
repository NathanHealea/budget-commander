'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, DeckList } from '../evaluation.types';
import { Transition } from '@headlessui/react';
import {
  QueueListIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import DeckListVisual from './DeckListVisual';
import DeckListTable from './DeckListTable';
import SortButton from './SortButton';
import DisplayButton from './DisplayButton';
import sortArray from 'sort-array';
import initializeDeckList from '../utilities/initializeDeckList';

type DeckEvaluationDetailsProps = {
  isSubmitting?: boolean;
  deckList?: DeckList;
};

type DisplayOption = 'list' | 'visual';
type SortByOption = 'name' | 'evaluated' | null;
type SortDirectionOption = 'asc' | 'desc' | null;

type DeckEvaluationDetailsState = {
  display: DisplayOption;
  sortBy: SortByOption;
  sortDirection: SortDirectionOption;
  search: string;
};

const DeckEvaluationDetails = (props: DeckEvaluationDetailsProps) => {
  const { isSubmitting, deckList: defaultDeckList } = props;

  const [deckList, setDeckList] = useState<DeckList>(initializeDeckList);

  const [state, setState] = useState<DeckEvaluationDetailsState>({
    display: 'list',
    sortBy: null,
    sortDirection: null,
    search: '',
  });

  useEffect(() => {
    if (defaultDeckList !== undefined) {
      setDeckList(defaultDeckList);
      console.log(defaultDeckList);
    }
  }, [defaultDeckList]);

  const getDeckList = () => {
    const { sortBy, sortDirection, search } = state;

    let cards = [...deckList.cards];

    if (sortBy === 'name' && sortDirection !== null) {
      cards = sortArray<Card>(cards, {
        by: 'name',
        order: sortDirection,
      });
    }

    if (sortBy === 'evaluated' && sortDirection !== null) {
      cards = sortArray<Card>(cards, {
        by: 'evaluatedPrintPrice',
        order: sortDirection,
      });
    }

    if (search.trim().length !== 0) {
      cards = cards.filter((card) => card.name.toLowerCase().includes(search));
    }

    return cards;
  };

  const handleDisplayButtonClick = (display: DisplayOption) => () => {
    setState({
      ...state,
      display: display,
    });
  };

  const handleSortByNameOnClick = () => {
    let sortBy: SortByOption = 'name';
    let sortDirection: SortDirectionOption =
      state.sortBy === 'name' ? state.sortDirection : null;

    if (sortDirection === null) {
      sortDirection = 'asc';
    } else if (sortDirection === 'asc') {
      sortDirection = 'desc';
    } else {
      sortBy = null;
      sortDirection = null;
    }

    setState({
      ...state,
      sortBy,
      sortDirection,
    });
  };

  const handleValueSortOrderOnClick = () => {
    let sortBy: SortByOption = 'evaluated';
    let sortDirection: SortDirectionOption =
      state.sortBy === 'evaluated' ? state.sortDirection : null;

    if (sortDirection === null) {
      sortDirection = 'asc';
    } else if (sortDirection === 'asc') {
      sortDirection = 'desc';
    } else {
      sortBy = null;
      sortDirection = null;
    }

    setState({
      ...state,
      sortBy,
      sortDirection,
    });
  };

  const handleCardSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = (e.currentTarget.value || '').toLocaleLowerCase();
    setState({
      ...state,
      search,
    });
  };

  const handleCardSearchClearOnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setState({
      ...state,
      search: '',
    });
  };

  if (deckList === null) {
    return null;
  }

  return (
    <Transition
      as='section'
      className='flex flex-col flex-1 w-full gap-8'
      show={!isSubmitting && deckList.cards.length !== 0}
      enter='transition-opacity duration-75'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-150'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <h5 className='flex flex-col sm:flex-row px-4 w-full items-center'>
        <span className='font-bold'>Deck List</span>
        <span className='flex-1' />
        <span className='text-primary font-bold border border-primary p-2 px-4 rounded-xl'>
          ${deckList?.value.toFixed(2)}
        </span>
      </h5>

      <div className='flex gap-4 flex-wrap'>
        {/* View Options */}
        <div className='flex gap-2'>
          <DisplayButton
            onClick={handleDisplayButtonClick('list')}
            isActive={state.display === 'list'}
          >
            <QueueListIcon className='h-8 w-8' />
          </DisplayButton>
          <DisplayButton
            onClick={handleDisplayButtonClick('visual')}
            isActive={state.display === 'visual'}
          >
            <Squares2X2Icon className='h-8 w-8' />
          </DisplayButton>
        </div>
        <div className='divider divider-horizontal'></div>

        {/* Sort Options */}
        <div className='flex gap-2 justify-center items-center'>
          <SortButton
            onClick={handleSortByNameOnClick}
            sort={state.sortBy === 'name' ? state.sortDirection : null}
            isActive={state.sortBy === 'name'}
          >
            A
          </SortButton>
          <SortButton
            onClick={handleValueSortOrderOnClick}
            sort={state.sortBy === 'evaluated' ? state.sortDirection : null}
            isActive={state.sortBy === 'evaluated'}
          >
            $
          </SortButton>
        </div>
        <div className='divider divider-horizontal'></div>

        {/* Card Search  */}
        <div className='flex-1 '>
          <label
            htmlFor='card-search'
            className='form-control w-full relative '
          >
            <input
              id='card-search'
              name='card-search'
              type='text'
              placeholder='Search for card by name'
              className='input input-bordered w-full focus:input-primary pr-12'
              value={state.search}
              onChange={handleCardSearchOnChange}
            />
            {state.search.trim().length !== 0 && (
              <button
                type='button'
                className='btn btn-ghost absolute right-0 top-0 '
                onClick={handleCardSearchClearOnClick}
              >
                <XMarkIcon className='w-4 h-4' />
              </button>
            )}
          </label>
        </div>
      </div>

      {state.display == 'list' && <DeckListTable deckList={getDeckList()} />}

      {state.display == 'visual' && <DeckListVisual deckList={getDeckList()} />}
    </Transition>
  );
};

export default DeckEvaluationDetails;
