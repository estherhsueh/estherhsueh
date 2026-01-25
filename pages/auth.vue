<template>
    <div class="auth-page">
        <div class="auth-container">
            <h1>{{ $t('auth.title') }}</h1>
            <p class="subtitle">
                {{ $t('auth.subtitle') }}
            </p>

            <form
                class="auth-form"
                @submit.prevent="handleSubmit"
            >
                <div class="form-group">
                    <label for="password">{{ $t('auth.login.password') }}</label>
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        :placeholder="$t('auth.login.password')"
                        :disabled="isLoading"
                        @input="handleInput"
                    >
                </div>

                <p
                    v-if="errorMessage"
                    class="error-message"
                >
                    {{ errorMessage }}
                </p>

                <button
                    type="submit"
                    :disabled="!password || isLoading"
                    class="submit-button"
                >
                    {{ isLoading ? $t('common.loading') : $t('common.confirm') }}
                </button>
            </form>

            <p class="hint">
                {{ $t('common.loading') }}: "admin123"
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
    title: 'Authentication'
});

// 設置頁面 SEO
useHead({
    title: t('auth.title'),
    meta: [{ name: 'description', content: t('auth.subtitle') }]
});

const password = ref<string>('');
const errorMessage = ref<string>('');
const isLoading = ref<boolean>(false);

const router = useRouter();

// 正確的密碼（實際專案中應該在後端驗證）
const CORRECT_PASSWORD = 'admin123';

async function handleSubmit (): Promise<void> {
    errorMessage.value = '';
    isLoading.value = true;

    // 模擬 API 請求延遲
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (password.value === CORRECT_PASSWORD) {
        // 密碼正確，儲存認證狀態
        localStorage.setItem('isAuthenticated', 'true');

        // 導向首頁
        await router.push('/');
    }
    else {
        // 密碼錯誤
        errorMessage.value = t('auth.login.error');
        password.value = '';
    }

    isLoading.value = false;
}

function handleInput (): void {
    if (errorMessage.value) {
        errorMessage.value = '';
    }
}
</script>

<style scoped>
.auth-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #f5f5f5;
}

.auth-container {
    width: 100%;
    max-width: 400px;
    padding: 40px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 12px rgb(0 0 0 / 8%);
}

.auth-container h1 {
    margin-bottom: 10px;
    text-align: center;
    font-weight: bold;
    font-size: 28px;
}

.auth-container .subtitle {
    margin-bottom: 30px;
    color: #666;
    text-align: center;
    font-size: 14px;
}

.auth-form {
    width: 100%;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
    font-size: 14px;
}

.form-group input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: border-color 0.2s;
    font-size: 16px;
}

.form-group input:focus {
    border-color: #000;
    outline: none;
}

.form-group input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
}

.error-message {
    margin-bottom: 15px;
    color: #f44336;
    text-align: center;
    font-size: 14px;
}

.submit-button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 4px;
    background-color: #000;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s;
    font-weight: 500;
    font-size: 16px;
}

.submit-button:hover:not(:disabled) {
    background-color: #333;
}

.submit-button:disabled {
    background-color: #999;
    cursor: not-allowed;
}

.hint {
    margin-top: 20px;
    color: #999;
    text-align: center;
    font-size: 12px;
}
</style>
