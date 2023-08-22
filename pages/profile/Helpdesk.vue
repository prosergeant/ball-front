<template lang="jade">
UINavigation(title="Служба поддержки" go-to="/profile/", padding-x="20")
.help-desk
    h3 Связаться с нами
    p В случае возникновения вопросов просим связать с нами по электронной почте
    a(href="mailto: support@bronkz.app") support@bronkz.app
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.help-desk {
    color: white;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    a {
        text-decoration: none;
        color: $green1;
    }
}
</style>
