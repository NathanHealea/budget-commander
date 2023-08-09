export default function RulesPage() {
  return (
    <main className='flex flex-1 flex-col'>
      <section className='hero'>
        <div className='hero__content'>
          <h1 className='hero__title'>Rules</h1>
        </div>
      </section>
      <section className='section'>
        <div className='section__content'>
          <h2></h2>
          <ol className='list'>
            <li className='list__item'>
              Budget Commander adhears to all rules and bans in the{' '}
              <a className='link' href='' target='_blank'>
                Command Format
              </a>
            </li>
            <li className='list__item'>
              A deck must not have current market value greater than $100 USD.
            </li>
            <li className='list__item'>
              Cards will be evaluated at current market value of the cheapest
              print available.
              <ul className='list__subitem'>
                <li>
                  <em className='text-sm'>
                    Example: Elesh Norn, Grand Cenobite has 11 prints, the most
                    expensive being ~$700 USD (Multiverse Legends ·
                    Doublerainbow) and the cheapest being ~$11 USD (Multiverse
                    Legends · Nonfoil/Foil). Having the ~$700 USD (Multiverse
                    Legends · Doublerainbow) print would only count toward ~$11
                    USD of a deck&apos;s total value.
                  </em>
                </li>
              </ul>
            </li>
            <li className='list__item'>
              Basic and Basic Snow Covered lands do not count toward a
              deck&apos;s total value.
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
