<template>
    <section class="about-tools">
        <div class="tools-container">
            <div class="tools-box">
                <div class="tools-header">
                    <h2 class="section-title">
                        {{ $t('about.tools.title') }}
                    </h2>
                    <p class="tools-description">
                        {{ $t('about.tools.description') }}
                    </p>
                </div>
                <div class="tools-grid">
                    <div
                        v-for="(tool, index) in tools"
                        :key="index"
                        class="tool-item"
                    >
                        <div class="tool-icon" />
                        <div class="tool-info">
                            <h3 class="tool-name">
                                {{ tool.name }}
                            </h3>
                            <p class="tool-category">
                                {{ tool.category }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
interface Tool {
    name: string
    category: string
}

const tools: Tool[] = [
    { name: 'Figma', category: '設計工具' },
    { name: 'After Effects', category: '動態影像製作' },
    { name: 'Lottie', category: '動效製作' },
    { name: 'Notion', category: '生產力工具' },
    { name: 'Proto.io', category: 'Prototype工具' },
    { name: 'LiblibAI', category: 'AI繪圖創作' },
    { name: 'Google Analytics', category: '網站分析' },
    { name: 'Slack', category: '團隊溝通' },
    { name: 'GitLab', category: '專案管理' }
];
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.about-tools {
    padding: $spacing-xxl 0 80px;
}

.tools-container {
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

.tools-box {
    padding: $spacing-xxl;
    border: 1px solid $grey-600;
    border-radius: $spacing-32;
    background: $grey-800;

    @include lg {
        padding: 80px;
    }
}

.tools-header {
    margin-bottom: $spacing-xxl;
}

.section-title {
    margin-bottom: $spacing-lg;
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

.tools-description {
    max-width: 722px;
    color: $grey-200;
    letter-spacing: 0.32px;
    font-size: $font-size-base;
    font-family: $font-family-zh;
    line-height: $line-height-normal;
}

.tools-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-md;

    @include md {
        grid-template-columns: repeat(2, 1fr);
    }

    @include lg {
        grid-template-columns: repeat(3, 1fr);
    }
}

.tool-item {
    display: flex;
    gap: $spacing-md;
    align-items: center;
    padding: $spacing-lg;
    border: 1px solid $grey-500;
    border-radius: $border-radius-lg;
    background: $grey-700;
}

.tool-icon {
    flex-shrink: 0;
    width: $spacing-56;
    height: $spacing-56;
    border-radius: $border-radius-md;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.tool-info {
    flex: 1;
}

.tool-name {
    margin-bottom: $spacing-xs;
    color: $grey-50;
    font-weight: $font-weight-medium;
    font-size: $font-size-xl;
    font-family: $font-family-en;
    line-height: $line-height-24;
}

.tool-category {
    color: $grey-300;
    font-size: $font-size-base;
    font-family: $font-family-zh;
    line-height: $line-height-16;
}
</style>
