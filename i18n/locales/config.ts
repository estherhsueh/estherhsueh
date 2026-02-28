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

// const fileListProjects = [

// ];

export const getFileListPages = (locale: string) => {
    return fileListPages.map((file) => `${locale}/pages/${file}`);
};

// export const getFileListProjects = (locale: string) => {
//     return fileListProjects.map((file) => `${locale}/${file}`);
// };
