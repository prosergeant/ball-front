<template lang="jade">
div(style="color: white;")
    p id: {{ $route?.params?.id }}

    UIButton(@click="share") share
    p error: {{ error }}
    a(href="https://google.com" target="_blank") lupa
    UIButton(@click="fcm") send fcm token
</template>

<script setup lang="ts">
const error = ref('')
const share = async () => {
    try {
        await navigator.share({
            title: 'Title',
            text: 'Text',
            url: window.location.href,
        });
    } catch (err: any) {
        console.error(`${err?.name}: ${err?.message}`);
        error.value = err
    }
}

const fcm = () => {
    const token = localStorage.getItem('fcmToken')
    myFetch(`/change-fcm-token/?token=${token}`, {
        method: 'POST',
    })
}
</script>
