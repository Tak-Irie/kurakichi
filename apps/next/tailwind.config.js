module.exports = {
  purge: [
    '.apps/next/src/pages/**/*.{js,ts,jsx,tsx}',
    '.apps/next/src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Kiwi Maru'"],
      },
      colors: {
        yahoo: {
          main: '#ff0033',
          sub: 'ffffff',
        },
        kurakichi: {
          lightPink: '#FBE5EB',
          pink: '#F7C8DA',
          lightGreen: '#E2E28A',
          green: '#B5C97C',
          lightBrown: '#864544',
          brown: '#775435',
          yellow: '#F3DDAF',
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
