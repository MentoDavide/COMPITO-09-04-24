const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database_compito.db");

db.serialize(() => {
    db.run(`CREATE TABLE biglietto (
        id TEXT PRIMARY KEY,
        tempo_di_attesa_in INTEGER DEFAULT 0,
        tempo_di_attesa_out INTEGER DEFAULT 0,
        prezzo INTEGER
    )`);
});
