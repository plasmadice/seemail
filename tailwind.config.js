module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    typography: (theme) => ({}),
    extend: {
      colors: {
        'firefly': '#152a38',
        'faded-blue': '#7a86b6',
        'rhino': '#29435c',
        'blue-haze': '#c8b6e2',
        'persian-red': '#cd3131',
        'windows-blue': '#387adf',
        'goldenrod': '#e6db74',
        'bright-neon-pink': '#f637ec'
      }
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}