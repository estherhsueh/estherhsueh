<template>
    <div class="about-page">
        <div
            ref="profileSection"
            class="scroll-animate"
        >
            <AboutProfile />
        </div>

        <div
            ref="skillsSection"
            class="scroll-animate"
        >
            <AboutSkills />
        </div>

        <div
            ref="howIWorkSection"
            class="scroll-animate"
        >
            <AboutHowIWork />
        </div>

        <div
            ref="clientsSection"
            class="scroll-animate"
        >
            <AboutClients />
        </div>

        <div
            ref="experienceSection"
            class="scroll-animate"
        >
            <AboutExperience />
        </div>

        <div
            ref="learningSection"
            class="scroll-animate"
        >
            <AboutLearning />
        </div>

        <div
            ref="toolsSection"
            class="scroll-animate"
        >
            <AboutTools />
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { observeElements } = useScrollAnimation();

const profileSection = ref<HTMLElement>();
const skillsSection = ref<HTMLElement>();
const howIWorkSection = ref<HTMLElement>();
const clientsSection = ref<HTMLElement>();
const experienceSection = ref<HTMLElement>();
const learningSection = ref<HTMLElement>();
const toolsSection = ref<HTMLElement>();

onMounted(() => {
    const elements = [
        profileSection.value,
        skillsSection.value,
        howIWorkSection.value,
        clientsSection.value,
        experienceSection.value,
        learningSection.value,
        toolsSection.value
    ].filter(Boolean) as HTMLElement[];

    observeElements(elements);
});

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
    max-width: 350px;
    margin: 0 auto;

    @include md {
        max-width: 730px;
    }

    @include lg {
        max-width: 1160px;
    }
}

.scroll-animate {
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    transform: translateX(30px);
    opacity: 0;

    &.is-visible {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
