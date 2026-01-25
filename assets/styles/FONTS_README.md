# 字體配置說明

## 已配置的字體

### 1. General Sans (英文字體)
- **字重**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **來源**: Google Fonts
- **用途**: 英文內容、標題、介面元素

### 2. Noto Sans TC (繁體中文字體)
- **字重**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **來源**: Google Fonts
- **用途**: 中文內容

## 使用方式

### 在 SCSS 中使用

```scss
// 使用基礎字體系列（英文 + 中文）
.my-element {
  font-family: $font-family-base;
}

// 僅使用英文字體
.english-only {
  font-family: $font-family-en;
}

// 僅使用中文字體
.chinese-only {
  font-family: $font-family-zh;
}

// 使用不同字重
.medium-text {
  font-weight: $font-weight-medium; // 500
}

.semibold-text {
  font-weight: $font-weight-semibold; // 600
}

// 使用不同字體大小
.large-title {
  font-size: $font-size-display; // 64px
}

.heading {
  font-size: $font-size-xxl; // 32px
}
```

### 使用工具類別

```html
<!-- 字體系列 -->
<div class="font-en">English text only</div>
<div class="font-zh">中文文字專用</div>

<!-- 字體粗細 -->
<p class="font-weight-normal">一般粗細 (400)</p>
<p class="font-weight-medium">中等粗細 (500)</p>
<p class="font-weight-semibold">半粗體 (600)</p>
<p class="font-weight-bold">粗體 (700)</p>

<!-- 字體大小 -->
<h1 class="text-size-display">大標題 (64px)</h1>
<h2 class="text-size-xxxl">次標題 (36px)</h2>
<p class="text-size-base">內文 (16px)</p>
<small class="text-size-xs">小字 (12px)</small>
```

## 可用的字體變數

### 字體系列
- `$font-family-en` - 英文字體
- `$font-family-zh` - 中文字體
- `$font-family-base` - 混合字體（預設）

### 字體大小
- `$font-size-xs` - 12px
- `$font-size-sm` - 14px
- `$font-size-base` - 16px
- `$font-size-lg` - 18px
- `$font-size-xl` - 24px
- `$font-size-xxl` - 32px
- `$font-size-xxxl` - 36px
- `$font-size-display` - 64px

### 字體粗細
- `$font-weight-normal` - 400
- `$font-weight-medium` - 500
- `$font-weight-semibold` - 600
- `$font-weight-bold` - 700

## 檔案結構

```
assets/styles/
├── fonts.scss       # 字體引入（Google Fonts）
├── variables.scss   # 字體變數定義
└── main.scss        # 全域樣式 + 工具類別
```

## 注意事項

1. 字體會自動套用到整個專案的 `body` 元素
2. General Sans 和 Noto Sans TC 會自動從 Google Fonts CDN 載入
3. 如果需要離線使用，可以下載字體檔案並修改 `fonts.scss` 的引入方式
