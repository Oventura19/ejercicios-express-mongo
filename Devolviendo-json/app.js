const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/mongo-1", { useNewUrlParser: true })

// definimos el schema
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number
});

// definimos el modelo
const Product = mongoose.model("Product", ProductSchema)

app.get("/products", async (req, res) => {
  const products = await Product.find()
  res.json(products);
});

app.listen(3000, () => console.log("Listening on port 3000 ..."));
