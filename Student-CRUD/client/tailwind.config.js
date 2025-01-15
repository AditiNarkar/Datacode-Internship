/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: "#7bb4da", // Example custom color
        customGreen: "#1bb6a2",
      },
    }
  },
  plugins: []
}

