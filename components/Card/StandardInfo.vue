<template>
    <div class="card-wrapper">
        <img src="/cover.png" alt=""/>
        <span
            v-if="data?.is_ended !== undefined"
            class="is_ended"
            :class="{ended: data?.is_ended, active: data?.is_ended === false}"
        >
            {{ data?.is_ended ? 'Завершена' : 'Активна' }}
        </span>

        <div class="inner-card">
            <h3>{{ data.name }}</h3>
            <p>{{ data.text }}</p>
            <hr />

            <div class="playtime-info">
                <div class="playtime-info-block">
                    <UIIcon icon="clock" color="green1" />
                    <div>
                        <p>Время игры:</p>
                        <span>{{ data.time_start }}-{{ data.time_end }}</span>
                    </div>
                </div>

                <div class="playtime-info-block">
                    <UIIcon icon="calendar" color="green1" />
                    <div>
                        <p>Дата игры:</p>
                        <span>{{ getDateFromDateTime(data?.date) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data: {
        name: string
        text: string
        time_start: string
        time_end: string
        date: string
        is_ended: boolean
    }
}>()
</script>

<style scoped lang="scss">
.card-wrapper {
    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.20);
    background: #3A3A3A;
    backdrop-filter: blur(20px);
    padding: 12px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    position: relative;
    span.is_ended {
        position: absolute;
        top: calc(169px - 18px - 16px);
        left: 17px;

        border-radius: 28px;
        backdrop-filter: blur(20px);
        padding: 10px 19px;

        color: $black1;
        font-size: 11px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;

        &.active {
            background: $green1;
        }
        &.ended {
            background: red;
        }
    }

    img {
        width: 100%;
        min-height: 169px;
        max-height: 169px;
    }

    .inner-card {
        padding: 19px 15px;
        background: black;
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        gap: 7px;
        color: white;

        h3 {
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }

        p {
            color: #AFAFAF;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;

            margin-bottom: 13px;
        }

        hr {
            border: 1px solid black;
            border-top: 1px solid #333;
        }
    }
}
</style>