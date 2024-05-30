const TaskModel = require('../models/taskModel');


function generateRandomAlphanumeric() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let alphanumericNumber = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        alphanumericNumber += characters[randomIndex];
    }

    return alphanumericNumber;
}


const deleteTask=async (req,res)=>{

    const {taskid,userid}=req.body
    try{
    const user = await TaskModel.findOne({userid:userid });
  
      if (user == null) {
        return res.status(404).json({
          status: 404,
          success: false,
          msg: "No Task For User  Found"
        });
      } else {



        const taskIndex=user.tasks.findIndex(task=>task.taskid===taskid)
        if (taskIndex === -1) {
            return res.status(404).json({
                status: 404,
                success: false,
                msg: "Task not found"
            });
        }
        const taskDoc = await TaskModel.findOneAndUpdate(
            { userid: userid},
            { $pull: { tasks:user.tasks[taskIndex] } },
            { new: true, upsert: true }
        );
        return res.status(200).json({
            status: 200,
            success: true,
            msg: "Data is removed from database successfully",
            
        });
    }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            success: false,
            msg: "Internal Server Error"
        });
    }
}


const addTask = async (req, res) => {
    try {
        const taskid=generateRandomAlphanumeric();
        const { taskName, taskDescription, priority, status, dueDate, userId } = req.body;

        if (!taskName || !taskDescription || !priority || !status || !dueDate || !userId) {
            return res.status(400).json({
                status: 400,
                success: false,
                msg: "All fields are required"
            });
        }else{
        const newTask = {
            taskid,
            taskName,
            taskDescription,
            priority,
            status,
            dueDate,
            createdOn: new Date()
        };

        const taskDoc = await TaskModel.findOneAndUpdate(
            { userid: userId },
            { $push: { tasks: newTask } },
            { new: true, upsert: true }
        );

        return res.status(200).json({
            status: 200,
            success: true,
            msg: "Data is saved to database successfully",
            data: taskDoc
        });
    }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            success: false,
            msg: "Internal Server Error"
        });
    }
};


const  getAllTasks = async (req, res) => {
  try {
    const allTask = await TaskModel.findOne({ userid: req.body.userId });

    if (allTask == null) {
      return res.status(404).json({
        status: 404,
        success: false,
        msg: "No Task Found"
      });
    } else {
      return res.status(200).json({
        status: 200,
        success: true,
        data: allTask,
        msg: "Data Found"
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      msg: "Internal Server Error"
    });
  }
};

const  editTask = async (req, res) => {
    try {

    const {taskid,userid,task}=req.body
      const user = await TaskModel.findOne({userid:userid });
  
      if (user == null) {
        return res.status(404).json({
          status: 404,
          success: false,
          msg: "No Task For User  Found"
        });
      } else {



        const taskIndex=user.tasks.findIndex(task=>task.taskid===taskid)
        if (taskIndex === -1) {
            return res.status(404).json({
                status: 404,
                success: false,
                msg: "Task not found"
            });
        }

        // Update the task fields with the new data
        user.tasks[taskIndex].taskName = task.taskName;
        user.tasks[taskIndex].taskDescription = task.taskDescription;
        user.tasks[taskIndex].priority = task.priority;
        user.tasks[taskIndex].status = task.status;
        user.tasks[taskIndex].dueDate = task.dueDate;

        
        const updatedUserTasks = await user.save();

        return res.status(200).json({
            status: 200,
            success: true,
            data: updatedUserTasks,
            msg: "Task updated successfully"
        });
    }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        success: false,
        msg: "Internal Server Error"
      });
    }
  };
  const  getTask = async (req, res) => {
    try {

    const {taskid,userid}=req.body
      const user = await TaskModel.findOne({userid:userid });
  
      if (user == null) {
        return res.status(404).json({
          status: 404,
          success: false,
          msg: "No Task For User  Found"
        });
      } else {



        const taskIndex=user.tasks.findIndex(task=>task.taskid===taskid)
        if (taskIndex === -1) {
            return res.status(404).json({
                status: 404,
                success: false,
                msg: "Task not found"
            });
        }else{

        return res.status(200).json({
            status: 200,
            success: true,
            data:user.tasks[taskIndex],
            msg: "Task fetched successfully"
        });
    }
    }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        success: false,
        msg: "Internal Server Error"
      });
    }
  };
module.exports = {
    addTask,
    getAllTasks,
    editTask,
    getTask,
    deleteTask
};
