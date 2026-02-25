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
                {{ $t('home.profile.description') }}
            </p>
        </div>

        <img
            class="profile-image"
            src="/images/pages/home/home_profile_selfie.png"
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
