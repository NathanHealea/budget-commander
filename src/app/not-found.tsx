import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className='flex flex-1 flex-col items-center justify-center min-h-screen '>
      <section className='hero'>
        <div className='hero__content'>
          <h1 className='hero__title'>Well this is awkward 😳</h1>
          <h2 className='hero__subtitle'>
            It appears I have not created the page you are looking for
          </h2>
          <p className='text-center'>Lets try one of these links ⛛</p>
          <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
            <Link href='/' className='button-contained'>
              Home
            </Link>

            <Link href='/rules' className='button-contained'>
              Rules
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
