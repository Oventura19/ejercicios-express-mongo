const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require('path');
require("./user");
const routes = require('./routes');

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/registrations", { useNewUrlParser: true });

const app = express();
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/css', express.static(path.join(__dirname, 'css')));

app.use('/', routes);

app.listen(3000, () => console.log("Listening on port 3000 ..."));