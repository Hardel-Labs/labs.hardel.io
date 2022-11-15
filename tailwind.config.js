/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                gold: '#b8881d',
                primary: '#161b22',
                secondary: '#737373',
                tertiary: '#0d1016',
                'accent-primary': '#111',
                'accent-secondary': '#222',
                'accent-tertiary': '#333',
                'accent-quaternary': '#555'
            },
            boxShadow: {
                skew: '#0000002e 20px -18px 20px 20px',
                big: '0px 0px 20px 14px #00000090',
                section: 'inset -1px 10px 20px 0px #000000'
            },
            gridTemplateColumns: {
                code: '60px auto 60px'
            }
        }
    },
    plugins: []
};
