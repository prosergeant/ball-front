<template>
    <div class="card-wrapper">
        <div class="card-wrapper-img">
            <img src="https://www.investopedia.com/thmb/T2DdeU_VWQIq2kX-fqCZa8qTUFU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Sample-Final-blue-6d294ab8024a4cdca8050cc58ab20c42.jpg">
        </div>
        <div class="card-wrapper-info">
            <h3>kifs asdasd asasddas saasd</h3>
            <p>pole takoe to</p>
            <span>7 сентября, 19:00</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card-wrapper {
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 12px;
    gap: 10px;

    background: white;

    &-img {
        height: 100px;
        border-radius: 10px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }

    &-info {
        display: flex;
        flex-direction: column;
        gap: 10px;
        h3 {
            font-weight: 600;
            font-size: 14px;
        }

        p {
            font-size: 10px;
        }

        span {
            font-weight: 600;
            font-size: 16px;
            color: cornflowerblue;
        }
    }
}
</style>