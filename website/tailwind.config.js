/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#fb6e90',
          80: '#f99ab0',
          60: '#fbc0cf',
          20: '#3b1a26',
        },
        secondary: '#f4f4f5',
        'on-surface': '#f4f4f5',
        tertiary: '#d4d4d8',
        neutral: '#000000',
        page: '#000000',
        surface: {
          DEFAULT: 'rgba(12, 12, 16, 0.78)',
          2: 'rgba(24, 24, 28, 0.72)',
        },
        error: '#ff5a67',
        'border-subtle': 'rgba(255, 255, 255, 0.08)',
        'border-strong': 'rgba(255, 255, 255, 0.18)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"Cascadia Code"', '"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      fontSize: {
        'headline-display': ['clamp(3.75rem, 11vw, 10rem)', { lineHeight: '1.05', letterSpacing: '-0.05em' }],
        'headline-lg': ['clamp(2.75rem, 6.5vw, 6rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        'headline-md': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'headline-sm': ['2rem', { lineHeight: '2.375rem', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.625rem', letterSpacing: '-0.27px' }],
        'body-md': ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.2px' }],
        'body-sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0' }],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '34px',
        '2xl': '44px',
        full: '9999px',
      },
      boxShadow: {
        'halo-pink': '0 0 35px -5px rgba(251, 110, 144, 0.35)',
        'glow-subtle': '0 0 20px 0 rgba(251, 110, 144, 0.15)',
      }
    },
  },
  plugins: [],
}
