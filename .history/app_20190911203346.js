var express = require('express');
var app = express();
//var useragent = require('express-useragent');
var useragent = new UserAgent().parse(navigator.useragent);

app.use(useragent.express());
app.get('/', function(req, res) {
    res.send(req.useragent);
});

app.listen(3000, () => console.log('listenig on port 3000'));