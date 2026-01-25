<template>
    <div class="work-content">
        <div
            v-for="(section, index) in sections"
            :key="index"
            class="content-image"
        >
            <div class="content-placeholder" />
        </div>
    </div>
</template>

<script setup lang="ts">
// Work 詳細頁面的內容圖片區塊
defineProps<{
    sections: string[]
}>();
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.work-content {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;
    margin-bottom: $spacing-xxl;
}

.content-image {
    overflow: hidden;
    width: 100%;
    border-radius: $border-radius-lg;
}

.content-placeholder {
    width: 100%;
    padding-bottom: 56.25%;
    background: linear-gradient(135deg, #292a36 0%, #20212b 100%);
}
</style>
