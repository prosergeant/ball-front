<template>
    <div class="main-page">
        <div class="header">
            header
        </div>
        <div class="main-content">
            <UIButton>btn</UIButton>

            <CardStandard v-for="i in Array(4)" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-page {
    width: 100%;
    max-width: 420px;
    min-height: 100dvh;

    .header {
        background: grey;
        border-radius: 30px;
        width: 100%;
        max-width: 420px;
        height: 200px;
        z-index: 2;
        position: fixed;

        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .main-content {
        min-height: 800px;
        width: 100%;
        background: blanchedalmond;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        margin-top: 200px;

        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 20px;

        .btn {
            width: 100%;
            height: 40px;
        }
    }
}
</style>