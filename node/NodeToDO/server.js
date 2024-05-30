const express=require("express");
const bodyparser=require("body-parser");

const app=express();
const dbConnection=require("./dbConfiguration/dbConnection");
const conn = require("./dbConfiguration/dbConnection");
const cors=require('cors');
const Route = require("./Routes/Routes");
const session = require('express-session');
const Port=8000;

app.use(cors())
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json({ limit:'500mb'}))

app.use(session({
    secret: 'token',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

app.use(Route)



app.listen(Port,()=>{
    console.log("App is running on Port 8000 !")
})