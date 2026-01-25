<template>
    <div class="work-hero">
        <div class="hero-image">
            <div class="image-placeholder" />
        </div>
    </div>
</template>

<script setup lang="ts">
// Work 詳細頁面的 Hero 區塊
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.work-hero {
    position: relative;
    width: 100%;
    height: 600px;
    background: linear-gradient(180deg, rgb(1 1 9 / 0%) 0%, $grey-900 100%);

    @include md {
        height: 600px;
    }
}

.hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.image-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #292a36 0%, #20212b 100%);
}
</style>
