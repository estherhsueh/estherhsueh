export const useScrollAnimation = () => {
    const observeElements = (elements: HTMLElement[]) => {
        if (!process.client) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        elements.forEach((element) => {
            if (element) {
                observer.observe(element);
            }
        });

        return observer;
    };

    return {
        observeElements
    };
};
