import type { ProjectData } from '~/data/projects';

export const useProjectNavigation = () => {
    const router = useRouter();
    const localePath = useLocalePath();

    const navigateToProject = (project: ProjectData, event?: MouseEvent) => {
        if (event) {
            event.preventDefault();
        }

        if (project.isLocked) {
            const isAuthenticated = process.client ? sessionStorage.getItem('isAuthenticated') === 'true' : false;
            
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
