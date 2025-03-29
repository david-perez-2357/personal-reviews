export interface Category {
    id: number;
    title: string;
    type: number;
    color: string;
    created_at: string;
    updated_at: string;
    parent_id: number | null;
}