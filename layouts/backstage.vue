<template>
    <div class="backstage-layout">
        <nav class="backstage-nav">
            <span class="nav-brand">後台管理</span>

            <div class="nav-links">
                <NuxtLink
                    to="/backstage/settings"
                    class="nav-link"
                    active-class="nav-link-active"
                >
                    基本管理
                </NuxtLink>

                <NuxtLink
                    to="/backstage/projects"
                    class="nav-link"
                    active-class="nav-link-active"
                >
                    專案管理
                </NuxtLink>
            </div>

            <a
                href="/"
                target="_blank"
                class="nav-frontend"
            >
                前台首頁
            </a>

            <button
                class="nav-logout"
                @click="logout"
            >
                登出
            </button>
        </nav>

        <main class="backstage-main">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
const { logout } = useBackstageAuth();

useHead({
    title: '後台管理 - 基本管理'
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.backstage-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: $grey-900;
}

.backstage-nav {
    display: flex;
    gap: 24px;
    align-items: center;
    height: 56px;
    padding: 0 32px;
    border-bottom: 1px solid $grey-700;
    background-color: $grey-800;
}

.nav-brand {
    margin-right: 8px;
    color: $grey-50;
    white-space: nowrap;
    font-weight: $font-weight-semibold;
    font-size: $font-size-base;
}

.nav-links {
    display: flex;
    flex: 1;
    gap: 4px;
    align-items: center;
}

.nav-link {
    padding: 6px 14px;
    border-radius: $border-radius-md;
    color: $grey-300;
    cursor: pointer;
    transition: all $transition-base;
    text-decoration: none;
    font-size: $font-size-sm;

    &:hover {
        background-color: $grey-700;
        color: $grey-50;
    }

    &.nav-link-active {
        background-color: $grey-700;
        color: $grey-50;
        font-weight: $font-weight-medium;
    }
}

.nav-frontend {
    padding: 6px 16px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-md;
    background: transparent;
    color: $grey-300;
    cursor: pointer;
    transition: all $transition-base;
    white-space: nowrap;
    text-decoration: none;
    font-size: $font-size-sm;

    &:hover {
        border-color: $indigo-400;
        color: $indigo-200;
    }
}

.nav-logout {
    padding: 6px 16px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-md;
    background: transparent;
    color: $grey-300;
    cursor: pointer;
    transition: all $transition-base;
    white-space: nowrap;
    font-size: $font-size-sm;

    &:hover {
        border-color: $grey-400;
        color: $grey-100;
    }
}

.backstage-main {
    flex: 1;
    overflow-y: auto;
}
</style>
