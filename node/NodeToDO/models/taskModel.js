const { default: mongoose } = require("mongoose");
const mongoDb=require("mongoose");

const taskSchema=mongoDb.Schema({

    userid: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
    },

    tasks:[{
        taskid:{
            type:String,
            required:true
        },
        taskName:{
            type:String,
            required:true
        },
        taskDescription:{
            type:String,
            required:true
        },
        priority:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        },
        dueDate:{
            type:String,
            required:true
        },
        createdOn:{
            type:Date,
            default:Date.now()
        }





    },]
})

const TaskData=mongoDb.model('Task',taskSchema);

module.exports =TaskData;