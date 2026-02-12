/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: '#D4A89F',
        mauve: '#B89B9B',
        deep: '#3D3230',
        cream: '#F5EDE6',
        sage: '#A8B5A0',
        blush: '#E8D5CE',
        'warm-white': '#FAF7F3',
        muted: '#9B8B83',
        text: '#4D403A',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'button': '16px',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(45,27,20,0.06)',
        'rose-glow': '0 8px 24px rgba(212,137,106,0.35)',
        'rose-hover': '0 12px 28px rgba(212,137,106,0.45)',
      },
    },
  },
  plugins: [],
}
