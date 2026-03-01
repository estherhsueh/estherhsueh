<template>
    <div class="app">
        <div class="bg-container">
            <div
                v-for="num in 3"
                :key="num"
                :class="`bg-${num.toString().padStart(2, '0')}`"
                :style="{
                    'background-image': `url(/images/pages/_shared/bg_${num.toString().padStart(2, '0')}.jpg)`,
                }"
            />
        </div>

        <NuxtRouteAnnouncer />

        <HeaderContainer />

        <NuxtPage />

        <FooterContainer />
    </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.app {
    position: relative;
    overflow-x: hidden;
    min-width: 390px;
    max-width: 100vw;
    min-height: 100vh;
    padding-bottom: 20px;

    @include lg {
        padding-bottom: 40px;
    }

    .bg-container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background-color: $grey-900;

        .bg-01 {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding-bottom: calc(100% / 1920 * 767);
            background-size: 100% auto;
        }

        .bg-02 {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            padding-bottom: calc(100% / 1920 * 1133);
            background-size: 100% auto;
            transform: translateY(-50%);
        }

        .bg-03 {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding-bottom: calc(100% / 1920 * 1090);
            background-size: 100% auto;
        }
    }
}
</style>
