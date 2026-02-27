<template>
    <section class="about-clients">
        <h2 class="section-title">
            <span class="title-01">{{ $t('about.clients.title_01') }}</span>
            <span class="title-02 font-italic-playfair">{{ $t('about.clients.title_02') }}</span>
        </h2>

        <div class="clients-logos-wrapper">
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

<style lang="scss" scoped>
@use './AboutClients';
</style>
