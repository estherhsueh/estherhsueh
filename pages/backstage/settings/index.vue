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

            <!-- 經歷管理卡片（全寬） -->
            <div class="settings-card settings-card-full">
                <div class="card-header card-header-actions">
                    <div>
                        <h2 class="card-title">
                            經歷管理
                        </h2>
                        <p class="card-description">
                            管理前台 About 頁面的工作經歷列表，可拖曳列調整順序。
                        </p>
                    </div>

                    <div
                        v-if="!isExpsLoading && !expsError"
                        class="card-header-right"
                    >
                        <transition name="fade">
                            <span
                                v-if="expSaveOrderStatus !== 'idle'"
                                class="exp-order-status"
                                :class="`exp-order-status-${expSaveOrderStatus}`"
                            >
                                <template v-if="expSaveOrderStatus === 'saving'">儲存排序中...</template>
                                <template v-else-if="expSaveOrderStatus === 'saved'">✓ 順序已儲存</template>
                                <template v-else-if="expSaveOrderStatus === 'error'">✗ 排序儲存失敗</template>
                            </span>
                        </transition>

                        <button
                            class="btn-add"
                            :disabled="editingExpId !== null"
                            @click="startAddExp"
                        >
                            ＋ 新增
                        </button>
                    </div>
                </div>

                <div
                    v-if="isExpsLoading"
                    class="card-status"
                >
                    載入中...
                </div>

                <div
                    v-else-if="expsError"
                    class="card-status card-status-error"
                >
                    {{ expsError }}
                </div>

                <template v-else>
                    <!-- 新增表單 -->
                    <div
                        v-if="editingExpId === 'new'"
                        class="exp-form"
                    >
                        <div class="exp-form-grid">
                            <div class="exp-form-locale-group">
                                <label class="exp-form-group-label">公司名稱 *</label>
                                <div class="exp-form-locale-row">
                                    <div class="exp-form-field">
                                        <label class="exp-form-label exp-form-label-locale">繁體中文</label>
                                        <input
                                            v-model="expForm.company['zh-TW']"
                                            class="exp-input"
                                            placeholder="公司名稱"
                                            type="text"
                                        >
                                    </div>
                                    <div class="exp-form-field">
                                        <label class="exp-form-label exp-form-label-locale">English</label>
                                        <input
                                            v-model="expForm.company['en-US']"
                                            class="exp-input"
                                            placeholder="Company name"
                                            type="text"
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="exp-form-locale-group">
                                <label class="exp-form-group-label">職稱 *</label>
                                <div class="exp-form-locale-row">
                                    <div class="exp-form-field">
                                        <label class="exp-form-label exp-form-label-locale">繁體中文</label>
                                        <input
                                            v-model="expForm.title['zh-TW']"
                                            class="exp-input"
                                            placeholder="職稱"
                                            type="text"
                                        >
                                    </div>
                                    <div class="exp-form-field">
                                        <label class="exp-form-label exp-form-label-locale">English</label>
                                        <input
                                            v-model="expForm.title['en-US']"
                                            class="exp-input"
                                            placeholder="Job title"
                                            type="text"
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="exp-form-locale-group exp-form-locale-group-dates">
                                <div class="exp-form-locale-row">
                                    <div class="exp-form-field">
                                        <label class="exp-form-label">開始日期 *</label>
                                        <input
                                            v-model="expForm.start_date"
                                            class="exp-input"
                                            placeholder="2025.01"
                                            type="text"
                                        >
                                    </div>
                                    <div class="exp-form-field">
                                        <label class="exp-form-label">結束日期</label>
                                        <input
                                            v-model="expForm.end_date"
                                            class="exp-input"
                                            placeholder="2025.12 或 present（選填）"
                                            type="text"
                                        >
                                    </div>
                                    <div class="exp-form-field exp-form-field-short">
                                        <label class="exp-form-label">排序</label>
                                        <input
                                            v-model.number="expForm.sort_order"
                                            class="exp-input"
                                            type="number"
                                            min="0"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="exp-form-actions">
                            <button
                                class="btn-save"
                                :disabled="isExpSaving"
                                @click="saveNewExp"
                            >
                                {{ isExpSaving ? '新增中...' : '確認新增' }}
                            </button>
                            <button
                                class="btn-cancel"
                                :disabled="isExpSaving"
                                @click="cancelExpEdit"
                            >
                                取消
                            </button>
                            <span
                                v-if="expFormError"
                                class="exp-form-error"
                            >{{ expFormError }}</span>
                        </div>
                    </div>

                    <!-- 列表 -->
                    <div
                        v-if="experiences.length === 0 && editingExpId !== 'new'"
                        class="card-status"
                    >
                        尚無工作經歷資料
                    </div>

                    <div
                        v-else-if="experiences.length > 0"
                        class="exp-table-wrapper"
                    >
                        <table class="exp-table">
                            <thead>
                                <tr>
                                    <th class="col-exp-drag" />
                                    <th class="col-company">
                                        公司名稱
                                    </th>
                                    <th class="col-title">
                                        職稱
                                    </th>
                                    <th class="col-period">
                                        期間
                                    </th>
                                    <th class="col-actions" />
                                </tr>
                            </thead>
                            <tbody>
                                <template
                                    v-for="(exp, index) in experiences"
                                    :key="exp.id"
                                >
                                    <!-- 編輯中的列 -->
                                    <tr v-if="editingExpId === exp.id">
                                        <td class="col-exp-drag" />
                                        <td class="col-company">
                                            <div class="locale-inputs">
                                                <input
                                                    v-model="expForm.company['zh-TW']"
                                                    class="exp-input"
                                                    placeholder="繁體中文"
                                                    type="text"
                                                >
                                                <input
                                                    v-model="expForm.company['en-US']"
                                                    class="exp-input"
                                                    placeholder="English"
                                                    type="text"
                                                >
                                            </div>
                                        </td>
                                        <td class="col-title">
                                            <div class="locale-inputs">
                                                <input
                                                    v-model="expForm.title['zh-TW']"
                                                    class="exp-input"
                                                    placeholder="繁體中文"
                                                    type="text"
                                                >
                                                <input
                                                    v-model="expForm.title['en-US']"
                                                    class="exp-input"
                                                    placeholder="English"
                                                    type="text"
                                                >
                                            </div>
                                        </td>
                                        <td class="col-period">
                                            <div class="period-inputs">
                                                <input
                                                    v-model="expForm.start_date"
                                                    class="exp-input"
                                                    placeholder="2025.01"
                                                    type="text"
                                                >
                                                <span class="period-sep">~</span>
                                                <input
                                                    v-model="expForm.end_date"
                                                    class="exp-input"
                                                    placeholder="present"
                                                    type="text"
                                                >
                                            </div>
                                        </td>
                                        <td class="col-actions">
                                            <div class="row-actions">
                                                <button
                                                    class="btn-save"
                                                    :disabled="isExpSaving"
                                                    @click="saveEditExp(exp.id)"
                                                >
                                                    {{ isExpSaving ? '儲存中...' : '儲存' }}
                                                </button>
                                                <button
                                                    class="btn-cancel"
                                                    :disabled="isExpSaving"
                                                    @click="cancelExpEdit"
                                                >
                                                    取消
                                                </button>
                                            </div>
                                            <span
                                                v-if="expFormError"
                                                class="exp-form-error"
                                            >{{ expFormError }}</span>
                                        </td>
                                    </tr>

                                    <!-- 顯示列 -->
                                    <tr
                                        v-else
                                        class="exp-row"
                                        :class="{
                                            'is-dragging': expDragIndex === index,
                                            'drag-over-top': expDragOverIndex === index && expDragIndex !== null && expDragIndex > index,
                                            'drag-over-bottom': expDragOverIndex === index && expDragIndex !== null && expDragIndex < index,
                                        }"
                                        :draggable="editingExpId === null"
                                        @dragstart="onExpDragStart(index, $event)"
                                        @dragover.prevent="onExpDragOver(index)"
                                        @dragleave="onExpDragLeave"
                                        @drop.prevent="onExpDrop(index)"
                                        @dragend="onExpDragEnd"
                                    >
                                        <td class="col-exp-drag">
                                            <span
                                                class="exp-drag-handle"
                                                title="拖曳以調整排序"
                                            >⠿</span>
                                        </td>
                                        <td class="col-company">
                                            <div class="exp-locale-display">
                                                <div
                                                    v-if="exp.company['zh-TW']"
                                                    class="exp-locale-row"
                                                >
                                                    <span class="exp-locale-tag">繁中</span>
                                                    <span class="exp-text-main">{{ exp.company['zh-TW'] }}</span>
                                                </div>
                                                <div
                                                    v-if="exp.company['en-US']"
                                                    class="exp-locale-row"
                                                >
                                                    <span class="exp-locale-tag">EN</span>
                                                    <span class="exp-text-main">{{ exp.company['en-US'] }}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="col-title">
                                            <div class="exp-locale-display">
                                                <div
                                                    v-if="exp.title['zh-TW']"
                                                    class="exp-locale-row"
                                                >
                                                    <span class="exp-locale-tag">繁中</span>
                                                    <span class="exp-text-sub">{{ exp.title['zh-TW'] }}</span>
                                                </div>
                                                <div
                                                    v-if="exp.title['en-US']"
                                                    class="exp-locale-row"
                                                >
                                                    <span class="exp-locale-tag">EN</span>
                                                    <span class="exp-text-sub">{{ exp.title['en-US'] }}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="col-period exp-text-sub">
                                            {{ exp.start_date }}{{ exp.end_date ? ` ~ ${exp.end_date}` : '' }}
                                        </td>
                                        <td class="col-actions">
                                            <div
                                                v-if="deleteConfirmId !== exp.id"
                                                class="row-actions"
                                            >
                                                <button
                                                    class="btn-icon btn-icon-edit"
                                                    :disabled="editingExpId !== null"
                                                    @click="startEditExp(exp)"
                                                >
                                                    編輯
                                                </button>
                                                <button
                                                    class="btn-icon btn-icon-delete"
                                                    :disabled="editingExpId !== null"
                                                    @click="deleteConfirmId = exp.id"
                                                >
                                                    刪除
                                                </button>
                                            </div>
                                            <div
                                                v-else
                                                class="row-actions"
                                            >
                                                <span class="delete-confirm-text">確定刪除？</span>
                                                <button
                                                    class="btn-icon btn-icon-delete-confirm"
                                                    :disabled="isExpDeleting"
                                                    @click="deleteExp(exp.id)"
                                                >
                                                    {{ isExpDeleting ? '...' : '確認' }}
                                                </button>
                                                <button
                                                    class="btn-icon btn-icon-cancel-delete"
                                                    :disabled="isExpDeleting"
                                                    @click="deleteConfirmId = null"
                                                >
                                                    取消
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LocaleRow } from '~/types/locale';
import type { LinkRow } from '~/types/link';
import type { ExperienceRow } from '~/types/experience';

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

// ── 經歷管理 ──────────────────────────────────────────────
interface LocaleValue {
    'zh-TW': string
    'en-US': string
}
interface ExpForm {
    company: LocaleValue
    title: LocaleValue
    start_date: string
    end_date: string
    sort_order: number
}

const experiences = ref<ExperienceRow[]>([]);
const isExpsLoading = ref(true);
const expsError = ref('');
const editingExpId = ref<number | 'new' | null>(null);
const isExpSaving = ref(false);
const isExpDeleting = ref(false);
const deleteConfirmId = ref<number | null>(null);
const expFormError = ref('');
const expForm = reactive<ExpForm>({
    company: { 'zh-TW': '', 'en-US': '' },
    title: { 'zh-TW': '', 'en-US': '' },
    start_date: '',
    end_date: '',
    sort_order: 0
});

const resetExpForm = (defaults: Partial<ExpForm> = {}) => {
    expForm.company = { 'zh-TW': defaults.company?.['zh-TW'] ?? '', 'en-US': defaults.company?.['en-US'] ?? '' };
    expForm.title = { 'zh-TW': defaults.title?.['zh-TW'] ?? '', 'en-US': defaults.title?.['en-US'] ?? '' };
    expForm.start_date = defaults.start_date ?? '';
    expForm.end_date = defaults.end_date ?? '';
    expForm.sort_order = defaults.sort_order ?? (experiences.value.length + 1);
};

const validateExpForm = (): boolean => {
    if (!expForm.company['zh-TW'].trim() && !expForm.company['en-US'].trim()) {
        expFormError.value = '公司名稱至少需填入一個語系';
        return false;
    }
    if (!expForm.title['zh-TW'].trim() && !expForm.title['en-US'].trim()) {
        expFormError.value = '職稱至少需填入一個語系';
        return false;
    }
    if (!expForm.start_date.trim()) {
        expFormError.value = '開始日期為必填';
        return false;
    }
    expFormError.value = '';
    return true;
};

const fetchExperiences = async () => {
    isExpsLoading.value = true;
    expsError.value = '';
    try {
        experiences.value = await $fetch<ExperienceRow[]>('/api/backstage/settings/experiences');
    }
    catch (err: unknown) {
        const e = err as { data?: { statusMessage?: string }, message?: string };
        expsError.value = e?.data?.statusMessage ?? e?.message ?? '載入失敗';
    }
    finally {
        isExpsLoading.value = false;
    }
};

const startAddExp = () => {
    resetExpForm({ sort_order: experiences.value.length + 1 });
    expFormError.value = '';
    editingExpId.value = 'new';
};

const startEditExp = (exp: ExperienceRow) => {
    resetExpForm({
        company: { 'zh-TW': exp.company['zh-TW'] ?? '', 'en-US': exp.company['en-US'] ?? '' },
        title: { 'zh-TW': exp.title['zh-TW'] ?? '', 'en-US': exp.title['en-US'] ?? '' },
        start_date: exp.start_date,
        end_date: exp.end_date ?? '',
        sort_order: exp.sort_order
    });
    expFormError.value = '';
    editingExpId.value = exp.id;
};

const cancelExpEdit = () => {
    editingExpId.value = null;
    expFormError.value = '';
    resetExpForm();
};

const saveNewExp = async () => {
    if (!validateExpForm()) {
        return;
    }
    isExpSaving.value = true;
    try {
        const created = await $fetch<ExperienceRow>('/api/backstage/settings/experiences', {
            method: 'POST',
            body: {
                company: { 'zh-TW': expForm.company['zh-TW'].trim(), 'en-US': expForm.company['en-US'].trim() },
                title: { 'zh-TW': expForm.title['zh-TW'].trim(), 'en-US': expForm.title['en-US'].trim() },
                start_date: expForm.start_date.trim(),
                end_date: expForm.end_date.trim() || null,
                sort_order: expForm.sort_order
            }
        });
        experiences.value.push(created);
        experiences.value.sort((a, b) => a.sort_order - b.sort_order);
        editingExpId.value = null;
        expFormError.value = '';
    }
    catch (err: unknown) {
        const e = err as { data?: { statusMessage?: string }, message?: string };
        expFormError.value = e?.data?.statusMessage ?? e?.message ?? '新增失敗';
    }
    finally {
        isExpSaving.value = false;
    }
};

const saveEditExp = async (id: number) => {
    if (!validateExpForm()) {
        return;
    }
    isExpSaving.value = true;
    try {
        const updated = await $fetch<ExperienceRow>(`/api/backstage/settings/experiences/${id}`, {
            method: 'PUT',
            body: {
                company: { 'zh-TW': expForm.company['zh-TW'].trim(), 'en-US': expForm.company['en-US'].trim() },
                title: { 'zh-TW': expForm.title['zh-TW'].trim(), 'en-US': expForm.title['en-US'].trim() },
                start_date: expForm.start_date.trim(),
                end_date: expForm.end_date.trim() || null,
                sort_order: expForm.sort_order
            }
        });
        const idx = experiences.value.findIndex((e) => e.id === id);
        if (idx !== -1) {
            experiences.value[idx] = updated;
        }
        experiences.value.sort((a, b) => a.sort_order - b.sort_order);
        editingExpId.value = null;
        expFormError.value = '';
    }
    catch (err: unknown) {
        const e = err as { data?: { statusMessage?: string }, message?: string };
        expFormError.value = e?.data?.statusMessage ?? e?.message ?? '儲存失敗';
    }
    finally {
        isExpSaving.value = false;
    }
};

const deleteExp = async (id: number) => {
    isExpDeleting.value = true;
    try {
        await $fetch(`/api/backstage/settings/experiences/${id}`, { method: 'DELETE' });
        experiences.value = experiences.value.filter((e) => e.id !== id);
        deleteConfirmId.value = null;
    }
    catch (err: unknown) {
        const e = err as { data?: { statusMessage?: string }, message?: string };
        expsError.value = e?.data?.statusMessage ?? e?.message ?? '刪除失敗';
        deleteConfirmId.value = null;
    }
    finally {
        isExpDeleting.value = false;
    }
};

// ── 經歷拖曳排序 ──────────────────────────────────────────
const expDragIndex = ref<number | null>(null);
const expDragOverIndex = ref<number | null>(null);
type ExpSaveStatus = 'idle' | 'saving' | 'saved' | 'error';
const expSaveOrderStatus = ref<ExpSaveStatus>('idle');

const onExpDragStart = (index: number, event: DragEvent): void => {
    expDragIndex.value = index;
    if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
    }
};

const onExpDragOver = (index: number): void => {
    if (expDragIndex.value === null || expDragIndex.value === index) {
        return;
    }
    expDragOverIndex.value = index;
};

const onExpDragLeave = (): void => {
    expDragOverIndex.value = null;
};

const onExpDrop = async (dropIndex: number): Promise<void> => {
    if (expDragIndex.value === null || expDragIndex.value === dropIndex) {
        expDragOverIndex.value = null;
        expDragIndex.value = null;
        return;
    }

    const items = [...experiences.value];
    const [moved] = items.splice(expDragIndex.value, 1);
    items.splice(dropIndex, 0, moved as ExperienceRow);
    experiences.value = items;

    expDragOverIndex.value = null;
    expDragIndex.value = null;

    await saveExpOrder();
};

const onExpDragEnd = (): void => {
    expDragIndex.value = null;
    expDragOverIndex.value = null;
};

const saveExpOrder = async (): Promise<void> => {
    expSaveOrderStatus.value = 'saving';
    try {
        const payload = experiences.value.map((e, index) => ({ id: e.id, sort_order: index + 1 }));
        await $fetch('/api/backstage/settings/experiences/reorder', { method: 'PATCH', body: payload });
        experiences.value = experiences.value.map((e, index) => ({ ...e, sort_order: index + 1 }));
        expSaveOrderStatus.value = 'saved';
        setTimeout(() => {
            expSaveOrderStatus.value = 'idle';
        }, 2000);
    }
    catch {
        expSaveOrderStatus.value = 'error';
        setTimeout(() => {
            expSaveOrderStatus.value = 'idle';
        }, 3000);
    }
};

onMounted(() => {
    fetchLocales();
    fetchLinks();
    fetchExperiences();
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

// ── 經歷管理 ──────────────────────────
.settings-card-full {
    grid-column: 1 / -1;
}

.card-header-actions {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    justify-content: space-between;
}

.btn-add {
    flex-shrink: 0;
    padding: 7px 16px;
    border: 1px solid $indigo-400;
    border-radius: $border-radius-md;
    background: transparent;
    color: $indigo-300;
    cursor: pointer;
    transition: all $transition-base;
    white-space: nowrap;
    font-size: $font-size-sm;

    &:hover:not(:disabled) {
        background-color: $indigo-600;
        color: $grey-50;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.4;
    }
}

.exp-form {
    padding: 20px 24px;
    border-bottom: 1px solid $grey-700;
    background-color: rgb(255 255 255 / 2%);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.exp-form-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;
}

.exp-form-locale-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.exp-form-group-label {
    color: $grey-100;
    font-weight: $font-weight-semibold;
    font-size: $font-size-base;
}

.exp-form-locale-row {
    display: flex;
    gap: 12px;

    > .exp-form-field {
        flex: 1;
    }
}

.exp-form-locale-group-dates {
    .exp-form-locale-row {
        align-items: flex-end;
    }
}

.exp-form-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.exp-form-field-short {
    flex: 0 0 100px !important;
}

.exp-form-label {
    color: $grey-200;
    font-weight: $font-weight-medium;
    font-size: $font-size-sm;
}

.exp-form-label-locale {
    color: $grey-300;
    font-weight: $font-weight-medium;
    font-size: $font-size-sm;
}

.exp-form-actions {
    display: flex;
    gap: 8px;
}

.exp-table-wrapper {
    overflow-x: auto;
}

.exp-table {
    width: 100%;
    border-collapse: collapse;
    font-size: $font-size-sm;

    th {
        padding: 10px 16px;
        border-bottom: 1px solid $grey-700;
        background-color: rgb(255 255 255 / 2%);
        color: $grey-400;
        text-align: left;
        white-space: nowrap;
        font-weight: $font-weight-medium;
        font-size: 12px;
    }

    td {
        padding: 12px 16px;
        vertical-align: middle;
    }

    .exp-row {
        border-bottom: 1px solid $grey-700;
        transition: background-color $transition-base;

        &:last-child {
            border-bottom: none;
        }

        &:hover:not(.is-dragging) {
            background-color: rgb(255 255 255 / 2%);
        }

        &.is-dragging td {
            opacity: 0.35;
        }

        &.drag-over-top td {
            border-top: 2px solid $indigo-400;
            background-color: rgb(99 102 241 / 8%);
        }

        &.drag-over-bottom td {
            border-bottom: 2px solid $indigo-400;
            background-color: rgb(99 102 241 / 8%);
        }
    }

    tr:not(.exp-row) td {
        padding: 8px 16px;
        border-bottom: 1px solid $grey-600;
        background-color: rgb(99 102 241 / 5%);
    }
}

.col-exp-drag {
    width: 40px;
    padding: 0 8px 0 12px !important;
}
.col-company { min-width: 160px; }
.col-title   { min-width: 140px; }
.col-period  { min-width: 160px; }
.col-actions { width: 160px; }

.exp-text-main {
    color: $grey-100;
    font-weight: $font-weight-medium;
}

.exp-text-sub {
    color: $grey-200;
}

.exp-text-muted {
    color: $grey-400;
}

.exp-locale-display {
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.exp-locale-row {
    display: flex;
    gap: 6px;
    align-items: baseline;
}

.exp-locale-tag {
    flex-shrink: 0;
    padding: 1px 5px;
    border-radius: 3px;
    background-color: $grey-200;
    color: $grey-800;
    font-size: 10px;
    font-family: monospace;
}

.locale-inputs {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.exp-drag-handle {
    display: block;
    color: $grey-600;
    cursor: grab;
    user-select: none;
    transition: color $transition-base;
    text-align: center;
    font-size: 18px;
    line-height: 1;

    &:hover {
        color: $grey-300;
    }
}

.card-header-right {
    display: flex;
    flex-shrink: 0;
    gap: 12px;
    align-items: center;
}

.exp-order-status {
    white-space: nowrap;
    font-size: $font-size-sm;
}

.exp-order-status-saving { color: $grey-400; }
.exp-order-status-saved  { color: #34d399; }
.exp-order-status-error  { color: #f87171; }

.fade-enter-active,
.fade-leave-active {
    transition: opacity $transition-base;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.exp-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-md;
    background-color: $grey-700;
    color: $grey-50;
    transition: border-color $transition-base;
    font-weight: $font-weight-normal;
    font-size: $font-size-base;
    font-family: $font-family-base;

    &::placeholder {
        color: $grey-400;
    }

    &:focus {
        border-color: $indigo-400;
        outline: none;
    }
}

.exp-input-sm {
    width: 60px;
}

.period-inputs {
    display: flex;
    gap: 6px;
    align-items: center;
}

.period-sep {
    flex-shrink: 0;
    color: $grey-500;
}

.row-actions {
    display: flex;
    gap: 6px;
}

.btn-save {
    padding: 5px 14px;
    border: 1px solid $indigo-400;
    border-radius: $border-radius-md;
    background: transparent;
    color: $indigo-300;
    cursor: pointer;
    transition: all $transition-base;
    white-space: nowrap;
    font-size: $font-size-sm;

    &:hover:not(:disabled) {
        background-color: $indigo-600;
        color: $grey-50;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}

.btn-cancel {
    padding: 5px 14px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-md;
    background: transparent;
    color: $grey-400;
    cursor: pointer;
    transition: all $transition-base;
    white-space: nowrap;
    font-size: $font-size-sm;

    &:hover:not(:disabled) {
        border-color: $grey-400;
        color: $grey-200;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}

.btn-icon {
    padding: 4px 12px;
    border: 1px solid transparent;
    border-radius: $border-radius-md;
    cursor: pointer;
    transition: all $transition-base;
    white-space: nowrap;
    font-size: 12px;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.4;
    }
}

.btn-icon-edit {
    border-color: $grey-600;
    background: transparent;
    color: $grey-300;

    &:hover:not(:disabled) {
        border-color: $indigo-400;
        color: $indigo-300;
    }
}

.btn-icon-delete {
    border-color: $grey-600;
    background: transparent;
    color: $grey-300;

    &:hover:not(:disabled) {
        border-color: #f87171;
        color: #f87171;
    }
}

.btn-icon-delete-confirm {
    padding: 4px 12px;
    border: 1px solid #f87171;
    border-radius: $border-radius-md;
    background: transparent;
    color: #f87171;
    cursor: pointer;
    transition: all $transition-base;
    white-space: nowrap;
    font-size: 12px;

    &:hover:not(:disabled) {
        background-color: rgb(248 113 113 / 15%);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}

.btn-icon-cancel-delete {
    padding: 4px 12px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-md;
    background: transparent;
    color: $grey-400;
    cursor: pointer;
    transition: all $transition-base;
    white-space: nowrap;
    font-size: 12px;

    &:hover:not(:disabled) {
        border-color: $grey-400;
        color: $grey-200;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}

.delete-confirm-text {
    color: #f87171;
    white-space: nowrap;
    font-size: 12px;
}

.exp-form-error {
    color: #f87171;
    font-size: $font-size-sm;
}
</style>
