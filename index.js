//config inicial
const express  = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

//forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

//rotas da API
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

//rota inicial / endpoint
app.get('/', (req, res) => {
    //mostrar requisção

    res.json({
        message: 'Oi express!'
    })
})

//entregar uma porta
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.hfe5bu7.mongodb.net/?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log("Conectamos ao mongoDB!");
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err);
    })

