// src/lib/sqlEngine.ts
import initSqlJs, { Database, SqlJsStatic } from 'sql.js';


let SQL: SqlJsStatic | null = null;
let db: Database | null = null;


export async function init(wasmPath = '/sql-wasm.wasm') {
    if (!SQL) {
        SQL = await initSqlJs({ locateFile: file => wasmPath });
    }
    db = new SQL.Database();
    return db;
}


export function run(sql: string) {
    if (!db) throw new Error('DB not initialized');
    try {
        const results = db.exec(sql);
        const changes = db.getRowsModified();
        return { results, changes };
    } catch (e: any) {
        return { error: e?.message ?? String(e) };
    }
}


export function getSchema() {
    if (!db) return { tables: [] as Array<{ name: string; sql: string }> };
    try {
        const res = db.exec("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
        if (!res || res.length === 0) return { tables: [] };
        const rows = res[0].values as Array<[string, string]>;
        return { tables: rows.map(r => ({ name: r[0], sql: r[1] })) };
    } catch (e) {
        return { tables: [] };
    }
}


export function reset() {
    if (!SQL) throw new Error('SQL not initialized');
    db = new SQL.Database();
    return db;
}


export function importDatabase(bytes: Uint8Array) {
    if (!SQL) throw new Error('SQL not initialized');
    db = new SQL.Database(bytes);
    return db;
}


export function exportDatabase() {
    if (!db) throw new Error('DB not initialized');
    return db.export();
}