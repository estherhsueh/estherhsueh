<template>
    <section class="about-how-work">
        <h2 class="section-title">
            <span class="title-01">{{ $t('about.howIWork.title_01') }}</span>
            <span class="title-02 font-italic-playfair">{{ $t('about.howIWork.title_02') }}</span>
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
    </section>
</template>

<style lang="scss" scoped>
@use './AboutHowIWork'
</style>
