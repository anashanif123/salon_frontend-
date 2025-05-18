/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37', // Gold
        secondary: '#FFF5F5', // Soft Pink
        accent: '#2D3748', // Dark Gray
      },
      fontFamily: {
        sans: ['Playfair Display', 'sans-serif'],
        body: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
};