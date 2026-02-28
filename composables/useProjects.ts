// 專案資料類型定義
export interface ProjectData {
    id: string
    title: string
    description?: string
    category: string
    tags: string[]
    image?: string
}

// 所有專案的完整資料
const allProjects: ProjectData[] = [
    {
        id: 'kkday-transport',
        title: 'KKday 點對點交通',
        description: '專案介紹文字，專案介紹文字，專案介紹文字，專案介紹文字，專案介紹文字，專案介紹文字，專案介紹文字，專案介紹文字，專案介紹文字，專案介紹文字，專案介紹文字，專案介紹文字，專案介紹文字。',
        category: 'APP',
        tags: ['APP', 'UX Research']
    },
    {
        id: 'ecommerce-pos',
        title: '電商POS系統',
        description: '這是一套專為實體零售門市打造的POS系統，透過直覺化的操作體驗，全面自動化管理收銀、庫存、進銷存等核心營運流程。系統與品牌官網無縫串接—所有在官網設定好的商品資料、售價策略與促銷活動，只要一鍵登入，就能即時同步到POS端，實現線上線下通路的高效整合。',
        category: 'APP',
        tags: ['POS', 'O2O']
    },
    {
        id: 'kkday-marketplace',
        title: 'KKday Marketplace',
        description: '這是一套專為實體零售門市打造的POS系統，透過直覺化的操作體驗，全面自動化管理收銀、庫存、進銷存等核心營運流程。系統與品牌官網無縫串接—所有在官網設定好的商品資料、售價策略與促銷活動，只要一鍵登入，就能即時同步到POS端，實現線上線下通路的高效整合。',
        category: 'APP',
        tags: ['APP', 'Web']
    },
    {
        id: 'live-casino',
        title: 'Live dealer gaming app',
        description: 'This is a scalable UI system for live casino games and and it supports a unified mobile interface for 10+ real-time table games.',
        category: 'APP',
        tags: ['APP', 'game ui']
    },
    {
        id: 'changhong-website',
        title: '建設公司官網設計',
        category: 'Web',
        tags: ['Web', 'RWD']
    },
    {
        id: 'securities-landing',
        title: '證券理財Landing page',
        category: 'LandingPage',
        tags: ['LandingPage', 'RWD']
    },
    {
        id: 'fashion-finance-website',
        title: '數位金融與時尚品牌聯名網站',
        category: 'LandingPage',
        tags: ['LandingPage', 'RWD']
    },
    {
        id: 'loan-landing',
        title: '信貸限時活動Landing page',
        category: 'LandingPage',
        tags: ['LandingPage', 'RWD']
    },
    {
        id: 'stock-landing',
        title: '美股投資活動Landing page',
        category: 'LandingPage',
        tags: ['LandingPage', 'RWD']
    },
    {
        id: 'securities-landing-2',
        title: '證券理財Landing page 2',
        category: 'LandingPage',
        tags: ['LandingPage', 'RWD']
    },
    {
        id: 'wealth-management',
        title: '財富管理系統',
        category: 'APP',
        tags: ['APP', 'iOS', 'Android']
    },
    {
        id: 'brand-identity',
        title: '品牌識別設計',
        category: 'Others',
        tags: ['Branding', 'Visual Design']
    },
    {
        id: 'marketing-materials',
        title: '行銷素材設計',
        category: 'Others',
        tags: ['Marketing', 'Print Design']
    }
];

/**
 * Composable for managing project data
 * 用於管理專案資料的 Composable
 */
export const useProjects = () => {
    // 獲取所有專案
    const getAllProjects = (): ProjectData[] => {
        return allProjects;
    };

    // 獲取精選專案（用於 Home 頁面）
    const getFeaturedProjects = (): ProjectData[] => {
        const projectList = [
            'changhong-website',
            'securities-landing',
            'fashion-finance-website',
            'loan-landing'
        ];

        return allProjects.filter((project) => projectList.includes(project.id));
    };

    // 獲取 Design Gallery 專案（用於 Home 頁面）
    const getGalleryProjects = (): ProjectData[] => {
        const projectList = [
            'changhong-website',
            'securities-landing',
            'fashion-finance-website',
            'loan-landing'
        ];

        return allProjects.filter((project) => projectList.includes(project.id));
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

    return {
        allProjects,
        getAllProjects,
        getFeaturedProjects,
        getGalleryProjects,
        getProjectById,
        getRecommendedProjects,
        getProjectsByFilter
    };
};
