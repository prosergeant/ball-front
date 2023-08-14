import type { FetchRequest, FetchOptions, FetchResponse } from 'ofetch';
import { ofetch } from 'ofetch';
import { authStore } from '~/store/auth'
import {useNotifyStore} from "~/store/useNotify";

const fetcher = ofetch.create({
    baseURL: baseUrl,
    async onRequest({ options }) {
        const _authStore = authStore()
        if (_authStore.is_auth && _authStore.access_token) {
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${_authStore.access_token}`,
            };
        }
    },
    async onResponse({ response }) {
        const _authStore = authStore()
        if (response.status === 401 && localStorage.getItem('refresh')) {
            const {access} = await ofetch('/api-token-refresh/', {
                baseURL: baseUrl,
                method: 'POST',
                body: {
                    refresh: localStorage.getItem('refresh')
                }
            }).catch(() => {
                _authStore.logout()
                navigateTo('/')
            })

            if(access) {
                localStorage.setItem('access', access)
                _authStore.access_token = access
            }
        }
    },
});

export const myFetch = async <T>(request: FetchRequest, options?: FetchOptions) => {
    const _authStore = authStore()
    const _notifyStore = useNotifyStore()
    return new Promise<FetchResponse<T>>(async (resolve, reject) => {
        try {
            const response = await fetcher.raw(request, options);
            return resolve(response as FetchResponse<T>)
        } catch (error: any) {
            _notifyStore.addNotify(JSON.stringify(error))
            _notifyStore.addNotify(JSON.stringify(error?.response))
            if (error.response?.status === 401 && localStorage.getItem('refresh')) {
                const response = await fetcher.raw(request, options);
                return resolve(response as FetchResponse<T>)
            } else if(error.response?.status === 401 && !localStorage.getItem('refresh')) {
                _authStore.logout()
                if(process.client) {
                    const pathname = window.location.pathname.split('/')
                    if(pathname?.[pathname.length-2] !== 'boocking') {
                        navigateTo('/')
                    }
                }
            }
            return reject(error.response as FetchResponse<T>)
        }
    })
};
