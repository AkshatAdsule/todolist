const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const atlasKey = "SQzUbT6AtldBDA9l";

// set up a new express app that uses EJS and body-parser, with a public directory.
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"))

//set up mongoose, create task schema, and add tutorial tasks
mongoose.connect(`mongodb+srv://admin-akshat:${atlasKey}@todolist.ba0k7.gcp.mongodb.net/todolist?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const taskSchema = {
    name: String,
    listName: String
};
const Task = mongoose.model('task', taskSchema);

const tutorialTask1 = new Task({
    name: "Welcome to your todolist!",
    listName: '/'
});
const tutorialTask2 = new Task({
    name: "Add a task by clicking the + button.",
    listName: '/'
});
const tutorialTask3 = new Task({
    name: "<-- Press this to finish your task.",
    listName: '/'
});
const defaultTasks = [tutorialTask1, tutorialTask2, tutorialTask3];

app.get('/', function (req, res) {
    Task.find({listName: '/'}, function (err, foundTasks) {
        if(foundTasks.length == 0) {
            Task.insertMany(defaultTasks, function(err) {
                if(err){
                    console.log(err);
                }
            });
            res.redirect('/');
        } else {
            res.render("list", {
                listTitle: "Today",
                tasks: foundTasks,
                listRoute: "/"
            });
        }
    });
});

app.post('/', function (req, res) {
    let task = req.body.task;
    if (task !== "") {
        const newTask = new Task({
            name: task,
            listName: '/'
        });
        newTask.save();
        res.redirect('/');
        }
    }
);

app.post('/delete', function(req,res) {
    const id = req.body.checkbox;
    Task.findById(id, async function(err, doc) {
        if(err){
            console.log(err);
        } else 
        if(doc.listName == '/') {
            res.redirect('/')
        } else {
            let url = "/" + await doc.listName
            res.redirect(url)
        }
    });
    Task.deleteOne({_id: id}, function(err) {
        if(err) {
            console.log(err);
        }
    });
});

app.get('/:listName', function(req, res) {
    const listName = req.params.listName;
    Task.find({listName: listName}, function(err, foundTasks) {
        if(err) {
            console.log(err);
        } else {
            res.render("list", {
                listTitle: listName,
                tasks: foundTasks,
                listRoute: '/' + listName
            });
        }
    });
});

app.post('/:listName', function (req, res) {
    let task = req.body.task;
    let listName = req.params.listName
    if (task !== "") {
        const newTask = new Task({
            name: task,
            listName: listName
        });
        newTask.save();
        res.redirect('/' + listName);
        }
    }
);

app.get('/about', function (req, res) {
    res.render("about");
});
app.listen(process.env.PORT || 7000);