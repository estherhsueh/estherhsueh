// 專案資料類型定義
export interface ProjectData {
    id: string
    title: {
        'zh-TW': string
        'en-US': string
    }
    description: {
        'zh-TW': string
        'en-US': string
    }
    company: {
        'zh-TW': string
        'en-US': string
    }
    responsibilities: {
        'zh-TW': string
        'en-US': string
    }
    duration: string
    category: string
    tags: string[]
    image?: string
}

// 首頁 - Featured Projects 專案列表 ID
const FEATURED_PROJECT_LIST = [
    'taishin-loan-landing',
    'securities-stock-landing',
    'chang-hong-website',
    'kkday-transport'
];

// 首頁 - Design Gallery 專案列表 ID
const GALLERY_PROJECT_LIST = [
    'taishin-loan-landing',
    'securities-stock-landing',
    'chang-hong-website',
    'kkday-transport'
];

// 所有專案的完整資料
const allProjects: ProjectData[] = [
    // 銀行信貸活動Landing page
    {
        id: 'taishin-loan-landing',
        title: {
            'zh-TW': '銀行信貸活動Landing page',
            'en-US': '銀行信貸活動Landing page'
        },
        description: {
            'zh-TW': '',
            'en-US': ''
        },
        company: {
            'zh-TW': '台新銀行',
            'en-US': '台新銀行'
        },
        responsibilities: {
            'zh-TW': '',
            'en-US': ''
        },
        duration: '2023',
        category: 'Landing Page',
        tags: ['APP', 'UX Research']
    },
    // 證券美股交易活動
    {
        id: 'securities-stock-landing',
        title: {
            'zh-TW': '證券美股交易活動',
            'en-US': '證券美股交易活動'
        },
        description: {
            'zh-TW': '',
            'en-US': ''
        },
        company: {
            'zh-TW': '兆豐證券',
            'en-US': '兆豐證券'
        },
        responsibilities: {
            'zh-TW': '',
            'en-US': ''
        },
        duration: '2023',
        category: 'Landing Page',
        tags: ['APP', 'UX Research']
    },
    // 建設公司官網設計
    {
        id: 'chang-hong-website',
        title: {
            'zh-TW': '建設公司官網設計',
            'en-US': '建設公司官網設計'
        },
        description: {
            'zh-TW': '長虹建設原有官方網站因介面老舊、內容更新流程繁瑣，難以有效傳達企業價值與即時資訊。為重塑品牌形象並提升使用者體驗，客戶委託進行官網全面改版，本人負責本次專案的整體 UI 設計工作。',
            'en-US': '長虹建設原有官方網站因介面老舊、內容更新流程繁瑣，難以有效傳達企業價值與即時資訊。為重塑品牌形象並提升使用者體驗，客戶委託進行官網全面改版，本人負責本次專案的整體 UI 設計工作。'
        },
        company: {
            'zh-TW': '長虹建設股份有限公司',
            'en-US': '長虹建設股份有限公司'
        },
        responsibilities: {
            'zh-TW': '',
            'en-US': ''
        },
        duration: '2024',
        category: 'Landing Page',
        tags: ['APP', 'UX Research']
    },
    // KKday點對點交通
    {
        id: 'kkday-transport',
        title: {
            'zh-TW': 'KKday點對點交通',
            'en-US': 'KKday點對點交通'
        },
        description: {
            'zh-TW': '因應後疫情自助旅潮，為KKday擴展多元交通產品線，打造一站式租車預訂體驗。採用Desktop First策略優化複雜決策流程，並建立可擴充的響應式設計規範。從桌機端延伸至多裝置，以清晰的資訊架構提升用戶預訂效率與轉化率。',
            'en-US': '因應後疫情自助旅潮，為KKday擴展多元交通產品線，打造一站式租車預訂體驗。採用Desktop First策略優化複雜決策流程，並建立可擴充的響應式設計規範。從桌機端延伸至多裝置，以清晰的資訊架構提升用戶預訂效率與轉化率。'
        },
        company: {
            'zh-TW': 'KKday',
            'en-US': 'KKday'
        },
        responsibilities: {
            'zh-TW': '競品分析、Web UI、撰寫設計規格書',
            'en-US': '競品分析、Web UI、撰寫設計規格書'
        },
        duration: '2024',
        category: 'Landing Page',
        tags: ['APP', 'UX Research']
    }
];

export default allProjects;
export { FEATURED_PROJECT_LIST, GALLERY_PROJECT_LIST };
