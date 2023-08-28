import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'
import typography from '@tailwindcss/typography'
import aspectRatio from '@tailwindcss/aspect-ratio'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        gray: {
          50: '#F6F5F5',
          100: '#EDEDED',
          300: '#CCCCCC',
          500: '#999999',
          700: '#666666',
          900: '#333333',
          950: '#000000'
        }
      },
      fontFamily: {
        sans: ['var(--font-urbanist)'],
        'cal-sans': ['var(--font-cal-sans)']
      }
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        radius: {
          small: '6px',
          medium: '6px',
          large: '6px'
        }
      },
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#000000',
              foreground: '#ffffff'
            },
            secondary: {
              DEFAULT: '#0070f3',
              foreground: '#ffffff'
            },
            focus: '#000000',
          },
        }
      }
    }),
    typography({ target: 'modern' }),
    aspectRatio
  ],
}
export default config
