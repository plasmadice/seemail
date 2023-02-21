module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    typography: (theme) => ({}),
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}