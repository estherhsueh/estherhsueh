<template>
    <div class="home-hero">
        <div class="hero-container">
            <div class="hero-content">
                <div class="hero-status">
                    <span class="status-dot"></span>
                    <span class="status-text">{{ $t('home.hero.available') }}</span>
                </div>
                <h1 class="hero-title">
                    {{ $t('home.hero.greeting') }}
                </h1>
                <p class="hero-description">
                    {{ $t('home.hero.description') }}
                </p>
            </div>

            <div class="hero-image">
                <div class="hero-image-placeholder">
                    <!-- 這裡放置頭像或插圖 -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Hero section component
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.home-hero {
    position: relative;
    width: 100%;
    min-height: 450px;
    padding: 80px $spacing-md;
    background: #010109;

    @include md {
        padding: 90px $spacing-xl;
    }

    @include lg {
        padding: 90px 140px;
    }
}

.hero-container {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;
    align-items: center;
    max-width: $container-full;
    margin: 0 auto;

    @include md {
        flex-direction: row;
        gap: 60px;
        justify-content: space-between;
    }

    @include lg {
        gap: 80px;
    }
}

.hero-content {
    flex: 1;
    max-width: 680px;
    text-align: center;

    @include md {
        text-align: left;
    }
}

.hero-status {
    display: inline-flex;
    gap: $spacing-xs;
    align-items: center;
    margin-bottom: $spacing-lg;
}

.status-dot {
    width: 8px;
    height: 8px;
    border: 2px solid rgb(252 92 196 / 25%);
    border-radius: 50%;
    background: #fc5cc4;
}

.status-text {
    color: $grey-200;
    font-family: $font-family-en;
    font-size: $font-size-base;
    font-weight: $font-weight-normal;
    line-height: $line-height-16;
}

.hero-title {
    margin-bottom: $spacing-lg;
    color: $grey-50;
    font-family: $font-family-en;
    font-size: 40px;
    font-weight: $font-weight-medium;
    letter-spacing: 0;
    line-height: 96px;

    @include md {
        font-size: $font-size-56;
    }

    @include lg {
        font-size: $font-size-60;
    }
}

.hero-description {
    max-width: 680px;
    margin: 0 auto;
    color: $grey-200;
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-normal;
    line-height: $line-height-25-6;

    @include md {
        margin: 0;
    }
}

.hero-image {
    flex-shrink: 0;
    width: 100%;
    max-width: 290px;

    @include md {
        width: 290px;
        max-width: none;
    }
}

.hero-image-placeholder {
    width: 100%;
    padding-bottom: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #5c0f5b 0%, #e177b1 100%);
    box-shadow: 0 20px 60px rgb(112 66 210 / 30%);
}
</style>
