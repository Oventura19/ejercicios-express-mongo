var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
//app.set('view engine', 'pug');
//app.set('views', 'views');

var app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/register', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function(e) { console.error(e); });

var schema = mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" }
});

var Visitor = mongoose.model("Visitor", schema);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    Visitor.find({}, function(err, visits) {
        if (err) { return console.error(err) }
        let i = '<a href="<button type="submit">Registrarse</button><br>' +
            "<table><thead><th>Name</th><th>Email</th></thead><tbody>";
        visits.forEach(element => {
            i += "<tr><td>" + element.name + "</td>";
            i += "<td>" + element.email + "</td></tr>";
        });
        i += "</tbody></table>";
        res.send(i);
    });
});

app.get('/register', function(req, res) {
    //res.send('/register');
    res.send('<form action="/register" method="post"> <br>Nombre<br><label for="name"> <input type="text" id="name" name="name"><br><br>Email<br> <input type="text" id="email" name="email"><br><br>Contraseña<br> <input type="password" id="password" ><br><br><button type="submit">Registrarse</button></form>');
});

app.use(express.urlencoded());
app.post('/register', (req, res) => {
    var first = new Visitor({ name: req.body.name, email: req.body.email, password: req.body.password });
    first.save(function(err) {
        if (err) { return console.error(err) };
    });
    res.redirect('/');
    //var tagName = req.body.name;
    //var tagEmail = req.body.email;
    //res.send(tagName + "<br>" + tagEmail);


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