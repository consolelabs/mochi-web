module.exports = {
  content: ['./**/*.{html,ts,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        foreground: {
          DEFAULT: '#111827',
          secondary: '#4B5563',
        },
        mochi: {
          DEFAULT: '#E88B88',
          50: '#FBE9E8',
          100: '#F9DEDD',
          200: '#F4C9C8',
          300: '#F0B5B3',
          400: '#ECA09D',
          500: '#E88B88',
          600: '#E47673',
          700: '#E0615D',
          800: '#DC4D48',
          900: '#D73833',
          gray: '#F6F5F5',
        },
        rarity: {
          common: '#98A3B6',
          uncommon: '#24D3EE',
          rare: ' #7AA5F4',
          legendary: '#f59e0b',
          mythic: '#FFA3A9',
          epic: '#FFA3A9',
        },
        white: '#fafafd',
      },
      blur: {
        '4xl': '128px',
      },
    },
  },
  plugins: [],
}
