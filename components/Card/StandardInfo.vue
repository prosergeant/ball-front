<template>
    <div class="card-wrapper">
        <img src="/cover.png" alt="" />

        <div class="inner-card">
            <h3>Kfis на Шевченко игра...</h3>
            <p>Поле «UZB на Аль-Фараби» —  левое поле крытое летнее/зимнее включительно» </p>
            <hr />

            <div class="playtime-info">
                <div class="playtime-info-block">
                    <UIIcon icon="clock" color="green1" />
                    <div>
                        <p>Время игры:</p>
                        <span>19:00-21:00</span>
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

        .playtime-info {
            display: flex;
            gap: 30px;

            &-block {
                width: 117px;
                display: flex;
                gap: 8px;

                & > div {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;

                    p {
                        all: initial;
                        color: $green1;
                        font-size: 16px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: 127.336%;
                        white-space: nowrap;
                    }

                    span {
                        font-weight: 400;
                        font-size: 14px;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
}
</style>
<script setup lang="ts">
</script>