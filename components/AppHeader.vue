<template>
    <header class="app-header">
        <div class="header-container">
            <!-- Logo -->
            <NuxtLink
                :to="localePath('/')"
                class="logo"
            >
                <div class="logo-icon">E</div>
            </NuxtLink>

            <!-- Desktop Navigation -->
            <nav class="nav-desktop">
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

                <div class="nav-actions">
                    <LanguageSwitcher />
                    <a
                        href="#resume"
                        class="nav-button"
                    >
                        Resume
                    </a>
                </div>
            </nav>

            <!-- Mobile Menu Toggle -->
            <button
                class="mobile-menu-toggle"
                :class="{ 'is-active': isMobileMenuOpen }"
                aria-label="Toggle menu"
                @click="toggleMobileMenu"
            >
                <span class="hamburger-line" />
                <span class="hamburger-line" />
                <span class="hamburger-line" />
            </button>
        </div>

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
                        <LanguageSwitcher />
                        <a
                            href="#resume"
                            class="nav-button-mobile"
                            @click="closeMobileMenu"
                        >
                            Resume
                        </a>
                    </div>
                </div>
            </nav>
        </Transition>
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
@use '~/assets/styles/variables' as *;

.app-header {
    position: sticky;  // 改為 sticky 以保持在頂部
    top: 0;
    z-index: $z-index-sticky;
    width: 100%;
    border-bottom: 1px solid rgb(255 255 255 / 20%);  // Figma: 20% opacity
    background: rgb(22 23 31 / 35%);  // Figma: #16171f with 35% opacity
    transition: all $transition-base;
    backdrop-filter: blur(10px);
}

.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: $container-full;  // Figma: 1440px
    height: 72px;
    margin: 0 auto;
    padding: 0 $spacing-md;

    @include lg {
        padding: 0 80px;  // Figma: 140px from each side for 1440px width
    }

    @include xl {
        padding: 0 140px;  // Figma exact spacing
    }
}

// ==========================================
// Logo
// ==========================================
.logo {
    z-index: 2;
    display: flex;
    align-items: center;
    transition: transform $transition-base;

    &:hover {
        transform: scale(1.05);
    }
}

.logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 43.33px;
    color: $grey-50;
    font-weight: $font-weight-bold;
    font-size: 24px;
    font-family: $font-family-en;
}

// ==========================================
// Desktop Navigation
// ==========================================
.nav-desktop {
    display: none;

    @include md {
        display: flex;
        gap: $spacing-lg;
        align-items: center;
    }
}

.nav-links {
    display: flex;
    gap: 8px;
    align-items: center;
}

.nav-link {
    padding: 14px 20px;
    border-radius: 20px;
    color: $grey-100;  // Figma: #dcdde4
    transition: all $transition-base;
    letter-spacing: 0;
    font-weight: $font-weight-medium;  // Figma: 500
    font-size: $font-size-sm;  // Figma: 14px
    font-family: $font-family-en;
    line-height: $line-height-14;  // Figma: 14px

    &:hover {
        background: rgb(255 255 255 / 5%);
        color: $grey-50;  // Figma: #f6f6f6
    }

    &.active {
        color: $grey-50;  // Figma: #ffffff (白色)
        font-weight: $font-weight-semibold;  // Figma: 600
    }
}

.nav-actions {
    display: flex;
    gap: $spacing-md;
    align-items: center;
}

.nav-button {
    padding: 14px 32px;
    border: 1px solid #a175fd;  // Figma: #a175fd 紫色
    border-radius: 12px;
    color: #a175fd;  // Figma: #a175fd 紫色
    transition: all $transition-base;
    letter-spacing: 0;
    font-weight: $font-weight-medium;  // Figma: 500
    font-size: $font-size-sm;  // Figma: 14px
    font-family: $font-family-en;
    line-height: $line-height-14;  // Figma: 14px

    &:hover {
        border-color: #a175fd;
        background: rgb(161 117 253 / 10%);
        transform: translateY(-2px);
    }
}

// ==========================================
// Mobile Menu Toggle
// ==========================================
.mobile-menu-toggle {
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 6px;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;

    @include md {
        display: none;
    }

    .hamburger-line {
        width: 100%;
        height: 2px;
        border-radius: 2px;
        background-color: $grey-50;
        transition: all $transition-base;
    }

    &.is-active {
        .hamburger-line:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }

        .hamburger-line:nth-child(2) {
            opacity: 0;
        }

        .hamburger-line:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
}

// ==========================================
// Mobile Navigation
// ==========================================
.nav-mobile {
    position: fixed;
    top: 72px;
    bottom: 0;
    overflow-y: auto;
    background: rgb(22 23 31 / 98%);
    backdrop-filter: blur(20px);
    inset-inline: 0;

    @include md {
        display: none;
    }
}

.nav-mobile-content {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;
    padding: $spacing-xl $spacing-md;
}

.nav-links-mobile {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
}

.nav-link-mobile {
    padding: $spacing-md;
    border-radius: 12px;
    color: $grey-100;
    transition: all $transition-base;
    font-weight: $font-weight-medium;
    font-size: $font-size-lg;
    font-family: $font-family-en;

    &:hover {
        background: rgb(255 255 255 / 5%);
        color: $grey-50;
    }

    &.active {
        background: rgb(255 255 255 / 8%);
        color: $grey-50;
        font-weight: $font-weight-semibold;
    }
}

.nav-actions-mobile {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    padding-top: $spacing-md;
    border-top: 1px solid rgb(255 255 255 / 10%);
}

.nav-button-mobile {
    display: block;
    padding: $spacing-md;
    border: 1px solid #a175fd;
    border-radius: 12px;
    color: #a175fd;
    transition: all $transition-base;
    text-align: center;
    font-weight: $font-weight-medium;
    font-size: $font-size-base;
    font-family: $font-family-en;

    &:hover {
        border-color: #a175fd;
        background: rgb(161 117 253 / 10%);
    }
}

// ==========================================
// Mobile Menu Transitions
// ==========================================
.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: all $transition-base;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
