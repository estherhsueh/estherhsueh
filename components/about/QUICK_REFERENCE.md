# About 頁面快速參考

## 檔案結構

```
pages/
└── about.vue                    # About 主頁面

components/about/
├── AboutHero.vue               # 個人簡介
├── AboutSkills.vue             # 技能服務
├── AboutHowIWork.vue           # 工作流程
├── AboutExperience.vue         # 工作經歷
├── AboutClients.vue            # 客戶標誌
├── AboutLearning.vue           # 學習課程
└── AboutTools.vue              # 使用工具
```

## 常用變數速查

### 顏色
| 變數 | 值 | 用途 |
|------|-----|------|
| `$grey-50` | `#f6f6f6` | 主要文字 |
| `$grey-200` | `#a3a4b5` | 次要文字 |
| `$grey-300` | `#67697c` | 標籤文字 |
| `$grey-500` | `#373946` | 邊框 |
| `$grey-700` | `#20212b` | 卡片背景 |
| `$grey-800` | `#16171f` | 容器背景 |
| `$grey-900` | `#010109` | 頁面背景 |
| `$indigo-200` | `#b897fe` | 按鈕背景 |
| `$indigo-400` | `#8952fd` | 漸變起點 |

### 間距
| 變數 | 值 | 用途 |
|------|-----|------|
| `$spacing-xs` | `8px` | 極小間距 |
| `$spacing-sm` | `12px` | 小間距 |
| `$spacing-md` | `20px` | 中間距 |
| `$spacing-lg` | `30px` | 大間距 |
| `$spacing-xl` | `40px` | 超大間距 |
| `$spacing-xxl` | `60px` | 極大間距 |

### 字體
| 變數 | 值 | 用途 |
|------|-----|------|
| `$font-family-en` | `'General Sans'` | 英文字體 |
| `$font-family-zh` | `'Noto Sans TC'` | 中文字體 |
| `$font-family-base` | 混合 | 中英混排 |
| `$font-size-base` | `16px` | 基礎字號 |
| `$font-size-lg` | `18px` | 大字號 |
| `$font-size-xl` | `24px` | 標題字號 |
| `$font-size-display` | `64px` | 大標題 |

### 響應式
```scss
@include md { ... }  // ≥768px (平板)
@include lg { ... }  // ≥1024px (桌面)
```

## 快速修改指南

### 更新個人資訊
**檔案：** `i18n/locales/zh-TW.json` 或 `en-US.json`

```json
"about": {
  "hero": {
    "name": "您的名字",
    "description": "您的簡介..."
  }
}
```

### 新增工作經歷
**檔案：** `components/about/AboutExperience.vue`

```typescript
const experiences: Experience[] = [
    {
        company: '公司名稱',
        title: '職位',
        startDate: '2025.01',
        endDate: 'present'
    },
    // ... 其他經歷
];
```

### 更新工具列表
**檔案：** `components/about/AboutTools.vue`

```typescript
const tools: Tool[] = [
    { name: 'Figma', category: '設計工具' },
    { name: '新工具', category: '工具類別' },
    // ... 其他工具
];
```

### 修改技能項目
**檔案：** `i18n/locales/zh-TW.json`

```json
"about": {
  "skills": {
    "ux": {
      "title": "UX 研究與定義",
      "items": ["項目1", "項目2", ...]
    }
  }
}
```

## 樣式調整建議

### 修改顏色
使用專案定義的變數，不要使用硬編碼顏色：

```scss
// ✅ 正確
color: $grey-50;
background: $grey-800;

// ❌ 錯誤
color: #ffffff;
background: #16171f;
```

### 調整間距
使用預定義的間距變數：

```scss
// ✅ 正確
padding: $spacing-lg;
margin-bottom: $spacing-xl;

// ❌ 錯誤
padding: 30px;
margin-bottom: 40px;
```

### 設置字體
根據內容選擇合適的字體變數：

```scss
// 純英文內容
font-family: $font-family-en;

// 純中文內容
font-family: $font-family-zh;

// 中英混排
font-family: $font-family-base;
```

## 常見問題

**Q: 如何添加新的區塊？**
A: 在 `components/about/` 創建新組件，然後在 `pages/about.vue` 中引入。

**Q: 如何修改響應式斷點？**
A: 斷點定義在 `assets/styles/variables.scss`，使用 mixin 即可。

**Q: 如何保持設計一致性？**
A: 始終使用專案定義的 SCSS 變數，參考現有組件的樣式寫法。

**Q: 圖片/圖標如何替換？**
A: 目前使用佔位符（漸變背景），可以替換為 `<img>` 或背景圖。

## 相關文檔

- 完整文檔：`components/about/README.md`
- 設計變數：`assets/styles/variables.scss`
- i18n 配置：`i18n/locales/`
