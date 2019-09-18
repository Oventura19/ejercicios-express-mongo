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
                    i = "<th><table><td>Id</td><td>Name</td><td>Visits</td></th>" + i + "<th></table></th>";
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
                    i = "<th><table><td>Id</td><td>Name</td><td>Visits</td></th>" + i + "<th></table></th>";
                    res.send(i);

                });
            });
        }
    });

});

app.listen(3000, () => console.log('Listening on port 3000!'));