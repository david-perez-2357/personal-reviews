import {checkDB, db} from "@/lib/database";
import {Origin} from "@/models/Origin";

/**
 * Inserta una relación de origen en la base de datos.
 * @param origin
 */
export const insertOrigin = async (origin: Origin): Promise<boolean> => {
    if (!checkDB()) return false;

    try {
        const query = `INSERT INTO origin (item1_id, item2_id) VALUES (?, ?)`;
        const values = [origin.item1_id, origin.item2_id];

        await db!.run(query, values);
        return true;
    } catch (error) {
        console.error("❌ Error al insertar origen:", error);
        return false;
    }
};

/**
 * Obtiene todas las relaciones de origen de la base de datos.
 * @returns Promise<Origin[]>
 */
export const getOrigins = async (): Promise<Origin[]> => {
    try {
        if (!checkDB()) return [];
        const query = `SELECT * FROM origin`;
        const result = await db!.query(query);
        return result.values as Origin[];
    } catch (error) {
        console.error("❌ Error al obtener relaciones de origen:", error);
        return [];
    }
};
