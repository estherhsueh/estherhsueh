-- ============================================================
-- Settings Experiences Table Migration
-- ============================================================
-- 多語系欄位（company, title）
-- 使用 JSONB 格式儲存，結構為 { "zh-TW": "...", "en-US": "..." }
-- ============================================================

CREATE TABLE IF NOT EXISTS settings_experiences (
    id         SERIAL      PRIMARY KEY,
    company    JSONB       NOT NULL DEFAULT '{}',
    title      JSONB       NOT NULL DEFAULT '{}',
    start_date TEXT        NOT NULL DEFAULT '',
    end_date   TEXT,
    sort_order INTEGER     NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_settings_experiences_sort_order
    ON settings_experiences (sort_order ASC);

CREATE OR REPLACE FUNCTION update_settings_experiences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER settings_experiences_updated_at
    BEFORE UPDATE ON settings_experiences
    FOR EACH ROW
    EXECUTE FUNCTION update_settings_experiences_updated_at();
