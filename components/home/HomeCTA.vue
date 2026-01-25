<template>
    <section class="home-cta">
        <div class="cta-container">
            <div class="cta-content">
                <h2 class="cta-title">{{ $t('home.cta.title') }}</h2>
                <p class="cta-description">
                    {{ $t('home.cta.description') }}
                </p>
                <div class="cta-actions">
                    <NuxtLink
                        :to="localePath('/work')"
                        class="cta-button cta-button-primary"
                    >
                        {{ $t('home.cta.viewWork') }}
                    </NuxtLink>
                    <NuxtLink
                        :to="localePath('/about')"
                        class="cta-button cta-button-secondary"
                    >
                        {{ $t('home.cta.aboutMe') }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.home-cta {
    position: relative;
    width: 100%;
    padding: 80px $spacing-md;
    background: linear-gradient(180deg, #010109 0%, #16171f 100%);

    @include md {
        padding: 100px $spacing-xl;
    }

    @include lg {
        padding: 120px $spacing-xl;
    }
}

.cta-container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.cta-title {
    margin-bottom: $spacing-lg;
    color: $grey-50;
    letter-spacing: -0.02em;
    font-weight: $font-weight-bold;
    font-size: $font-size-xxl;
    font-family: $font-family-en;
    line-height: 1.2;

    @include md {
        font-size: 48px;
    }

    @include lg {
        font-size: 56px;
    }
}

.cta-description {
    margin-bottom: $spacing-xl;
    color: $grey-200;
    font-weight: $font-weight-normal;
    font-size: $font-size-base;
    font-family: $font-family-base;
    line-height: 1.8;

    @include md {
        font-size: $font-size-lg;
    }
}

.cta-actions {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    align-items: center;
    justify-content: center;

    @include md {
        flex-direction: row;
        gap: $spacing-lg;
    }
}

.cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    padding: 16px 32px;
    border-radius: 12px;
    transition: all $transition-base;
    font-weight: $font-weight-semibold;
    font-size: $font-size-base;
    font-family: $font-family-en;

    @include md {
        min-width: 180px;
        padding: 18px 40px;
    }
}

.cta-button-primary {
    border: 2px solid $indigo-500;
    background: $indigo-500;
    box-shadow: 0 4px 20px rgb(112 66 210 / 40%);
    color: $grey-50;

    &:hover {
        border-color: $indigo-400;
        background: $indigo-400;
        box-shadow: 0 8px 30px rgb(112 66 210 / 60%);
        transform: translateY(-2px);
    }
}

.cta-button-secondary {
    border: 2px solid $grey-600;
    background: transparent;
    color: $grey-50;

    &:hover {
        border-color: $grey-500;
        background: $grey-700;
        transform: translateY(-2px);
    }
}
</style>
