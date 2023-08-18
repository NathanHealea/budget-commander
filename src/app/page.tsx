import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col items-center justify-center min-h-screen '>
      <section className='hero'>
        <div className='hero__content'>
          <h1 className='hero__title'>Budget Commander</h1>
          <h2 className='hero__subtitle'>
            Magic the Gather Commander game variant where total deck value must
            be under $100.
          </h2>
          <div className='pt-4 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4'>
            <Link href='/rules' className='button-contained w-full md:w-1/2 '>
              Rules
            </Link>
            <Link
              href='/evaluation'
              className='button-contained w-full  md:w-1/2'
            >
              Deck Validator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
