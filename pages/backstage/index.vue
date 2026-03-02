<template>
    <div class="backstage-page">
        <div class="backstage-container">
            <h1 class="backstage-title">
                後台管理
            </h1>
            <p class="backstage-description">
                歡迎來到後台管理系統
            </p>

            <button
                class="logout-button"
                @click="handleLogout"
            >
                登出
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'backstage'
});

const router = useRouter();

onMounted(() => {
    const isAuthenticated = sessionStorage.getItem('isBackstageAuthenticated');
    if (!isAuthenticated) {
        router.replace('/backstage/login');
    }
});

const handleLogout = (): void => {
    sessionStorage.removeItem('isBackstageAuthenticated');
    router.push('/backstage/login');
};
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.backstage-page {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 40px 20px;
}

.backstage-container {
    width: 100%;
    max-width: 800px;
    padding: 48px 40px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-lg;
    background-color: $grey-800;
    text-align: center;
}

.backstage-title {
    margin: 0 0 16px;
    color: $grey-50;
    font-weight: $font-weight-semibold;
    font-size: $font-size-xxl;
}

.backstage-description {
    margin: 0 0 40px;
    color: $grey-200;
    font-size: $font-size-base;
}

.logout-button {
    padding: 10px 32px;
    border: 1px solid $grey-500;
    border-radius: $border-radius-full;
    background: transparent;
    color: $grey-200;
    cursor: pointer;
    transition: all $transition-base;
    font-size: $font-size-base;

    &:hover {
        border-color: $indigo-400;
        color: $indigo-200;
    }
}
</style>
