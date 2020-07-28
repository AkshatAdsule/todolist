const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    var today = new Date();

    if(today.getDay() == 6 || today.getDay() == 0) {
        res.send("<h1>It's the weekend!</h1>");
    } else {
        res.sendFile(__dirname + "/index.html")
    }
});

app.listen(7000, function() {
    console.log("Server is running on port 7000");
});