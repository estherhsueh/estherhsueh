import type { LocaleField } from '~/types/project';

export type { LocaleField };

export interface ExperienceRow {
    id: number
    company: LocaleField
    title: LocaleField
    start_date: string
    end_date: string | null
    sort_order: number
    created_at: string
    updated_at: string
}

export interface ExperiencePayload {
    company: LocaleField
    title: LocaleField
    start_date: string
    end_date: string | null
    sort_order: number
}
