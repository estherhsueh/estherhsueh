import type { LinkRow, LinksMap } from '~/types/link';

const EMPTY_LINKS: LinksMap = { mail: '', behance: '', linkedin: '', resume: '' };

export const useLinks = () => {
    return useAsyncData<LinksMap>(
        'site-links',
        async () => {
            const rows = await $fetch<LinkRow[]>('/api/settings/links');
            const map: Record<string, string> = {};
            rows.forEach((row) => {
                map[row.key] = row.value;
            });
            return {
                mail: map.mail ?? '',
                behance: map.behance ?? '',
                linkedin: map.linkedin ?? '',
                resume: map.resume ?? ''
            };
        },
        { default: () => ({ ...EMPTY_LINKS }), server: true }
    );
};
