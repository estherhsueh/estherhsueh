<template>
    <section class="about-skills">
        <h2 class="section-title">
            <span class="title-01">{{ $t('about.skills.title_01') }}</span>
            <span class="title-02 font-italic-playfair">{{ $t('about.skills.title_02') }}</span>
        </h2>
        <div class="skills-grid">
            <!-- UX 研究與定義 -->
            <div class="skill-card">
                <img
                    class="skill-icon"
                    src="/images/pages/about/skills_ux.png"
                    alt="UX"
                >
                <h3 class="skill-title">
                    {{ $t('about.skills.ux.title') }}
                </h3>
                <ul class="skill-list">
                    <li
                        v-for="(item, index) in uxItems"
                        :key="index"
                    >
                        {{ item }}
                    </li>
                </ul>
            </div>

            <!-- UI 介面與互動設計 -->
            <div class="skill-card">
                <img
                    class="skill-icon"
                    src="/images/pages/about/skills_ui.png"
                    alt="UI"
                >
                <h3 class="skill-title">
                    {{ $t('about.skills.ui.title') }}
                </h3>
                <ul class="skill-list">
                    <li
                        v-for="(item, index) in uiItems"
                        :key="index"
                    >
                        {{ item }}
                    </li>
                </ul>
            </div>

            <!-- 品牌與多媒體整合 -->
            <div class="skill-card">
                <img
                    class="skill-icon"
                    src="/images/pages/about/skills_brand.png"
                    alt="Brand"
                >
                <h3 class="skill-title">
                    {{ $t('about.skills.brand.title') }}
                </h3>
                <ul class="skill-list">
                    <li
                        v-for="(item, index) in brandItems"
                        :key="index"
                    >
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const { tm, rt } = useI18n();

const uxItems = computed(() => {
    const items = tm('about.skills.ux.items') as string[];

    if (!Array.isArray(items)) {
        return [];
    }

    return items.map((item) => rt(item));
});

const uiItems = computed(() => {
    const items = tm('about.skills.ui.items') as string[];

    if (!Array.isArray(items)) {
        return [];
    }

    return items.map((item) => rt(item));
});

const brandItems = computed(() => {
    const items = tm('about.skills.brand.items') as string[];

    if (!Array.isArray(items)) {
        return [];
    }

    return items.map((item) => rt(item));
});
</script>

<style lang="scss" scoped>
@use './AboutSkills';
</style>
