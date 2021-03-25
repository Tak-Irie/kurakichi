module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: 'Kiwi Maru',
    },
    colors: {
      yahoo: {
        main: '#ff0033',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
