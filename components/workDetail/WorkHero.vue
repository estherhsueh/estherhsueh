<template>
    <div class="work-hero">
        <img
            class="hero-image"
            :src="`/images/projects/${id}/cover.jpg`"
            alt="Work Hero Image"
        >
    </div>
</template>

<script setup lang="ts">
defineProps<{
    id: string
}>();
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
</style>
