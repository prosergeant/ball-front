import {defineStore} from 'pinia'

export const authStore = defineStore('auth', () => {
    const is_auth = ref(false)
    const user_info = ref({})
    const access_token = ref('')

    function logout() {
        localStorage.clear()
        is_auth.value = false
        user_info.value = {}
        access_token.value = ''
    }

    function auth(phone: string, password: string) {
        if(!phone || !password) return

        myFetch(`/api-token/`, {
            method: 'post',
            body: {
                'phone': phone,
                "password": password
            }
        })
            .then((res) => {
                const keys = res._data as {access: string, refresh: string}

                access_token.value = keys.access
                is_auth.value = true
                localStorage.setItem('access', access_token.value)
                localStorage.setItem('refresh', keys.refresh)
                localStorage.setItem('is_auth', 'true')

                myFetch(`/user-info/`)
                    .then((res) => {
                        user_info.value = res._data as typeof user_info.value
                        localStorage.setItem('user', JSON.stringify(user_info.value))
                    })
            })
    }

    return {
        is_auth,
        user_info,
        access_token,

        logout,
        auth
    }
})