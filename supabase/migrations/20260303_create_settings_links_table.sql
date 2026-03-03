CREATE TABLE IF NOT EXISTS settings_links (
    key        TEXT        PRIMARY KEY,
    label      TEXT        NOT NULL,
    value      TEXT        NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_settings_links_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER settings_links_updated_at
    BEFORE UPDATE ON settings_links
    FOR EACH ROW
    EXECUTE FUNCTION update_settings_links_updated_at();
