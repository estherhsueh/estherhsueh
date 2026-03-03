<template>
    <header class="header-container">
        <div class="inner-container">
            <!-- Logo -->
            <NuxtLink
                :to="localePath('/')"
                class="logo-link"
            >
                <img
                    class="logo"
                    src="/images/header/logo.png"
                    alt="logo"
                >
            </NuxtLink>

            <div class="nav-links">
                <NuxtLink
                    :to="localePath('/')"
                    class="nav-link"
                    active-class="active"
                >
                    {{ $t('nav.home') }}
                </NuxtLink>

                <NuxtLink
                    :to="localePath('/work')"
                    class="nav-link"
                    active-class="active"
                >
                    {{ $t('nav.work') }}
                </NuxtLink>

                <NuxtLink
                    :to="localePath('/about')"
                    class="nav-link"
                    active-class="active"
                >
                    {{ $t('nav.about') }}
                </NuxtLink>

                <LanguageSwitcher v-if="showLanguageSwitcher" />
            </div>

            <a
                v-if="links?.resume"
                class="resume-button"
                :href="links.resume"
                target="_blank"
                rel="noopener noreferrer"
            >
                Resume
            </a>

            <!-- Mobile Menu Toggle -->
            <button
                class="mobile-menu-toggle"
                :class="{
                    'is-active': isMobileMenuOpen,
                }"
                aria-label="Toggle menu"
                @click="toggleMobileMenu"
            >
                <span class="hamburger-line" />
                <span class="hamburger-line" />
                <span class="hamburger-line" />
            </button>

            <!-- Mobile Navigation -->
            <Transition name="mobile-menu">
                <nav
                    v-if="isMobileMenuOpen"
                    class="nav-mobile"
                >
                    <div class="nav-mobile-content">
                        <div class="nav-links-mobile">
                            <NuxtLink
                                :to="localePath('/')"
                                class="nav-link-mobile"
                                active-class="active"
                                @click="closeMobileMenu"
                            >
                                {{ $t('nav.home') }}
                            </NuxtLink>
                            <NuxtLink
                                :to="localePath('/work')"
                                class="nav-link-mobile"
                                active-class="active"
                                @click="closeMobileMenu"
                            >
                                {{ $t('nav.work') }}
                            </NuxtLink>
                            <NuxtLink
                                :to="localePath('/about')"
                                class="nav-link-mobile"
                                active-class="active"
                                @click="closeMobileMenu"
                            >
                                {{ $t('nav.about') }}
                            </NuxtLink>
                        </div>

                        <div class="nav-actions-mobile">
                            <LanguageSwitcher v-if="showLanguageSwitcher" />

                            <a
                                v-if="links?.resume"
                                :href="links.resume"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="nav-button-mobile"
                                @click="closeMobileMenu"
                            >
                                Resume
                            </a>
                        </div>
                    </div>
                </nav>
            </Transition>
        </div>
    </header>
</template>

<script setup lang="ts">
import type { LocaleRow } from '~/types/locale';

const localePath = useLocalePath();
const isMobileMenuOpen = ref(false);

const { data: enabledLocales } = await useAsyncData(
    'enabled-locales',
    () => $fetch<LocaleRow[]>('/api/settings/locales'),
    { default: () => [] as LocaleRow[], server: true }
);

const { data: links } = await useLinks();

const showLanguageSwitcher = computed(() => (enabledLocales.value?.length ?? 0) > 1);

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;

    if (isMobileMenuOpen.value) {
        document.body.style.overflow = 'hidden';
    }
    else {
        document.body.style.overflow = '';
    }
};

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
    document.body.style.overflow = '';
};

onMounted(() => {
    const handleResize = () => {
        if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
            closeMobileMenu();
        }
    };

    window.addEventListener('resize', handleResize);

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        document.body.style.overflow = '';
    });
});
</script>

<style lang="scss" scoped>
@use './HeaderContainer';
</style>
