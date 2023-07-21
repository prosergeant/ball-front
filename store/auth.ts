import {defineStore} from 'pinia'

export const authStore = defineStore('auth', () => {
    // const auth_coockie = useCookie('is_auth')
    // const user_coockie = useCookie('user')
    const is_auth = ref(false)
    const user_info = ref({})
    const access_token = ref('')

    function logout() {
        // const _refresh = useCookie('refresh')
        // const _access = useCookie('access')
        // auth_coockie.value = null
        // user_coockie.value = null
        // is_auth.value = false
        // _refresh.value = null
        // _access.value = null
        // access_token.value = ''
        localStorage.clear()
        is_auth.value = false
        user_info.value = {}
        access_token.value = ''
    }

    return {
        is_auth,
        user_info,
        access_token,

        logout
    }
})