/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDF4EC',
          100: '#FBE7D6',
          400: '#D6845B',
          500: '#C96F46',
          600: '#A95735',
          700: '#844126'
        },
        accent: {
          100: '#FFF3E4',
          500: '#F2B56B',
          600: '#DF9A4D'
        },
        electric: {
          100: '#F9E8DF',
          500: '#C97F5D',
          600: '#A86547'
        }
      },
      boxShadow: {
        soft: '0 12px 35px -14px rgba(77, 45, 31, 0.28)'
      }
    }
  },
  plugins: []
};
