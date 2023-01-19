/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#95ec99',
        'secondary': '#fff3aa',
        'midnight': '#030115',
        'white': '#ffffff'
      },
      fontFamily: {
        serif: ['Courier Prime', 'monospace'],
        sans: ['Courier Prime', 'monospace'],
      },
    },
  },
  plugins: [],
}
