import type { LocaleRow } from '~/types/locale';

export default defineEventHandler(async (): Promise<LocaleRow[]> => {
    const supabase = useSupabaseAdmin();

    const { data, error } = await supabase
        .from('settings_locales')
        .select('*')
        .order('code', { ascending: true });

    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data;
});
