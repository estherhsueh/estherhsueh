<template>
    <footer class="footer-container">
        <p class="footer-copyright">
            {{ $t('footer.copyright') }}
        </p>

        <div class="footer-social">
            <a
                v-if="links?.linkedin"
                :href="links.linkedin"
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
                v-if="links?.behance"
                :href="links.behance"
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
                v-if="links?.mail"
                :href="`mailto:${links.mail}`"
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

<script setup lang="ts">
const { data: links } = await useLinks();
</script>

<style lang="scss" scoped>
@use './FooterContainer';
</style>
