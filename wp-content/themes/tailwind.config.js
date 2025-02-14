/** @type {import('tailwindcss').Config} */
export default {
    theme: {
      extend: {
        animation: {
          'infinite-scroll': 'infinite-scroll 40s linear infinite',
        },
        keyframes: {
          'infinite-scroll': {
            from: { transform: 'translateX(0)' },
            to: { transform: 'translateX(-100%)' },
          },
        },
      },
    },
    plugins: [],
}

module.exports = {
  theme: {
    extend: {
      height: {
        'fit': 'fit-content',
      },
    },
  },
};