var express = require('express');
var app = express();
var useragent = require('express-useragent');

app.use(useragent.express());
app.get('/', function(req, res) {
    res.send(req.get('User-Agent'));
});

app.listen(3000, () => console.log('listenig on port 3000'));