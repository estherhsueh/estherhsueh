<template>
    <div class="about-page">
        <h1>{{ $t('about.title') }}</h1>
        <p class="subtitle">
            {{ $t('about.subtitle') }}
        </p>

        <div class="content-section">
            <h2>{{ $t('about.description') }}</h2>
            <p>{{ $t('about.description') }}</p>
        </div>

        <div class="content-section">
            <h2>{{ $t('about.skills') }}</h2>
            <ul class="skills-list">
                <li>Vue.js / Nuxt.js</li>
                <li>TypeScript</li>
                <li>SCSS</li>
                <li>Node.js</li>
            </ul>
        </div>

        <div class="content-section">
            <h2>{{ $t('about.experience') }}</h2>
            <p>Frontend Developer with experience in modern web technologies.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
// About 頁面
const { t } = useI18n();

definePageMeta({
    title: 'About'
});

// 設置頁面 SEO
useHead({
    title: t('about.title'),
    meta: [{ name: 'description', content: t('about.description') }]
});
</script>

<style scoped>
.about-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
}

.about-page h1 {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 36px;
}

.about-page .subtitle {
    margin-bottom: 40px;
    color: #666;
    font-size: 18px;
}

.content-section {
    margin-bottom: 40px;
}

.content-section h2 {
    margin-bottom: 15px;
    font-weight: 600;
    font-size: 24px;
}

.content-section p {
    color: #333;
    font-size: 16px;
    line-height: 1.8;
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 0;
    list-style: none;
}

.skills-list li {
    padding: 8px 16px;
    border-radius: 20px;
    background-color: #f0f0f0;
    font-weight: 500;
    font-size: 14px;
}
</style>
