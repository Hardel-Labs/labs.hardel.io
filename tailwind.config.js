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
            backgroundImage: {
                royal: "url('/images/design/hex-transparent.png'), linear-gradient(263deg, #000 77%, rgba(177, 124, 6, 1) 77%, rgba(190, 146, 47, 1) 78%, rgba(255, 255, 255, 1) 78%)",
                'royal-reverse':
                    "url('/images/design/hex-transparent.png'), linear-gradient(107deg, #000 77%, rgba(177, 124, 6, 1) 77%, rgba(190, 146, 47, 1) 78%, rgba(255, 255, 255, 1) 78%)",
                grid: "url('/images/design/hex-222.png'), radial-gradient(at center top, #212121, #191919, #0f0f0f, #000000)"
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
