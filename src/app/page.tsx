import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col items-center justify-center p-8 md:p-24 min-h-screen '>
      <div className='flex flex-col space-y-4 text-center'>
        <h1 className='text-4xl md:text-8xl uppercase font-bold'>Budget Commander</h1>
        <h2 className='text-2xl md:text-4xl font-medium '>
          Magic the Gather Commander game variant where total deck value must be
          under $100.
        </h2>

        <div className='pt-4 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4'>
          <Link href='/rules' className='button--contained w-full md:w-1/2 '>
            Rules
          </Link>
          <Link href='/deck-validator' className='button--contained w-full  md:w-1/2'>
            Deck Validator
          </Link>
        </div>
      </div>
    </main>
  );
}

