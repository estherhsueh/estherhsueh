<template>
    <div class="app">
        <NuxtRouteAnnouncer />

        <AppHeader />

        <main class="app-main">
            <NuxtPage />
        </main>

        <footer class="app-footer">
            <div class="footer-container">
                <p class="footer-copyright">{{ $t('footer.copyright') }}</p>
                <div class="footer-social">
                    <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-link"
                        aria-label="LinkedIn"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" fill="currentColor" />
                        </svg>
                    </a>
                    <a
                        href="https://www.behance.net"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-link"
                        aria-label="Behance"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 17.5c1.469 0 2.742-.633 3.488-1.637l-1.414-1.414c-.396.432-.94.684-1.574.684-1.242 0-2.25-1.008-2.25-2.25s1.008-2.25 2.25-2.25c.634 0 1.178.252 1.574.684l1.414-1.414C9.242 8.9 7.97 8.267 6.5 8.267c-2.347 0-4.25 1.903-4.25 4.25s1.903 4.25 4.25 4.25zm9-7.75V8.5h5v1.25h-5zm-2 2.5c0 2.347 1.903 4.25 4.25 4.25 1.544 0 2.898-.822 3.645-2.052l-1.735-1.001c-.373.615-1.047 1.027-1.91 1.027-1.242 0-2.25-1.008-2.25-2.25s1.008-2.25 2.25-2.25c.863 0 1.537.412 1.91 1.027l1.735-1.001C19.648 9.822 18.294 9 16.75 9c-2.347 0-4.25 1.903-4.25 4.25z" fill="currentColor" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
// Components are auto-imported
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: $grey-900;  // Figma: #010109
}

.app-main {
    flex: 1;
}

.app-footer {
    border-top: 1px solid #20212b;
    background: rgb(255 255 255 / 5%);
    padding: $spacing-24 $spacing-md;

    @include md {
        padding: $spacing-24 $spacing-xl;
    }

    @include lg {
        padding: $spacing-24 140px;
    }
}

.footer-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: $container-full;
    min-height: 26px;
    margin: 0 auto;

    @media (max-width: 640px) {
        flex-direction: column;
        gap: $spacing-md;
    }
}

.footer-copyright {
    color: $grey-200;
    font-family: $font-family-en;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    letter-spacing: 0;
    line-height: $line-height-25-6;
}

.footer-social {
    display: flex;
    gap: $spacing-md;
    align-items: center;
}

.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: $grey-200;
    transition: all $transition-base;

    &:hover {
        color: $grey-50;
        transform: translateY(-2px);
    }

    svg {
        width: 100%;
        height: 100%;
    }
}
</style>
