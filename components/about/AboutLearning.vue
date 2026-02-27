<template>
    <section class="about-learning">
        <h2 class="section-title">
            <span class="title-01">{{ $t('about.learning.title_01') }}</span>
            <span class="title-02 font-italic-playfair">{{ $t('about.learning.title_02') }}</span>
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
                <img
                    class="course-image"
                    :src="`/images/pages/about/learning_${(index + 1).toString().padStart(2, '0')}.png`"
                    alt="course-image"
                >

                <h3 class="course-title">
                    {{ course.title }}
                </h3>

                <div class="course-progress" />

                <p class="course-status">
                    {{ $t('about.learning.progress') }}
                </p>
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
@use './AboutLearning';
</style>
