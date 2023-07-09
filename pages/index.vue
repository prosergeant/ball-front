<template>
    <div class="main-page-new">
        <div class="ellipse" />
        <div class="header">
            <div class="header-info">
                <h3>Привет Альбина К</h3>
                <p>Забонируй поля для игры, найди людей
                    к себе в команду и много еще:)</p>
            </div>
            <UIIcon icon="search" color="white" />
        </div>

        <CardNewOffer :ids="[0,1,2]" />

        <div class="available-fields">
            <div class="nav">
                <h3>Доступные поля</h3>
                <div>
                    <p>Смотреть все</p>
                    <UIIcon icon="chevron-right" color="green1" />
                </div>
            </div>
            <div class="spinner">
                <CardStandard v-for="i in data" @click="$router.push(`/object/${i.id}/`)" :data="i" />
            </div>
        </div>

        <div class="available-fields">
            <div class="nav">
                <h3>Ищем игроков</h3>
                <div>
                    <p>Смотреть все</p>
                    <UIIcon icon="chevron-right" color="green1" />
                </div>
            </div>

            <CardStandardInfo v-for="i in data" :key="i.id" :data="i" />
        </div>
    </div>
</template>

<script setup lang="ts">
const {data: data} = await useFetch(`http://127.0.0.1:8000/fields/`)
</script>

<style scoped lang="scss">
.main-page {
    width: 100%;
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
            gap: 10px;

            p {
                height: 17px;
                color: $main-link;
                font-weight: 700;
                font-size: 14px;
                cursor: pointer;
            }

            i {
                width: 13px;
                height: 11px;
            }
        }
    }

    .header {
        background: $background;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        width: 100%;
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

.main-page-new {
    position: relative;
    width: 100%;
    min-height: 100dvh;
    padding: 28px;

    display: flex;
    flex-direction: column;
    gap: 26px;

    .header {
        display: flex;
        color: white;

        i {
            width: 22px !important;
            height: 22px !important;
            //margin-right: 20px;
        }

        &-info {
            z-index: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 255px;
            margin-right: auto;

            h3 {
                font-size: 18px;
                font-weight: 800;
                line-height: 21px;
                letter-spacing: 0;
                text-align: left;
            }

            p {
                font-size: 13px;
                font-weight: 400;
                line-height: 16px;
                letter-spacing: 0;
                text-align: left;
            }
        }
    }

    .available-fields {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .nav {
            display: flex;
            justify-content: space-between;

            & > div {
                display: flex;
                align-items: center;
                gap: 4px;

                i {
                    width: 18px;
                    height: 18px;
                }
            }

            h3 {
                color: white;
                font-size: 18px;
                font-style: normal;
                font-weight: 800;
                line-height: normal;
            }
            p {
                color: $green1;
                text-align: right;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
            }
        }
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
</style>
