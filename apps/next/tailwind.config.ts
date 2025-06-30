/** @type {import('tailwindcss').Config} */
module.exports = {
    important: 'html',
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './lib/components/**/*.{js,ts,jsx,tsx,mdx}',
        // '../../packages/app/features/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
}
