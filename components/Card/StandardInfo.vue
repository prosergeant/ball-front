<template>
    <div class="card-wrapper">
        <img src="/cover.png" alt="" />

        <div class="inner-card">
            <h3>{{ data.name }}</h3>
            <p>{{ data.text }}</p>
            <hr />

            <div class="playtime-info">
                <div class="playtime-info-block">
                    <UIIcon icon="clock" color="green1" />
                    <div>
                        <p>Время игры:</p>
                        <span>{{ data.time_start.slice(0, -3) }}-{{ data.time_end.slice(0, -3) }}</span>
                    </div>
                </div>

                <div class="playtime-info-block">
                    <UIIcon icon="calendar" color="green1" />
                    <div>
                        <p>Дата игры:</p>
                        <span>4 января 2023</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data: IField
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

    img {
        width: 100%;
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