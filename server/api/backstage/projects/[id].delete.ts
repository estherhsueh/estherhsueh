export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const supabase = useSupabaseAdmin();

    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return { success: true, message: '刪除成功' };
});
