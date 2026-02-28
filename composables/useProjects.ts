import allProjects, { FEATURED_PROJECT_LIST, GALLERY_PROJECT_LIST, type ProjectData } from '../data/projects';

/**
 * Composable for managing project data
 * 用於管理專案資料的 Composable
 */
export const useProjects = () => {
    // 獲取所有專案
    const getAllProjects = (): ProjectData[] => {
        return allProjects;
    };

    // 首頁 - 獲取 Featured Projects 專案
    const getFeaturedProjects = (): ProjectData[] => {
        return allProjects.filter((project) => FEATURED_PROJECT_LIST.includes(project.id));
    };

    // 首頁 - 獲取 Design Gallery 專案
    const getGalleryProjects = (): ProjectData[] => {
        return allProjects.filter((project) => GALLERY_PROJECT_LIST.includes(project.id));
    };

    // 根據 ID 獲取專案
    const getProjectById = (id: string): ProjectData | undefined => {
        return allProjects.find((project) => project.id === id);
    };

    // 獲取推薦專案（排除當前專案）
    const getRecommendedProjects = (currentId: string, limit = 3): ProjectData[] => {
        return allProjects
            .filter((project) => project.id !== currentId)
            .slice(0, limit);
    };

    // 根據篩選條件獲取專案
    const getProjectsByFilter = (filter: string): ProjectData[] => {
        if (filter === 'all') {
            return allProjects;
        }

        const filterValue = filter.toLowerCase();
        return allProjects.filter((project) => {
            const matchCategory = project.category.toLowerCase().includes(filterValue);
            const matchTags = project.tags.some((tag) => tag.toLowerCase().includes(filterValue));

            return matchCategory || matchTags;
        });
    };

    const getProjectLocaleData = (locale: string) => {
        const localeData: Record<string, {
            title: string
            description: string
            company: string
            responsibilities: string
        }> = {};

        allProjects.forEach((project) => {
            localeData[project.id] = {
                title: project.title[locale as keyof typeof project.title],
                description: project.description[locale as keyof typeof project.description],
                company: project.company[locale as keyof typeof project.company],
                responsibilities: project.responsibilities[locale as keyof typeof project.responsibilities]
            };
        });

        return localeData;
    };

    return {
        allProjects,
        getAllProjects,
        getFeaturedProjects,
        getGalleryProjects,
        getProjectById,
        getRecommendedProjects,
        getProjectsByFilter,
        getProjectLocaleData
    };
};
