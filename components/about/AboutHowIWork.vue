<template>
    <section class="about-how-work">
        <div class="how-work-container">
            <h2 class="section-title">
                {{ $t('about.howIWork.title') }}
            </h2>
            <div class="work-steps">
                <div
                    v-for="step in 4"
                    :key="step"
                    class="work-step"
                >
                    <span class="step-number">{{ $t(`about.howIWork.steps.${step}.number`) }}</span>
                    <h3 class="step-title">
                        {{ $t(`about.howIWork.steps.${step}.title`) }}
                    </h3>
                    <p class="step-description">
                        {{ $t(`about.howIWork.steps.${step}.description`) }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// How I Work section component
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.about-how-work {
    padding: $spacing-xxl 0;
}

.how-work-container {
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

.work-steps {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-lg;

    @include md {
        grid-template-columns: repeat(2, 1fr);
    }

    @include lg {
        grid-template-columns: repeat(4, 1fr);
        gap: $spacing-xl;
    }
}

.work-step {
    padding: $spacing-xl $spacing-lg;
    border: 1px solid $grey-500;
    border-radius: 16px;
    background: $grey-700;
}

.step-number {
    display: block;
    margin-bottom: $spacing-md;
    background: linear-gradient(180deg, $indigo-400 0%, $indigo-800 100%);
    background-clip: text;
    font-family: $font-family-en;
    font-size: $font-size-xxxl;
    font-style: italic;
    font-weight: $font-weight-semibold;
    line-height: $line-height-48-6;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.step-title {
    margin-bottom: $spacing-sm;
    color: $grey-50;
    font-family: $font-family-zh;
    font-size: $font-size-20;
    font-weight: $font-weight-medium;
    line-height: $line-height-32;
}

.step-description {
    color: $grey-200;
    font-size: $font-size-base;
    font-family: $font-family-zh;
    line-height: $line-height-normal;
}
</style>
