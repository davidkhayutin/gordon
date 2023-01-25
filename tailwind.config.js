/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        colors: {
            'blue-10': '#8ABAE2',
            'blue-20': '#4C89B4',
            'blue-50': '#152238',
            white: '#FFFFFF',
            'gold-50': '#C9A75D',
            'black-40': '#090b19',
            'red-50': '#DA3933',
            'grey-20': '#8d8d8d',
            'green-20': '#00FF00',
        },
        screens: {
            xs: '320px',
            sm: '520px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        extend: {
            fontFamily: {
                'secular-one': ['"Secular One"'],
                rubik: ['"Rubik Dirt"'],
                montserrat: 'Montserrat',
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
    prefix: 'tw-',
}
