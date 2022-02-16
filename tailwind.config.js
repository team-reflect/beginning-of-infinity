const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'left-xl': '-20px 0px 25px -5px rgb(0 0 0 / 0.05)',
      },

      typography: ({theme}) => ({
        DEFAULT: {
          css: {
            h1: {
              fontSize: '1.4rem',
              fontWeight: 500,
            },

            hr: {
              margin: '1.5rem 0',
            },

            '--tw-prose-hr': theme('colors.gray[100]'),
            '--tw-prose-links': theme('colors.gray[600]'),
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
      }),
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
