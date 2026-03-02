<template>
    <div class="work-content">
        <img
            v-for="(url, index) in detailImages"
            :key="index"
            class="content-image"
            :src="url"
            :alt="`Detail Image ${index + 1}`"
        >
    </div>
</template>

<script setup lang="ts">
defineProps<{
    detailImages: string[]
}>();
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.work-content {
    display: flex;
    flex-direction: column;
    gap: 48px;

    @include md {
        gap: 60px;
    }

    @include lg {
        gap: 80px;
    }

    .content-image {
        width: 100%;
    }
}
</style>
