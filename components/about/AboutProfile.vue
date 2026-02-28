<template>
    <section class="about-profile">
        <img
            class="about-image"
            src="/images/pages/about/profile_selfie.png"
            alt="profile"
        >

        <div class="about-content">
            <h1 class="about-name">
                {{ $t('about.about.name') }}
            </h1>

            <p class="about-description">
                <span class="text">{{ $t('about.about.description_01') }}</span>
                <span class="text text-white">{{ $t('about.about.description_02') }}</span>
                <span class="text">{{ $t('about.about.description_03') }}</span>
                <span class="text text-white">{{ $t('about.about.description_04') }}</span>
                <span class="text">{{ $t('about.about.description_05') }}</span>
            </p>

            <div class="about-button-container">
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
const copyEmail = () => {
    // TODO: 實作複製 email 功能
    console.log('Copy email to clipboard');
};
</script>

<style lang="scss" scoped>
@use './AboutProfile';
</style>
