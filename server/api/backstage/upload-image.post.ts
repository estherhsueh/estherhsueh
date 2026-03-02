const BUCKET = 'project-images';
const ALLOWED_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event);

    if (!formData?.length) {
        throw createError({ statusCode: 400, statusMessage: '未接收到檔案' });
    }

    const fileField = formData.find((f) => f.name === 'file');
    const projectId = formData.find((f) => f.name === 'project_id')?.data.toString().trim();
    const imageType = formData.find((f) => f.name === 'type')?.data.toString(); // 'cover' | 'detail'

    if (!fileField?.data?.length) {
        throw createError({ statusCode: 400, statusMessage: '檔案內容為空' });
    }
    if (!projectId) {
        throw createError({ statusCode: 400, statusMessage: '缺少 project_id' });
    }

    const rawExt = fileField.filename?.split('.').pop()?.toLowerCase() ?? 'jpg';
    const ext = ALLOWED_EXTS.includes(rawExt) ? rawExt : 'jpg';
    const filename = imageType === 'cover'
        ? `cover.${ext}`
        : `detail_${Date.now()}.${ext}`;
    const storagePath = `${projectId}/${filename}`;

    const supabase = useSupabaseAdmin();

    const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, fileField.data, {
            contentType: fileField.type ?? 'image/jpeg',
            upsert: imageType === 'cover'
        });

    if (uploadError) {
        throw createError({ statusCode: 500, statusMessage: uploadError.message });
    }

    const { data: { publicUrl } } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(storagePath);

    return { url: publicUrl, path: storagePath };
});
