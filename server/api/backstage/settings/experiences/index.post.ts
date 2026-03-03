import type { ExperienceRow, ExperiencePayload } from '~/types/experience';

export default defineEventHandler(async (event): Promise<ExperienceRow> => {
    const supabase = useSupabaseAdmin();
    const body = await readBody<ExperiencePayload>(event);

    if (!body.company?.['zh-TW']?.trim() && !body.company?.['en-US']?.trim()) {
        throw createError({ statusCode: 400, statusMessage: '公司名稱至少需填入一個語系' });
    }

    if (!body.title?.['zh-TW']?.trim() && !body.title?.['en-US']?.trim()) {
        throw createError({ statusCode: 400, statusMessage: '職稱至少需填入一個語系' });
    }

    if (!body.start_date?.trim()) {
        throw createError({ statusCode: 400, statusMessage: '開始日期為必填' });
    }

    const { data, error } = await supabase
        .from('settings_experiences')
        .insert({
            company: {
                'zh-TW': body.company['zh-TW']?.trim() ?? '',
                'en-US': body.company['en-US']?.trim() ?? ''
            },
            title: {
                'zh-TW': body.title['zh-TW']?.trim() ?? '',
                'en-US': body.title['en-US']?.trim() ?? ''
            },
            start_date: body.start_date.trim(),
            end_date: body.end_date?.trim() || null,
            sort_order: body.sort_order ?? 0
        })
        .select()
        .single();

    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data;
});
