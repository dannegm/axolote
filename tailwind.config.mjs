/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin';

export default {
    mode: 'jit',
    content: ['./**/*.{js,jsx}'],
    safelist: [
        { pattern: /text-(.*)-(.*)/ },
        { pattern: /border-(.*)-(.*)/ },
        { pattern: /bg-(.*)-(.*)/ },
        // { pattern: /bg-\[.*\]/ },
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
