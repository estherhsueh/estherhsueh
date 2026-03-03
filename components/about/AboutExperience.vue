<template>
    <section class="about-experience">
        <div class="experience-container">
            <h2 class="section-title">
                <span class="title-01">{{ $t('about.experience.title_01') }}</span>
                <span class="title-02 font-italic-playfair">{{ $t('about.experience.title_02') }}</span>
            </h2>

            <div class="experience-list">
                <div
                    v-for="exp in experiences"
                    :key="exp.id"
                    class="experience-item"
                >
                    <div class="experience-info">
                        <h3 class="company-name">
                            {{ exp.company[locale as 'zh-TW' | 'en-US'] || exp.company['zh-TW'] || exp.company['en-US'] }}
                        </h3>

                        <p class="job-title">
                            {{ exp.title[locale as 'zh-TW' | 'en-US'] || exp.title['zh-TW'] || exp.title['en-US'] }}
                        </p>
                    </div>

                    <div class="experience-period">
                        <span>{{ exp.start_date }}</span>
                        <span
                            v-if="exp.end_date"
                            class="period-divider"
                        />
                        <span v-if="exp.end_date">{{ exp.end_date }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ExperienceRow } from '~/types/experience';

const { locale } = useI18n();

const { data: experiences } = await useAsyncData<ExperienceRow[]>(
    'site-experiences',
    () => $fetch<ExperienceRow[]>('/api/settings/experiences'),
    { default: () => [], server: true }
);
</script>

<style lang="scss" scoped>
@use './AboutExperience';
</style>
