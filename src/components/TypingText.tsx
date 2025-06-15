'use client';
import { useEffect, useState } from 'react';

export function TypingText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return <h2 className={`${className} opacity-100`}>{displayText}</h2>;
}
