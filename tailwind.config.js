module.exports = {
  content: ['./*.{html,js}', './js/*.js', './js/*/*.js'],

  theme: {
    fontFamily: {
      body: ['Merriweather', 'serif'],
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        'hero-banner': "url('./img/hero-banner.png')",
      },
    },
  },

  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
