'use client';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import classnames from 'classnames';

import { UrlObject } from 'url';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
type Url = string | UrlObject;

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
      <Disclosure as='nav' className=' text-black'>
        {({ open }) => (
          <>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
              <div className='relative flex h-16 items-center justify-between'>
                {/* Mobile menu button*/}

                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
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

                <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start '>
                  {/* Site Logo */}
                  <div className='flex flex-shrink-0 items-center font-bold uppercase '>
                    Budget Commander
                  </div>

                  {/* Navigation Links */}
                  <div className='hidden sm:ml-6 sm:block'>
                    <div className='flex space-x-4'>
                      {links.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classnames(
                            item.href == pathname ? 'button-active' : 'button',
                          )}
                          aria-current={
                            item.href == pathname ? 'page' : undefined
                          }
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden'>
              <div className='space-y-1 px-2 pb-3 pt-2'>
                {links.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={classnames(
                      item.href == pathname
                        ? 'bg-black text-white'
                        : 'text-black hover:bg-black hover:bg-opacity-50 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium',
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
