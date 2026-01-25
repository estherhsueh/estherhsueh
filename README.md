# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Prerequisites

- Node.js 24.2.0 或更高版本
- npm, pnpm, yarn 或 bun

檢查您的 Node.js 版本：

```bash
node --version
```

如果版本低於 18.0.0，請升級 Node.js。建議使用 [nvm](https://github.com/nvm-sh/nvm) 管理 Node.js 版本：

```bash
# 使用 nvm 安裝並切換到專案指定版本
nvm use
```

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### 可用路由

專案已建立以下頁面和路由：

| 路由         | 說明                                 |
| ------------ | ------------------------------------ |
| `/`          | Home 首頁                            |
| `/work`      | Work 作品列表                        |
| `/work/:id`  | Work 作品詳細頁（如 `/work/1`）      |
| `/about`     | About 關於頁面                       |
| `/scss-demo` | SCSS 功能展示頁面                    |
| `/auth`      | 密碼驗證頁面（測試密碼：`admin123`） |

詳細的路由說明請參考 [ROUTES.md](./ROUTES.md)。

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Code Quality

This project uses ESLint and Stylelint with strict rules to maintain code quality.

### Linting

Check for linting errors:

```bash
# Check both ESLint and Stylelint
npm run lint

# Check ESLint only
npm run lint:eslint

# Check Stylelint only
npm run lint:stylelint
```

### Auto-fix Issues

Automatically fix linting issues:

```bash
# Fix both ESLint and Stylelint issues
npm run lint:fix

# Fix ESLint issues only
npm run lint:eslint:fix

# Fix Stylelint issues only
npm run lint:stylelint:fix
```

### Code Style Rules

- **TypeScript**: Strict typing, no `any`, explicit return types
- **Vue 3**: Script setup style, composition API, type-based props/emits
- **Auto Import**: Vue & Nuxt APIs 自動引入，無需手動 import（詳見 [AUTO-IMPORT.md](./AUTO-IMPORT.md)）
- **Formatting**: 2-space indent, single quotes, no semicolons
- **CSS/SCSS**: Properties ordered logically, consistent spacing, SCSS 專用配置
- **Max line length**: 120 characters

### VSCode 設定

專案已包含 `.vscode` 配置，會自動：

- 儲存時格式化程式碼
- 儲存時自動修復 ESLint 和 Stylelint 錯誤
- 即時顯示錯誤和警告

請安裝推薦的 VSCode 擴充套件（開啟專案時會自動提示）。

### 詳細說明

請參閱以下文件以了解完整配置：

- [SETUP-COMPLETE.md](./SETUP-COMPLETE.md) - 配置總結和快速參考
- [LINTING.md](./LINTING.md) - 詳細的 Linting 規則說明
- [AUTO-IMPORT.md](./AUTO-IMPORT.md) - Vue & Nuxt 自動引入 API 說明
- [STYLELINT-SCSS.md](./STYLELINT-SCSS.md) - Stylelint SCSS 配置說明
- [SCSS-GUIDE.md](./SCSS-GUIDE.md) - SCSS 使用指南

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
