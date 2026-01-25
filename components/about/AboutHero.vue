<template>
    <section class="about-hero">
        <div class="hero-container">
            <div class="hero-content">
                <div class="hero-avatar">
                    <div class="avatar-placeholder" />
                </div>
                <div class="hero-text">
                    <h1 class="hero-name">
                        {{ $t('about.hero.name') }}
                    </h1>
                    <p class="hero-description">
                        {{ $t('about.hero.description') }}
                    </p>
                    <button
                        class="copy-email-button"
                        @click="copyEmail"
                    >
                        {{ $t('about.hero.copyEmail') }}
                    </button>
                </div>
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
@use '~/assets/styles/variables' as *;
@use 'sass:color';

.about-hero {
    min-height: 600px;
    padding: $spacing-xxl 0;

    @include lg {
        padding: 100px 0;
    }
}

.hero-container {
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

.hero-content {
    display: flex;
    flex-direction: column;
    gap: $spacing-xxl;
    align-items: center;

    @include lg {
        flex-direction: row;
        gap: 60px;
    }
}

.hero-avatar {
    flex-shrink: 0;
}

.avatar-placeholder {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-text {
    flex: 1;
    max-width: 640px;
}

.hero-name {
    margin-bottom: $spacing-md;
    color: $grey-50;
    font-weight: $font-weight-semibold;
    font-style: italic;
    font-size: $font-size-48;
    font-family: $font-family-playfair;
    line-height: $line-height-normal;

    @include lg {
        font-size: $font-size-60;
        line-height: $line-height-96;
    }
}

.hero-description {
    margin-bottom: $spacing-xl;
    color: $grey-200;
    white-space: pre-line;
    font-size: $font-size-base;
    font-family: $font-family-zh;
    line-height: $line-height-normal;
}

.copy-email-button {
    padding: 16px 36px;
    border: none;
    border-radius: $border-radius-lg;
    background: $indigo-200;
    color: #261052;
    cursor: pointer;
    transition: all $transition-base;
    font-weight: $font-weight-normal;
    font-size: $font-size-lg;
    font-family: $font-family-zh;

    &:hover {
        background: color.adjust($indigo-200, $lightness: 5%);
        transform: translateY(-2px);
    }
}
</style>
