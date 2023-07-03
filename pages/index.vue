<template>
    <div class="main-page">
        <div class="header">
            header
        </div>
        <div class="main-content">
            <UIButton color="success-200">Смотреть все поля</UIButton>

            <div class="d-flex sb center">
                <h3>Доступные поля сейчас</h3>

                <div class="d-flex center">
                    <p style="height: 20px">все поля</p>
                    <UIIcon icon="chevron-down" class="deg270" color="blue-600" />
                </div>
            </div>

            <div class="spinner">
                <CardStandard v-for="(i, index) in Array(4)" @click="$router.push(`/field/${index}/`)" />
            </div>

            <div class="d-flex sb center">
                <h3>Доступные поля</h3>

                <div class="d-flex center">
                    <p style="height: 20px">все поля</p>
                    <UIIcon icon="chevron-down" class="deg270" color="blue-600" />
                </div>
            </div>

            <CardStandard v-for="(i, index) in Array(4)" @click="$router.push(`/field/${index}/`)" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-page {
    width: 100%;
    max-width: 420px;
    min-height: 100dvh;

    &.d-flex.sb.center {
        h3 {
            font-weight: 600;
        }

        & > div {
            p {
                color: $blue-600;
            }
        }
    }

    .header {
        background: grey;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        width: 100%;
        max-width: 420px;
        height: 150px;
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
        margin-top: 150px;

        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 20px;

        .btn {
            width: 100%;
            height: 40px;
        }

        .spinner {
            display: flex;
            gap: 20px;
            width: 100%;
            overflow-x: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
}

.deg90 {
    transform: rotate(90deg);
}
.deg270 {
    transform: rotate(270deg);
}
</style>