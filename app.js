const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up a new express app that uses EJS and body-parser, with a public directory.
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"))

//set up mongoose and create task schema
mongoose.connect('mongodb://localhost:27017/todolistDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const taskSchema = {
    name: String
};
const Task = mongoose.model('task', taskSchema);

const task1 = new Task({
    name: "Welcome to your todolist!"
});
const task2 = new Task({
    name: "Add a task by clicking the + button."
});
const task3 = new Task({
    name: "<-- press this to finish your task"
});
const defaultTasks = [task1, task2, task3];

Task.insertMany(defaultTasks, function(err) {
    if(err){
        console.log(err);
    }
});


app.get('/', function (req, res) {
    res.render("list", {
        listTitle: "Today",
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