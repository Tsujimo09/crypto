import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        'gradient-x': 'gradient-x 8s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%': {
            'background-position': '200% 50%',
            'background-size': '300% 100%',
          },
          '100%': {
            'background-position': '-100% 50%',
            'background-size': '300% 100%',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
