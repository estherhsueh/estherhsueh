<template>
    <div class="work-page">
        <h1>{{ $t('work.title') }}</h1>
        <p>{{ $t('work.subtitle') }}</p>

        <div class="work-list">
            <NuxtLink
                v-for="item in workItems"
                :key="item.id"
                :to="localePath(`/work/${item.id}`)"
                class="work-item"
            >
                <h2>{{ $t(`work.item${item.id}.title`) }}</h2>
                <p>{{ $t(`work.item${item.id}.description`) }}</p>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
// Work 列表頁面
const { t } = useI18n();
const localePath = useLocalePath();

definePageMeta({
    title: 'Work'
});

// 設置頁面 SEO
useHead({
    title: t('work.title'),
    meta: [{ name: 'description', content: t('work.subtitle') }]
});

interface WorkItem {
    id: number
    title: string
    description: string
}

const workItems = ref<WorkItem[]>([
    { id: 1, title: 'item1', description: 'item1' },
    { id: 2, title: 'item2', description: 'item2' },
    { id: 3, title: 'item3', description: 'item3' }
]);
</script>

<style scoped>
.work-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
}

.work-page h1 {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 32px;
}

.work-page > p {
    margin-bottom: 40px;
    color: #666;
    font-size: 18px;
}

.work-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.work-item {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    color: inherit;
    transition:
        transform 0.2s,
        box-shadow 0.2s;
    text-decoration: none;
}

.work-item:hover {
    box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
    transform: translateY(-4px);
}

.work-item h2 {
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 20px;
}

.work-item p {
    color: #666;
    font-size: 14px;
}
</style>
