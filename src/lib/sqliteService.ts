import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

class SQLiteService {
    private sqlite: SQLiteConnection;
    private db: SQLiteDBConnection | null = null;

    constructor() {
        this.sqlite = new SQLiteConnection(CapacitorSQLite);
    }

    async initializeDB() {
        try {
            const db = await this.sqlite.createConnection("my_database", false, "no-encryption", 1, true);
            await db.open();
            this.db = db;
            console.log("Base de datos inicializada correctamente");

            // Crear tablas si no existen
            await this.createTables();
        } catch (error) {
            console.error("Error al inicializar la base de datos:", error);
        }
    }

    async createTables() {
        if (!this.db) return;
        const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      );
    `;

        try {
            await this.db.execute(query);
            console.log("Tablas creadas correctamente");
        } catch (error) {
            console.error("Error al crear tablas:", error);
        }
    }

    async addUser(name: string, email: string) {
        if (!this.db) return;
        try {
            const query = `INSERT INTO users (name, email) VALUES (?, ?)`;
            await this.db.run(query, [name, email]);
            console.log("Usuario agregado correctamente");
        } catch (error) {
            console.error("Error al agregar usuario:", error);
        }
    }

    async getUsers() {
        if (!this.db) return [];
        try {
            const result = await this.db.query("SELECT * FROM users");
            return result.values || [];
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            return [];
        }
    }

    async closeConnection() {
        if (!this.db) return;
        await this.sqlite.closeConnection("my_database", false);
        this.db = null;
    }
}

export const sqliteService = new SQLiteService();
