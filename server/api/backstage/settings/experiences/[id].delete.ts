export default defineEventHandler(async (event): Promise<{ success: boolean }> => {
    const supabase = useSupabaseAdmin();
    const id = Number(getRouterParam(event, 'id'));

    if (!id || isNaN(id)) {
        throw createError({ statusCode: 400, statusMessage: '無效的 ID' });
    }

    const { error } = await supabase
        .from('settings_experiences')
        .delete()
        .eq('id', id);

    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return { success: true };
});
