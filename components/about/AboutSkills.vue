<template>
    <section class="about-skills">
        <div class="skills-container">
            <h2 class="section-title">
                {{ $t('about.skills.title') }}
            </h2>
            <div class="skills-grid">
                <!-- UX 研究與定義 -->
                <div class="skill-card">
                    <div class="skill-icon" />
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
                    <div class="skill-icon" />
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
                    <div class="skill-icon" />
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
        </div>
    </section>
</template>

<script setup lang="ts">
const { tm } = useI18n();

interface TranslationItem {
    loc: {
        source?: string
    }
}

// 使用 tm() 來獲取陣列，提取 source 屬性
const uxItems = computed(() => {
    const items = tm('about.skills.ux.items') as TranslationItem[];
    if (!Array.isArray(items)) {
        return [];
    }
    return items.map((item) => item.loc.source || String(item));
});

const uiItems = computed(() => {
    const items = tm('about.skills.ui.items') as TranslationItem[];
    if (!Array.isArray(items)) {
        return [];
    }
    return items.map((item) => item.loc.source || String(item));
});

const brandItems = computed(() => {
    const items = tm('about.skills.brand.items') as TranslationItem[];
    if (!Array.isArray(items)) {
        return [];
    }

    return items.map((item) => item.loc.source || String(item));
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.about-skills {
    padding: $spacing-xxl 0;
}

.skills-container {
    max-width: $container-full;
    margin: 0 auto;
    padding: 0 $spacing-md;

    @include md {
        padding: 0 $spacing-xl;
    }

    @include lg {
        padding: 0 140px;
    }
}

.section-title {
    margin-bottom: $spacing-xxl;
    color: $grey-50;
    letter-spacing: -1.28px;
    font-weight: $font-weight-medium;
    font-size: $font-size-48;
    font-family: $font-family-en;
    line-height: $line-height-tight;

    @include lg {
        font-size: $font-size-display;
        line-height: $line-height-76-8;
    }
}

.skills-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-xl;

    @include md {
        grid-template-columns: repeat(2, 1fr);
    }

    @include lg {
        grid-template-columns: repeat(3, 1fr);
        gap: 220px;
    }
}

.skill-card {
    text-align: center;
}

.skill-icon {
    width: 120px;
    height: 120px;
    margin: 0 auto $spacing-lg;
    border-radius: $border-radius-lg;
    background: linear-gradient(135deg, $indigo-200 0%, $indigo-400 100%);
}

.skill-title {
    margin-bottom: $spacing-md;
    color: $grey-50;
    font-family: $font-family-base;
    font-size: $font-size-xl;
    font-weight: $font-weight-medium;
    line-height: $line-height-30;
}

.skill-list {
    padding: 0;
    list-style: none;
}

.skill-list li {
    margin-bottom: $spacing-sm;
    color: $grey-200;
    font-family: $font-family-zh;
    font-size: $font-size-22;
    line-height: $font-size-22;
}
</style>
