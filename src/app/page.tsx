import Link from 'next/link';

export default function Home() {
  return (
    <main className='page page-center bg-base-200 '>
      <header className='hero'>
        <div className='hero-content text-center'>
          <div className='card shadow-2xl bg-base-100'>
            <div className='card-body gap-8 md:gap-12'>
              <h1 className='font-bold'>Budget Commander</h1>
              <h3>
                Magic the Gather Commander game variant where total deck value
                must be under $100.
              </h3>
              <div className='flex flex-col md:flex-row gap-4'>
                <Link
                  href='/rules'
                  className='btn btn-primary btn-outline w-full md:w-1/2'
                >
                  Rules
                </Link>
                <Link
                  href='/evaluation'
                  className='btn btn-primary w-full md:w-1/2'
                >
                  Evaluation Tool
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}

