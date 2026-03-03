export const useScrollAnimation = () => {
    const observeElements = (elements: HTMLElement[]): IntersectionObserver | null => {
        if (!import.meta.client) {
            return null;
        }

        const isInViewport = (el: HTMLElement): boolean => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            return rect.top < windowHeight - 50 && rect.bottom > 0;
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // 用 setTimeout(0) 確保在 Vue Router scrollBehavior（nextTick 微任務）執行完、
        // 頁面捲到頂端之後才做視窗位置判斷
        setTimeout(() => {
            elements.forEach((element) => {
                if (!element) {
                    return;
                }
                if (element.classList.contains('is-visible') || isInViewport(element)) {
                    element.classList.add('is-visible');
                }
                else {
                    observer.observe(element);
                }
            });
        }, 0);

        return observer;
    };

    return {
        observeElements
    };
};
