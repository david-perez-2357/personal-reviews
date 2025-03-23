import {checkDB, db} from "@/lib/database";
import {Item} from "@/models/Item";

/**
 * Inserta un ítem en la base de datos.
 * @param item
 */
export const insertItem = async (item: Item): Promise<number | null> => {
    if (!checkDB()) return null;
    if (item.rating !== undefined && (item.rating < 0 || item.rating > 5)) {
        console.error("❌ La calificación debe estar entre 0 y 5.");
        return null;
    }

    try {
        const query = `INSERT INTO item (name, image, rating, category_id) VALUES (?, ?, ?, ?)`;
        const values = [item.name, item.image ?? null, item.rating ?? null, item.category_id];

        const result = await db!.run(query, values);
        return result.changes?.lastId || null;
    } catch (error) {
        console.error("❌ Error al insertar ítem:", error);
        return null;
    }
};

/**
 * Obtiene todos los ítems de la base de datos.
 * @returns Promise<Item[]>
 */
export const getItems = async (): Promise<Item[]> => {
    try {
        if (!checkDB()) return [];
        const query = `SELECT * FROM item`;
        const result = await db!.query(query);
        return result.values as Item[];
    } catch (error) {
        console.error("❌ Error al obtener ítems:", error);
        return [];
    }
};