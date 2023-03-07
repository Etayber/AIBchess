//const express = require('express');
import express from 'express';
const app = express()
//const cors = require('cors');
import cors from 'cors';
const port = 3000

app.use(cors());
app.use(express.json());


app.post('/post', (req, res) => {
    CreateUserInDB(req.body.email, req.body.password, req.body.phone);
})

app.get('/', (req, res) => {

    res.send({"test": 1});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


async function CreateUserInDB(email1, password, phone) {
    const mariadb = require('mariadb');
    const pool = mariadb.createPool({
        host: '3.71.113.171',
        user:'etay',
        password: 'etay',
        connectionLimit: 5
    });

    let conn;
    try{
        conn = await pool.getConnection();
        const id_cnt =await conn.query("SELECT MAX(user_ID) AS 'id' FROM AIB.Users");
        console.log(id_cnt[0].id);
        try{
            const email_on_db =await conn.query("SELECT email FROM AIB.Users WHERE email = (?)", [email1]);
            //console.log();
            if(email_on_db[0].email==email1) {
                console.log("email already exists!");
            }
        } catch (er){
            console.log(er);
            console.log("email doesnt exist");
            const new_user = await conn.query("INSERT INTO AIB.Users value (?, ?, ?, ?)", [id_cnt[0].id + 1, email1, password, phone]);
            console.log("successfully added " + email1 + " to the database");
        }

    } catch (err){
        throw err;
    } finally {
        if(conn) return conn.end();
    }
}