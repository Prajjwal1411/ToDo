
const Route=require("express").Router()
const UserController=require('../Controllers/userController')
const TaskController=require('../Controllers/taskController')
const authentication=require("../middleware/authMiddleware")

Route.post("/register",UserController.register);
Route.post("/login",UserController.login);

Route.post("/getuser",authentication,UserController.getUser);
Route.post("/addTask",authentication,TaskController.addTask);
Route.post("/getTasks",authentication,TaskController.getAllTasks);
Route.post("/editTasks",authentication,TaskController.editTask);
Route.post("/gettask",authentication,TaskController.getTask);
Route.post("/delete",authentication,TaskController.deleteTask);


module.exports=Route;