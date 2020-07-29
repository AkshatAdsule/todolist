const express = require('express');
const bodyParser = require('body-parser');

let tasks = [];

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"))


app.get('/', function (req, res) {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);
    res.render("list", {
        day: day,
        tasks: tasks
    });
});

app.post('/', function (req, res) {
    let task = req.body.task;
    if (task !== "") {
        tasks.push(req.body.task);
        console.log(`%cAdded task: ${req.body.task}`, "color:green; font-size:14px");
    }
    res.redirect('/');
});

app.listen(7000, function () {
    console.log("Server is running on port 7000");
});