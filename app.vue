<template>
    <div class="app">
        <NuxtRouteAnnouncer />

        <HeaderContainer />

        <main class="app-main">
            <NuxtPage />

            <FooterContainer />
        </main>
    </div>
</template>

<script setup lang="ts">
// Components are auto-imported
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.app {
    min-height: 100vh;
    background-color: $grey-900;
}

.app-main {
    max-width: 1160px;
    margin: 0 auto;

    @media (width < 1440px) {
        max-width: 730px;
    }

    @media (width < 810px) {
        max-width: 350px;
    }
}
</style>
