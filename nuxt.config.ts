// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    devtools: { enabled: false },
    modules: ['@pinia/nuxt'],
    components: {
        global: true,
        dirs: ['@/components']
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/scss/variables.scss";',
                },
            },
        }
    },

    css: [
        '@/assets/scss/normalize.scss'
    ],
})
