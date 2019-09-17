var express = require('express')
var bodyParser = require('body-parser')
var app = express()


app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => {
    res.send("<h1>Hola " + req.body.name + "!</h1>");
});

app.get('/', (req, res) => {
    res.send("<form action='/' method='post'> <input type='text' name='name'> <button type='submit'> Enviar </button> </form>");
})

app.listen(3000, () => console.log('listenig on port 3000'));