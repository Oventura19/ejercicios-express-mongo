var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

mongoose.connection.on("error", function(e) { console.error(e); });

app.listen(3000, () => console.log("Listening on port 3000 ..."));