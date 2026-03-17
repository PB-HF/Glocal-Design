/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        afacad: ['Afacad', 'sans-serif'],
        mosseta: ['Mosseta', 'serif'],
      },
    },
  },
  plugins: [],
}
