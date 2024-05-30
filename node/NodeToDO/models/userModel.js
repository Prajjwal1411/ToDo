const mongoDb = require("mongoose");



const userSchema=new mongoDb.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});


const UserData=mongoDb.model('User',userSchema);

module.exports =UserData;