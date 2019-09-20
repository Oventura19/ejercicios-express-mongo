var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');

var app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/registro', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function(e) { console.error(e); });

var schema = mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" }
});

var Visitor = mongoose.model("Visitor", schema);

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/formulario', function(req, res) {
    res.render('formulario');
});

app.post('/graba-usuario', function(req, res) {
    let registro = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    console.log(JSON.stringify(registro));

    mongodb.connect(dbUrl, function(err, db) {
        db.collection('usuarios').insert(registro);
    });

    res.render('graba-usuario');
})

app.get('/listado', function(req, res) {
    mongodb.connect(dbUrl, function(err, db) {
        db.collection('usuarios').find().toArray(function(err, docs) {
            datos.usuarios = docs;
            res.render('listado', datos);
        });
    });
});

app.listen(3000, () => console.log('Listening on port 3000!'));











/*
const express = require('express');
const app = express();

var mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function(e) { console.error(e); });

var schema = mongoose.Schema({
    count: { type: Number, default: 1 },
    name: { type: String, default: "Anónimo" }
});

var Visitor = mongoose.model("Visitor", schema);

app.get('/', function(req, res) {
    var tagId = req.query.name ? req.query.name : "Anónimo";
    Visitor.findOne({ name: tagId }, function(err, visitor) {
        if (!visitor) {
            var first = new Visitor({ name: tagId });
            first.save(function(err) {
                if (err) { return console.error(err) };
                Visitor.find({}, function(err, visits) {
                    if (err) { return console.error(err) }
                    let i = "";
                    visits.forEach(element => {
                        i += "<tr><td>" + element._id + "</td>";
                        i += "<td>" + element.name + "</td>";
                        i += "<td>" + element.count + "</td></tr>";
                    });
                    i = "<table><thead><th>Id</th><th>Name</th><th>Visits</th></thead><tbody>" + i + "</tbody></table>";
                    res.send(i);

                });
            });
        } else {
            visitor.count += 1;
            visitor.save(function(err) {
                if (err) return console.log(err);
                Visitor.find({}, function(err, visits) {
                    if (err) { return console.error(err) }
                    let i = "";
                    visits.forEach(element => {
                        i += "<tr><td>" + element._id + "</td>";
                        i += "<td>" + element.name + "</td>";
                        i += "<td>" + element.count + "</td></tr>";
                    });
                    i = "<table><thead><th>Id</th><th>Name</th><th>Visits</td></thead><tbody>" + i + "</tbody></table>";
                    res.send(i);

                });
            });
        }
    });

});

app.listen(3000, () => console.log('Listening on port 3000!'));*/