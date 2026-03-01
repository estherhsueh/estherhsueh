<template>
    <img
        class="work-banner"
        :src="`/images/projects/${id}/cover.jpg`"
        alt="Work Banner Image"
    >
</template>

<script setup lang="ts">
defineProps<{
    id: string
}>();
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.work-banner {
    position: relative;
    object-fit: cover;
    width: 100%;
    height: 324px;

    @include md {
        height: 600px;
    }
}
</style>
