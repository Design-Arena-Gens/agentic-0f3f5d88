import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#b7d6ff',
          300: '#86b9ff',
          400: '#4d93ff',
          500: '#1c6dff',
          600: '#0a50e6',
          700: '#093fba',
          800: '#0b3692',
          900: '#0e2f76',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
