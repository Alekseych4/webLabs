var express = require("express"),
http = require("http"),
mongoose = require("mongoose"),
app = express(),
ToDosController = require("./Amazeriffic/controllers/todos_controller.js"),
UsersController = require("./Amazeriffic/controllers/users_controller.js");


app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/Amazeriffic/client"));
app.use('/user/:username',express.static(__dirname + "/Amazeriffic/client"));

mongoose.connect('mongodb://localhost/amazeriffic', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(res => {
    console.log("DB Connected!")
}).catch(err => {
    console.log(Error, err.message);
});


http.createServer(app).listen(3000);

app.get("/todos.json", ToDosController.index);
app.get("/todos/:id", ToDosController.show); 
app.post("/todos", ToDosController.create);
app.put("/todos/:id", ToDosController.update);
app.delete("/todos/:id", ToDosController.destroy);

app.get("/users/:username/todos.json", ToDosController.index);
app.post("/users/:username/todos", ToDosController.create);
app.put("/users/:username/todos/:id", ToDosController.update);
app.delete("/users/:username/todos/:id", ToDosController.destroy);

app.get("/users.json", UsersController.index); 
app.post("/users", UsersController.create); 
app.get("/users/:username", UsersController.show);
app.put("/users/:username", UsersController.update);
app.delete("/users/:username", UsersController.destroy); 
