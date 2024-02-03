'use client';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

export type SortButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  children: string;
  sort: 'asc' | 'desc' | null;
  isActive: boolean;
};

const SortButton = (props: SortButtonProps) => {
  const { children, sort, isActive, className, ...rest } = props;

  return (
    <button
      type='button'
      className={classNames(
        'btn btn-ghost flex justify-center flex-nowrap gap-4',
        isActive ? 'btn-outline btn-primary' : '',
      )}
      {...rest}
    >
      <p className='font-bold text-3xl'>{children}</p>
      {sort == 'asc' && <ChevronUpIcon className='h-4 w-4' />}
      {sort == 'desc' && <ChevronDownIcon className='h-4 w-4' />}
    </button>
  );
};

export default SortButton;
