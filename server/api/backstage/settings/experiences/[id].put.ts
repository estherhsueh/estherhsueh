import type { ExperienceRow, ExperiencePayload } from '~/types/experience';

export default defineEventHandler(async (event): Promise<ExperienceRow> => {
    const supabase = useSupabaseAdmin();
    const id = Number(getRouterParam(event, 'id'));
    const body = await readBody<Partial<ExperiencePayload>>(event);

    if (!id || isNaN(id)) {
        throw createError({ statusCode: 400, statusMessage: '無效的 ID' });
    }

    const updates: Partial<ExperiencePayload> = {};

    if (body.company !== undefined) {
        updates.company = {
            'zh-TW': body.company['zh-TW']?.trim() ?? '',
            'en-US': body.company['en-US']?.trim() ?? ''
        };
    }

    if (body.title !== undefined) {
        updates.title = {
            'zh-TW': body.title['zh-TW']?.trim() ?? '',
            'en-US': body.title['en-US']?.trim() ?? ''
        };
    }

    if (body.start_date !== undefined) {
        updates.start_date = body.start_date.trim();
    }
    if ('end_date' in body) {
        updates.end_date = body.end_date?.trim() || null;
    }
    if (body.sort_order !== undefined) {
        updates.sort_order = body.sort_order;
    }

    const { data, error } = await supabase
        .from('settings_experiences')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data;
});
