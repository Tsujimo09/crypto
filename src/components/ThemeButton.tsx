'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function ThemeButton() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      className="transform cursor-pointer ease-in-out hover:scale-110"
    >
      <Image src={resolvedTheme === 'light' ? '/night.svg' : '/sun.svg'} alt="theme-icon" width={42} height={42} />
    </button>
  );
}
