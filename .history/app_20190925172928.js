'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    next();
});

app.get('/products', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: "error mostrando" })
        if (!products) return res.status(404).json({ products: [] })
        res.json(products)
    })

})

app.post('/products', (req, res) => {
    console.log('POST /products')
    console.log(req.body)

    let product = new Product()
    product.name = req.body.name
    product.price = req.body.price

    product.save((err, productStored) => {
        if (err) res.status(200).send({ message: 'error salvando' })
        res.status(201).json(productStored)
    })
})

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/shop', { useNewUrlParser: true }, (err, res) => {
    if (err) throw err
    console.log('Conexion mongo ok')

    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`)
    })
})

app.listen(3000, () => console.log("Listening on port 3000 ..."));