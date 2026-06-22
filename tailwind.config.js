/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DB4444',
        'primary-hover': '#c13333',
        secondary: '#00FF66',
        dark: '#1D2636',
        'text-secondary': '#7D8184',
        'text-muted': '#FAFAFA',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
