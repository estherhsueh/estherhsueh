<template>
    <div class="login-page">
        <div class="login-card">
            <h1 class="login-title">
                後台管理
            </h1>

            <form
                class="login-form"
                @submit.prevent="handleSubmit"
            >
                <div class="field">
                    <label
                        class="field-label"
                        for="account"
                    >帳號</label>
                    <input
                        id="account"
                        v-model="account"
                        class="field-input"
                        type="text"
                        placeholder="請輸入帳號"
                        autocomplete="username"
                        :disabled="isLoading"
                        @input="clearError"
                    >
                </div>

                <div class="field">
                    <label
                        class="field-label"
                        for="password"
                    >密碼</label>
                    <input
                        id="password"
                        v-model="password"
                        class="field-input"
                        type="password"
                        placeholder="請輸入密碼"
                        autocomplete="current-password"
                        :disabled="isLoading"
                        @input="clearError"
                    >
                </div>

                <p
                    v-if="errorMessage"
                    class="error-hint"
                >
                    {{ errorMessage }}
                </p>

                <button
                    type="submit"
                    class="submit-button"
                    :disabled="isLoading || !account || !password"
                >
                    {{ isLoading ? '登入中...' : '登入' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'backstage'
});

const account = ref<string>('');
const password = ref<string>('');
const errorMessage = ref<string>('');
const isLoading = ref<boolean>(false);

const router = useRouter();

const handleSubmit = async (): Promise<void> => {
    errorMessage.value = '';
    isLoading.value = true;

    try {
        const response = await $fetch<{ success: boolean; message: string }>('/api/backstage/login', {
            method: 'POST',
            body: {
                account: account.value,
                password: password.value
            }
        });

        if (response.success) {
            sessionStorage.setItem('isBackstageAuthenticated', 'true');
            await router.push('/backstage');
        }
        else {
            errorMessage.value = '帳號或密碼錯誤，請重新輸入';
            password.value = '';
        }
    }
    catch {
        errorMessage.value = '登入失敗，請稍後再試';
        password.value = '';
    }

    isLoading.value = false;
};

const clearError = (): void => {
    if (errorMessage.value) {
        errorMessage.value = '';
    }
};
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.login-page {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px;
}

.login-card {
    width: 100%;
    max-width: 400px;
    padding: 40px 32px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-lg;
    background-color: $grey-800;

    @include md {
        padding: 48px 40px;
    }
}

.login-title {
    margin: 0 0 32px;
    color: $grey-50;
    text-align: center;
    letter-spacing: 0.05em;
    font-weight: $font-weight-semibold;
    font-size: $font-size-xxl;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .field-label {
        color: $grey-100;
        font-weight: $font-weight-medium;
        font-size: $font-size-sm;
    }

    .field-input {
        width: 100%;
        height: 44px;
        padding: 10px 16px;
        border: 1px solid $grey-500;
        border-radius: $border-radius-full;
        background-color: $grey-700;
        color: $grey-50;
        transition: border-color $transition-base;
        font-size: $font-size-base;

        &::placeholder {
            color: $grey-300;
        }

        &:focus {
            border-color: $indigo-400;
            outline: none;
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }
    }
}

.error-hint {
    margin: 0;
    color: #fc5cc4;
    text-align: center;
    font-size: $font-size-sm;
}

.submit-button {
    width: 100%;
    height: 44px;
    margin-top: 4px;
    padding: 10px 14px;
    border: none;
    border-radius: $border-radius-full;
    background: $indigo-200;
    color: $indigo-900;
    cursor: pointer;
    transition: background-color $transition-base;
    font-weight: $font-weight-medium;
    font-size: $font-size-base;

    &:hover:not(:disabled) {
        background-color: $indigo-300;
    }

    &:disabled {
        background-color: $grey-500;
        color: $grey-300;
        cursor: not-allowed;
    }
}
</style>
