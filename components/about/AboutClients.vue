<template>
    <section class="about-clients">
        <div class="clients-container">
            <h2 class="section-title">
                {{ $t('about.clients.title') }}
            </h2>
            <div class="clients-logos">
                <!-- 客戶標誌 -->
                <div
                    v-for="i in 9"
                    :key="i"
                    class="logo-placeholder"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// Clients section component
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.about-clients {
    padding: $spacing-xxl 0;
}

.clients-container {
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

.section-title {
    margin-bottom: $spacing-xxl;
    color: $grey-50;
    letter-spacing: -1.28px;
    font-weight: $font-weight-medium;
    font-size: $font-size-48;
    font-family: $font-family-en;
    line-height: $line-height-tight;

    @include lg {
        font-size: $font-size-display;
        line-height: $line-height-76-8;
    }
}

.clients-logos {
    position: relative;
    display: flex;
    gap: $spacing-lg;
    align-items: center;
    overflow: hidden;
}

.logo-placeholder {
    flex-shrink: 0;
    width: 160px;
    height: 48px;
    border-radius: $border-radius-md;
    background: rgb(255 255 255 / 5%);
}
</style>
