<template>
    <div class="work-overview">
        <h1 class="project-title">
            {{ $t(`${id}.title`) }}
        </h1>

        <div class="overview-card">
            <template v-if="$t(`${id}.description`)">
                <div class="overview-description">
                    <p>{{ $t(`${id}.description`) }}</p>
                </div>

                <div class="overview-divider" />
            </template>

            <div class="overview-details">
                <div
                    v-if="$t(`${id}.company`)"
                    class="detail-item"
                >
                    <h3 class="detail-label">
                        {{ $t('workDetail.overview.company') }}
                    </h3>
                    <p class="detail-value">
                        {{ $t(`${id}.company`) }}
                    </p>
                </div>
                <div
                    v-if="$t(`${id}.responsibilities`)"
                    class="detail-item"
                >
                    <h3 class="detail-label">
                        {{ $t('workDetail.overview.responsibilities') }}
                    </h3>
                    <p class="detail-value">
                        {{ $t(`${id}.responsibilities`) }}
                    </p>
                </div>
                <div
                    v-if="duration"
                    class="detail-item"
                >
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
@use './WorkOverview';
</style>
