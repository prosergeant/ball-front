// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // @ts-ignore
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

    ssr: false
})
