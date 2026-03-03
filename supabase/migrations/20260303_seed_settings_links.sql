INSERT INTO settings_links (key, label, value) VALUES
    ('mail',     'Email',    'estherhsueh923@gmail.com'),
    ('behance',  'Behance',  'https://www.behance.net/esther_design'),
    ('linkedin', 'LinkedIn', ''),
    ('resume',   'Resume',   'https://onedrive.live.com/?cid=2beaaa58541c1d3e&id=2BEAAA58541C1D3E%21s185eb3716a3640e0ab1372e5d63affce&resid=2BEAAA58541C1D3E%21s185eb3716a3640e0ab1372e5d63affce&ithint=file%2Cpdf&e=fh7xWQ&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy8yYmVhYWE1ODU0MWMxZDNlL0lRQnhzMTRZTm1yZ1FLc1RjdVhXT3ZfT0FVUjBfVWhDWHQ3b0tUQlh2ZWlPMFQwP2U9Zmg3eFdR&v=validatepermission')
ON CONFLICT (key) DO NOTHING;
