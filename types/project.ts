export interface LocaleField {
    'zh-TW': string
    'en-US': string
}

export interface ProjectRow {
    id: string
    title: LocaleField
    description: LocaleField
    company: LocaleField
    responsibilities: LocaleField
    duration: string
    category: string
    tags: string[]
    is_locked: boolean
    sort_order: number | null
    featured_order: number | null
    gallery_order: number | null
    cover_image: string
    detail_images: string[]
    created_at: string
    updated_at: string
}

export type ProjectUpsertPayload = Omit<ProjectRow, 'created_at' | 'updated_at'>;
