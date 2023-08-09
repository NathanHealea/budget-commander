export default function ThemePage() {
  return (
    <main className='flex flex-1 flex-col items-center justify-center p-24 '>
      <section className='hero'>
        <div className='hero__content'>
          <h1 className='hero__title'>Theme</h1>
        </div>
      </section>

      <section className='section'>
        <div className='section__content'>
          <h2 className='section__title'>Typography</h2>

          <h1 className='text__h1'>Heading One</h1>
          <h2 className='text__h2'>Heading Two</h2>
          <h3 className='text__h3'>Heading Three</h3>
          <h4 className='text__h4'>Heading Four</h4>
          <h5 className='text__h5'>Heading Five</h5>
          <h6 className='text__h6'>Heading Six</h6>
          <p className='text__body'>Body</p>
          <span className='block text__caption'>caption</span>
        </div>
      </section>

      <section className='section'>
        <div className='section__content'>
          <h1 className='section__title'>Buttons</h1>
          <div className='flex flex-col mx-auto  max-w-xs gap-4'>
            <div className='button'>Button</div>
            <div className='button-contained'>Button</div>
            <div className='button-active'>Button</div>
          </div>
        </div>
      </section>
    </main>
  );
}
