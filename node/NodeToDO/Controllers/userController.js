const UserModel=require("../models/userModel");
const bcrypt=require('bcrypt');
const number=10
const jwt=require('jsonwebtoken');
const secretKey='token';

const register=(req,res)=>{


    UserModel.findOne({email: req.body.email})
        .then(userData=>{
            if(userData==null){

                const uObj=new UserModel();
                uObj.firstName=req.body.firstName;
                uObj.lastName=req.body.lastName;
                uObj.password=bcrypt.hashSync(req.body.password,number);
                uObj.email=req.body.email;

                uObj.save().then(()=>{
                    res.json({
                        status:200,
                        success:true,
                        msg:"Data is saved to database successfully"
                    })
                })


            }else{
                res.json({
                    status:400,
                    success:false,
                    msg:"User already exists"
                })
            }
        })
}


const login=(req,res)=>{
    console.log("login cred : "+req.body.email)
    UserModel.findOne({email:req.body.email})
        .then(userData=>{
            if(userData==null){
                res.json({
                    status:400,
                    success:false,
                    msg:"Incorrect username or password"
                })
            }else {

                if (bcrypt.compareSync(req.body.password, userData.password)) {
                    const authentication_token = jwt.sign({ userid: userData._id }, secretKey, { expiresIn: '1h' });
                    res.cookie('token', authentication_token, { httpOnly: true });
                    const userid = userData._id;
                    res.json({
                        status: 200,
                        success: true,
                        data: userData,
                        authentication_token,
                        userid,
                        msg: "Login successfully"
                    })
                } else {
                    res.json({
                        status: 400,
                        success: false,
                        msg: "Incorrect password"
                    })

                }
            }
        })
}
const getUser=(req,res)=>{

    const {userId}=req.body
    UserModel.findOne({_id:userId})
        .then(userData=>{
            if(userData==null){
                res.json({
                    status:400,
                    success:false,
                    msg:"Incorrect userId"
                })
            }else {
                    res.json({
                        status: 200,
                        success: true,
                        data: userData,
                        msg: "Login successfully"
                    })
                }

                
            
        })
}


module.exports={
    register,
    login,
    getUser
}