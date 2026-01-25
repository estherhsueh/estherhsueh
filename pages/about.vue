<template>
    <div class="about-page">
        <AboutHero />
        <AboutSkills />
        <AboutHowIWork />
        <AboutExperience />
        <AboutClients />
        <AboutLearning />
        <AboutTools />
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
    title: 'About'
});

useHead({
    title: t('about.title'),
    meta: [{ name: 'description', content: t('about.hero.description') }]
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.about-page {
    width: 100%;
    background: $grey-900;
}
</style>
