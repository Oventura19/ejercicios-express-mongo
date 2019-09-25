const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/products', { useNewUrlParser: true });

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number
});
const Product = mongoose.model("Product", ProductSchema);

app.get("/products", async(req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.listen(3000, () => console.log("Listening on port 3000 ..."));