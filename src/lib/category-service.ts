import {Category} from "@/dto/category/Category";
import {checkDB, db} from "@/lib/database-service";
import {CategoryRating} from "@/dto/category/CategoryRating";
import {CategoryRatingValue} from "@/dto/category/CategoryRatingValue";

/**
 * Inserta una categoría en la base de datos.
 * @param category
 */
export const insertCategory = async (category: Category): Promise<number | null> => {
    if (!checkDB()) return null;
    if (!/^#[0-9A-Fa-f]{6}$/.test(category.color)) {
        console.error("❌ El color debe estar en formato hexadecimal (#XXXXXX).");
        return null;
    }

    try {
        const query = `INSERT INTO category (title, type, color, parent_id) VALUES (?, ?, ?, ?)`;
        const values = [category.title, category.type, category.color, category.parent_id ?? null];

        const result = await db!.run(query, values);
        return result.changes?.lastId || null;
    } catch (error) {
        console.error("❌ Error al insertar categoría:", error);
        return null;
    }
};

/**
 * Obtiene todas las categorías de la base de datos.
 * @returns Promise<Category[]>
 */
export const getCategories = async (): Promise<Category[]> => {
    try {
        if (!checkDB()) return [];
        const query = `SELECT * FROM category`;
        const result = await db!.query(query);
        return result.values as Category[];
    } catch (error) {
        console.error("❌ Error al obtener categorías:", error);
        return [];
    }
};

/**
 * Inserta una puntuación de categoría en la base de datos.
 * @param categoryRating
 */
export const insertCategoryRating = async (categoryRating: CategoryRating): Promise<number | null> => {
    if (!checkDB()) return null;
    if (categoryRating.value < 0 || categoryRating.value > 100) {
        console.error("❌ El valor debe estar entre 0 y 100.");
        return null;
    }

    try {
        const query = `INSERT INTO category_rating (name, value, category_id) VALUES (?, ?, ?)`;
        const values = [categoryRating.name, categoryRating.value, categoryRating.category_id];

        const result = await db!.run(query, values);
        return result.changes?.lastId || null;
    } catch (error) {
        console.error("❌ Error al insertar puntuación de categoría:", error);
        return null;
    }
};

/**
 * Inserta un valor de puntuación de categoría en la base de datos.
 * @param categoryRatingValue
 */
export const insertCategoryRatingValue = async (categoryRatingValue: CategoryRatingValue): Promise<number | null> => {
    if (!checkDB()) return null;
    if (categoryRatingValue.value < 0 || categoryRatingValue.value > 100) {
        console.error("❌ El valor debe estar entre 0 y 100.");
        return null;
    }

    try {
        const query = `INSERT INTO category_rating_value (value, item_id, category_rating_id) VALUES (?, ?, ?)`;
        const values = [categoryRatingValue.value, categoryRatingValue.item_id, categoryRatingValue.category_rating_id];

        const result = await db!.run(query, values);
        return result.changes?.lastId || null;
    } catch (error) {
        console.error("❌ Error al insertar valor de puntuación de categoría:", error);
        return null;
    }
};

/**
 * Obtiene todas las puntuaciones de categoría de la base de datos.
 * @returns Promise<CategoryRating[]>
 */
export const getCategoryRatings = async (): Promise<CategoryRating[]> => {
    try {
        if (!checkDB()) return [];
        const query = `SELECT * FROM category_rating`;
        const result = await db!.query(query);
        return result.values as CategoryRating[];
    } catch (error) {
        console.error("❌ Error al obtener puntuaciones de categoría:", error);
        return [];
    }
};

/**
 * Obtiene todos los valores de puntuación de categoría de la base de datos.
 * @returns Promise<CategoryRatingValue[]>
 */
export const getCategoryRatingValues = async (): Promise<CategoryRatingValue[]> => {
    try {
        if (!checkDB()) return [];
        const query = `SELECT * FROM category_rating_value`;
        const result = await db!.query(query);
        return result.values as CategoryRatingValue[];
    } catch (error) {
        console.error("❌ Error al obtener valores de puntuación de categoría:", error);
        return [];
    }
};

/**
 * Elimina una categoría de la base de datos.
 */
export const deleteCategory = async (id: number): Promise<boolean> => {
    if (!checkDB()) return false;

    try {
        const query = `DELETE FROM category WHERE id = ?`;
        const values = [id];

        await db!.run(query, values);
        return true;
    } catch (error) {
        console.error("❌ Error al eliminar categoría:", error);
        return false;
    }
};

/**
 * Elimina un categoría de la base de datos.
 */
export const deleteAllCategories = async (): Promise<boolean> => {
    if (!checkDB()) return false;

    try {
        const query = `DELETE FROM category`; // Eliminar todos los registros de la tabla category
        await db!.run(query); // Ejecutamos la consulta
        console.log("✅ Todas las categorías han sido eliminadas.");
        return true;
    } catch (error) {
        console.error("❌ Error al eliminar las categorías:", error);
        return false;
    }
};