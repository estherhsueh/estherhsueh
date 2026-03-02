<template>
    <div class="backstage-layout">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.backstage-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: $grey-900;
}
</style>
