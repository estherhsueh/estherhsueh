<template>
    <div class="form-page">
        <div class="page-header">
            <NuxtLink
                to="/backstage/projects"
                class="back-link"
            >
                ← 返回列表
            </NuxtLink>
            <h1 class="page-title">
                {{ isNew ? '新增專案' : '編輯專案' }}
            </h1>
        </div>

        <div
            v-if="isLoadingData"
            class="status-message"
        >
            載入中...
        </div>

        <form
            v-else
            class="project-form"
            @submit.prevent="handleSubmit"
        >
            <!-- 基本資訊 -->
            <section class="form-section">
                <h2 class="section-title">
                    基本資訊
                </h2>
                <div class="form-grid">
                    <div class="field">
                        <label class="field-label">
                            專案 ID <span class="required">*</span>
                        </label>
                        <input
                            v-model="form.id"
                            class="field-input"
                            type="text"
                            placeholder="例：kkday-marketplace"
                            :disabled="!isNew"
                        >
                        <p class="field-hint">
                            建立後不可修改，用於路由與圖片資料夾名稱
                        </p>
                    </div>

                    <div class="field">
                        <label class="field-label">
                            分類 <span class="required">*</span>
                        </label>
                        <select
                            v-model="form.category"
                            class="field-input field-select"
                        >
                            <option value="APP">
                                APP
                            </option>
                            <option value="Web">
                                Web
                            </option>
                            <option value="Landing Page">
                                Landing Page
                            </option>
                        </select>
                    </div>

                    <div class="field">
                        <label class="field-label">年份</label>
                        <input
                            v-model="form.duration"
                            class="field-input"
                            type="text"
                            placeholder="例：2024"
                        >
                    </div>

                    <div class="field field-full">
                        <label class="field-label">是否鎖定（需密碼才能查看）</label>
                        <label class="toggle-wrapper">
                            <input
                                v-model="form.is_locked"
                                type="checkbox"
                                class="toggle-input"
                            >
                            <span class="toggle-track">
                                <span class="toggle-thumb" />
                            </span>
                            <span class="toggle-label">{{ form.is_locked ? '鎖定' : '公開' }}</span>
                        </label>
                    </div>
                </div>
            </section>

            <!-- 標題 -->
            <section class="form-section">
                <h2 class="section-title">
                    標題
                </h2>
                <div class="form-grid-2col">
                    <div class="field">
                        <label class="field-label">繁體中文</label>
                        <input
                            v-model="form.title['zh-TW']"
                            class="field-input"
                            type="text"
                            placeholder="繁體中文標題"
                        >
                    </div>
                    <div class="field">
                        <label class="field-label">English</label>
                        <input
                            v-model="form.title['en-US']"
                            class="field-input"
                            type="text"
                            placeholder="English title"
                        >
                    </div>
                </div>
            </section>

            <!-- 描述 -->
            <section class="form-section">
                <h2 class="section-title">
                    描述
                </h2>
                <div class="form-grid-2col">
                    <div class="field">
                        <label class="field-label">繁體中文</label>
                        <textarea
                            v-model="form.description['zh-TW']"
                            class="field-input field-textarea"
                            placeholder="繁體中文描述"
                            rows="5"
                        />
                    </div>
                    <div class="field">
                        <label class="field-label">English</label>
                        <textarea
                            v-model="form.description['en-US']"
                            class="field-input field-textarea"
                            placeholder="English description"
                            rows="5"
                        />
                    </div>
                </div>
            </section>

            <!-- 公司 -->
            <section class="form-section">
                <h2 class="section-title">
                    公司
                </h2>
                <div class="form-grid-2col">
                    <div class="field">
                        <label class="field-label">繁體中文</label>
                        <input
                            v-model="form.company['zh-TW']"
                            class="field-input"
                            type="text"
                            placeholder="公司名稱"
                        >
                    </div>
                    <div class="field">
                        <label class="field-label">English</label>
                        <input
                            v-model="form.company['en-US']"
                            class="field-input"
                            type="text"
                            placeholder="Company name"
                        >
                    </div>
                </div>
            </section>

            <!-- 負責工作 -->
            <section class="form-section">
                <h2 class="section-title">
                    負責工作
                </h2>
                <div class="form-grid-2col">
                    <div class="field">
                        <label class="field-label">繁體中文</label>
                        <input
                            v-model="form.responsibilities['zh-TW']"
                            class="field-input"
                            type="text"
                            placeholder="例：UI/UX 設計、設計系統"
                        >
                    </div>
                    <div class="field">
                        <label class="field-label">English</label>
                        <input
                            v-model="form.responsibilities['en-US']"
                            class="field-input"
                            type="text"
                            placeholder="e.g. UI/UX Design, Design System"
                        >
                    </div>
                </div>
            </section>

            <!-- 封面圖 -->
            <section class="form-section">
                <h2 class="section-title">
                    封面圖
                </h2>

                <p
                    v-if="!form.id && isNew"
                    class="upload-id-warning"
                >
                    請先填寫專案 ID 再上傳圖片
                </p>

                <template v-else>
                    <!-- 有封面圖 -->
                    <div
                        v-if="coverImage"
                        class="cover-has-image"
                    >
                        <div class="cover-preview-wrap">
                            <img
                                :src="coverImage"
                                class="cover-preview-img"
                                alt="封面圖"
                            >
                        </div>
                        <div class="cover-actions">
                            <button
                                type="button"
                                class="btn-replace"
                                :disabled="isCoverUploading"
                                @click="triggerCoverInput"
                            >
                                {{ isCoverUploading ? '上傳中...' : '更換圖片' }}
                            </button>
                            <button
                                type="button"
                                class="btn-remove-cover"
                                :disabled="isCoverUploading"
                                @click="removeCoverImage"
                            >
                                移除
                            </button>
                        </div>
                    </div>

                    <!-- 無封面圖 -->
                    <button
                        v-else
                        type="button"
                        class="cover-upload-zone"
                        :disabled="isCoverUploading"
                        @click="triggerCoverInput"
                    >
                        <span class="upload-zone-icon">{{ isCoverUploading ? '⏳' : '☁' }}</span>
                        <span class="upload-zone-label">{{ isCoverUploading ? '上傳中...' : '點擊上傳封面圖' }}</span>
                        <span class="upload-zone-hint">支援 JPG、PNG、WebP、GIF，最大 10MB</span>
                    </button>
                </template>

                <input
                    ref="coverFileInputRef"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    class="hidden-file-input"
                    @change="handleCoverUpload"
                >
            </section>

            <!-- 內文圖 -->
            <section class="form-section">
                <div class="section-header">
                    <h2 class="section-title section-title-inline">
                        內文圖
                    </h2>
                    <span class="section-count">{{ detailImages.length }} 張</span>
                    <button
                        v-if="form.id || !isNew"
                        type="button"
                        class="btn-add-image"
                        :disabled="isDetailUploading"
                        @click="triggerDetailInput"
                    >
                        {{ isDetailUploading ? `上傳中 ${uploadProgress.current}/${uploadProgress.total}...` : '＋ 上傳圖片' }}
                    </button>
                </div>

                <p
                    v-if="!form.id && isNew"
                    class="upload-id-warning"
                >
                    請先填寫專案 ID 再上傳圖片
                </p>

                <p
                    v-else-if="!detailImages.length && !isDetailUploading"
                    class="empty-hint"
                >
                    尚無內文圖，點擊「＋ 上傳圖片」新增（可一次選取多張）
                </p>

                <div
                    v-if="detailImages.length"
                    class="detail-image-list"
                >
                    <div
                        v-for="(item, index) in detailImages"
                        :key="item.id"
                        class="detail-image-row"
                        :class="{ 'drag-over': dragOverIndex === index }"
                        draggable="true"
                        @dragstart="onDragStart(index)"
                        @dragover.prevent="onDragOver(index)"
                        @dragleave="onDragLeave"
                        @drop.prevent="onDrop(index)"
                        @dragend="onDragEnd"
                    >
                        <span
                            class="drag-handle"
                            title="拖曳排序"
                        >⠿</span>

                        <div class="detail-image-thumb">
                            <img
                                :src="item.url"
                                class="thumb-img"
                                alt=""
                            >
                        </div>

                        <span class="detail-image-index">{{ index + 1 }}</span>

                        <button
                            type="button"
                            class="btn-remove-image"
                            title="移除"
                            @click="removeDetailImage(index, item.url)"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <input
                    ref="detailFileInputRef"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    multiple
                    class="hidden-file-input"
                    @change="handleDetailUpload"
                >
            </section>

            <!-- 顯示設定 -->
            <section class="form-section">
                <h2 class="section-title">
                    顯示設定
                </h2>
                <div class="form-grid">
                    <div class="field field-full">
                        <label class="field-label">標籤（逗號分隔）</label>
                        <input
                            v-model="tagsInput"
                            class="field-input"
                            type="text"
                            placeholder="例：APP, E-commerce, B2B"
                        >
                        <div
                            v-if="parsedTags.length"
                            class="tags-preview"
                        >
                            <span
                                v-for="tag in parsedTags"
                                :key="tag"
                                class="tag-chip"
                            >{{ tag }}</span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="field-label">排列順序（sort_order）</label>
                        <input
                            v-model.number="form.sort_order"
                            class="field-input"
                            type="number"
                            placeholder="整體排列順序"
                        >
                    </div>

                    <div class="field">
                        <label class="field-label">
                            Featured 排列順序
                            <span class="field-label-hint">留空代表不顯示於首頁 Featured 區</span>
                        </label>
                        <input
                            v-model="featuredOrderInput"
                            class="field-input"
                            type="number"
                            min="0"
                            placeholder="留空表示不顯示"
                        >
                    </div>

                    <div class="field">
                        <label class="field-label">
                            Gallery 排列順序
                            <span class="field-label-hint">留空代表不顯示於首頁 Gallery 區</span>
                        </label>
                        <input
                            v-model="galleryOrderInput"
                            class="field-input"
                            type="number"
                            min="0"
                            placeholder="留空表示不顯示"
                        >
                    </div>
                </div>
            </section>

            <!-- 儲存結果訊息 -->
            <div
                v-if="submitResult"
                class="submit-result"
                :class="submitResult.success ? 'result-success' : 'result-error'"
            >
                {{ submitResult.message }}
            </div>

            <!-- 操作按鈕 -->
            <div class="form-actions">
                <button
                    type="submit"
                    class="btn-save"
                    :disabled="isSubmitting"
                >
                    {{ isSubmitting ? '儲存中...' : (isNew ? '新增專案' : '儲存變更') }}
                </button>

                <NuxtLink
                    to="/backstage/projects"
                    class="btn-cancel"
                >
                    取消
                </NuxtLink>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import type { ProjectRow, ProjectUpsertPayload } from '~/types/project';

definePageMeta({ layout: 'backstage' });

const { checkAuth } = useBackstageAuth();
onMounted(checkAuth);

const route = useRoute();
const router = useRouter();
const projectId = computed(() => route.params.id as string);
const isNew = computed(() => projectId.value === 'new');

interface SubmitResult {
    success: boolean
    message: string
}

interface DetailImageItem {
    id: number
    url: string
}

const isLoadingData = ref(false);
const isSubmitting = ref(false);
const submitResult = ref<SubmitResult | null>(null);

const tagsInput = ref('');
const featuredOrderInput = ref<string>('');
const galleryOrderInput = ref<string>('');

// 圖片管理
const coverImage = ref('');
const detailImages = ref<DetailImageItem[]>([]);
let nextImageId = 0;

// 上傳狀態
const coverFileInputRef = ref<HTMLInputElement | null>(null);
const detailFileInputRef = ref<HTMLInputElement | null>(null);
const isCoverUploading = ref(false);
const isDetailUploading = ref(false);
const uploadProgress = reactive({ current: 0, total: 0 });

// 拖曳排序狀態
const dragIndex = ref<number | null>(null);
const dragOverIndex = ref<number | null>(null);

// ── 封面圖 ─────────────────────────────────

const triggerCoverInput = (): void => {
    coverFileInputRef.value?.click();
};

const handleCoverUpload = async (event: Event): Promise<void> => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file || !form.id) {
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        submitResult.value = { success: false, message: '圖片檔案大小不可超過 10MB' };
        return;
    }

    isCoverUploading.value = true;
    try {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('project_id', form.id);
        fd.append('type', 'cover');

        const result = await $fetch<{ url: string }>('/api/backstage/upload-image', {
            method: 'POST',
            body: fd
        });
        coverImage.value = result.url;
    }
    catch {
        submitResult.value = { success: false, message: '封面圖上傳失敗，請重試' };
    }
    isCoverUploading.value = false;
    if (coverFileInputRef.value) {
        coverFileInputRef.value.value = '';
    }
};

const removeCoverImage = (): void => {
    const url = coverImage.value;
    coverImage.value = '';
    if (url) {
        $fetch('/api/backstage/delete-image', { method: 'POST', body: { url } }).catch(() => {});
    }
};

// ── 內文圖 ─────────────────────────────────

const triggerDetailInput = (): void => {
    detailFileInputRef.value?.click();
};

const handleDetailUpload = async (event: Event): Promise<void> => {
    const files = Array.from((event.target as HTMLInputElement).files ?? []);
    if (!files.length || !form.id) {
        return;
    }

    isDetailUploading.value = true;
    uploadProgress.current = 0;
    uploadProgress.total = files.length;

    for (const file of files) {
        if (file.size > 10 * 1024 * 1024) {
            uploadProgress.current++;
            continue;
        }
        try {
            const fd = new FormData();
            fd.append('file', file);
            fd.append('project_id', form.id);
            fd.append('type', 'detail');

            const result = await $fetch<{ url: string }>('/api/backstage/upload-image', {
                method: 'POST',
                body: fd
            });
            detailImages.value.push({ id: nextImageId++, url: result.url });
        }
        catch { /* 單張失敗不中斷其他張 */ }
        uploadProgress.current++;
    }

    isDetailUploading.value = false;
    if (detailFileInputRef.value) {
        detailFileInputRef.value.value = '';
    }
};

const removeDetailImage = (index: number, url: string): void => {
    detailImages.value.splice(index, 1);
    if (url) {
        $fetch('/api/backstage/delete-image', { method: 'POST', body: { url } }).catch(() => {});
    }
};

// ── 拖曳排序 ────────────────────────────────

const onDragStart = (index: number): void => {
    dragIndex.value = index;
};

const onDragOver = (index: number): void => {
    dragOverIndex.value = index;
};

const onDragLeave = (): void => {
    dragOverIndex.value = null;
};

const onDrop = (dropIndex: number): void => {
    if (dragIndex.value === null || dragIndex.value === dropIndex) {
        dragOverIndex.value = null;
        return;
    }
    const items = [...detailImages.value];
    const [moved] = items.splice(dragIndex.value, 1);
    items.splice(dropIndex, 0, moved);
    detailImages.value = items;
    dragOverIndex.value = null;
};

const onDragEnd = (): void => {
    dragIndex.value = null;
    dragOverIndex.value = null;
};

const form = reactive<ProjectUpsertPayload>({
    id: '',
    title: { 'zh-TW': '', 'en-US': '' },
    description: { 'zh-TW': '', 'en-US': '' },
    company: { 'zh-TW': '', 'en-US': '' },
    responsibilities: { 'zh-TW': '', 'en-US': '' },
    duration: '',
    category: 'Web',
    tags: [],
    is_locked: false,
    sort_order: null,
    featured_order: null,
    gallery_order: null,
    cover_image: '',
    detail_images: []
});

const parsedTags = computed(() =>
    tagsInput.value
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
);

const loadProject = async (): Promise<void> => {
    if (isNew.value) {
        return;
    }
    isLoadingData.value = true;
    try {
        const data = await $fetch<ProjectRow>(`/api/backstage/projects/${projectId.value}`);
        form.id = data.id;
        form.title = { ...data.title };
        form.description = { ...data.description };
        form.company = { ...data.company };
        form.responsibilities = { ...data.responsibilities };
        form.duration = data.duration;
        form.category = data.category;
        form.tags = [...data.tags];
        form.is_locked = data.is_locked;
        form.sort_order = data.sort_order;
        form.featured_order = data.featured_order;
        form.gallery_order = data.gallery_order;

        tagsInput.value = data.tags.join(', ');
        featuredOrderInput.value = data.featured_order !== null ? String(data.featured_order) : '';
        galleryOrderInput.value = data.gallery_order !== null ? String(data.gallery_order) : '';

        coverImage.value = data.cover_image ?? '';
        nextImageId = 0;
        detailImages.value = (data.detail_images ?? []).map((url) => ({ id: nextImageId++, url }));
    }
    catch {
        submitResult.value = { success: false, message: '無法載入專案資料' };
    }
    isLoadingData.value = false;
};

const handleSubmit = async (): Promise<void> => {
    submitResult.value = null;
    isSubmitting.value = true;

    form.tags = parsedTags.value;
    form.featured_order = featuredOrderInput.value !== '' ? Number(featuredOrderInput.value) : null;
    form.gallery_order = galleryOrderInput.value !== '' ? Number(galleryOrderInput.value) : null;
    form.cover_image = coverImage.value;
    form.detail_images = detailImages.value.map((item) => item.url).filter(Boolean);

    try {
        if (isNew.value) {
            await $fetch('/api/backstage/projects', {
                method: 'POST',
                body: form
            });
            submitResult.value = { success: true, message: '專案新增成功！' };
            setTimeout(() => router.push('/backstage/projects'), 1200);
        }
        else {
            const { id, ...payload } = form;
            await $fetch(`/api/backstage/projects/${id}`, {
                method: 'PUT',
                body: payload
            });
            submitResult.value = { success: true, message: '儲存成功！' };
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : '操作失敗，請稍後再試';
        submitResult.value = { success: false, message };
    }

    isSubmitting.value = false;
};

onMounted(loadProject);
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.form-page {
    display: flex;
    flex-direction: column;
    gap: 0;
    max-width: 960px;
    padding: 32px;
}

.page-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 32px;
}

.back-link {
    color: $grey-300;
    transition: color $transition-base;
    text-decoration: none;
    font-size: $font-size-sm;

    &:hover {
        color: $indigo-200;
    }
}

.page-title {
    margin: 0;
    color: $grey-50;
    font-weight: $font-weight-semibold;
    font-size: $font-size-xxl;
}

.status-message {
    padding: 48px;
    color: $grey-300;
    text-align: center;
    font-size: $font-size-base;
}

.project-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.form-section {
    padding: 24px;
    border: 1px solid $grey-700;
    border-radius: $border-radius-lg;
    background-color: $grey-800;
}

.section-title {
    margin: 0 0 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid $grey-700;
    color: $grey-50;
    font-weight: $font-weight-medium;
    font-size: $font-size-base;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.form-grid-2col {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 6px;

    &.field-full {
        grid-column: 1 / -1;
    }
}

.field-label {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
    color: $grey-200;
    font-weight: $font-weight-medium;
    font-size: $font-size-sm;

    .required {
        color: #e57373;
    }
}

.field-label-hint {
    color: $grey-400;
    font-weight: $font-weight-normal;
    font-size: $font-size-xs;
}

.field-hint {
    margin: 0;
    color: $grey-400;
    font-size: $font-size-xs;
}

.field-input {
    width: 100%;
    padding: 9px 14px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-md;
    background-color: $grey-700;
    color: $grey-50;
    transition: border-color $transition-base;
    font-size: $font-size-sm;
    font-family: inherit;

    &::placeholder {
        color: $grey-400;
    }

    &:focus {
        border-color: $indigo-400;
        outline: none;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}

.field-select {
    cursor: pointer;

    option {
        background-color: $grey-700;
    }
}

.field-textarea {
    min-height: 100px;
    resize: vertical;
    line-height: $line-height-normal;
}

.toggle-wrapper {
    display: flex;
    gap: 12px;
    align-items: center;
    width: fit-content;
    cursor: pointer;
}

.toggle-input {
    display: none;
}

.toggle-track {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    border-radius: $border-radius-full;
    background-color: $grey-600;
    transition: background-color $transition-base;

    .toggle-input:checked + & {
        background-color: $indigo-500;
    }
}

.toggle-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: $grey-100;
    transition: transform $transition-base;

    .toggle-input:checked ~ & {
        transform: translateX(20px);
    }
}

.toggle-label {
    color: $grey-200;
    font-size: $font-size-sm;
}

.tags-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 4px;
}

.tag-chip {
    display: inline-block;
    padding: 2px 10px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-full;
    color: $grey-200;
    font-size: $font-size-xs;
}

// ── 封面圖 ────────────────────────────────

.upload-id-warning {
    margin: 0;
    padding: 12px 16px;
    border: 1px solid #ffa726;
    border-radius: $border-radius-md;
    background-color: rgb(255 167 38 / 10%);
    color: #ffa726;
    font-size: $font-size-sm;
}

.cover-upload-zone {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 160px;
    padding: 32px;
    border: 2px dashed $grey-600;
    border-radius: $border-radius-md;
    background: transparent;
    cursor: pointer;
    transition: all $transition-base;

    &:hover:not(:disabled) {
        border-color: $indigo-400;
        background-color: rgb(105 165 255 / 5%);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
}

.upload-zone-icon {
    color: $grey-400;
    font-size: 32px;
    line-height: 1;
}

.upload-zone-label {
    color: $grey-200;
    font-weight: $font-weight-medium;
    font-size: $font-size-base;
}

.upload-zone-hint {
    color: $grey-500;
    font-size: $font-size-xs;
}

.cover-has-image {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.cover-preview-wrap {
    overflow: hidden;
    width: 100%;
    max-height: 260px;
    border-radius: $border-radius-md;
    background-color: $grey-700;
}

.cover-preview-img {
    display: block;
    object-fit: cover;
    width: 100%;
    max-height: 260px;
}

.cover-actions {
    display: flex;
    gap: 8px;
}

.btn-replace {
    padding: 6px 18px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-full;
    background: transparent;
    color: $grey-200;
    cursor: pointer;
    transition: all $transition-base;
    font-size: $font-size-sm;

    &:hover:not(:disabled) {
        border-color: $indigo-400;
        color: $indigo-200;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
}

.btn-remove-cover {
    padding: 6px 18px;
    border: 1px solid transparent;
    border-radius: $border-radius-full;
    background: transparent;
    color: $grey-400;
    cursor: pointer;
    transition: all $transition-base;
    font-size: $font-size-sm;

    &:hover:not(:disabled) {
        border-color: $error-color;
        color: #e57373;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
}

.hidden-file-input {
    display: none;
}

// ── 內文圖 ────────────────────────────────

.section-header {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid $grey-700;
}

.section-title-inline {
    margin: 0;
    padding-bottom: 0;
    border-bottom: none;
}

.section-count {
    color: $grey-400;
    font-size: $font-size-xs;
}

.btn-add-image {
    margin-left: auto;
    padding: 4px 14px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-full;
    background: transparent;
    color: $indigo-200;
    cursor: pointer;
    transition: all $transition-base;
    white-space: nowrap;
    font-size: $font-size-xs;

    &:hover:not(:disabled) {
        border-color: $indigo-400;
        background-color: rgb(105 165 255 / 8%);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
}

.empty-hint {
    margin: 0;
    padding: 24px;
    color: $grey-500;
    text-align: center;
    font-size: $font-size-sm;
}

.detail-image-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.detail-image-row {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 8px;
    border: 1px solid $grey-700;
    border-radius: $border-radius-md;
    background-color: $grey-700;
    transition: all $transition-base;

    &.drag-over {
        border-color: $indigo-400;
        background-color: rgb(105 165 255 / 8%);
    }
}

.drag-handle {
    flex-shrink: 0;
    color: $grey-500;
    cursor: grab;
    user-select: none;
    font-size: 18px;
    line-height: 1;

    &:active {
        cursor: grabbing;
    }
}

.detail-image-thumb {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 80px;
    height: 56px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-sm;
    background-color: $grey-800;
}

.thumb-img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.detail-image-index {
    flex-shrink: 0;
    width: 20px;
    color: $grey-400;
    text-align: center;
    font-size: $font-size-xs;
}

.btn-remove-image {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 1px solid transparent;
    border-radius: $border-radius-sm;
    background: transparent;
    color: $grey-500;
    cursor: pointer;
    transition: all $transition-base;
    font-size: 12px;

    &:hover {
        border-color: $error-color;
        color: #e57373;
    }
}

// ─────────────────────────────────────────

.submit-result {
    padding: 12px 16px;
    border-radius: $border-radius-md;
    font-size: $font-size-sm;

    &.result-success {
        border: 1px solid #4caf50;
        background-color: rgb(76 175 80 / 10%);
        color: #81c784;
    }

    &.result-error {
        border: 1px solid $error-color;
        background-color: rgb(244 67 54 / 10%);
        color: #e57373;
    }
}

.form-actions {
    display: flex;
    gap: 12px;
    align-items: center;
    padding-bottom: 40px;
}

.btn-save {
    padding: 10px 28px;
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
        background-color: $grey-600;
        color: $grey-400;
        cursor: not-allowed;
    }
}

.btn-cancel {
    padding: 10px 24px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-full;
    color: $grey-300;
    cursor: pointer;
    transition: all $transition-base;
    text-decoration: none;
    font-size: $font-size-base;

    &:hover {
        border-color: $grey-400;
        color: $grey-100;
    }
}
</style>
