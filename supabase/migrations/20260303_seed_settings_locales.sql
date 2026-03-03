INSERT INTO settings_locales (code, name, is_enabled) VALUES
    ('zh-TW', '繁體中文', TRUE),
    ('en-US', 'English',  TRUE)
ON CONFLICT (code) DO NOTHING;
