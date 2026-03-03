import type { ExperienceRow } from '~/types/experience';

export default defineEventHandler(async (): Promise<ExperienceRow[]> => {
    const supabase = useSupabaseAdmin();

    const { data, error } = await supabase
        .from('settings_experiences')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data;
});
