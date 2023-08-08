import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer className='p-8'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='text-xs text-center flex flex-col space-y-2'>
          <p>
            Wizards of the Coast, Magic: The Gathering, and their logos are
            trademarks of Wizards of the Coast LLC in the United States and
            other countries. © 1993-2023 Wizards. All Rights Reserved.
          </p>
          <p>
            Budget Commander is not affiliated with, endorsed, sponsored, or
            specifically approved by Wizards of the Coast LLC. Budget Commander
            may use the trademarks and other intellectual property of Wizards of
            the Coast LLC, which is permitted under Wizards' Fan Site Policy.
            MAGIC: THE GATHERING® is a trademark of Wizards of the Coast. For
            more information about Wizards of the Coast or any of Wizards'
            trademarks or other intellectual property, please visit their
            website at{' '}
            <a target='_blank' href='https://company.wizards.com/'>
              https://company.wizards.com/
            </a>
            .
          </p>
          <p>
            Some card prices and other card data are provided Scryfall. Scryfall
            makes no guarantee about its price information and recommends you
            see stores for final prices and details.
          </p>
          <p>
            Copyright <FontAwesomeIcon icon={faCopyright} />{' '}
            {new Date().getFullYear()}{' '}
            <a target='_blank' href='https://nathanhealea.com'>
              Nathan Healea
            </a>
          </p>
          <p>
            Built with TailwindCSS, NextJS, &amp; ❤️ for Magic the Gathering
          </p>
        </div>
      </div>
    </footer>
  );
}
