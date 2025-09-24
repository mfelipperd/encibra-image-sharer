/** @type {import('tailwindcss').Config} */
module.exports = {
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
              },
              keyframes: {
                'slide-up': {
                  '0%': {
                    transform: 'translateY(100%)',
                    opacity: '0',
                  },
                  '100%': {
                    transform: 'translateY(0)',
                    opacity: '1',
                  },
                },
                'slide-in-left': {
                  '0%': {
                    transform: 'translateX(-100%)',
                    opacity: '0',
                  },
                  '100%': {
                    transform: 'translateX(0)',
                    opacity: '1',
                  },
                },
                'slide-in-right': {
                  '0%': {
                    transform: 'translateX(100%)',
                    opacity: '0',
                  },
                  '100%': {
                    transform: 'translateX(0)',
                    opacity: '1',
                  },
                },
                'fade-in': {
                  '0%': {
                    opacity: '0',
                  },
                  '100%': {
                    opacity: '1',
                  },
                },
                'scale-in': {
                  '0%': {
                    transform: 'scale(0.95)',
                    opacity: '0',
                  },
                  '100%': {
                    transform: 'scale(1)',
                    opacity: '1',
                  },
                },
                'stagger-up': {
                  '0%': {
                    transform: 'translateY(20px)',
                    opacity: '0',
                  },
                  '100%': {
                    transform: 'translateY(0)',
                    opacity: '1',
                  },
                },
              },
              animation: {
                'slide-up': 'slide-up 0.5s ease-out',
                'slide-in-left': 'slide-in-left 0.4s ease-out',
                'slide-in-right': 'slide-in-right 0.4s ease-out',
                'fade-in': 'fade-in 0.3s ease-out',
                'scale-in': 'scale-in 0.3s ease-out',
                'stagger-up': 'stagger-up 0.4s ease-out',
              }
    },
  },
  plugins: [],
}
