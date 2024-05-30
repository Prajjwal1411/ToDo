const auth = require("./auth");

module.exports={
    url:"mongodb+srv://"+auth.id+":"+auth.password+"@todo-app.our8tgf.mongodb.net/todo?retryWrites=true&w=majority&appName=todo-app"
}