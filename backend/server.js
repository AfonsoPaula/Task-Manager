const express = require('express');
const mysql = require('mysql');

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

// routes
app.get("/", (req,res) => {
    connection.query("SELECT COUNT(*) users FROM users", (err, results) => {
        if (err){
            res.send(err.message);
        } 

        res.send(results);
    })
})