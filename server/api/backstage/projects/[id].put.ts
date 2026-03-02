import type { ProjectUpsertPayload } from '~/types/project';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const body = await readBody<Omit<ProjectUpsertPayload, 'id'>>(event);
    const supabase = useSupabaseAdmin();

    const { data, error } = await supabase
        .from('projects')
        .update({
            title: body.title,
            description: body.description,
            company: body.company,
            responsibilities: body.responsibilities,
            duration: body.duration,
            category: body.category,
            tags: body.tags,
            is_active: body.is_active ?? true,
            is_locked: body.is_locked,
            sort_order: body.sort_order,
            featured_order: body.featured_order ?? null,
            gallery_order: body.gallery_order ?? null,
            cover_image: body.cover_image ?? '',
            detail_images: body.detail_images ?? []
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data;
});
