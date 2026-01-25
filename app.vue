<template>
    <div class="app">
        <NuxtRouteAnnouncer />

        <header class="app-header">
            <nav class="nav">
                <div class="nav-links">
                    <NuxtLink
                        :to="localePath('/')"
                        class="nav-link"
                    >
                        {{ $t('nav.home') }}
                    </NuxtLink>
                    <NuxtLink
                        :to="localePath('/work')"
                        class="nav-link"
                    >
                        {{ $t('nav.work') }}
                    </NuxtLink>
                    <NuxtLink
                        :to="localePath('/about')"
                        class="nav-link"
                    >
                        {{ $t('nav.about') }}
                    </NuxtLink>
                </div>

                <LanguageSwitcher />
            </nav>
        </header>

        <main class="app-main">
            <NuxtPage />
        </main>

        <footer class="app-footer">
            <p>{{ $t('footer.copyright') }}</p>
        </footer>
    </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from '~~/components/LanguageSwitcher.vue';

const localePath = useLocalePath();
</script>

<style lang="scss" scoped>
.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.app-header {
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
    background-color: #fff;
}

.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
}

.nav-links {
    display: flex;
    gap: 30px;
    align-items: center;
}

.nav-link {
    color: #666;
    transition: color 0.2s;
    font-weight: 500;
    font-size: 16px;
}

.nav-link:hover {
    color: #000;
}

.nav-link.router-link-active {
    color: #000;
    font-weight: 600;
}

.app-main {
    flex: 1;
}

.app-footer {
    padding: 30px 20px;
    border-top: 1px solid #e0e0e0;
    background-color: #f5f5f5;
    text-align: center;
}

.app-footer p {
    color: #999;
    font-size: 14px;
}
</style>
