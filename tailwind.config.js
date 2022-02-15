const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'left-xl': '-20px 0px 25px -5px rgb(0 0 0 / 0.05)',
      },

      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '1.4rem',
              fontWeight: 500,
            },
          },
        },

        sm: {
          css: {
            h1: {
              fontSize: '1rem',
              fontWeight: 500,
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({addUtilities}) {
      addUtilities({
        '.writing-vertical': {
          writingMode: 'vertical-lr',
        },
      })
    }),
  ],
}
