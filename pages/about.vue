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

const title = t('about.title');
const description = `${t('about.about.description_01')} ${t('about.about.description_02')} ${t('about.about.description_03')} ${t('about.about.description_04')} ${t('about.about.description_05')}`;
useHead({
    title,
    meta: [
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description }
    ]
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.about-page {
    overflow-x: hidden;
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
