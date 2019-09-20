var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');

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
    res.send('tablayboton');
});

app.get('/register', function(req, res) {
            //res.send('<form action="" method="post"><label for="name"> <input type="text" id="name" name="name"> <button type="submit">Enviar</button></form>');
            res.send('<h1>Formulario de Registro</h1> <
                form >
                <
                div class = "form-group" >
                <
                label class = "control-label"
                for = "username" > Usuario: < /label> <
                input type = "text"
                class = "form-control input-lg"
                id = "username"
                placeholder = "Ingresa un usuario" >
                <
                p class = "help-block" > < /p> <
                /div> <
                div class = "form-group" >
                <
                label class = "control-label"
                for = "password" > Contraseña < /label> <
                input type = "password"
                class = "form-control input-lg"
                id = "password"
                placeholder = "Ingresa una contraseña" >
                <
                p class = "help-block" > < /p> <
                /div> <
                div class = "checkbox terms-checkbox" >
                <
                label >
                <
                input type = "checkbox"
                id = "terms" > Acepto los términos y condiciones <
                /label> <
                /div> <
                div class = "action text-right" >
                <
                button type = "submit"
                class = "btn btn-primary btn-block btn-lg" > Registrarse < /button> <
                /div> <
                /form>');
            });

        app.post('/register', function(req, res) {
            let registro = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            };
            res.send('/register');
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