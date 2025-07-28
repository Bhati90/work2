/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        brandGreen: '#2DA884',
      },
      // You can define custom fonts, colors, etc. here
    },
    fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'plus-jakarta-sans': ['"Plus Jakarta Sans"', 'sans-serif'],
    }
  },
  plugins: [],
}