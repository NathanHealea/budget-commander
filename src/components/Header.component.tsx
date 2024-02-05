'use client';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import classnames from 'classnames';
import { UrlObject } from 'url';
import { usePathname } from 'next/navigation';
import { Bars4Icon, XMarkIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

const ThemeButton = dynamic(() => import('./ThemeButton.component'), {
  loading: () => (
    <button className='btn btn-ghost'>
      <span className='h-6  w-6' />
    </button>
  ),
  ssr: false,
});

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
              <div className='flex flex-row h-16  gap-4 w-full items-center justify-between'>
                {/* Mobile menu button*/}
                <div className='flex items-center sm:hidden'>
                  <Disclosure.Button className='relative inline-flex items-center justify-center btn btn-ghost'>
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Open main menu</span>
                    <Bars4Icon
                      className={classNames(
                        'w-6 h-6',
                        !open ? 'block' : 'hidden',
                      )}
                    />

                    <XMarkIcon
                      className={classNames(
                        'w-6 h-6',
                        open ? 'block' : 'hidden',
                      )}
                    />
                  </Disclosure.Button>
                </div>

                {/* Site Logo */}
                <Link href='/' className='btn btn-ghost'>
                  Budget Commander
                </Link>

                {/* Nav Spacing */}
                <div className='flex-1' />

                {/* Navigation Links */}
                <div className='hidden sm:flex gap-4'>
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

                {/* Light/Dark Mode Toggle */}
                <ThemeButton />
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden absolute top-20 card bg-base-200 z-20 shadow-xl'>
              <div className='card-body flex flex-col gap-4 px-2 pb-3 pt-2 bg-base-200'>
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
