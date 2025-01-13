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
        'hero-texture': "url('https://images.pexels.com/photos/2464420/pexels-photo-2464420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        'hero-dark':    "url('https://images.pexels.com/photos/3977166/pexels-photo-3977166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        'about-texture':   "url('https://cdn.pixabay.com/photo/2014/08/15/06/16/imprint-418594_960_720.jpg')",
        'contact-texture': "url('https://cdn.pixabay.com/photo/2022/01/06/11/44/envelopes-6919301_960_720.jpg')",
      }
    }
  },
  plugins: [],
}

