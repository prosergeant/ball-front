import { ofetch } from 'ofetch'
import { authStore } from '~/store/auth'

export default defineNuxtPlugin((_nuxtApp) => {
    let retry = false
    globalThis.$fetch = ofetch.create({
        baseURL: baseUrl,
        onRequest ({ request, options }) {
            console.log(request, options)
            const _authStore = authStore()
            if (_authStore.is_auth)
                options.headers = { Authorization: `Bearer ${_authStore.access_token}` }
        },
        // onRequestError ({ request, options, error }) {
        // },
        async onResponseError({ request, response, options }) {
            const _authStore = authStore()
            if(response.status === 401 && _authStore.is_auth && !retry) {
                retry = true
                useFetch(`api-token-refresh/`, {
                    method: 'post',
                    body: {
                        refresh: localStorage.getItem('refresh')
                    }
                })
                    .then(res => {
                        const access = (res.data.value as {access: string})?.access
                        if(res?.error?.value?.statusCode !== 401 && access) {
                            localStorage.setItem('access', access)
                            _authStore.access_token = access
                            useFetch(request)
                        }
                    })
            } else if(response.status === 400 && request.toString().includes('api-token-refresh')) {
                _authStore.logout()
                window.location.reload()
            }
        }
    })
})