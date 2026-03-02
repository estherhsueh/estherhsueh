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
    detailImageCount: number
    isLocked: boolean
}

// 首頁 - Featured Projects 專案列表 ID
const FEATURED_PROJECT_LIST = [
    'kkday-homepage-redesign',
    'kkday-marketplace',
    'ecommerce-pos-system',
    'kkday-transport',
    'live-dealer-gaming-app'
];

// 首頁 - Design Gallery 專案列表 ID
const GALLERY_PROJECT_LIST = [
    'chang-hong-website',
    'securities-e-stock-landing',
    'fashion-finance-website',
    'taishin-loan-landing-2'
];

// 所有專案的完整資料
const allProjects: ProjectData[] = [
    // Live dealer gaming app
    {
        id: 'live-dealer-gaming-app',
        title: {
            'zh-TW': 'Live dealer gaming app',
            'en-US': 'Live dealer gaming app'
        },
        description: {
            'zh-TW': 'This is a scalable Ul system for live casino games and it supports a unified mobile interface for 10+ real-time table games.',
            'en-US': 'This is a scalable Ul system for live casino games and it supports a unified mobile interface for 10+ real-time table games.'
        },
        company: {
            'zh-TW': '',
            'en-US': ''
        },
        responsibilities: {
            'zh-TW': 'UI/UX 設計、設計系統、設計QA',
            'en-US': 'UI/UX 設計、設計系統、設計QA'
        },
        duration: '2024',
        category: 'APP',
        tags: ['APP', 'Gaming'],
        detailImageCount: 1,
        isLocked: false
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
            'zh-TW': 'UI/UX 設計、競品分析、設計系統、設計規格書、設計QA',
            'en-US': 'UI/UX 設計、競品分析、設計系統、設計規格書、設計QA'
        },
        duration: '2021',
        category: 'Web',
        tags: ['Web', 'E-commerce'],
        detailImageCount: 1,
        isLocked: true
    },
    // KKday Marketplace
    {
        id: 'kkday-marketplace',
        title: {
            'zh-TW': 'KKday Marketplace',
            'en-US': 'KKday Marketplace'
        },
        description: {
            'zh-TW': '配合平台由直營轉向開放商城的商業轉型，我主導了使用者端介面的架構優化。藉由改良商品卡片，精準區隔自營與供應商識別，並延伸打造專屬商家頁與對話系統，優化售前諮詢的互動流程，有效建立開放商城環境下的信任感與品牌價值。',
            'en-US': '配合平台由直營轉向開放商城的商業轉型，我主導了使用者端介面的架構優化。藉由改良商品卡片，精準區隔自營與供應商識別，並延伸打造專屬商家頁與對話系統，優化售前諮詢的互動流程，有效建立開放商城環境下的信任感與品牌價值。'
        },
        company: {
            'zh-TW': 'KKday',
            'en-US': 'KKday'
        },
        responsibilities: {
            'zh-TW': 'UI/UX 設計、競品分析、設計系統、設計規格書、設計QA',
            'en-US': 'UI/UX 設計、競品分析、設計系統、設計規格書、設計QA'
        },
        duration: '2021',
        category: 'APP',
        tags: ['APP', 'E-commerce'],
        detailImageCount: 10,
        isLocked: true
    },
    // KKday 首頁改版(待更新
    {
        id: 'kkday-homepage-redesign',
        title: {
            'zh-TW': 'KKday 首頁改版(待更新',
            'en-US': 'KKday 首頁改版(待更新'
        },
        description: {
            'zh-TW': '為提升使用者瀏覽效率並支援各地市場的在地化需求，對 KKday首頁進行全面體驗優化。專案分兩階段推動：先統個平台的視覺風格，強化商品卡片的資訊層級；再重新設計首頁大分類入口，使其兼具直觀導覽與彈性調整能力，讓首頁更能貼近不同市場的使用者習慣與推廣策略。',
            'en-US': '為提升使用者瀏覽效率並支援各地市場的在地化需求，對 KKday首頁進行全面體驗優化。專案分兩階段推動：先統個平台的視覺風格，強化商品卡片的資訊層級；再重新設計首頁大分類入口，使其兼具直觀導覽與彈性調整能力，讓首頁更能貼近不同市場的使用者習慣與推廣策略。'
        },
        company: {
            'zh-TW': 'KKday',
            'en-US': 'KKday'
        },
        responsibilities: {
            'zh-TW': 'UI/UX 設計、競品分析、使用者流程、設計系統、設計規格書、設計QA',
            'en-US': 'UI/UX 設計、競品分析、使用者流程、設計系統、設計規格書、設計QA'
        },
        duration: '2021',
        category: 'APP',
        tags: ['APP', 'E-commerce'],
        detailImageCount: 1,
        isLocked: true
    },
    // 電商POS系統
    {
        id: 'ecommerce-pos-system',
        title: {
            'zh-TW': '電商POS系統',
            'en-US': '電商POS系統'
        },
        description: {
            'zh-TW': '用直覺易用、簡單明瞭的POS介面，減輕店員每一分操作負擔。從零打造可擴展的設計系統，一站整合收銀、庫存與促銷等功能，輕鬆支援線上、線下與虛實整合銷售模式。',
            'en-US': '用直覺易用、簡單明瞭的POS介面，減輕店員每一分操作負擔。從零打造可擴展的設計系統，一站整合收銀、庫存與促銷等功能，輕鬆支援線上、線下與虛實整合銷售模式。'
        },
        company: {
            'zh-TW': 'Waca',
            'en-US': 'Waca'
        },
        responsibilities: {
            'zh-TW': 'UI/UX 設計、競品分析、使用者流程、設計系統、設計規格書',
            'en-US': 'UI/UX 設計、競品分析、使用者流程、設計系統、設計規格書'
        },
        duration: '2021',
        category: 'APP',
        tags: ['APP', 'B2B'],
        detailImageCount: 6,
        isLocked: true
    },
    // 銀行信貸活動網頁
    {
        id: 'taishin-loan-landing',
        title: {
            'zh-TW': '銀行信貸活動網頁',
            'en-US': '銀行信貸活動網頁'
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
            'zh-TW': 'UI/UX 設計、活動主視覺、設計QA、互動動效、行銷文宣設計',
            'en-US': 'UI/UX 設計、活動主視覺、設計QA、互動動效、行銷文宣設計'
        },
        duration: '2023',
        category: 'Landing Page',
        tags: ['Landing Page', 'Fintech'],
        detailImageCount: 1,
        isLocked: false
    },
    // 證券美股交易活動網頁
    {
        id: 'securities-stock-landing',
        title: {
            'zh-TW': '證券美股交易活動網頁',
            'en-US': '證券美股交易活動網頁'
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
            'zh-TW': 'UI/UX 設計、活動主視覺、設計QA、互動動效、行銷文宣設計',
            'en-US': 'UI/UX 設計、活動主視覺、設計QA、互動動效、行銷文宣設計'
        },
        duration: '2023',
        category: 'Landing Page',
        tags: ['Landing Page', 'Fintech'],
        detailImageCount: 1,
        isLocked: false
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
            'zh-TW': 'UI/UX 設計、視覺風格定義、設計系統、資訊架構',
            'en-US': 'UI/UX 設計、視覺風格定義、設計系統、資訊架構'
        },
        duration: '2024',
        category: 'Web',
        tags: ['Web', 'Corporate'],
        detailImageCount: 7,
        isLocked: true
    },
    // 數位金融與時尚品牌聯名網站
    {
        id: 'fashion-finance-website',
        title: {
            'zh-TW': '數位金融與時尚品牌聯名網站',
            'en-US': '數位金融與時尚品牌聯名網站'
        },
        description: {
            'zh-TW': '為永豐銀行DAWHO×時尚品牌BLVCK聯名打造活動主視覺。以層次黑調與金屬光澤，融合時尚美學與數位金融，打造貼近年輕世代的理財體驗。透過有辨識度的視覺語言，迅速吸引注意，重塑兼具潮流感與功能性的金融服務。',
            'en-US': '為永豐銀行DAWHO×時尚品牌BLVCK聯名打造活動主視覺。以層次黑調與金屬光澤，融合時尚美學與數位金融，打造貼近年輕世代的理財體驗。透過有辨識度的視覺語言，迅速吸引注意，重塑兼具潮流感與功能性的金融服務。'
        },
        company: {
            'zh-TW': '永豐DAWHO',
            'en-US': '永豐DAWHO'
        },
        responsibilities: {
            'zh-TW': 'UI/UX 設計、活動主視覺、設計QA、互動動效、行銷文宣設計',
            'en-US': 'UI/UX 設計、活動主視覺、設計QA、互動動效、行銷文宣設計'
        },
        duration: '2022',
        category: 'Landing Page',
        tags: ['Landing Page', 'Fintech'],
        detailImageCount: 1,
        isLocked: false
    },
    // 證券理財Landing page
    {
        id: 'securities-e-stock-landing',
        title: {
            'zh-TW': '證券理財Landing page',
            'en-US': '證券理財Landing page'
        },
        description: {
            'zh-TW': '主導兆豐證券「e存股」平台整體 VI 與 Landing Page 設計，並延伸發展多檔行銷 Banner，以清晰排版和專業生動的插畫設計，讓複雜金融服務變得直覺易讀。',
            'en-US': '主導兆豐證券「e存股」平台整體 VI 與 Landing Page 設計，並延伸發展多檔行銷 Banner，以清晰排版和專業生動的插畫設計，讓複雜金融服務變得直覺易讀。'
        },
        company: {
            'zh-TW': '兆豐證券',
            'en-US': '兆豐證券'
        },
        responsibilities: {
            'zh-TW': 'UI/UX 設計、活動主視覺、互動動效、設計QA、行銷文宣設計',
            'en-US': 'UI/UX 設計、活動主視覺、互動動效、設計QA、行銷文宣設計'
        },
        duration: '2024',
        category: 'Landing Page',
        tags: ['Landing Page', 'Fintech'],
        detailImageCount: 1,
        isLocked: false
    },
    // 信貸限時活動Landing page
    {
        id: 'taishin-loan-landing-2',
        title: {
            'zh-TW': '信貸限時活動Landing page',
            'en-US': '信貸限時活動Landing page'
        },
        description: {
            'zh-TW': '延續台新品牌風格，注入柔和現代色調。聚焦行動優先的申辦流程與商品導覽。並透過一致的視覺系統，整合多元信貸商品資訊。',
            'en-US': '延續台新品牌風格，注入柔和現代色調。聚焦行動優先的申辦流程與商品導覽。並透過一致的視覺系統，整合多元信貸商品資訊。'
        },
        company: {
            'zh-TW': '台新銀行',
            'en-US': '台新銀行'
        },
        responsibilities: {
            'zh-TW': 'UI/UX 設計、活動主視覺、互動動效、設計QA、行銷文宣設計',
            'en-US': 'UI/UX 設計、活動主視覺、互動動效、設計QA、行銷文宣設計'
        },
        duration: '2025',
        category: 'Landing Page',
        tags: ['Landing Page', 'Fintech'],
        detailImageCount: 1,
        isLocked: false
    }
];

export default allProjects;
export { FEATURED_PROJECT_LIST, GALLERY_PROJECT_LIST };
