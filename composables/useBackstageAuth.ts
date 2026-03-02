export const useBackstageAuth = () => {
    const router = useRouter();

    const checkAuth = (): void => {
        if (import.meta.client && !sessionStorage.getItem('isBackstageAuthenticated')) {
            router.replace('/backstage/login');
        }
    };

    const logout = (): void => {
        sessionStorage.removeItem('isBackstageAuthenticated');
        router.push('/backstage/login');
    };

    return { checkAuth, logout };
};
