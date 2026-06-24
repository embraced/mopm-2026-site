/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ink: 'rgb(var(--color-text) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        line: 'rgb(var(--color-border) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-contrast': 'rgb(var(--color-accent-contrast) / <alpha-value>)',
        't101': 'rgb(var(--color-track-101) / <alpha-value>)',
        't102': 'rgb(var(--color-track-102) / <alpha-value>)',
        't103': 'rgb(var(--color-track-103) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
