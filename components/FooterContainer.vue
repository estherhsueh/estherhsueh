<template>
    <footer class="footer-container">
        <p class="footer-copyright">
            {{ $t('footer.copyright') }}
        </p>

        <div class="footer-social">
            <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                aria-label="LinkedIn"
            >
                <Icon
                    name="custom:linkedin"
                    class="icon"
                />
            </a>
            <a
                href="https://www.behance.net"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                aria-label="Behance"
            >
                <Icon
                    name="custom:behance"
                    class="icon"
                />
            </a>
            <a
                href="mailto:example@example.com"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                aria-label="Email"
            >
                <Icon
                    name="custom:mail"
                    class="icon"
                />
            </a>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use './FooterContainer';
</style>
