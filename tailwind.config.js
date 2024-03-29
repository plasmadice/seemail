module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    typography: (theme) => ({}),
    extend: {
      colors: {
        firefly: '#152a38',
        'faded-blue': '#7a86b6',
        rhino: '#29435c',
        'blue-haze': '#c8b6e2',
        'persian-red': '#cd3131',
        'windows-blue': '#387adf',
        goldenrod: '#e6db74',
        'bright-neon-pink': '#f637ec',
      },
      boxShadow: {
        sharp: '5px 5px 0 0 rgba(0,0,0,1)',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
  daisyui: {
    themes: ["light", "aqua"],
    darkTheme: "aqua",
  }
}
