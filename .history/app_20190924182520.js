var express = require('express');
var mongoose = require("mongoose");
//var bodyParser = require('body-parser');

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
        let i = '<a href="/register">Registrarse</a>' + "<table><thead><th>Name</th><th>Email</th></thead><tbody>";
        visits.forEach(element => {
            i += "<tr><td>" + element.name + "</td>";
            i += "<td>" + element.email + "</td></tr>";
        });
        i += "</tbody></table>";
        res.send(i);
    });
});

app.get('/register', function(req, res) {
    res.send('<form action="/register" method="post"> <br>Nombre<br><label for="name"> <input type="text" id="name" name="name"><br><br>Email<br> <input type="text" id="email" name="email"><br><br>Contraseña<br> <input type="password" id="password" ><br><br><button type="submit">Registrarse</button></form>');
});

app.use(express.urlencoded());
app.post('/register', (req, res) => {
    var first = new Visitor({ name: req.body.name, email: req.body.email, password: req.body.password });
    first.save(function(err) {
        if (err) { return console.error(err) };
    });
    res.redirect('/');

});

app.listen(3000, () => console.log('Listening on port 3000!'));