// https://nuxt.com/docs/api/configuration/nuxt-config

import { fileURLToPath } from 'url';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export default defineNuxtConfig({
    app: { pageTransition: { name: 'page', mode: 'out-in' } },
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    srcDir: 'src/',
    devtools: { enabled: true },
    ionic: {
        integrations: {
            //
        },
        css: {
            utilities: true
        },
        config: {}
    },
    vite: {
        plugins: [
            AutoImport({
                imports: [
                    {
                        'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
                    }
                ]
            }),
            Components({
                resolvers: [NaiveUiResolver()]
            })
        ]
    },
    modules: ['@nuxtjs/ionic', '@pinia/nuxt'],
    ssr: false
});
