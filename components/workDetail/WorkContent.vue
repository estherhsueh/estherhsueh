<template>
    <div class="work-content">
        <img
            v-for="(num, index) in detailImageCount"
            :key="index"
            class="content-image"
            :src="`/images/projects/${id}/detail_${num.toString().padStart(2, '0')}.jpg`"
            :alt="`Detail Image ${num}`"
        >
    </div>
</template>

<script setup lang="ts">
defineProps<{
    id: string
    detailImageCount: number
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
