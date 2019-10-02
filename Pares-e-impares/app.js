const express = require("express");
const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.get("/", (req, res) => {
  const texts = [];
  for (let i=1; i <=50; i++) {
    texts.push(`${i} Soy ${(i % 2 == 0 ? "Par" : "Impar")}!`);
  }

  res.render("index", { texts: texts });
});

app.listen(3000);
