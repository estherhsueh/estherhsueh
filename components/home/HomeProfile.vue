<template>
    <div class="home-profile">
        <div class="profile-content">
            <div class="profile-status">
                <span class="status-dot" />

                <span class="status-text">{{ $t('home.profile.available') }}</span>
            </div>

            <h1 class="profile-title">
                <span class="title-01">{{ $t('home.profile.greeting_01') }}</span>
                <span class="title-02 font-italic-playfair">{{ $t('home.profile.greeting_02') }}</span>
                <span class="title-03">{{ $t('home.profile.greeting_03') }}</span>
            </h1>

            <p class="profile-description">
                <span class="text">{{ $t('home.description_01') }}</span>
                <span class="text text-white">{{ $t('home.description_02') }}</span>
                <span class="text">{{ $t('home.description_03') }}</span>
            </p>
        </div>

        <img
            class="profile-image"
            src="/images/pages/home/profile_selfie.png"
            alt="profile"
        >
    </div>
</template>

<script setup lang="ts">
// Hero section component
</script>

<style lang="scss" scoped>
@use './HomeProfile';
</style>
