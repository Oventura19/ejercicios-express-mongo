const express = require("express");
const app = express();

app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', 'views');

app.get("/", (req, res) => {
  res.render('index');
});

app.post("/", (req, res) => {
  res.send(`<h1>Hola ${req.body.name}!</h1>`);
});

app.listen(3000, () => console.log("Listening on port 3000!"));
