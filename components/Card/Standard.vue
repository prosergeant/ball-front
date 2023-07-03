<template>
    <div class="card-wrapper">
        <div class="card-wrapper-img">
            <img src="/sample.png">
        </div>
        <div class="card-wrapper-info">
            <h3>Kifs на Шевченко игра в футбол</h3>
            <p>Поле «Uzbekistan на Аль-Фараби»</p>
            <span>7 сентября, 19:00</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card-wrapper {
    min-width: 300px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 10px;

    background: white;

    &-img {
        //height: 100px;
        border-radius: 10px;
        overflow: hidden;

        height: 145px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    &-info {
        display: flex;
        flex-direction: column;
        h3 {
            font-weight: 700;
            font-size: 15px;
        }

        p {
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 8px;
        }

        span {
            font-weight: 700;
            font-size: 16px;
            color: $main-link;
        }
    }
}
</style>