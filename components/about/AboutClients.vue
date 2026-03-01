<template>
    <section class="about-clients">
        <h2
            ref="titleEl"
            class="section-title scroll-animate-title"
        >
            <span class="title-01">{{ $t('about.clients.title_01') }}</span>
            <span class="title-02 font-italic-playfair">{{ $t('about.clients.title_02') }}</span>
        </h2>

        <div
            ref="logosEl"
            class="clients-logos-wrapper scroll-animate-content"
        >
            <div class="clients-logos-container">
                <div class="clients-logos">
                    <img
                        v-for="i in 9"
                        :key="i"
                        class="client-logo"
                        :src="`/images/pages/about/clients_${i.toString().padStart(2, '0')}.png`"
                        alt="Client Logo"
                    >
                </div>
                <div class="clients-logos">
                    <img
                        v-for="i in 9"
                        :key="i"
                        class="client-logo"
                        :src="`/images/pages/about/clients_${i.toString().padStart(2, '0')}.png`"
                        alt="Client Logo"
                    >
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const { observeElements } = useScrollAnimation();

const titleEl = ref<HTMLElement>();
const logosEl = ref<HTMLElement>();

onMounted(() => {
    const elements = [titleEl.value, logosEl.value].filter(Boolean) as HTMLElement[];
    observeElements(elements);

    if (logosEl.value) {
        logosEl.value.style.transitionDelay = '200ms';
    }
});
</script>

<style lang="scss" scoped>
@use './AboutClients';

.scroll-animate-title {
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    transform: translateX(30px);
    opacity: 0;

    &.is-visible {
        transform: translateX(0);
        opacity: 1;
    }
}

.scroll-animate-content {
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
    transform: translateX(30px);
    opacity: 0;

    &.is-visible {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
