<template>
    <section class="about-tools">
        <div class="tools-container">
            <h2 class="section-title">
                <span class="title-01">{{ $t('about.tools.title_01') }}</span>
                <span class="title-02 font-italic-playfair">{{ $t('about.tools.title_02') }}</span>
            </h2>
            <p class="tools-description">
                {{ $t('about.tools.description') }}
            </p>
            <div class="tools-grid">
                <div
                    v-for="(tool, index) in tools"
                    :key="index"
                    class="tool-item"
                >
                    <img
                        class="tool-icon"
                        :src="`/images/pages/about/${tool.image}`"
                        :alt="tool.name"
                    >

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
    </section>
</template>

<script setup lang="ts">
interface Tool {
    image: string
    name: string
    category: string
}

const tools: Tool[] = [
    { image: 'tools_figma.png', name: 'Figma', category: '設計工具' },
    { image: 'tools_after-effects.png', name: 'After Effects', category: '動態影像製作' },
    { image: 'tools_lottie.png', name: 'Lottie', category: '動效製作' },
    { image: 'tools_notion.png', name: 'Notion', category: '生產力工具' },
    { image: 'tools_proto-io.png', name: 'Proto.io', category: 'Prototype工具' },
    { image: 'tools_liblibai.png', name: 'LiblibAI', category: 'AI繪圖創作' },
    { image: 'tools_google-analytics.png', name: 'Google Analytics', category: '網站分析' },
    { image: 'tools_slack.png', name: 'Slack', category: '團隊溝通' },
    { image: 'tools_gitlab.png', name: 'GitLab', category: '專案管理' }
];
</script>

<style lang="scss" scoped>
@use './AboutTools';
</style>
