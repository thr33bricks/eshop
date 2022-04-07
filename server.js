if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//modules
//insert my own modules here

const express = require('express')
var http = require('http')
var fs = require('fs');
const { Client } = require('pg')

const app = express()

//========================================= Security ================================================
app.use(express.json({ limit: '30kb' }));//Limiting payload; basic DOS protection

const rateLimit = require('express-rate-limit')
const limit = rateLimit({
  max: 150,// max requests
  windowMs: 60 * 1000 * 2, // 15 mins
  message: 'Too many requests' // message to send
}); //Basic DOS and brute force protection
app.use('/', limit);

// Data Sanitization against XSS
const xss = require('xss-clean')
app.use(xss());

app.disable('x-powered-by')
//===================================================================================================

const flash = require('express-flash');
const session = require('express-session')
const { strictEqual } = require('assert');

app.set('view-engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

//Postgres connection
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})
client.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});


app.get('/', (req, res) => {
    
})

app.post('/', (req, res) => {
    
})

app.use((res) => {
    res.status(404)
    res.redirect('/')
})




//===================================== Functions ===================================================



//===================================================================================================

var httpServer = http.createServer(app)
httpServer.listen(process.env.HTTP_PORT)