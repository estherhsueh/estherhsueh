import type { ProjectRow } from '~/types/project';

export const useProjectNavigation = () => {
    const router = useRouter();
    const localePath = useLocalePath();

    const navigateToProject = (project: ProjectRow, event?: MouseEvent) => {
        if (event) {
            event.preventDefault();
        }

        if (project.is_locked) {
            const isAuthenticated = import.meta.client
                ? sessionStorage.getItem('isAuthenticated') === 'true'
                : false;

            if (!isAuthenticated) {
                const redirectPath = `/work/${project.id}`;
                router.push(localePath(`/auth?redirect=${encodeURIComponent(redirectPath)}`));
                return;
            }
        }

        router.push(localePath(`/work/${project.id}`));
    };

    return {
        navigateToProject
    };
};
