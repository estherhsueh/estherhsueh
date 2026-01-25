<template>
    <section class="about-learning">
        <div class="learning-container">
            <h2 class="section-title">
                {{ $t('about.learning.title') }}
            </h2>
            <p class="learning-description">
                {{ $t('about.learning.description') }}
            </p>
            <div class="courses-grid">
                <div
                    v-for="(course, index) in courses"
                    :key="index"
                    class="course-card"
                >
                    <div class="course-image" />
                    <h3 class="course-title">
                        {{ course.title }}
                    </h3>
                    <div class="course-progress" />
                    <p class="course-status">
                        {{ $t('about.learning.progress') }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
interface Course {
    title: string
}

const courses: Course[] = [
    {
        title: '24 天英語口說奇蹟｜破解翻譯腦，三步驟打造母語級表達力'
    },
    {
        title: '【 銷售頁設計師 】排版衝刺班 x 業界求生守則'
    },
    {
        title: '產品分析入門：UX 設計師的思考術'
    },
    {
        title: '從入門到業界實戰 - UI / UX 前端網頁設計'
    }
];
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.about-learning {
    padding: $spacing-xxl 0;
}

.learning-container {
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

.learning-description {
    max-width: 653px;
    margin-bottom: $spacing-xxl;
    color: $grey-200;
    letter-spacing: 0.32px;
    font-size: $font-size-base;
    font-family: $font-family-zh;
    line-height: $line-height-normal;
}

.courses-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-lg;

    @include md {
        grid-template-columns: repeat(2, 1fr);
    }

    @include lg {
        grid-template-columns: repeat(4, 1fr);
    }
}

.course-card {
    overflow: hidden;
    border: 1px solid $grey-500;
    border-radius: 16px;
    background: $grey-800;
}

.course-image {
    width: 100%;
    height: 166px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.course-title {
    padding: $spacing-md;
    color: $grey-50;
    letter-spacing: 0.32px;
    font-weight: $font-weight-medium;
    font-size: $font-size-base;
    font-family: $font-family-zh;
    line-height: 1.45;
}

.course-progress {
    height: 5px;
    margin: 0 $spacing-md;
    border-radius: 10px;
    background: linear-gradient(90deg, #383ad2 0%, #fc5cc4 100%);
}

.course-status {
    padding: $spacing-sm $spacing-md;
    color: $grey-300;
    font-size: $font-size-xs;
    font-family: $font-family-zh;
    line-height: 1.45;
}
</style>
