export default defineEventHandler(async (event) => {
    const body = await readBody<{ id: string, sort_order: number }[]>(event);
    const supabase = useSupabaseAdmin();

    if (!Array.isArray(body) || !body.length) {
        throw createError({ statusCode: 400, statusMessage: '缺少排序資料' });
    }

    const results = await Promise.allSettled(
        body.map(({ id, sort_order }) =>
            supabase.from('projects').update({ sort_order }).eq('id', id)
        )
    );

    const failed = results.filter((r) => r.status === 'rejected');
    if (failed.length) {
        throw createError({ statusCode: 500, statusMessage: `${failed.length} 筆排序更新失敗` });
    }

    return { success: true, updated: body.length };
});
