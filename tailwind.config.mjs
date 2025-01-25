/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin';

export default {
    mode: 'jit',
    content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/modules/**/*.{js,ts,jsx,tsx,mdx}'],
    safelist: [
        { pattern: /text-(.*)-(.*)/ },
        { pattern: /border-(.*)-(.*)/ },
        { pattern: /bg-(.*)-(.*)/ },
        { pattern: /scale-(.*)/ },
        { pattern: /blur-(.*)/ },
        { pattern: /brightness-(.*)/ },
        { pattern: /saturate-(.*)/ },
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
            zIndex: {
                max: `${Number.MAX_SAFE_INTEGER}`,
            },
            backgroundImage: {
                'blue-galaxy': "url('/backgrounds/blue-galaxy.jpg')",
            },
        },
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities({
                'end-opacity': value => ({
                    '--end-opacity': value,
                }),
            });
        }),
    ],
};
