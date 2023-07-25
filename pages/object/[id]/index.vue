<template>
    <div>
        <div class="mini-navigation-block">
            <div class="mini-navigation" @click="navigateTo(`/`)">
                <UIIcon icon="chevron-left" color="white" />
                <p>{{ data.name }}</p>
            </div>
            <UIIcon icon="search" color="white" />
        </div>
        <div class="object-info">
            <h3>{{ data.name }}</h3>
            <span>активна</span>
        </div>
        <div class="object-content">
            <div class="address-card">
                <div class="info">
                    <p>Адрес поля</p>
                    <span>{{ data.address }}</span>
                </div>

                <UIButton @click="isMap = !isMap">Смотреть на карте</UIButton>
            </div>

            <div class="text-block">
                <h3>Подробнее о поле</h3>
                <p>{{ data.text }}</p>
            </div>
            <div class="text-block">
                <h3>Что есть в комплекте?</h3>
                <div class="tags-block">
                    <div class="tag" v-for="tag in tags" :key="tag.id">
                        <UIIcon :icon="tag.icon" color="green1" />
                        <p>{{ tag.name }}</p>
                    </div>
                </div>
            </div>

            <UIButton icon="arrow-right" icon-color="black" @click="navigateTo(`/object/${id}/boocking/`)">Забронировать поле</UIButton>
        </div>

        <UIModalBottom v-if="isMap">
            <div class="d-column">
                <UINavigation :title="data.name" @click="isMap = false" :padding-x=28 no-search />
                <div class="map" v-on-click-outside="() => {isMap = false}">
                    <UIMap  />
                </div>
            </div>
        </UIModalBottom>
    </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import {useRoute} from "vue-router";

const route = useRoute()
const id = route.params?.id || -1

const {data: data} = await useFetch(`${baseUrl}/fields/${id}/`)

const tags = ref((data.value as IField).tags)

const isMap = ref(false)
</script>

<style scoped lang="scss">
.mini-navigation-block {
    display: flex;
    align-items: center;
    gap: 20px;

    i {
        width: 22px;
        height: 22px;
    }

    .mini-navigation {
        height: 40px;
        width: 335px;
        padding: 10px 25px 10px 25px;
        display: flex;
        align-items: center;
        gap: 20px;

        i {
            width: 11px;
            height: 12px;
        }

        p {
            font-size: 14px;
            font-weight: 400;
            line-height: 18px;
            color: $light;
        }
    }
}
.object-info {
    height: 334px;
    width: 90%;
    margin: 0 auto;

    border-radius: 28px;
    //background: url('/cover-big.png'), lightgray 50% / cover no-repeat;
    background: linear-gradient(to top, black 5%, transparent 100%), url("/cover-big.png") no-repeat;
    background-size: cover;

    display: flex;
    flex-direction: column-reverse;
    padding: 0 44px 44px 29px;
    gap: 17px;

    h3 {
        font-size: 28px;
        font-weight: 700;
        line-height: 33px;
        letter-spacing: 0;
        text-align: left;
        color: white;
    }

    span {
        width: fit-content;
        height: 30px;
        padding: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $light;

        font-size: 10px;
        font-weight: 400;
        line-height: 13px;

        border-radius: 28px;
        border: 1px solid rgba(255, 255, 255, 0.20);
        background: rgba(255, 255, 255, 0.22);
        backdrop-filter: blur(20px);
    }
}

.object-content {
    display: flex;
    flex-direction: column;
    gap: 29px;
    width: 100%;
    padding: 28px;

    .btn {
        width: 100%;
        padding: 15px 16px;
        color: black;
        font-weight: 600;
        background: $green1;
    }

    .address-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.22);
        backdrop-filter: blur(20px);
        padding: 18px 19px;

        .btn {
            border-radius: 10px;
            background: $green1;
            color: black;
            white-space: nowrap;
            width: fit-content;
            padding: 15px 16px;

            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }

        .info {
            color: white;
            p {
                font-size: 11px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
            }
            span {
                font-size: 14px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
            }
        }
    }

    .text-block {
        color: white;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-right: 20px;
        h3 {
            font-size: 16px;
            font-style: normal;
            font-weight: 800;
            line-height: normal;
        }
        p {
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }

        .tags-block {
            padding: 15px 14px;
            border-radius: 24px;
            background: #3A3A3A;
            backdrop-filter: blur(20px);

            display: flex;
            gap: 10px;
            flex-wrap: wrap;

            .tag {
                display: flex;
                gap: 8px;
                justify-content: center;
                align-items: center;
                border-radius: 18px;
                border: 1px solid $green1;
                background: #323232;
                padding: 8px 12px;

                p {
                    color: $green1;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 127.336%;
                }
            }
        }
    }
}

.map {
    overflow: hidden;
    border-radius: 30px;
    margin-top: auto;
    width: 420px;
    height: calc(100dvh - 60px);
}
</style>
