'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

export type ThemeButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {};

export type Theme = 'dark' | 'light';

const THEME_KEY = 'theme';

const getClientTheme = (): string | null => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(THEME_KEY);
  } else if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(THEME_KEY);
  } else {
    console.log(
      'Client theme cannot be retrieved; Web store is not supported in this environment.',
    );
    return null;
  }
};

const setClientTheme = (theme: Theme) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(THEME_KEY, theme);
  } else if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(THEME_KEY, theme);
  } else {
    console.log(
      'Client theme cannot be set; Web store is not supported in this environment.',
    );
  }
};

const getCurrentOrPreferredTheme = (): Theme => {
  let theme = getClientTheme() || '';
  if (theme.trim().length !== 0) {
    if (theme === 'dark' || theme === 'light') {
      console.log('getCurrentOrPreferredTheme', theme);
      return theme;
    }
  }

  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    console.log('getCurrentOrPreferredTheme', 'window', 'dark');
    return 'dark';
  }

  console.log('getCurrentOrPreferredTheme', 'default', 'light');

  return 'light';
};

const ThemeButton = (props: ThemeButtonProps) => {
  const {} = props;

  const [theme, setTheme] = useState<Theme>(getCurrentOrPreferredTheme);

  useEffect(() => {
    window.document.documentElement.setAttribute('data-theme', theme);
    setClientTheme(theme);
  }, [theme]);

  const handleThemeChange = (theme: Theme) => () => {
    setTheme(theme);
  };

  return (
    <>
      {theme === 'light' && (
        <button className='btn btn-ghost' onClick={handleThemeChange('dark')}>
          <MoonIcon className='w-6 h-6' />
        </button>
      )}

      {theme === 'dark' && (
        <button className='btn btn-ghost' onClick={handleThemeChange('light')}>
          <SunIcon className='w-6 h-6' />
        </button>
      )}
    </>
  );
};

export default ThemeButton;
