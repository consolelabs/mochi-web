module.exports = {
  content: ["./**/*.{html,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        mochi: {
          DEFAULT: "#E88B88",
          50: "#FBE9E8",
          100: "#F9DEDD",
          200: "#F4C9C8",
          300: "#F0B5B3",
          400: "#ECA09D",
          500: "#E88B88",
          600: "#E47673",
          700: "#E0615D",
          800: "#DC4D48",
          900: "#D73833",
        },
        rarity: {
          common: "#94a3b8",
          uncommon: "#22d3ee",
          rare: " #0284c7",
          legendary: "#f59e0b",
          mythic: " #d633ff",
          epic: " #d633ff",
        },
        white: "#fafafd",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["DM Serif Display", "serif"],
        display: ["Dela Gothic One"],
      },
      blur: {
        "4xl": "128px",
      },
    },
  },
  plugins: [],
};
