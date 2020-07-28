const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    let today = new Date();
    let day = "";
    switch(today.getDay()){
        case 0: 
            day = "Sunday";
            break;
        case 1: 
            day = "Monday";
            break;
        case 2: 
            day = "Tuesday";
            break;
        case 3: 
            day = "Wednesday";
            break;
        case 4: 
            day = "Thursday";
            break;
        case 5: 
            day = "Friday";
            break;
        case 6: 
            day = "Saturday";
            break;
    }
    res.render("list", {kindOfDay: day});
});

app.listen(7000, function() {
    console.log("Server is running on port 7000");
});