/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        screens: {
            sm: '375px',
            md: '768px',
            xl: '1280px',
        },
        colors: {
            black: '#2B2B2B',
            white: '#FFFFFF',
            darkGray: '3B3B3B',
            lightGray: '#858584',
            purple: '#A259FF',
        },
    },
    plugins: [
        plugin(function ({ addComponents }) {
            addComponents({
                '.btn': {
                    display: 'flex',
                    'align-items': 'center',
                    gap: '12px',
                },
                '.btn-dark': {
                    'background-color': '#A259FF',
                    'border-radius': '20px',
                },
                '.btn-light': {
                    'background-color': '#FFFFFF',
                    'border-radius': '20px',
                },
                '.btn-large': {
                    padding: '20.5px 50px',
                    'font-size': '22px',
                    'line-height': '30.8px',
                },
                '.btn-medium': {
                    padding: '19px 50px',
                    'font-size': '16px',
                    'line-height': '22.4px',
                },
                '.btn-small': {
                    padding: '12px 50px',
                    'font-size': '16px',
                    'line-height': '22.4px',
                },
            });
        }),
    ],
};
