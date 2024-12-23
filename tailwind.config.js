/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',  // Your green color
        'primary-dark': '#16a34a',
        'primary-light': '#f0fdf4',
      },
    },
  },
  plugins: [],
} 