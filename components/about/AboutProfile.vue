<template>
    <section class="about-profile">
        <img
            ref="imageEl"
            class="about-image scroll-animate-item"
            data-delay="100"
            src="/images/pages/about/profile_selfie.png"
            alt="profile"
        >

        <div class="about-content">
            <h1
                ref="nameEl"
                class="about-name scroll-animate-item"
                data-delay="200"
            >
                {{ $t('about.about.name') }}
            </h1>

            <p
                ref="descEl"
                class="about-description scroll-animate-item"
                data-delay="300"
            >
                <span class="text">{{ $t('about.about.description_01') }}</span>
                <span class="text text-white">{{ $t('about.about.description_02') }}</span>
                <span class="text">{{ $t('about.about.description_03') }}</span>
                <span class="text text-white">{{ $t('about.about.description_04') }}</span>
                <span class="text">{{ $t('about.about.description_05') }}</span>
            </p>

            <div
                ref="buttonsEl"
                class="about-button-container scroll-animate-item"
                data-delay="400"
            >
                <button
                    class="copy-email-button"
                    @click="copyEmail"
                >
                    {{ $t('about.about.copyEmail') }}

                    <Icon
                        class="copy-email-icon"
                        name="custom:copy"
                    />
                </button>

                <a
                    href="https://www.behance.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="behance-button"
                    aria-label="Behance"
                >
                    <Icon
                        name="custom:behance"
                        class="behance-icon"
                    />
                </a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const { observeElements } = useScrollAnimation();

const imageEl = ref<HTMLElement>();
const nameEl = ref<HTMLElement>();
const descEl = ref<HTMLElement>();
const buttonsEl = ref<HTMLElement>();

onMounted(() => {
    const elements = [imageEl.value, nameEl.value, descEl.value, buttonsEl.value].filter(Boolean) as HTMLElement[];
    observeElements(elements);

    elements.forEach((element) => {
        if (element) {
            const delay = element.getAttribute('data-delay') || '0';
            element.style.transitionDelay = `${parseInt(delay)}ms`;
        }
    });
});

const copyEmail = () => {
    // TODO: 實作複製 email 功能
};
</script>

<style lang="scss" scoped>
@use './AboutProfile';

.scroll-animate-item {
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    transform: translateX(20px);
    opacity: 0;

    &.is-visible {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
