<template>
    <div class="card-wrapper">
        <img src="/cover.png">
        <div class="card-wrapper-info">
            <h3>Kifs на Шевченко игра в футбол</h3>
            <p>Поле «Uzbekistan на Аль-Фараби»</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card-wrapper {
    background: rgba(255, 255, 255, 0.22);
    color: white;
    border-radius: 30px;

    &-info {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 3px;
        h3 {
            max-width: 250px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow-x: hidden;
        }
        p {
            font-size: 11px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
}
</style>