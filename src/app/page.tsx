import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col items-center justify-center min-h-screen bg-base-200'>
      <header className='hero min-h-screen'>
        <div className='hero-content text-center'>
          <div className='card shrink-0 w-full max-w-xl shadow-2xl bg-base-100'>
            <div className='card-body'>
              <h1 className='text-5xl font-bold'>Budget Commander</h1>
              <p className='py-6'>
                Magic the Gather Commander game variant where total deck value
                must be under $100.
              </p>
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

