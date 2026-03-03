import type { LinkRow } from '~/types/link';

export default defineEventHandler(async (): Promise<LinkRow[]> => {
    const supabase = useSupabaseAdmin();

    const { data, error } = await supabase
        .from('settings_links')
        .select('*')
        .order('key', { ascending: true });

    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data;
});
