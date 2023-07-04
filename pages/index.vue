<template>
    <div class="main-page">
        <div class="header">
            <div class="offer">
                <CardNewOffer :ids="[0,1,2]" />
            </div>
        </div>
        <div class="main-content">
            <UIButton style="height: 48px">Смотреть все поля</UIButton>

            <div class="available">
                <h3>Доступные поля сейчас</h3>

                <div>
                    <p>Все поля</p>
                    <UIIcon icon="chevron-down" class="deg270" color="main-link" />
                </div>
            </div>

            <div class="spinner">
                <CardStandard v-for="(i, index) in Array(4)" @click="$router.push(`/object/${index}/`)" />
            </div>

            <div class="available">
                <h3>Доступные поля</h3>

                <div>
                    <p>Все поля</p>
                    <UIIcon icon="chevron-down" class="deg270" color="main-link" />
                </div>
            </div>

            <CardStandard v-for="(i, index) in Array(4)" @click="$router.push(`/object/${index}/`)" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-page {
    width: 100%;
    max-width: 420px;
    min-height: 100dvh;

    .available {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
            color: $dark;
            font-weight: 700;
        }

        & > div {
            display: flex;
            align-items: center;

            p {
                height: 17px;
                color: $main-link;
                font-weight: 700;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }

    .header {
        background: $background;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        width: 100%;
        max-width: 420px;
        height: 150px;
        z-index: 2;
        //border: 2px solid red;

        display: flex;
        justify-content: center;
        align-items: center;
        color: white;

        position: relative;

        .offer {
            position: absolute;
            top: 60px;
        }
    }

    .main-content {
        min-height: 800px;
        width: 100%;
        background: $light;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;

        display: flex;
        flex-direction: column;
        padding: 45px 25px 25px 25px;
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
</style>