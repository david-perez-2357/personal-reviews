export interface Review {
    id?: number;
    rating: number; // Debe estar entre 0 y 5
    comment?: string | null; // Puede no tener comentario
    created_at?: string;
    updated_at?: string;
    item_id: number;
}