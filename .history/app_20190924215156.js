const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes'); //Requerimos el archivo de rutas
const cookieParser = require('cookie-parser'); //Cookies
const cookieSession = require('cookie-session'); //Middleware para las sesiones

//Settings
app.set('view engine', 'pug');
app.set('views', 'views');
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/registrations', { useNewUrlParser: true }); //Conexion a mongodb y creacion de la base de datos registrations

//Middlewares
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
})); //Configuracon de las sesiones
app.use(express.urlencoded()); //Para leer el cuerpo de las peticiones hechas por los formularios.
app.use('/static', express.static(__dirname + '/public')); //Para acceder a lo que se encuentra en la carpeta public.
app.use('/', routes);

//Port
app.listen(3000, () => {
    console.log('Listening on port 3000!');
});






/*var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var app = express();
var bcrypt = require('bcrypt');
var cookieSession = require('cookie-session');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/login', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function(e) { console.error(e); });

var UserSchema = mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" }
});

bcrypt.hash("password", 10).then(function(hash) {
    // almacena la contraseña en la base de datos
    bcrypt.compare("password", hash).then(function(res) {
        // res == true
    });
    bcrypt.compare("password2", hash).then(function(res) {
        // res == false
    });
});

app.use(cookieSession({
    secret: "text", // una cadena de texto aleatoria 

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

var Visitor = mongoose.model("Visitor", UserSchema);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    Visitor.find({}, function(err, visits) {
        if (err) { return console.error(err) }
        let i = '<a href="/login">Registrarse</a>' + "<table><thead><th>Name</th><th>Email</th></thead><tbody>";
        visits.forEach(element => {
            i += "<tr><td>" + element.name + "</td>";
            i += "<td>" + element.email + "</td></tr>";
        });
        i += "</tbody></table>";
        res.send(i);
    });
});

app.get('/login', function(req, res) {
    res.send('<form action="/login" method="post"> <br>Nombre<br><label for="name"> <input type="text" id="name" name="name"><br><br>Email<br> <input type="text" id="email" name="email"><br><br>Contraseña<br> <input type="password" id="password" ><br><br><button type="submit">Registrarse</button></form>');
});

app.use(express.urlencoded());

UserSchema.statics.authenticate = async(email, password) => {
    // buscamos el usuario utilizando el email
    let user = await mongoose.model("User").findOne({ email: email });

    app.post("/login", async function(req, res) {
        let email = req.body.email;
        let password = req.body.password;

        try {
            let user = await User.authenticate(email, password);
            if (user) {
                req.session.userId = user._id; // acá guardamos el id en la sesión
                return res.redirect("/");
            } else {
                res.send("/login", { error: "Wrong email or password. Try again!" });
            }
        } catch (e) {
            return next(e);
        }
    });

    if (user) {
        // si existe comparamos la contraseña
        let match = await bcrypt.compare(password, user.password);
        return match ? user : null;
    }

    return null;
};







/*app.post('/login', (req, res) => {
    var first = new Visitor({ name: req.body.name, email: req.body.email, password: req.body.password });
    first.save(function(err) {
        if (err) { return console.error(err) };
    });
    res.redirect('/');

});*/

app.listen(3000, () => console.log('Listening on port 3000!'));