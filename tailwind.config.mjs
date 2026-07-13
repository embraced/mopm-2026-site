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
        gold: 'rgb(var(--color-gold) / <alpha-value>)',
        'gold-contrast': 'rgb(var(--color-gold-contrast) / <alpha-value>)',
        header: 'rgb(var(--color-header) / <alpha-value>)',
        'teal-light': 'rgb(var(--color-teal-light) / <alpha-value>)',
        'teal-deep': 'rgb(var(--color-teal-deep) / <alpha-value>)',
        't101': 'rgb(var(--color-track-101) / <alpha-value>)',
        't102': 'rgb(var(--color-track-102) / <alpha-value>)',
        't103': 'rgb(var(--color-track-103) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif TC"', 'serif'],
        spectral: ['"Spectral"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
