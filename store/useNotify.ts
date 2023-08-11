import {defineStore} from 'pinia'

export const useNotifyStore = defineStore('useNotifyStore', () => {

    const messages = ref<string[]>([])

    const addNotify = (message: string) => {
        messages.value.push(message)
    }
    const eraseNotify = () => {
        if(messages.value.length)
            messages.value = []
    }

    return {
        messages,
        eraseNotify,
        addNotify
    }
})
