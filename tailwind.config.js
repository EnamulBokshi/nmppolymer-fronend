/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/221576/pexels-photo-221576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    }
  },
  plugins: [],
}

