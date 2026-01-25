<template>
    <div class="work-detail-page">
        <NuxtLink
            :to="localePath('/work')"
            class="back-link"
        > ← {{ $t('work.detail.backToList') }} </NuxtLink>

        <div
            v-if="workDetail"
            class="work-content"
        >
            <h1>{{ $t('work.detail.title') }}</h1>
            <p class="description">
                {{ $t('work.detail.description') }}
            </p>
            <p class="date">
                {{ $t('common.loading') }}: {{ workDetail.createdAt }}
            </p>
            <div class="content">
                {{ workDetail.content }}
            </div>
        </div>

        <div
            v-else
            class="not-found"
        >
            <h2>{{ $t('common.error') }}</h2>
            <p>Work ID: {{ workId }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
// Work 詳細頁面（動態路由）
const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();

definePageMeta({
    title: 'Work Detail'
});

// 設置頁面 SEO
useHead({
    title: t('work.detail.title'),
    meta: [{ name: 'description', content: t('work.detail.description') }]
});

interface WorkDetail {
    id: number
    title: string
    description: string
    content: string
    createdAt: string
}

const workId = computed<string>(() => route.params.id as string);

// 模擬從 API 獲取作品詳細資料
const workDetail = ref<WorkDetail | null>(null);

// 模擬資料
const mockData: Record<string, WorkDetail> = {
    1: {
        id: 1,
        title: '作品 1',
        description: '這是作品 1 的描述',
        content: '這是作品 1 的詳細內容。可以在這裡展示更多關於這個作品的資訊。',
        createdAt: '2025-01-01'
    },
    2: {
        id: 2,
        title: '作品 2',
        description: '這是作品 2 的描述',
        content: '這是作品 2 的詳細內容。可以在這裡展示更多關於這個作品的資訊。',
        createdAt: '2025-01-10'
    },
    3: {
        id: 3,
        title: '作品 3',
        description: '這是作品 3 的描述',
        content: '這是作品 3 的詳細內容。可以在這裡展示更多關於這個作品的資訊。',
        createdAt: '2025-01-20'
    }
};

onMounted(() => {
    workDetail.value = mockData[workId.value] || null;
});

watch(workId, (newId) => {
    workDetail.value = mockData[newId] || null;
});
</script>

<style scoped>
.work-detail-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
}

.back-link {
    display: inline-block;
    margin-bottom: 30px;
    color: #666;
    text-decoration: none;
    font-size: 14px;
}

.back-link:hover {
    color: #000;
}

.work-content h1 {
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 36px;
}

.work-content .description {
    margin-bottom: 10px;
    color: #666;
    font-size: 18px;
}

.work-content .date {
    margin-bottom: 30px;
    color: #999;
    font-size: 14px;
}

.work-content .content {
    font-size: 16px;
    line-height: 1.8;
}

.not-found {
    padding: 60px 20px;
    text-align: center;
}

.not-found h2 {
    margin-bottom: 10px;
    color: #999;
    font-size: 24px;
}

.not-found p {
    color: #ccc;
    font-size: 14px;
}
</style>
