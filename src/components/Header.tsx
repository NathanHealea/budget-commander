'use client';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import classnames from 'classnames';
import { UrlObject } from 'url';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

export type Url = string | UrlObject;

export type Link = {
  href: Url;
  name: string;
};

interface INavbarProps {
  links: Array<Link>;
}

export default function Header(props: INavbarProps) {
  const { links = [] } = props;
  const pathname = usePathname();

  return (
    <header>
      <Disclosure as='nav' className='navbar relative'>
        {({ open }) => (
          <>
            <div className='mx-auto w-full max-w-7xl px-2 sm:px-6 lg:px-8'>
              <div className='flex flex-row h-16  w-full items-center justify-between'>
                {/* Mobile menu button*/}
                <div className='flex items-center sm:hidden'>
                  <Disclosure.Button className='relative inline-flex items-center justify-center button'>
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <FontAwesomeIcon
                        icon={faTimes}
                        className='block h-6 w-6'
                        aria-hidden='true'
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faBars}
                        className='block h-6 w-6'
                        aria-hidden='true'
                      />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Site Logo */}
                <Link href='/' className='btn btn-ghost'>
                  Budget Commander
                </Link>

                {/* Nav Spacing */}
                <div className='flex-1' />

                {/* Navigation Links */}
                <div className='hidden sm:flex space-x-4'>
                  {links.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classnames(
                        'btn btn-ghost',
                        item.href == pathname ? 'btn-active' : '',
                      )}
                      aria-current={item.href == pathname ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden absolute top-20 card bg-base-200'>
              <div className='card-body flex flex-col gap-4 px-2 pb-3 pt-2'>
                {links.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={classnames(
                      'btn btn-ghost justify-start',
                      item.href == pathname ? 'btn-active' : '',
                    )}
                    aria-current={item.href == pathname ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
}
