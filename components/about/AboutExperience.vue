<template>
    <section class="about-experience">
        <div class="experience-container">
            <div class="experience-box">
                <h2 class="section-title">
                    {{ $t('about.experience.title') }}
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
@use '~/assets/styles/variables' as *;

.about-experience {
    padding: $spacing-xxl 0;
}

.experience-container {
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

.experience-box {
    padding: $spacing-xxl;
    border: 1px solid $grey-600;
    border-radius: $spacing-32;
    background: $grey-800;

    @include lg {
        padding: 80px;
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

.experience-list {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
}

.experience-item {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    padding: $spacing-lg;
    border: 1px solid $grey-500;
    border-radius: $border-radius-lg;
    background: $grey-700;

    @include md {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
}

.company-name {
    margin-bottom: $spacing-xs;
    color: #f2f2f0;
    font-family: $font-family-base;
    font-size: $font-size-xl;
    font-weight: $font-weight-medium;
    line-height: $line-height-24;
}

.job-title {
    color: $grey-200;
    font-family: $font-family-en;
    font-size: $font-size-lg;
    line-height: $line-height-18;
}

.experience-period {
    display: flex;
    gap: $spacing-md;
    align-items: center;
    color: $grey-200;
    font-weight: $font-weight-medium;
    font-size: $font-size-lg;
    font-family: $font-family-en;
}

.period-divider {
    width: $spacing-24;
    height: 1px;
    background: $grey-200;
}
</style>
