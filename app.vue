<template>
    <div class="app">
        <NuxtRouteAnnouncer />

        <HeaderContainer />

        <NuxtPage />

        <FooterContainer />
    </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.app {
    min-height: 100vh;
    background-color: $grey-900;
}

.app-main {
    // TODO: Add main container styles here
}
</style>
