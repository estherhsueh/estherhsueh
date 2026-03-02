<template>
    <div class="projects-page">
        <div class="page-header">
            <div class="header-left">
                <h1 class="page-title">
                    專案管理
                </h1>
                <span class="project-count">共 {{ projects.length }} 筆</span>
            </div>

            <div class="header-right">
                <transition name="fade">
                    <span
                        v-if="saveOrderStatus !== 'idle'"
                        class="save-status"
                        :class="`save-status-${saveOrderStatus}`"
                    >
                        <template v-if="saveOrderStatus === 'saving'">儲存排序中...</template>
                        <template v-else-if="saveOrderStatus === 'saved'">✓ 順序已儲存</template>
                        <template v-else-if="saveOrderStatus === 'error'">✗ 排序儲存失敗</template>
                    </span>
                </transition>
                <NuxtLink
                    to="/backstage/projects/new"
                    class="btn-primary"
                >
                    ＋ 新增專案
                </NuxtLink>
            </div>
        </div>

        <div
            v-if="isLoading"
            class="status-message"
        >
            載入中...
        </div>

        <div
            v-else-if="loadError"
            class="status-message status-error"
        >
            {{ loadError }}
        </div>

        <div
            v-else-if="projects.length === 0"
            class="status-message"
        >
            尚無專案資料
        </div>

        <div
            v-else
            class="table-wrapper"
        >
            <table class="projects-table">
                <thead>
                    <tr>
                        <th class="col-drag" />
                        <th class="col-order">
                            排序
                        </th>
                        <th class="col-id">
                            專案 ID
                        </th>
                        <th class="col-title">
                            標題
                        </th>
                        <th class="col-category">
                            分類
                        </th>
                        <th class="col-year">
                            年份
                        </th>
                        <th class="col-badge">
                            鎖定
                        </th>
                        <th class="col-badge">
                            Featured
                        </th>
                        <th class="col-badge">
                            Gallery
                        </th>
                        <th class="col-badge">
                            啟用
                        </th>
                        <th class="col-actions">
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(project, index) in projects"
                        :key="project.id"
                        class="table-row"
                        :class="{
                            'is-dragging': dragIndex === index,
                            'drag-over-top': dragOverIndex === index && dragIndex !== null && dragIndex > index,
                            'drag-over-bottom': dragOverIndex === index && dragIndex !== null && dragIndex < index,
                        }"
                        draggable="true"
                        @dragstart="onDragStart(index, $event)"
                        @dragover.prevent="onDragOver(index)"
                        @dragleave="onDragLeave"
                        @drop.prevent="onDrop(index)"
                        @dragend="onDragEnd"
                    >
                        <td class="col-drag">
                            <span
                                class="drag-handle"
                                title="拖曳以調整排序"
                            >⠿</span>
                        </td>
                        <td class="col-order cell-muted">
                            {{ index }}
                        </td>
                        <td class="col-id cell-code">
                            {{ project.id }}
                        </td>
                        <td class="col-title">
                            {{ project.title?.['zh-TW'] || '（無標題）' }}
                        </td>
                        <td class="col-category">
                            <span class="tag">{{ project.category }}</span>
                        </td>
                        <td class="col-year cell-muted">
                            {{ project.duration }}
                        </td>
                        <td class="col-badge">
                            <span
                                class="badge"
                                :class="project.is_locked ? 'badge-warn' : 'badge-off'"
                            >
                                {{ project.is_locked ? '是' : '否' }}
                            </span>
                        </td>
                        <td class="col-badge">
                            <span
                                class="badge"
                                :class="project.featured_order !== null ? 'badge-on' : 'badge-off'"
                            >
                                {{ project.featured_order !== null ? `#${project.featured_order + 1}` : '—' }}
                            </span>
                        </td>
                        <td class="col-badge">
                            <span
                                class="badge"
                                :class="project.gallery_order !== null ? 'badge-on' : 'badge-off'"
                            >
                                {{ project.gallery_order !== null ? `#${project.gallery_order + 1}` : '—' }}
                            </span>
                        </td>
                        <td class="col-badge">
                            <span
                                class="badge"
                                :class="project.is_active ? 'badge-active' : 'badge-inactive'"
                            >
                                {{ project.is_active ? '啟用' : '停用' }}
                            </span>
                        </td>
                        <td class="col-actions">
                            <div class="action-buttons">
                                <a
                                    v-if="project.is_active"
                                    :href="`/work/${project.id}`"
                                    target="_blank"
                                    class="btn-view"
                                >
                                    開啟文章
                                </a>

                                <NuxtLink
                                    :to="`/backstage/projects/${project.id}`"
                                    class="btn-edit"
                                >
                                    編輯
                                </NuxtLink>

                                <button
                                    v-if="!project.is_active"
                                    class="btn-delete"
                                    @click="openDeleteModal(project)"
                                >
                                    刪除
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- 刪除確認 Modal -->
    <teleport to="body">
        <transition name="modal-fade">
            <div
                v-if="isDeleteModalOpen"
                class="modal-backdrop"
                @click.self="closeDeleteModal"
            >
                <div class="modal-dialog">
                    <h3 class="modal-title">
                        確認刪除
                    </h3>
                    <p class="modal-body">
                        確定要刪除專案「{{ deleteTargetProject?.title }}」嗎？<br>
                        此操作無法復原。
                    </p>
                    <div class="modal-actions">
                        <button
                            class="btn-cancel"
                            :disabled="isDeleting"
                            @click="closeDeleteModal"
                        >
                            取消
                        </button>
                        <button
                            class="btn-confirm-delete"
                            :disabled="isDeleting"
                            @click="confirmDelete"
                        >
                            {{ isDeleting ? '刪除中...' : '確認刪除' }}
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import type { ProjectRow } from '~/types/project';

definePageMeta({ layout: 'backstage' });

const { checkAuth } = useBackstageAuth();
onMounted(checkAuth);

const projects = ref<ProjectRow[]>([]);
const isLoading = ref(true);
const loadError = ref('');

const isDeleteModalOpen = ref(false);
const deleteTargetProject = ref<ProjectRow | null>(null);
const isDeleting = ref(false);

const openDeleteModal = (project: ProjectRow): void => {
    deleteTargetProject.value = project;
    isDeleteModalOpen.value = true;
};

const closeDeleteModal = (): void => {
    if (isDeleting.value) return;
    isDeleteModalOpen.value = false;
    deleteTargetProject.value = null;
};

// ── 拖曳排序 ────────────────────────────────────────────────

const dragIndex = ref<number | null>(null);
const dragOverIndex = ref<number | null>(null);
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';
const saveOrderStatus = ref<SaveStatus>('idle');

const onDragStart = (index: number, event: DragEvent): void => {
    dragIndex.value = index;
    if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
    }
};

const onDragOver = (index: number): void => {
    if (dragIndex.value === null || dragIndex.value === index) {
        return;
    }
    dragOverIndex.value = index;
};

const onDragLeave = (): void => {
    dragOverIndex.value = null;
};

const onDrop = async (dropIndex: number): Promise<void> => {
    if (dragIndex.value === null || dragIndex.value === dropIndex) {
        dragOverIndex.value = null;
        dragIndex.value = null;
        return;
    }

    const items = [...projects.value];
    const [moved] = items.splice(dragIndex.value, 1);
    items.splice(dropIndex, 0, moved as ProjectRow);
    projects.value = items;

    dragOverIndex.value = null;
    dragIndex.value = null;

    await saveOrder();
};

const onDragEnd = (): void => {
    dragIndex.value = null;
    dragOverIndex.value = null;
};

const saveOrder = async (): Promise<void> => {
    saveOrderStatus.value = 'saving';
    try {
        const payload = projects.value.map((p, index) => ({
            id: p.id,
            sort_order: index
        }));

        await $fetch('/api/backstage/projects/reorder', {
            method: 'PATCH',
            body: payload
        });

        projects.value = projects.value.map((p, index) => ({ ...p, sort_order: index }));
        saveOrderStatus.value = 'saved';
        setTimeout(() => {
            saveOrderStatus.value = 'idle';
        }, 2000);
    }
    catch {
        saveOrderStatus.value = 'error';
        setTimeout(() => {
            saveOrderStatus.value = 'idle';
        }, 3000);
    }
};

// ── 資料載入 / 刪除 ─────────────────────────────────────────

const fetchProjects = async (): Promise<void> => {
    isLoading.value = true;
    loadError.value = '';
    try {
        projects.value = await $fetch<ProjectRow[]>('/api/backstage/projects');
    }
    catch {
        loadError.value = '載入失敗，請重新整理頁面';
    }
    isLoading.value = false;
};

const confirmDelete = async (): Promise<void> => {
    if (!deleteTargetProject.value) return;
    const id = deleteTargetProject.value.id;
    isDeleting.value = true;
    try {
        await $fetch(`/api/backstage/projects/${id}`, { method: 'DELETE' });
        projects.value = projects.value.filter((p) => p.id !== id);
        isDeleteModalOpen.value = false;
        deleteTargetProject.value = null;
    }
    catch {
        console.error('刪除失敗，請稍後再試');
    }
    isDeleting.value = false;
};

onMounted(fetchProjects);
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.projects-page {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 32px;
}

.page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-left {
    display: flex;
    gap: 12px;
    align-items: baseline;
}

.header-right {
    display: flex;
    gap: 16px;
    align-items: center;
}

.page-title {
    margin: 0;
    color: $grey-50;
    font-weight: $font-weight-semibold;
    font-size: $font-size-xxl;
}

.project-count {
    color: $grey-300;
    font-size: $font-size-sm;
}

.save-status {
    font-size: $font-size-sm;

    &.save-status-saving { color: $grey-300; }
    &.save-status-saved  { color: #81c784; }
    &.save-status-error  { color: #e57373; }
}

.fade-enter-active,
.fade-leave-active { transition: opacity $transition-base; }

.fade-enter-from,
.fade-leave-to     { opacity: 0; }

.btn-primary {
    padding: 8px 20px;
    border: none;
    border-radius: $border-radius-full;
    background: $indigo-200;
    color: $indigo-900;
    cursor: pointer;
    transition: background-color $transition-base;
    white-space: nowrap;
    text-decoration: none;
    font-weight: $font-weight-medium;
    font-size: $font-size-sm;

    &:hover {
        background-color: $indigo-300;
    }
}

.status-message {
    padding: 48px;
    color: $grey-300;
    text-align: center;
    font-size: $font-size-base;

    &.status-error {
        color: #e57373;
    }
}

.table-wrapper {
    overflow-x: auto;
    border: 1px solid $grey-700;
    border-radius: $border-radius-lg;
}

.projects-table {
    width: 100%;
    border-collapse: collapse;
    font-size: $font-size-sm;

    th {
        padding: 12px 16px;
        border-bottom: 1px solid $grey-700;
        background-color: $grey-800;
        color: $grey-300;
        text-align: left;
        white-space: nowrap;
        font-weight: $font-weight-medium;
    }

    td {
        padding: 12px 16px;
        border-bottom: 1px solid $grey-700;
        color: $grey-100;
        transition: background-color $transition-fast, border-color $transition-fast;
        vertical-align: middle;
    }

    .table-row {
        &:last-child td {
            border-bottom: none;
        }

        &:hover:not(.is-dragging) td {
            background-color: $grey-800;
        }

        &.is-dragging td {
            opacity: 0.35;
        }

        &.drag-over-top td {
            border-top: 2px solid $indigo-400;
            background-color: rgb(105 165 255 / 5%);
        }

        &.drag-over-bottom td {
            border-bottom: 2px solid $indigo-400;
            background-color: rgb(105 165 255 / 5%);
        }
    }
}

.col-drag     {
    width: 40px;
    padding: 0 8px 0 16px !important;
}
.col-order    { width: 60px; }
.col-id       { width: 180px; }
.col-title    { width: 200px; }
.col-category { width: 120px; }
.col-year     { width: 70px; }

.col-badge {
    width: 80px;
    text-align: center;
}

.col-actions  { width: 280px; }

.drag-handle {
    display: block;
    color: $grey-600;
    cursor: grab;
    user-select: none;
    transition: color $transition-fast;
    text-align: center;
    font-size: 18px;
    line-height: 1;

    &:hover {
        color: $grey-300;
    }

    &:active {
        cursor: grabbing;
    }
}

.cell-muted {
    color: $grey-300;
}

.cell-code {
    color: $indigo-200;
    font-size: $font-size-xs;
    font-family: monospace;
}

.tag {
    display: inline-block;
    padding: 2px 10px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-full;
    color: $grey-200;
    font-size: $font-size-xs;
}

.badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: $border-radius-full;
    font-weight: $font-weight-medium;
    font-size: $font-size-xs;

    &.badge-on {
        background-color: rgb(105 165 255 / 15%);
        color: $indigo-100;
    }

    &.badge-warn {
        background-color: rgb(255 165 0 / 15%);
        color: #ffa726;
    }

    &.badge-off {
        color: $grey-400;
    }

    &.badge-active {
        background-color: rgb(72 199 142 / 15%);
        color: #48c78e;
    }

    &.badge-inactive {
        background-color: rgb(255 100 100 / 12%);
        color: #ff6b6b;
    }
}

.action-buttons {
    display: flex;
    gap: 8px;
    align-items: center;
}

.btn-view {
    padding: 4px 12px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-md;
    color: $grey-200;
    cursor: pointer;
    transition: all $transition-base;
    white-space: nowrap;
    text-decoration: none;
    font-size: $font-size-xs;

    &:hover {
        border-color: #48c78e;
        color: #48c78e;
    }
}

.btn-edit {
    padding: 4px 12px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-md;
    color: $grey-200;
    cursor: pointer;
    transition: all $transition-base;
    text-decoration: none;
    font-size: $font-size-xs;

    &:hover {
        border-color: $indigo-400;
        color: $indigo-200;
    }
}

.btn-delete {
    padding: 4px 12px;
    border: 1px solid transparent;
    border-radius: $border-radius-md;
    background: transparent;
    color: $grey-400;
    cursor: pointer;
    transition: all $transition-base;
    font-size: $font-size-xs;

    &:hover {
        border-color: $error-color;
        color: #e57373;
    }
}

.btn-confirm-delete {
    padding: 8px 20px;
    border: 1px solid $error-color;
    border-radius: $border-radius-md;
    background: rgb(244 67 54 / 15%);
    color: #e57373;
    cursor: pointer;
    transition: all $transition-base;
    font-size: $font-size-sm;

    &:hover:not(:disabled) {
        background: rgb(244 67 54 / 25%);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
}

.btn-cancel {
    padding: 8px 20px;
    border: 1px solid $grey-600;
    border-radius: $border-radius-md;
    background: transparent;
    color: $grey-300;
    cursor: pointer;
    transition: all $transition-base;
    font-size: $font-size-sm;

    &:hover:not(:disabled) {
        border-color: $grey-400;
        color: $grey-100;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
}

// ── Modal ──────────────────────────────────────────────────

.modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(0 0 0 / 60%);
}

.modal-dialog {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 400px;
    max-width: calc(100vw - 48px);
    padding: 28px 32px;
    border: 1px solid $grey-700;
    border-radius: $border-radius-lg;
    background: $grey-800;
}

.modal-title {
    margin: 0;
    color: $grey-50;
    font-weight: $font-weight-semibold;
    font-size: $font-size-base;
}

.modal-body {
    margin: 0;
    color: $grey-300;
    font-size: $font-size-sm;
    line-height: 1.6;
}

.modal-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 8px;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.2s ease;

    .modal-dialog {
        transition: transform 0.2s ease;
    }
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;

    .modal-dialog {
        transform: scale(0.96);
    }
}
</style>
