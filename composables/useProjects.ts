import type { ProjectRow } from '~/types/project';

type LocaleKey = 'zh-TW' | 'en-US';

export const useProjects = () => {
    const { data: allProjects, pending } = useAsyncData(
        'projects',
        () => $fetch<ProjectRow[]>('/api/projects'),
        { default: () => [] as ProjectRow[] }
    );

    // 首頁 - Featured Projects（依 featured_order 排序）
    const featuredProjects = computed(() =>
        (allProjects.value ?? [])
            .filter((p) => p.featured_order !== null)
            .sort((a, b) => (a.featured_order ?? 0) - (b.featured_order ?? 0))
    );

    // 首頁 - Design Gallery（依 gallery_order 排序）
    const galleryProjects = computed(() =>
        (allProjects.value ?? [])
            .filter((p) => p.gallery_order !== null)
            .sort((a, b) => (a.gallery_order ?? 0) - (b.gallery_order ?? 0))
    );

    // 根據 ID 取得單一專案
    const getProjectById = (id: string) =>
        computed(() => (allProjects.value ?? []).find((p) => p.id === id));

    // 取得推薦專案（排除當前專案，依 sort_order 取前 N 筆）
    const getRecommendedProjects = (currentId: string, limit = 3) =>
        computed(() =>
            (allProjects.value ?? [])
                .filter((p) => p.id !== currentId)
                .slice(0, limit)
        );

    // 根據篩選條件過濾專案（回傳陣列，配合外層 computed 使用）
    const getProjectsByFilter = (filter: string): ProjectRow[] => {
        const projects = allProjects.value ?? [];
        if (filter === 'all') {
            return projects;
        }
        const fv = filter.toLowerCase();
        return projects.filter((p) =>
            p.category.toLowerCase().includes(fv)
            || p.tags.some((t) => t.toLowerCase().includes(fv))
        );
    };

    // 從 ProjectRow 取得當前語系的文字欄位
    const getLocaleText = (field: Record<LocaleKey, string>, locale: string): string => {
        return field[locale as LocaleKey] ?? field['zh-TW'] ?? '';
    };

    return {
        allProjects,
        pending,
        featuredProjects,
        galleryProjects,
        getProjectById,
        getRecommendedProjects,
        getProjectsByFilter,
        getLocaleText
    };
};
