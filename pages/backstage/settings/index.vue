<template>
    <div class="settings-page">
        <div class="page-header">
            <h1 class="page-title">
                基本管理
            </h1>
        </div>

        <div class="settings-grid">
            <!-- 語系管理卡片 -->
            <div class="settings-card">
                <div class="card-header">
                    <h2 class="card-title">
                        語系管理
                    </h2>
                    <p class="card-description">
                        控制前台可顯示的語系，停用語系後前台將不提供該語系切換。啟用語系數量為 1 時，前台不顯示語系切換器。
                    </p>
                </div>

                <div
                    v-if="isLocalesLoading"
                    class="card-status"
                >
                    載入中...
                </div>

                <div
                    v-else-if="localesError"
                    class="card-status card-status-error"
                >
                    {{ localesError }}
                </div>

                <div
                    v-else
                    class="locale-list"
                >
                    <div
                        v-for="locale in locales"
                        :key="locale.code"
                        class="locale-item"
                    >
                        <div class="locale-info">
                            <span class="locale-name">{{ locale.name }}</span>
                            <span class="locale-code">{{ locale.code }}</span>
                        </div>

                        <div class="locale-actions">
                            <span
                                class="locale-badge"
                                :class="locale.is_enabled ? 'locale-badge-enabled' : 'locale-badge-disabled'"
                            >
                                {{ locale.is_enabled ? '啟用中' : '已停用' }}
                            </span>

                            <button
                                class="toggle-btn"
                                :class="locale.is_enabled ? 'toggle-btn-disable' : 'toggle-btn-enable'"
                                :disabled="savingLocaleCode === locale.code || (locale.is_enabled && enabledLocaleCount <= 1)"
                                :title="locale.is_enabled && enabledLocaleCount <= 1 ? '至少需保留一個啟用語系' : ''"
                                @click="toggleLocale(locale)"
                            >
                                <template v-if="savingLocaleCode === locale.code">
                                    處理中...
                                </template>
                                <template v-else>
                                    {{ locale.is_enabled ? '停用' : '啟用' }}
                                </template>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 連結管理卡片 -->
            <div class="settings-card">
                <div class="card-header">
                    <h2 class="card-title">
                        連結管理
                    </h2>
                    <p class="card-description">
                        管理前台各處顯示的連結。留空時，對應按鈕或連結將不顯示。
                    </p>
                </div>

                <div
                    v-if="isLinksLoading"
                    class="card-status"
                >
                    載入中...
                </div>

                <div
                    v-else-if="linksError"
                    class="card-status card-status-error"
                >
                    {{ linksError }}
                </div>

                <div
                    v-else
                    class="link-list"
                >
                    <div
                        v-for="link in links"
                        :key="link.key"
                        class="link-item"
                    >
                        <div class="link-label-row">
                            <span class="link-label">{{ link.label }}</span>
                            <span class="link-key">{{ link.key }}</span>
                        </div>

                        <div class="link-input-row">
                            <input
                                v-model="linkValues[link.key]"
                                class="link-input"
                                :placeholder="link.key === 'mail' ? 'email@example.com' : 'https://...'"
                                type="text"
                            >

                            <button
                                class="save-btn"
                                :class="saveLinkStatus[link.key] === 'saved' ? 'save-btn-saved' : 'save-btn-default'"
                                :disabled="savingLinkKey === link.key"
                                @click="saveLink(link.key)"
                            >
                                <template v-if="savingLinkKey === link.key">
                                    儲存中...
                                </template>
                                <template v-else-if="saveLinkStatus[link.key] === 'saved'">
                                    ✓ 已儲存
                                </template>
                                <template v-else-if="saveLinkStatus[link.key] === 'error'">
                                    儲存失敗
                                </template>
                                <template v-else>
                                    儲存
                                </template>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LocaleRow } from '~/types/locale';
import type { LinkRow } from '~/types/link';

definePageMeta({
    layout: 'backstage'
});

// ── 語系管理 ──────────────────────────────────────────────
const locales = ref<LocaleRow[]>([]);
const isLocalesLoading = ref(true);
const localesError = ref('');
const savingLocaleCode = ref('');

const enabledLocaleCount = computed(() => locales.value.filter((l) => l.is_enabled).length);

const fetchLocales = async () => {
    isLocalesLoading.value = true;
    localesError.value = '';
    try {
        locales.value = await $fetch<LocaleRow[]>('/api/backstage/settings/locales');
    }
    catch (err: unknown) {
        const e = err as { data?: { statusMessage?: string }, message?: string };
        localesError.value = e?.data?.statusMessage ?? e?.message ?? '載入失敗';
    }
    finally {
        isLocalesLoading.value = false;
    }
};

const toggleLocale = async (locale: LocaleRow) => {
    if (savingLocaleCode.value) {
        return;
    }
    savingLocaleCode.value = locale.code;
    try {
        const updated = await $fetch<LocaleRow>(`/api/backstage/settings/locales/${locale.code}`, {
            method: 'PUT',
            body: { is_enabled: !locale.is_enabled }
        });
        const index = locales.value.findIndex((l) => l.code === locale.code);
        if (index !== -1) {
            locales.value[index] = updated;
        }
    }
    catch (err: unknown) {
        const e = err as { data?: { statusMessage?: string }, message?: string };
        console.error(e?.data?.statusMessage ?? e?.message ?? '操作失敗');
    }
    finally {
        savingLocaleCode.value = '';
    }
};

// ── 連結管理 ──────────────────────────────────────────────
const links = ref<LinkRow[]>([]);
const isLinksLoading = ref(true);
const linksError = ref('');
const savingLinkKey = ref('');
const linkValues = reactive<Record<string, string>>({});
const saveLinkStatus = reactive<Record<string, 'idle' | 'saved' | 'error'>>({});

const fetchLinks = async () => {
    isLinksLoading.value = true;
    linksError.value = '';
    try {
        const data = await $fetch<LinkRow[]>('/api/backstage/settings/links');
        links.value = data;
        data.forEach((link) => {
            linkValues[link.key] = link.value;
            saveLinkStatus[link.key] = 'idle';
        });
    }
    catch (err: unknown) {
        const e = err as { data?: { statusMessage?: string }, message?: string };
        linksError.value = e?.data?.statusMessage ?? e?.message ?? '載入失敗';
    }
    finally {
        isLinksLoading.value = false;
    }
};

const saveLink = async (key: string) => {
    if (savingLinkKey.value) {
        return;
    }
    savingLinkKey.value = key;
    saveLinkStatus[key] = 'idle';
    try {
        const updated = await $fetch<LinkRow>(`/api/backstage/settings/links/${key}`, {
            method: 'PUT',
            body: { value: linkValues[key] ?? '' }
        });
        const index = links.value.findIndex((l) => l.key === key);
        if (index !== -1) {
            links.value[index] = updated;
        }
        saveLinkStatus[key] = 'saved';
        setTimeout(() => {
            saveLinkStatus[key] = 'idle';
        }, 2500);
    }
    catch (err: unknown) {
        saveLinkStatus[key] = 'error';
        const e = err as { data?: { statusMessage?: string }, message?: string };
        console.error(e?.data?.statusMessage ?? e?.message ?? '儲存失敗');
    }
    finally {
        savingLinkKey.value = '';
    }
};

onMounted(() => {
    fetchLocales();
    fetchLinks();
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.settings-page {
    padding: 32px;
}

.page-header {
    margin-bottom: 32px;
}

.page-title {
    color: $grey-50;
    font-weight: $font-weight-semibold;
    font-size: 22px;
}

.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 24px;
    align-items: start;
}

.settings-card {
    overflow: hidden;
    border: 1px solid $grey-700;
    border-radius: $border-radius-lg;
    background-color: $grey-800;
}

.card-header {
    padding: 20px 24px 16px;
    border-bottom: 1px solid $grey-700;
}

.card-title {
    margin-bottom: 6px;
    color: $grey-50;
    font-weight: $font-weight-semibold;
    font-size: $font-size-base;
}

.card-description {
    color: $grey-400;
    font-size: $font-size-sm;
    line-height: 1.5;
}

.card-status {
    padding: 24px;
    color: $grey-400;
    font-size: $font-size-sm;
}

.card-status-error {
    color: #f87171;
}

// ── 語系管理 ──────────────────────────
.locale-list {
    display: flex;
    flex-direction: column;
}

.locale-item {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;

    &:not(:last-child) {
        border-bottom: 1px solid $grey-700;
    }
}

.locale-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.locale-name {
    color: $grey-100;
    font-weight: $font-weight-medium;
    font-size: $font-size-sm;
}

.locale-code {
    color: $grey-500;
    font-size: 12px;
    font-family: monospace;
}

.locale-actions {
    display: flex;
    flex-shrink: 0;
    gap: 12px;
    align-items: center;
}

.locale-badge {
    padding: 2px 10px;
    border-radius: 100px;
    font-weight: $font-weight-medium;
    font-size: 12px;
}

.locale-badge-enabled {
    background-color: rgb(52 211 153 / 15%);
    color: #34d399;
}

.locale-badge-disabled {
    background-color: rgb(107 114 128 / 15%);
    color: $grey-500;
}

.toggle-btn {
    padding: 5px 14px;
    border: 1px solid transparent;
    border-radius: $border-radius-md;
    cursor: pointer;
    transition: all $transition-base;
    white-space: nowrap;
    font-size: $font-size-sm;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.4;
    }
}

.toggle-btn-disable {
    border-color: $grey-600;
    background: transparent;
    color: $grey-300;

    &:hover:not(:disabled) {
        border-color: #f87171;
        color: #f87171;
    }
}

.toggle-btn-enable {
    border-color: $indigo-400;
    background: transparent;
    color: $indigo-300;

    &:hover:not(:disabled) {
        background-color: $indigo-600;
        color: $grey-50;
    }
}

// ── 連結管理 ──────────────────────────
.link-list {
    display: flex;
    flex-direction: column;
}

.link-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px 24px;

    &:not(:last-child) {
        border-bottom: 1px solid $grey-700;
    }
}

.link-label-row {
    display: flex;
    gap: 8px;
    align-items: baseline;
}

.link-label {
    color: $grey-100;
    font-weight: $font-weight-medium;
    font-size: $font-size-sm;
}

.link-key {
    color: $grey-500;
    font-size: 12px;
    font-family: monospace;
}

.link-input-row {
    display: flex;
    gap: 8px;
    align-items: center;
}

.link-input {
    flex: 1;
    min-width: 0;
    padding: 7px 12px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-md;
    background-color: $grey-700;
    color: $grey-100;
    transition: border-color $transition-base;
    font-size: $font-size-sm;
    font-family: $font-family-base;

    &::placeholder {
        color: $grey-500;
    }

    &:focus {
        border-color: $indigo-400;
        outline: none;
    }
}

.save-btn {
    flex-shrink: 0;
    padding: 7px 16px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-md;
    cursor: pointer;
    transition: all $transition-base;
    white-space: nowrap;
    font-size: $font-size-sm;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}

.save-btn-default {
    background: transparent;
    color: $grey-300;

    &:hover:not(:disabled) {
        border-color: $indigo-400;
        color: $indigo-300;
    }
}

.save-btn-saved {
    border-color: #34d399;
    background: transparent;
    color: #34d399;
}
</style>
