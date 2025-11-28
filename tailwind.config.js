/** @type {import('tailwindcss').Types.Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f7fdfc',
          100: '#e8f6f4',
          200: '#d4f1ec',
          300: '#b5e7db',
          400: '#74c2b8',
          500: '#2a7c6f',
          600: '#1d5f63',
          700: '#12464a',
          800: '#0b1e1d',
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        'fade-in-right': 'fadeInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      }
    },
  },
  plugins: [],
}