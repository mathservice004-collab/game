/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                neon: {
                    purple: '#bc13fe',
                    blue: '#00e5ff',
                    pink: '#ff00ff',
                    green: '#39ff14',
                }
            },
            boxShadow: {
                'neon-purple': '0 0 10px #bc13fe, 0 0 20px #bc13fe',
                'neon-blue': '0 0 10px #00e5ff, 0 0 20px #00e5ff',
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
