/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*",],
  theme: {
    extend: {
      backgroundImage: {
        'auth-bg': "url('./src/assets/images/bg/auth-bg.jpg')",

      }
    },
  },
  plugins: [],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}