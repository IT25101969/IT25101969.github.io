/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08111d',
        panel: '#0d1927',
        muted: '#9aaabe',
        accent: '#64d9f0',
      },
      fontFamily: {
        sans: ['Inter', 'Aptos', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
