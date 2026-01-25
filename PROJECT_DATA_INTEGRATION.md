# 專案資料串聯說明

## 📋 概述

所有專案資料現在統一管理在 `composables/useProjects.ts` 中，確保 Home 頁面和 Work 頁面的資料一致性。

## 🗂️ 資料結構

### ProjectData 介面

```typescript
interface ProjectData {
    id: string              // 專案唯一識別碼
    title: string           // 專案標題
    description?: string    // 專案描述（選填）
    category: string        // 專案分類（Web/APP/LandingPage/Others）
    tags: string[]         // 專案標籤
    image?: string         // 專案圖片（選填）
    color?: string         // 專案顏色（選填）
    isFeatured?: boolean   // 是否為精選專案（選填）
}
```

## 📦 專案資料源

### 1. **allProjects** - 所有專案
包含所有專案的完整資料，共 13 個專案：

#### 精選專案（Featured Projects）
- `kkday-transport` - KKday 點對點交通
- `ecommerce-pos` - 電商POS系統
- `kkday-marketplace` - KKday Marketplace
- `live-casino` - Live dealer gaming app

#### 設計畫廊（Design Gallery）
- `changhong-website` - 建設公司官網設計
- `securities-landing` - 證券理財Landing page
- `fashion-finance-website` - 數位金融與時尚品牌聯名網站
- `loan-landing` - 信貸限時活動Landing page

#### 其他專案
- `stock-landing` - 美股投資活動Landing page
- `securities-landing-2` - 證券理財Landing page 2
- `wealth-management` - 財富管理系統
- `brand-identity` - 品牌識別設計
- `marketing-materials` - 行銷素材設計

## 🔧 提供的函數

### 1. `getFeaturedProjects()`
獲取精選專案（用於 Home 頁面的 Featured Projects 區塊）

**使用位置**：`components/home/HomeFeaturedProjects.vue`

```typescript
const featuredProjects = getFeaturedProjects();
```

### 2. `getGalleryProjects()`
獲取設計畫廊專案（用於 Home 頁面的 Design Gallery 區塊）

**使用位置**：`components/home/HomeDesignGallery.vue`

```typescript
const galleryItems = getGalleryProjects();
```

### 3. `getProjectById(id: string)`
根據 ID 獲取單一專案

**使用位置**：`pages/work/[id].vue`

```typescript
const currentProject = getProjectById(projectId.value);
```

### 4. `getRecommendedProjects(currentId: string, limit = 3)`
獲取推薦專案（排除當前專案）

**使用位置**：`pages/work/[id].vue`

```typescript
const otherProjects = getRecommendedProjects(projectId.value, 3);
```

### 5. `getProjectsByFilter(filter: string)`
根據篩選條件獲取專案

**使用位置**：`pages/work/index.vue`

```typescript
const filteredProjects = computed(() => {
    return getProjectsByFilter(activeFilter.value);
});
```

## 🔗 路由串聯

### Home → Work Detail

#### 1. Featured Projects 區塊
```vue
<!-- components/home/HomeFeaturedProjects.vue -->
<NuxtLink
    v-for="project in featuredProjects"
    :key="project.id"
    :to="localePath(`/work/${project.id}`)"
    class="project-card"
>
    <!-- 專案內容 -->
</NuxtLink>
```

**連結到**：
- `/work/kkday-transport`
- `/work/ecommerce-pos`
- `/work/kkday-marketplace`
- `/work/live-casino`

#### 2. Design Gallery 區塊
```vue
<!-- components/home/HomeDesignGallery.vue -->
<NuxtLink
    v-for="item in galleryItems"
    :key="item.id"
    :to="localePath(`/work/${item.id}`)"
    class="gallery-item"
>
    <!-- 畫廊項目內容 -->
</NuxtLink>
```

**連結到**：
- `/work/changhong-website`
- `/work/securities-landing`
- `/work/fashion-finance-website`
- `/work/loan-landing`

### Work List → Work Detail

```vue
<!-- pages/work/index.vue -->
<NuxtLink
    v-for="project in filteredProjects"
    :key="project.id"
    :to="localePath(`/work/${project.id}`)"
    class="project-card"
>
    <!-- 專案卡片內容 -->
</NuxtLink>
```

**連結到所有 13 個專案**

### Work Detail → Other Work Details

```vue
<!-- components/work/WorkOtherProjects.vue -->
<NuxtLink
    v-for="project in projects"
    :key="project.id"
    :to="localePath(`/work/${project.id}`)"
    class="project-card"
>
    <!-- 推薦專案內容 -->
</NuxtLink>
```

## ✅ 資料一致性

### 確保的一致性：

1. **ID 一致性**
   - Home Featured Projects 的 ID 與 Work 頁面的專案 ID 完全對應
   - Home Design Gallery 的 ID 與 Work 頁面的專案 ID 完全對應

2. **標題一致性**
   - 所有地方顯示的專案標題都來自同一資料源

3. **標籤一致性**
   - 標籤在所有地方保持一致

4. **分類一致性**
   - 專案分類在 Work 頁面的篩選和專案本身保持一致

## 🎯 使用範例

### 新增專案

在 `composables/useProjects.ts` 的 `allProjects` 陣列中新增：

```typescript
{
    id: 'new-project',
    title: '新專案標題',
    description: '新專案描述',
    category: 'Web',
    tags: ['Web', 'RWD'],
    isFeatured: true  // 如果要顯示在 Featured Projects
}
```

### 修改精選專案

調整專案的 `isFeatured` 屬性：

```typescript
{
    id: 'project-id',
    // ... 其他屬性
    isFeatured: true  // 設為 true 則顯示在 Featured Projects
}
```

### 修改設計畫廊項目

在 `getGalleryProjects()` 函數中修改 ID 列表：

```typescript
export const getGalleryProjects = (): ProjectData[] => {
    return allProjects.filter((project) => 
        ['id-1', 'id-2', 'id-3', 'id-4'].includes(project.id)
    );
};
```

## 📊 資料流程圖

```
composables/useProjects.ts
    ↓
    ├── Home Page
    │   ├── HomeFeaturedProjects (getFeaturedProjects)
    │   └── HomeDesignGallery (getGalleryProjects)
    │
    ├── Work List Page (getProjectsByFilter)
    │
    └── Work Detail Page
        ├── Current Project (getProjectById)
        └── Recommended Projects (getRecommendedProjects)
```

## 🔮 未來擴展

當需要從 API 或 CMS 獲取資料時，只需修改 `composables/useProjects.ts` 中的函數即可：

```typescript
// 範例：從 API 獲取資料
export const getAllProjects = async (): Promise<ProjectData[]> => {
    const { data } = await useFetch('/api/projects');
    return data.value || [];
};
```

所有使用這些函數的組件都會自動更新，無需修改組件程式碼。
