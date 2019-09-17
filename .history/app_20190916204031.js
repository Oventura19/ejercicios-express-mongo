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
    Visitor.findOne({ name: req.query.name }, function(err, visitor) {
        if (!visitor) {
            var first = new Visitor({ date: Date.now(), name: tagId });
            first.save(function(err) {
                if (err) { return console.error(err) };
            });
        }
    });



});
app.listen(3000, () => console.log('Listening on port 3000!'));