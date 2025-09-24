/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F2BC1B',
        'primary-hover': '#E6A91A',
        'background': '#2d2d2d',
        'text-primary': '#ffffff',
        'text-secondary': 'rgba(255, 255, 255, 0.6)',
        'text-muted': 'rgba(255, 255, 255, 0.5)',
        'accent': '#ff7554',
        'glass': 'rgba(255, 255, 255, 0.1)',
        'glass-light': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        'sans': ['DmSans-Regular', 'sans-serif'],
        'sans-bold': ['DmSans-Bold', 'sans-serif'],
        'sans-black': ['DmSans-Black', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '5px',
        'md': '20px',
        'lg': '25px',
      }
    },
  },
  plugins: [],
}
