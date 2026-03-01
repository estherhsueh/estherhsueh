<template>
    <div class="home-profile">
        <div class="profile-content">
            <div
                ref="statusEl"
                class="profile-status scroll-animate-item"
                data-delay="100"
            >
                <span class="status-dot" />

                <span class="status-text">{{ $t('home.profile.available') }}</span>
            </div>

            <h1 class="profile-title">
                <span
                    ref="title1El"
                    class="title-01 scroll-animate-item"
                    data-delay="200"
                >{{ $t('home.profile.greeting_01') }}</span>
                <span
                    ref="title2El"
                    class="title-02 font-italic-playfair scroll-animate-item"
                    data-delay="300"
                >{{ $t('home.profile.greeting_02') }}</span>
                <span
                    ref="title3El"
                    class="title-03 scroll-animate-item"
                    data-delay="400"
                >{{ $t('home.profile.greeting_03') }}</span>
            </h1>

            <p
                ref="descEl"
                class="profile-description scroll-animate-item"
                data-delay="500"
            >
                <span class="text">{{ $t('home.description_01') }}</span>
                <span class="text text-white">{{ $t('home.description_02') }}</span>
                <span class="text">{{ $t('home.description_03') }}</span>
            </p>
        </div>

        <img
            ref="imageEl"
            class="profile-image scroll-animate-item"
            data-delay="600"
            src="/images/pages/home/profile_selfie.png"
            alt="profile"
        >
    </div>
</template>

<script setup lang="ts">
const { observeElements } = useScrollAnimation();

const statusEl = ref<HTMLElement>();
const title1El = ref<HTMLElement>();
const title2El = ref<HTMLElement>();
const title3El = ref<HTMLElement>();
const descEl = ref<HTMLElement>();
const imageEl = ref<HTMLElement>();

onMounted(() => {
    const elements = [
        statusEl.value,
        title1El.value,
        title2El.value,
        title3El.value,
        descEl.value,
        imageEl.value
    ].filter(Boolean) as HTMLElement[];

    observeElements(elements);

    elements.forEach((element) => {
        if (element) {
            const delay = element.getAttribute('data-delay') || '0';
            element.style.transitionDelay = `${parseInt(delay)}ms`;
        }
    });
});
</script>

<style lang="scss" scoped>
@use './HomeProfile';

.scroll-animate-item {
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    transform: translateX(20px);
    opacity: 0;

    &.is-visible {
        transform: translateX(0);
        opacity: 1;
    }
}

.profile-title {
    span {
        display: inline-block;
    }
}
</style>
