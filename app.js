const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

console.log(date.getDate());

const dayTasks = [];
const workTasks = [];

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"))


app.get('/', function (req, res) {
    let day = date.getDate();
    res.render("list", {
        listTitle: day,
        tasks: dayTasks
    });
});

app.post('/', function (req, res) {
    let task = req.body.task;
    if (task !== "") {
        if (req.body.list == "Work") {
            workTasks.push(req.body.task);
            console.log(`%cAdded task to work: ${req.body.task}`, "color:green; font-size:20px");
            res.redirect('/work');
        } else {
            dayTasks.push(req.body.task);
            console.log(`%cAdded task to day: ${req.body.task}`, "color:blue; font-size:20px");
            res.redirect('/');
        }
    }
});

app.get('/work', function (req, res) {
    res.render("list", {
        listTitle: "Work",
        tasks: workTasks
    });
});

app.get('/about', function (req, res) {
    res.render("about");
});
app.listen(7000, function () {
    console.log("Server is running on port 7000");
});