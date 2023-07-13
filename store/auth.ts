import {defineStore} from 'pinia'

export const authStore = defineStore('auth', () => {
    const auth_coockie = useCookie('is_auth')
    const is_auth = ref(auth_coockie.value || false)
    const user_info = ref(useCookie('user') || {})

    return {
        is_auth,
        user_info
    }
})