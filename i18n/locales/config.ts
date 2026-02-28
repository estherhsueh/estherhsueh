const fileListPages = [
    'nav.json',
    'home.json',
    'work.json',
    'workDetail.json',
    'about.json',
    'auth.json',
    'common.json',
    'footer.json'
];

export const getFileListPages = (locale: string) => {
    return fileListPages.map((file) => `${locale}/pages/${file}`);
};
