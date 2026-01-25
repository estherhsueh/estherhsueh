# i18n 語系檔案拆分說明

## 📁 新的檔案結構

```
i18n/
├── i18n.config.ts          # i18n 配置檔案（已更新）
└── locales/
    ├── zh-TW/              # 繁體中文語系
    │   ├── index.ts        # 模組整合檔案
    │   ├── nav.json        # 導航列
    │   ├── home.json       # 首頁
    │   ├── work.json       # 作品列表
    │   ├── workDetail.json # 作品詳情
    │   ├── about.json      # 關於頁面
    │   ├── auth.json       # 認證相關
    │   ├── common.json     # 通用文案
    │   └── footer.json     # 頁尾
    └── en-US/              # 英文語系
        ├── index.ts        # 模組整合檔案
        ├── nav.json        # 導航列
        ├── home.json       # 首頁
        ├── work.json       # 作品列表
        ├── workDetail.json # 作品詳情
        ├── about.json      # 關於頁面
        ├── auth.json       # 認證相關
        ├── common.json     # 通用文案
        └── footer.json     # 頁尾
```

## 🎯 拆分模組說明

### 1. **nav.json** - 導航列
- 包含所有導航連結的文案
- 用於 Header 組件

### 2. **home.json** - 首頁
- Hero 區塊文案
- Featured Projects 文案
- Design Gallery 文案
- CTA 區塊文案

### 3. **work.json** - 作品列表
- 頁面標題
- 篩選器文案
- 所有專案資料

### 4. **workDetail.json** - 作品詳情
- Overview 區塊文案
- 專案詳細資訊
- 其他專案推薦文案

### 5. **about.json** - 關於頁面
- Hero 區塊
- Skills & Services
- How I Work
- Experience
- Clients
- Learning
- Tools

### 6. **auth.json** - 認證相關
- 登入表單
- 註冊表單
- 錯誤訊息

### 7. **common.json** - 通用文案
- 按鈕文字
- 狀態訊息
- 常用詞彙

### 8. **footer.json** - 頁尾
- 版權聲明

## 💡 使用方式

在組件中使用時，路徑保持不變：

```vue
<!-- 導航列 -->
{{ $t('nav.home') }}

<!-- 首頁 -->
{{ $t('home.hero.greeting') }}

<!-- 作品列表 -->
{{ $t('work.title') }}

<!-- 作品詳情 -->
{{ $t('workDetail.overview.company') }}

<!-- 關於頁面 -->
{{ $t('about.hero.name') }}

<!-- 通用 -->
{{ $t('common.loading') }}

<!-- 頁尾 -->
{{ $t('footer.copyright') }}
```

## ✅ 優點

1. **更易維護**：每個模組獨立，修改不影響其他模組
2. **更易查找**：按功能分類，快速找到需要的文案
3. **更易協作**：多人可同時編輯不同模組
4. **更易擴展**：新增功能時只需新增對應模組
5. **減少衝突**：Git 合併時衝突機率大幅降低

## 🔄 遷移完成

- ✅ 已將原有的 `zh-TW.json` 拆分為 8 個模組
- ✅ 已將原有的 `en-US.json` 拆分為 8 個模組
- ✅ 已創建索引檔案整合所有模組
- ✅ 已更新 `i18n.config.ts` 配置
- ✅ 原有的使用方式完全不變，無需修改組件程式碼

## 📝 注意事項

- 原有的 `zh-TW.json` 和 `en-US.json` 可以保留作為備份
- 如需新增文案，請編輯對應的模組檔案
- 如需新增模組，記得在 `index.ts` 中引入並匯出
