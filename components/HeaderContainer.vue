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
            </div>

            <!-- <LanguageSwitcher /> -->

            <a
                class="resume-button"
                href="https://onedrive.live.com/?cid=2beaaa58541c1d3e&id=2BEAAA58541C1D3E%21s185eb3716a3640e0ab1372e5d63affce&resid=2BEAAA58541C1D3E%21s185eb3716a3640e0ab1372e5d63affce&ithint=file%2Cpdf&e=fh7xWQ&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy8yYmVhYWE1ODU0MWMxZDNlL0lRQnhzMTRZTm1yZ1FLc1RjdVhXT3ZfT0FVUjBfVWhDWHQ3b0tUQlh2ZWlPMFQwP2U9Zmg3eFdR&v=validatepermission"
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
                            <!-- <LanguageSwitcher /> -->

                            <a
                                href="https://onedrive.live.com/?cid=2beaaa58541c1d3e&id=2BEAAA58541C1D3E%21s185eb3716a3640e0ab1372e5d63affce&resid=2BEAAA58541C1D3E%21s185eb3716a3640e0ab1372e5d63affce&ithint=file%2Cpdf&e=fh7xWQ&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy8yYmVhYWE1ODU0MWMxZDNlL0lRQnhzMTRZTm1yZ1FLc1RjdVhXT3ZfT0FVUjBfVWhDWHQ3b0tUQlh2ZWlPMFQwP2U9Zmg3eFdR&v=validatepermission"
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
const localePath = useLocalePath();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;

    // 防止背景滾動
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

// 監聽視窗大小變化，在桌面版自動關閉手機選單
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
