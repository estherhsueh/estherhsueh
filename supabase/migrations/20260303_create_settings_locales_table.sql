CREATE TABLE IF NOT EXISTS settings_locales (
    code       TEXT        PRIMARY KEY,
    name       TEXT        NOT NULL,
    is_enabled BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_settings_locales_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER settings_locales_updated_at
    BEFORE UPDATE ON settings_locales
    FOR EACH ROW
    EXECUTE FUNCTION update_settings_locales_updated_at();
