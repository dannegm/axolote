import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const setupHintPlugin = () => ({
    name: 'setup-hint',
    configureServer(server) {
        server.httpServer?.once('listening', () => {
            const base = server.resolvedUrls?.network?.[0] ?? server.resolvedUrls?.local?.[0];
            if (!base) return;
            const url = new URL('/krys/secrets/setup', base).href;
            console.log(`  \x1b[36m➜\x1b[0m  \x1b[2mSetup:\x1b[0m  \x1b[36m${url}\x1b[0m`);
        });
    },
});

export default defineConfig({
    envPrefix: 'NEXT_PUBLIC_',
    plugins: [react({ babel: { inputSourceMap: false } }), tailwindcss(), setupHintPlugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    define: {
        'process.version': JSON.stringify(process.version),
    },
});
