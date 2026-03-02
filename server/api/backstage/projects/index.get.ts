export default defineEventHandler(async () => {
    const supabase = useSupabaseAdmin();

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true, nullsFirst: false });

    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data;
});
