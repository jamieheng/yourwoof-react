/** @type {import('tailwindcss').Config}  */
/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    './node_modules/flowbite-react/**/*.js', './pages/**/*.{ts,tsx}', './public/**/*.html'
    
  ],
  
  theme: {
    'sm': '480px',    
    'md': '768px',    
    'lg': '1024px',   
    'xl': '1200px',   
    '2xl': '1536px',  
    colors: {
      'white': '#fefefe',
      'purple': '#e6c3fe',
      'blue': '#7481fe',
      'orange': '#ff7351',
      'green': '#13ce66',
      'yellow': '#ffdaa6',
      'blue-dark': '#232b38',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'red' : '#FF2400'
    },
   
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '1rem',
      'xl': '2rem',
      'full': '9999px',
      'large': '50px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      raleway: ['Raleway']
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['hover'],
    },
  },
  plugins: [
    // require('flowbite/plugin'),
  ],
})