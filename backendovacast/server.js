require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


// Připojení k databázi
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Metody pro pojištěnce

app.get('/pojistenci', (req, res) => {
    db.query('SELECT * FROM pojistenci', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/pojistenci', (req, res) => {
    const { jmeno, prijmeni, vek, email, telefon, ulice, mesto } = req.body;
    db.query('INSERT INTO pojistenci SET ?', { jmeno, prijmeni, vek, email, telefon, ulice, mesto }, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, jmeno, prijmeni, vek, email, telefon, ulice, mesto });
    });
});

app.get('/pojistenci/:id', (req, res) => {
    db.query('SELECT * FROM pojistenci WHERE id = ?', [req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

app.put('/pojistenci/:id', (req, res) => {
    db.query('UPDATE pojistenci SET ? WHERE id = ?', [req.body, req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: 'Pojištěnec upraven úspěšně' });
    });
});

app.delete('/pojistenci/:id', (req, res) => {
    db.query('DELETE FROM pojistenci WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: 'Pojištěnec smazán úspěšně' });
    });
});

// Metody pro pojisteni pojistencu

app.post('/pojisteni', (req, res) => {
    db.query('INSERT INTO pojisteni SET ?', req.body, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...req.body });
    });
});


app.get('/pojisteni', (req, res) => {
    const { pojistenciId } = req.query;
    const query = 'SELECT id, pojistenciId, typ, predmet, castka, DATE_FORMAT(\`od_data\`, "%Y-%m-%d") AS \`od_data\`, DATE_FORMAT(\`do_data\`, "%Y-%m-%d") AS \`do_data\` FROM pojisteni WHERE pojistenciId = ?';
    db.query(query, [pojistenciId], (err, result) => {
        if (err) {
            return res.status(500).json({error:'Error databáze', details: err});
        }
        res.json(result || []);
    });
});

app.get('/pojisteni/:id', (req, res) => {
    const {id} = req.params;
    const query = `SELECT id, pojistenciId, typ, predmet, castka, DATE_FORMAT(\`od_data\`, "%Y-%m-%d") AS \`od_data\`, DATE_FORMAT(\`do_data\`, "%Y-%m-%d") AS \`do_data\` FROM pojisteni WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({error: 'Error databáze', details: err });
        }
        res.json(results[0]);
    });
});


app.put('/pojisteni/:id', (req, res) => {
    db.query('UPDATE pojisteni SET ? WHERE id = ?', [req.body, req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: 'Pojištění upraveno úspěšně' });
    });
});

app.delete('/pojisteni/:id', (req, res) => {
    db.query('DELETE FROM pojisteni WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: 'Pojištění smazáno úspěšně' });
    });
});

// Spusteni serveru

app.listen(process.env.PORT, () => {
    console.log(`Server běží na portu ${process.env.PORT}`);
});
