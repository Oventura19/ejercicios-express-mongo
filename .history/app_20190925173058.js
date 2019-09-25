const express = require('express');
const app = express();
const mongoose = require("mongoose");
const routes = require('./routes');

//Settings
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
app.use(express.json())
app.use('/', routes);


//Port
app.listen(3000, () => {
    console.log('Listening on port 3000!');
});