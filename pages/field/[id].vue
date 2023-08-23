<template lang="jade">
div(style="color: white;")
    p id: {{ $route?.params?.id }}

    UIButton(@click="share") share
    p error: {{ error }}
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
</script>
