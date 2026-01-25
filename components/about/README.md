# About 頁面組件

## 概述
About 頁面展示個人簡介、技能、工作經歷等資訊。頁面已拆分為多個獨立組件以提高可維護性。

## 組件結構

```
components/about/
├── AboutHero.vue          # 英雄區塊 - 頭像、介紹、按鈕
├── AboutSkills.vue        # 技能與服務 - 三個技能類別
├── AboutHowIWork.vue      # 工作流程 - 四個步驟
├── AboutExperience.vue    # 工作經歷 - 時間軸列表
├── AboutClients.vue       # 客戶合作 - 客戶標誌
├── AboutLearning.vue      # 持續學習 - 課程卡片
└── AboutTools.vue         # 使用工具 - 工具列表
```

## 組件說明

### 1. AboutHero.vue
**功能：** 展示個人頭像、姓名、簡介和聯絡按鈕

**設計規格：**
- 頭像：300x300px 圓形
- 標題字體：Playfair Display, 60px, Italic, Semibold
- 描述字體：Noto Sans TC, 16px
- 按鈕：紫色背景 (#b897fe)，圓角 12px

**響應式：**
- Mobile: 縱向排列
- Desktop (≥1024px): 橫向排列，間距 60px

### 2. AboutSkills.vue
**功能：** 展示三個技能類別及其細項

**技能類別：**
1. UX 研究與定義
2. UI 介面與互動設計
3. 品牌與多媒體整合

**設計規格：**
- 圖標：120x120px，漸變背景
- 標題字體：General Sans, 24px, Medium
- 列表項字體：Noto Sans TC, 22px

**響應式：**
- Mobile: 單欄
- Tablet (≥768px): 雙欄
- Desktop (≥1024px): 三欄，間距 220px

### 3. AboutHowIWork.vue
**功能：** 展示四個工作流程步驟

**步驟：**
1. 了解與定義問題
2. 設計發想與架構
3. 介面設計與規範
4. 迭代優化與上線

**設計規格：**
- 卡片背景：#20212b，圓角 16px
- 數字：漸變色 (#8952fd → #321967)，36px, Italic
- 標題字體：Noto Sans TC, 20px, Medium
- 描述字體：Noto Sans TC, 16px

**響應式：**
- Mobile: 單欄
- Tablet (≥768px): 雙欄
- Desktop (≥1024px): 四欄

### 4. AboutExperience.vue
**功能：** 展示工作經歷時間軸

**資料結構：**
```typescript
interface Experience {
    company: string    // 公司名稱
    title: string      // 職位
    startDate: string  // 開始日期
    endDate?: string   // 結束日期（可選）
}
```

**設計規格：**
- 外框背景：#16171f，圓角 32px
- 項目背景：#20212b，圓角 12px
- 公司名字體：General Sans / Noto Sans TC, 24px, Medium
- 職位字體：General Sans, 18px

**響應式：**
- Mobile: 縱向排列
- Tablet (≥768px): 橫向排列，兩端對齊

### 5. AboutClients.vue
**功能：** 展示合作客戶標誌

**設計規格：**
- 標誌大小：160x48px
- 背景：白色 5% 透明度
- 圓角：8px

**響應式：**
- 橫向滾動顯示

### 6. AboutLearning.vue
**功能：** 展示持續學習的課程

**資料結構：**
```typescript
interface Course {
    title: string  // 課程標題
}
```

**設計規格：**
- 卡片背景：#16171f，圓角 16px
- 課程圖片：166px 高度，漸變背景
- 標題字體：Noto Sans TC, 16px, Medium
- 進度條：5px 高度，漸變色 (#383ad2 → #fc5cc4)

**響應式：**
- Mobile: 單欄
- Tablet (≥768px): 雙欄
- Desktop (≥1024px): 四欄

### 7. AboutTools.vue
**功能：** 展示常用工具列表

**資料結構：**
```typescript
interface Tool {
    name: string      // 工具名稱
    category: string  // 工具類別
}
```

**設計規格：**
- 外框背景：#16171f，圓角 32px
- 項目背景：#20212b，圓角 12px
- 圖標：56x56px，漸變背景
- 名稱字體：General Sans, 24px, Medium
- 類別字體：Noto Sans TC, 16px

**響應式：**
- Mobile: 單欄
- Tablet (≥768px): 雙欄
- Desktop (≥1024px): 三欄

## 使用的 SCSS 變數

### 顏色變數
```scss
$grey-50: #f6f6f6      // 主要文字色
$grey-200: #a3a4b5     // 輔助文字色
$grey-300: #67697c     // 標籤文字
$grey-500: #373946     // 邊框色
$grey-600: #292a36     // 卡片邊框
$grey-700: #20212b     // 深色邊框/卡片背景
$grey-800: #16171f     // 容器背景
$grey-900: #010109     // 主背景色

$indigo-200: #b897fe   // 按鈕背景
$indigo-400: #8952fd   // 漸變起點
$indigo-800: #321867   // 漸變終點
```

### 間距變數
```scss
$spacing-xs: 8px
$spacing-sm: 12px
$spacing-md: 20px
$spacing-lg: 30px
$spacing-xl: 40px
$spacing-xxl: 60px
$spacing-24: 24px
$spacing-32: 32px
$spacing-56: 56px
```

### 字體變數
```scss
$font-family-en: 'General Sans', ...
$font-family-zh: 'Noto Sans TC', ...
$font-family-base: $font-family-en, $font-family-zh

$font-size-xs: 12px
$font-size-base: 16px
$font-size-lg: 18px
$font-size-xl: 24px
$font-size-xxxl: 36px
$font-size-48: 48px
$font-size-display: 64px
$font-size-22: 22px
```

### 其他變數
```scss
$border-radius-md: 8px
$border-radius-lg: 12px
$transition-base: 0.2s
$container-full: 1440px
```

## 響應式斷點

```scss
$breakpoint-md: 768px   // 平板
$breakpoint-lg: 1024px  // 桌面

// Mixins 使用
@include md { ... }  // ≥768px
@include lg { ... }  // ≥1024px
```

## 多語言支援

所有文案通過 `i18n` 管理，定義於：
- `i18n/locales/zh-TW.json`
- `i18n/locales/en-US.json`

使用方式：
```vue
{{ $t('about.hero.name') }}
{{ $t('about.skills.title') }}
```

## 修改建議

1. **添加新工作經歷：** 修改 `AboutExperience.vue` 中的 `experiences` 陣列
2. **更新工具列表：** 修改 `AboutTools.vue` 中的 `tools` 陣列
3. **新增課程：** 修改 `AboutLearning.vue` 中的 `courses` 陣列
4. **修改文案：** 編輯 i18n 檔案中的對應項目
5. **調整樣式：** 使用專案定義的 SCSS 變數，保持一致性

## 設計規範遵循

所有組件嚴格遵循 Figma 設計稿規範：
- 顏色使用 Greyscale 和 Indigo 色盤
- 間距使用預定義的 spacing 變數
- 字體大小、粗細、行高符合設計系統
- 響應式斷點與 Figma 設計一致
