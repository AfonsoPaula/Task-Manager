const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// connection options with MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_tasks'
});

const app = new express();
app.listen(3000, () => {
    console.log('.......... <Server Started> ..........');
})

// middleware
app.use(cors());

// routes
// --------------------------------------------------------------------------
app.get("/", (req,res) => {
    connection.query("SELECT COUNT(*) users FROM users", (err, results) => {
        if (err){
            res.send('MySQL connection error.');
        } 
        res.send('MySQL connection OK.');
    })
});

// --------------------------------------------------------------------------
app.get("/user/:id", (req,res) => {
    connection.query("SELECT id, username, created_at FROM users WHERE id = ?", [req.params.id], (err, results) => {
        if (err){
            res.send('MySQL connection error.');
        } 
        res.json(results);
    })
});

// --------------------------------------------------------------------------
app.get("/user/:id/tasks", (req,res) => {
    connection.query("SELECT * FROM tasks WHERE id_user = ?", [req.params.id], (err, results) => {
        if (err){
            res.send('MySQL connection error.');
        } 
        res.json(results);
    })
});