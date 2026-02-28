<template>
    <div class="work-overview">
        <h1 class="project-title">
            {{ $t(`${id}.title`) }}
        </h1>

        <div class="overview-card">
            <div class="overview-description">
                <p>{{ $t(`${id}.description`) }}</p>
            </div>
            <div class="overview-divider" />
            <div class="overview-details">
                <div class="detail-item">
                    <h3 class="detail-label">
                        {{ $t('workDetail.overview.company') }}
                    </h3>
                    <p class="detail-value">
                        {{ $t(`${id}.company`) }}
                    </p>
                </div>
                <div class="detail-item">
                    <h3 class="detail-label">
                        {{ $t('workDetail.overview.responsibilities') }}
                    </h3>
                    <p class="detail-value">
                        {{ $t(`${id}.responsibilities`) }}
                    </p>
                </div>
                <div class="detail-item">
                    <h3 class="detail-label">
                        {{ $t('workDetail.overview.duration') }}
                    </h3>
                    <p class="detail-value">
                        {{ duration }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Work 詳細頁面的 Overview 區塊
defineProps<{
    id: string
    duration: string
}>();
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.work-overview {
    margin-bottom: $spacing-xxl;
}

.project-title {
    margin-bottom: $spacing-lg;
    color: $grey-50;
    letter-spacing: -1.28px;
    font-weight: $font-weight-medium;
    font-size: $font-size-xxl;
    font-family: $font-family-base;
    line-height: $line-height-76-8;

    @include md {
        font-size: $font-size-56;
    }

    @include lg {
        font-size: $font-size-display;
    }
}

.overview-card {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
    padding: $spacing-xl;
    border: 1px solid #292a36;
    border-radius: $border-radius-lg;
    background: #16171f;

    @include lg {
        flex-direction: row;
        gap: $spacing-xl;
        padding: $spacing-xxl;
    }
}

.overview-description {
    flex: 1;

    p {
        color: $grey-200;
        letter-spacing: 0;
        font-size: $font-size-lg;
        font-family: $font-family-base;
        line-height: 32.4px;
    }
}

.overview-divider {
    width: 100%;
    height: 1px;
    background: #292a36;

    @include lg {
        width: 1px;
        height: auto;
    }
}

.overview-details {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
    min-width: 280px;

    @include md {
        min-width: 460px;
    }
}

.detail-item {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
}

.detail-label {
    color: $grey-50;
    letter-spacing: -0.36px;
    font-weight: $font-weight-medium;
    font-size: $font-size-lg;
    font-family: $font-family-en;
    line-height: 21.6px;
}

.detail-value {
    color: $grey-200;
    letter-spacing: 0;
    font-size: $font-size-base;
    font-family: $font-family-base;
    line-height: $line-height-25-6;
}
</style>
