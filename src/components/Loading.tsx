'use client';
import { motion } from 'framer-motion';

export function Loading() {
  return (
    <div className="flex h-80 items-center justify-center">
      <motion.div
        className="spinner"
        animate={{
          rotate: 360,
          borderTopColor: [
            '#ff0088',
            '#A6D1E6',
            '#AFEEEE',
            '#AFCBEB',
            '#D9EFF9',
            '#ff0088',
          ],
        }}
        transition={{
          rotate: { duration: 0.5, repeat: Infinity, ease: 'linear' },
          borderTopColor: { duration: 3, repeat: Infinity, ease: 'linear' },
        }}
      />
      <StyleSheet />
    </div>
  );
}

function StyleSheet() {
  return (
    <style>
      {`
        .spinner {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 8px solid transparent;
            border-top: 8px solid #c1e4e9;
            will-change: transform, border-top-color;
        }
      `}
    </style>
  );
}
