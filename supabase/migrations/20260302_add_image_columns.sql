-- ============================================================
-- Add image columns to projects table
-- ============================================================
-- cover_image: 封面圖的相對路徑，如 /images/projects/kkday-marketplace/cover.jpg
-- detail_images: 內文圖路徑陣列，順序即為顯示順序
-- ============================================================

ALTER TABLE projects
    ADD COLUMN IF NOT EXISTS cover_image   TEXT     NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS detail_images TEXT[]   NOT NULL DEFAULT '{}';
