const express = require('express');
const app = express();

const port = 8888;

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database_compito.db");



app.get('/ticket', (req, res) => {
    db.all(`SELECT * FROM biglietto`, (error, rows) => {
        if(error) {
            console.error(error.message);
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(error.response);
        }
        response = {
            "code": 1,
            "data": rows
        }
        res.status(200).send(response);
    });
});

app.get('/ticket:id', (req, res) => {
    const id = req.params.id;
    db.all(`SELECT * FROM biglietto WHERE id=?`, req.params.id, uscita , (error, rows) => {
        if(error){
            console.log(error.message);
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": rows
        }
        res.status(200).send(response);
    });
});

app.put('/ticket/:id', (req, res) => {
    const id = req.params.id;
    const uscita = Date.now();
    const prezzo = Date.now();
    db.run(`UPDATE biglietto SET tempo_di_attesa_out = (?), prezzo = (?) WHERE id = ?`,[uscita,prezzo,id], (error, result) => {
        if(error){
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": result
            
           
        }
        res.status(201).send(response);
    });
});

app.delete('/ticket/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM biglietto WHERE id = ?`, id, (error, result) => {
        if(error){
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": result
        }
        res.status(200).send(response);
    });
});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/ticket', (req, res) => {
    
    const start = Date.now();
    console.log(start);
    const id = Math.random;
    console.log(id);
    db.run(`INSERT INTO biglietto (id,tempo_di_attesa_in) VALUES (?,?)`, id,start, (error, result) => {
        if(error){
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": id

        }
        res.status(201).send(response);
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});