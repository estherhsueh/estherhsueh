export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const supabase = useSupabaseAdmin();

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        throw createError({
            statusCode: error.code === 'PGRST116' ? 404 : 500,
            statusMessage: error.code === 'PGRST116' ? '找不到此專案' : error.message
        });
    }

    return data;
});
