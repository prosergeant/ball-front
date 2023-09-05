import {defineStore} from 'pinia'
import {useNotifyStore} from "~/store/useNotify";

export const authStore = defineStore('auth', () => {
    const is_auth = ref(false)
    const user_info = ref<IUserInfo>({} as IUserInfo)
    const access_token = ref('')
    const data_ready = ref(false)

    const _notifyStore = useNotifyStore()

    const saveData = async (data: {is_auth: boolean, user_info: IUserInfo, access_token: string}): Promise<void> => {
        return new Promise((resolve) => {
            is_auth.value = data.is_auth
            user_info.value = data.user_info
            access_token.value = data.access_token
            data_ready.value = true
            resolve()
        })
    }

    const waitForData = () => {
        return new Promise((resolve) => {
            // Проверяйте доступность данных в цикле
            const checkData = () => {
                if (data_ready.value) {
                    resolve(true)
                } else {
                    setTimeout(checkData, 1)
                }
            }
            checkData()
        })
    }

    function logout() {
        try {
            localStorage.clear()
        } catch (e) {
            _notifyStore.addNotify('Ошибка при очистке хранилища')
        }

        is_auth.value = false
        user_info.value = {} as IUserInfo
        access_token.value = ''
    }

    function auth(phone: string, password: string) {
        if(!phone || !password) return

        myFetch(`/api-token/`, {
            method: 'POST',
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
        data_ready,

        logout,
        auth,
        saveData,
        waitForData
    }
})
