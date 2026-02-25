<template>
    <section class="design-gallery">
        <div class="section-header">
            <h2 class="section-title">
                <span class="title-01">{{ $t('home.gallery.title_01') }}</span>
                <span class="title-02 font-italic-playfair">{{ $t('home.gallery.title_02') }}</span>
            </h2>

            <NuxtLink
                :to="localePath('/work')"
                class="view-all-button"
            >
                {{ $t('home.gallery.viewAll') }}

                <Icon
                    class="view-all-button-arrow"
                    name="custom:view-all-button-arrow"
                />
            </NuxtLink>
        </div>

        <div class="gallery-grid">
            <NuxtLink
                v-for="(item, index) in galleryItems"
                :key="index"
                :to="localePath(`/work/${item.id}`)"
                class="gallery-item"
            >
                <div class="gallery-image">
                    <img
                        v-if="item.image"
                        :src="item.image"
                        :alt="item.title"
                    >
                    <div
                        v-else
                        class="gallery-image-placeholder"
                        :style="{ background: item.color }"
                    />
                </div>
                <div class="gallery-info">
                    <h3 class="gallery-title">{{ item.title }}</h3>
                    <div
                        v-if="item.tags"
                        class="gallery-tags"
                    >
                        <span
                            v-for="tag in item.tags"
                            :key="tag"
                            class="gallery-tag"
                        >
                            {{ tag }}
                        </span>
                    </div>
                    <div class="gallery-action">
                        <Icon
                            class="project-arrow"
                            name="custom:project-arrow"
                        />
                    </div>
                </div>
            </NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const { getGalleryProjects } = useProjects();

// 獲取設計畫廊專案
const galleryItems = getGalleryProjects();
</script>

<style lang="scss" scoped>
@import './HomeDesignGallery';
</style>
