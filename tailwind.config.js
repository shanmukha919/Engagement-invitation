/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          light: '#A7B798',
          DEFAULT: '#8A9A7B',
          dark: '#647455',
        },
        cream: {
          light: '#FAF6EE',
          DEFAULT: '#F6EEDF',
          dark: '#E7DEC9',
        },
        olive: {
          light: '#5B6850',
          DEFAULT: '#3F4A35',
          dark: '#2A3323',
        },
        gold: {
          light: '#DFCA9D',
          DEFAULT: '#C9A66B',
          dark: '#9E7B44',
        },
        blush: {
          light: '#F4DDD6',
          DEFAULT: '#E8C9C0',
          dark: '#CF9E92',
        },
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
        telugu: ['"Noto Sans Telugu"', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      boxShadow: {
        'wedding': '0 10px 30px rgba(0, 0, 0, 0.12)',
        'wedding-lg': '0 20px 40px rgba(0, 0, 0, 0.18)',
        'gold-glow': '0 0 25px rgba(201, 166, 107, 0.45)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-0.5deg)' },
          '50%': { transform: 'rotate(0.5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        }
      },
      animation: {
        shimmer: 'shimmer 3s infinite',
        pulseSlow: 'pulseSlow 1.6s ease-in-out infinite',
        sway: 'sway 5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shake: 'shake 0.35s ease-in-out',
      }
    },
  },
  plugins: [],
}
