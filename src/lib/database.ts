import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";

export let sqliteConnection: SQLiteConnection | null = null;
export let db: SQLiteDBConnection | null = null;

/**
 * Inicializa la base de datos SQLite y crea las tablas necesarias.
 * @returns Promise<void>
 */

export const initDB = async () => {
    try {
        sqliteConnection = new SQLiteConnection(CapacitorSQLite);
        db = await sqliteConnection.createConnection("prueba", false, "no-encryption", 1, false);

        if (!db) {
            console.error("❌ No se pudo crear la conexión a SQLite");
            return;
        }

        await db.open();

        // Sentencias de creación de tablas con optimizaciones
        const queries = [
            `PRAGMA foreign_keys = ON;`,
                `CREATE TABLE IF NOT EXISTS category (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                type INTEGER NOT NULL DEFAULT 0,
                color CHAR(7) NOT NULL CHECK (color LIKE '#______'),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                parent_id INTEGER,
                FOREIGN KEY (parent_id) REFERENCES category(id) ON DELETE SET NULL
            );`,
            `CREATE TABLE IF NOT EXISTS item (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                image TEXT,
                rating INTEGER CHECK (rating BETWEEN 0 AND 5),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                category_id INTEGER NOT NULL,
                FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
            );`,
            `CREATE TABLE IF NOT EXISTS origin (
                item1_id INTEGER NOT NULL,
                item2_id INTEGER NOT NULL,
                PRIMARY KEY (item1_id, item2_id),
                FOREIGN KEY (item1_id) REFERENCES item(id) ON DELETE CASCADE,
                FOREIGN KEY (item2_id) REFERENCES item(id) ON DELETE CASCADE
            );`,
            `CREATE TABLE IF NOT EXISTS review (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                rating INTEGER NOT NULL CHECK (rating BETWEEN 0 AND 5),
                comment TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                item_id INTEGER NOT NULL,
                FOREIGN KEY (item_id) REFERENCES item(id) ON DELETE CASCADE
            );`,
            `CREATE TABLE IF NOT EXISTS review_image (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                review_id INTEGER NOT NULL,
                FOREIGN KEY (review_id) REFERENCES review(id) ON DELETE CASCADE
            );`,
            `CREATE TABLE IF NOT EXISTS category_rating (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                value INTEGER NOT NULL CHECK (value BETWEEN 0 AND 100),
                category_id INTEGER NOT NULL,
                FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
            );`,
            `CREATE TABLE IF NOT EXISTS category_rating_value (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                value INTEGER NOT NULL CHECK (value BETWEEN 0 AND 100),
                item_id INTEGER NOT NULL,
                category_rating_id INTEGER NOT NULL,
                FOREIGN KEY (item_id) REFERENCES item(id) ON DELETE CASCADE,
                FOREIGN KEY (category_rating_id) REFERENCES category_rating(id) ON DELETE CASCADE
            );`
        ];

        // Ejecutar todas las consultas dentro de una transacción para optimización
        await db.executeSet(queries.map(query => ({ statement: query, values: [] })));

        console.log("✅ Base de datos inicializada correctamente.");
    } catch (error) {
        console.error("❌ Error al iniciar la base de datos:", error);
    }
};
/**
 * Cierra la conexión a la base de datos SQLite.
 * @returns Promise<void>
 */
export const closeDB = async () => {
    if (db) {
        await db.close();
        console.log("✅ Base de datos cerrada.");
        db = null;
    }
};

/**
 * Verifica si la base de datos está inicializada.
 * @returns boolean
 */
export const checkDB = (): boolean => {
    if (!db) {
        console.error("❌ La base de datos no está inicializada.");
        return false;
    }
    return true;
};