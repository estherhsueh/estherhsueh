import type { ProjectUpsertPayload } from '~/types/project';

export default defineEventHandler(async (event) => {
    const body = await readBody<ProjectUpsertPayload>(event);
    const supabase = useSupabaseAdmin();

    if (!body.id?.trim()) {
        throw createError({ statusCode: 400, statusMessage: '專案 ID 為必填' });
    }

    const { data, error } = await supabase
        .from('projects')
        .insert({
            id: body.id.trim(),
            title: body.title,
            description: body.description,
            company: body.company,
            responsibilities: body.responsibilities,
            duration: body.duration,
            category: body.category,
            tags: body.tags,
            is_locked: body.is_locked,
            sort_order: body.sort_order,
            featured_order: body.featured_order ?? null,
            gallery_order: body.gallery_order ?? null,
            cover_image: body.cover_image ?? '',
            detail_images: body.detail_images ?? []
        })
        .select()
        .single();

    if (error) {
        throw createError({
            statusCode: error.code === '23505' ? 409 : 500,
            statusMessage: error.code === '23505' ? '此專案 ID 已存在' : error.message
        });
    }

    return data;
});
