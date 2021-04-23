module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Kiwi Maru'"],
      },
      colors: {
        yahoo: {
          main: '#ff0033',
        },
      },
      opacity: ['disabled'],
    },
    variants: {
      extend: {
        scale: ['responsive', 'hover', 'focus', 'group-hover'],
        textColor: ['responsive', 'hover', 'focus', 'group-hover'],
        opacity: ['responsive', 'hover', 'focus', 'group-hover', 'disabled'],
        backgroundColor: ['responsive', 'hover', 'focus', 'group-hover'],
        visibility: ['responsive', 'hover', 'focus', 'group-hover'],
        grayscale: ['responsive', 'hover', 'focus', 'group-hover'],
        dropShadow: ['responsive', 'hover', 'focus', 'group-hover'],
        filter: ['responsive', 'hover', 'focus', 'group-hover'],
      },
    },
    plugins: [require('@tailwindcss/forms')],
  },
};
