<template>
    <section class="about-experience">
        <div class="experience-container">
            <h2 class="section-title">
                <span class="title-01">{{ $t('about.experience.title_01') }}</span>
                <span class="title-02 font-italic-playfair">{{ $t('about.experience.title_02') }}</span>
            </h2>

            <div class="experience-list">
                <div
                    v-for="(exp, index) in experiences"
                    :key="index"
                    class="experience-item"
                >
                    <div class="experience-info">
                        <h3 class="company-name">
                            {{ exp.company }}
                        </h3>

                        <p class="job-title">
                            {{ exp.title }}
                        </p>
                    </div>

                    <div class="experience-period">
                        <span>{{ exp.startDate }}</span>
                        <span
                            v-if="exp.endDate"
                            class="period-divider"
                        />
                        <span v-if="exp.endDate">{{ exp.endDate }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
interface Experience {
    company: string
    title: string
    startDate: string
    endDate?: string
}

const experiences: Experience[] = [
    {
        company: 'Freelance',
        title: 'UI/UX Consultant',
        startDate: '2025.11',
        endDate: 'present'
    },
    {
        company: 'Skyline Inc.',
        title: 'Senior UI Designer',
        startDate: '2021.08',
        endDate: '2025.10'
    },
    {
        company: 'KKday酷遊天股份有限公司',
        title: 'Senior Product Designer',
        startDate: '2020.08',
        endDate: '2021.08'
    },
    {
        company: 'Skyline Inc.',
        title: 'Junior UI Designer',
        startDate: '2018.10',
        endDate: '2020.06'
    },
    {
        company: '順立智慧股份有限公司',
        title: 'Digital Designer',
        startDate: '2018.01',
        endDate: '2018.10'
    },
    {
        company: 'OneDegree Hong Kong Limited',
        title: 'Senior Designer',
        startDate: '2017.01',
        endDate: '2018.01'
    },
    {
        company: '鴻海精密工業股份有限公司',
        title: 'Design Intern',
        startDate: '2016'
    }
];
</script>

<style lang="scss" scoped>
@use './AboutExperience';
</style>
