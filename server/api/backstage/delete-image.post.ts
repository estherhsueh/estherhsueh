const BUCKET = 'project-images';

export default defineEventHandler(async (event) => {
    const { url } = await readBody<{ url: string }>(event);

    if (!url) {
        throw createError({ statusCode: 400, statusMessage: '缺少圖片 URL' });
    }

    // 非 Supabase Storage URL（如舊版靜態路徑），直接略過
    const marker = `/storage/v1/object/public/${BUCKET}/`;
    const markerIdx = url.indexOf(marker);
    if (markerIdx === -1) {
        return { success: true, skipped: true, message: '非 Storage URL，略過刪除' };
    }

    const storagePath = url.slice(markerIdx + marker.length);
    const supabase = useSupabaseAdmin();

    const { error } = await supabase.storage
        .from(BUCKET)
        .remove([storagePath]);

    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return { success: true };
});
