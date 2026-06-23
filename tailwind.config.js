/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ios-bg': '#000000',
        'ios-card': '#1c1c1e',
        'ios-secondary': '#2c2c2e',
        'ios-tertiary': '#3a3a3c',
      },
      backdropFilter: {
        'none': 'none',
        'sm': 'blur(4px)',
        'md': 'blur(12px)',
        'lg': 'blur(20px)',
      },
      fontFamily: {
        'sf-pro': ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
