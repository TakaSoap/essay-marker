// https://nuxt.com/docs/api/configuration/nuxt-config

import { fileURLToPath } from 'url';

export default defineNuxtConfig({
    app: { pageTransition: { name: 'page', mode: 'out-in' } },
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    srcDir: 'src/',
    devtools: { enabled: true },
    modules: ['@nuxtjs/ionic', '@pinia/nuxt'],
    ssr: false
});
