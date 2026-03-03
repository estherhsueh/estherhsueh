import type { LocaleRow } from '~/types/locale';

export default defineEventHandler(async (event): Promise<LocaleRow> => {
    const supabase = useSupabaseAdmin();
    const code = getRouterParam(event, 'code');
    const body = await readBody<{ is_enabled: boolean }>(event);

    if (!code) {
        throw createError({ statusCode: 400, statusMessage: '缺少語系代碼' });
    }

    if (typeof body.is_enabled !== 'boolean') {
        throw createError({ statusCode: 400, statusMessage: '缺少 is_enabled 欄位' });
    }

    const { data, error } = await supabase
        .from('settings_locales')
        .update({ is_enabled: body.is_enabled })
        .eq('code', code)
        .select()
        .single();

    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data;
});
