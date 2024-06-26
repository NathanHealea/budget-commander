import Link from 'next/link';
import GitHubIcon from './icons/Github';

export default function Footer() {
  return (
    <footer className='footer footer-center p-10 mt-auto'>
      <aside>
        <p>
          Wizards of the Coast, Magic: The Gathering, and their logos are
          trademarks of Wizards of the Coast LLC in the United States and other
          countries. &copy; 1993-2023 Wizards. All Rights Reserved.
        </p>
        <p>
          Budget Commander is not affiliated with, endorsed, sponsored, or
          specifically approved by Wizards of the Coast LLC. Budget Commander
          may use the trademarks and other intellectual property of Wizards of
          the Coast LLC, which is permitted under Wizards&apos; Fan Site Policy.
          MAGIC: THE GATHERING&trade; is a trademark of Wizards of the Coast.
          For more information about Wizards of the Coast or any of
          Wizards&apos; trademarks or other intellectual property, please visit
          their website at{' '}
          <a
            className='link link-primary no-underline'
            target='_blank'
            href='https://company.wizards.com/'
          >
            https://company.wizards.com/
          </a>
          .
        </p>
        <p>
          Some card prices and other card data are provided{' '}
          <a
            className='link link-primary no-underline'
            target='_blank'
            href='https://scryfall.com/'
          >
            Scryfall
          </a>
          . Scryfall makes no guarantee about its price information and
          recommends you see stores for final prices and details.
        </p>
        <p>
          Copyright &copy; {new Date().getFullYear()}{' '}
          <a
            className='link link-primary no-underline'
            target='_blank'
            href='https://nathanhealea.com'
          >
            Nathan Healea
          </a>
        </p>
        <p>Built with TailwindCSS, NextJS, &amp; ❤️ for Magic the Gathering</p>
        <p className='flex items-center justify-center'>
          View on
          <Link
            href='https://github.com/NathanHealea/budget-commander'
            className='link link-primary no-underline inline-flex mx-2 gap-2 justify-center items-center'
          >
            <GitHubIcon className='w-4 h-4 inline fill-primary' /> Github
          </Link>
        </p>
      </aside>
    </footer>
  );
}
