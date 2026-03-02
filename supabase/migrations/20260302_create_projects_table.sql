-- ============================================================
-- Projects Table Migration
-- ============================================================
-- 多語系欄位（title, description, company, responsibilities）
-- 使用 JSONB 格式儲存，結構為 { "zh-TW": "...", "en-US": "..." }
-- tags 使用 TEXT[] 陣列
-- featured_order / gallery_order 代表在首頁各區塊的排列順序（NULL 表示不在該區塊）
-- sort_order 代表在 allProjects 陣列中的原始排列順序
-- ============================================================

CREATE TABLE IF NOT EXISTS projects (
    id                 TEXT PRIMARY KEY,
    title              JSONB        NOT NULL DEFAULT '{}',
    description        JSONB        NOT NULL DEFAULT '{}',
    company            JSONB        NOT NULL DEFAULT '{}',
    responsibilities   JSONB        NOT NULL DEFAULT '{}',
    duration           TEXT         NOT NULL DEFAULT '',
    category           TEXT         NOT NULL DEFAULT '',
    tags               TEXT[]       NOT NULL DEFAULT '{}',
    detail_image_count INTEGER      NOT NULL DEFAULT 0,
    is_locked          BOOLEAN      NOT NULL DEFAULT FALSE,
    sort_order         INTEGER,
    featured_order     INTEGER,
    gallery_order      INTEGER,
    created_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- updated_at 自動更新 trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 常用查詢索引
CREATE INDEX IF NOT EXISTS idx_projects_category     ON projects (category);
CREATE INDEX IF NOT EXISTS idx_projects_is_locked    ON projects (is_locked);
CREATE INDEX IF NOT EXISTS idx_projects_featured     ON projects (featured_order) WHERE featured_order IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_projects_gallery      ON projects (gallery_order)  WHERE gallery_order  IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_projects_sort_order   ON projects (sort_order);
