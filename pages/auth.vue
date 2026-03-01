<template>
    <div class="auth-page">
        <h1 class="auth-title">
            {{ $t('auth.pleaseEnterPassword') }}
        </h1>

        <form
            class="auth-form"
            @submit.prevent="handleSubmit"
        >
            <input
                id="password"
                v-model="password"
                class="auth-input"
                type="password"
                :placeholder="$t('auth.pleaseEnterPassword')"
                :disabled="isLoading"
                @input="handleInput"
            >

            <p
                v-if="errorMessage"
                class="hint"
            >
                <Icon
                    name="custom:password-error"
                    class="icon"
                />

                {{ $t('auth.errorMessage') }}
            </p>

            <button
                type="submit"
                :disabled="isLoading"
                class="submit-button"
            >
                {{ isLoading ? $t('common.loading') : $t('auth.submit') }}
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const password = ref<string>('');
const errorMessage = ref<string>('');
const isLoading = ref<boolean>(false);

const router = useRouter();
const route = useRoute();

const handleSubmit = async (): Promise<void> => {
    errorMessage.value = '';
    isLoading.value = true;

    try {
        const response = await $fetch<{ success: boolean, message: string }>('/api/auth/verify', {
            method: 'POST',
            body: {
                password: password.value
            }
        });

        if (response.success) {
            sessionStorage.setItem('isAuthenticated', 'true');

            const redirectTo = route.query.redirect as string;
            if (redirectTo) {
                await router.push(redirectTo);
            }
            else {
                await router.push('/');
            }
        }
        else {
            errorMessage.value = t('auth.login.error');
            password.value = '';
        }
    }
    catch {
        errorMessage.value = t('auth.login.error');
        password.value = '';
    }

    isLoading.value = false;
};

const handleInput = (): void => {
    if (errorMessage.value) {
        errorMessage.value = '';
    }
};
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.auth-page {
    width: 330px;
    height: 666px;
    margin: 0 auto;
    padding: 20px;

    @include md {
        width: 420px;
        height: 914px;
    }

    @include lg {
        height: 894px;
    }

    .auth-title {
        margin: 112px 0 40px;
        color: #fff;
        text-align: center;

        @include md {
            margin: 134px 0 40px;
        }
    }

    .auth-form {
        position: relative;
        width: 100%;

        .auth-input {
            width: 100%;
            height: 44px;
            padding: 10px 16px;
            border-radius: 30px;
            font-size: 16px;

            &:focus {
                outline: none;
            }
        }

        .hint {
            position: absolute;
            top: 50%;
            left: 0;
            display: flex;
            gap: 8px;
            align-items: center;
            color: #fc5cc4;
            transform: translateY(-50%);
            text-align: center;
            font-weight: 400;
            font-size: 14px;

            svg {
                width: 16px;
                height: 16px;

                /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
                :deep(path) {
                    fill: #fc5cc4;
                }
            }
        }

        .submit-button {
            width: 100%;
            height: 44px;
            margin-top: 20px;
            padding: 10px 14px;
            border: none;
            border-radius: 30px;
            background: $indigo-200;
            color: $indigo-900;
            cursor: pointer;
            transition: background-color 0.2s;
            font-weight: 500;
            font-size: 16px;

            &:hover:not(:disabled) {
                background-color: $indigo-300;
            }

            &:disabled {
                background-color: #999;
                cursor: not-allowed;
            }
        }
    }
}
</style>
