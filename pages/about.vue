<template>
    <div class="about-page">
        <AboutProfile />
        <AboutSkills />
        <AboutHowIWork />
        <AboutClients />
        <AboutExperience />
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
    meta: [{ name: 'description', content: t('about.about.description') }]
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.about-page {
    max-width: 350px;
    margin: 0 auto;

    @include md {
        max-width: 730px;
    }

    @include lg {
        max-width: 1160px;
    }
}
</style>
