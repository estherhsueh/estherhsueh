import type { LinkRow } from '~/types/link';

export default defineEventHandler(async (event): Promise<LinkRow> => {
    const supabase = useSupabaseAdmin();
    const key = getRouterParam(event, 'key');
    const body = await readBody<{ value: string }>(event);

    if (!key) {
        throw createError({ statusCode: 400, statusMessage: '缺少連結 key' });
    }

    if (typeof body.value !== 'string') {
        throw createError({ statusCode: 400, statusMessage: '缺少 value 欄位' });
    }

    const { data, error } = await supabase
        .from('settings_links')
        .update({ value: body.value.trim() })
        .eq('key', key)
        .select()
        .single();

    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data;
});
