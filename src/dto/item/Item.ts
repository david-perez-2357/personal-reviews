export interface Item {
    id: number;
    name: string;
    image: string | null;
    rating: number;
    created_at: string;
    updated_at: string;
    category_id: number;
}