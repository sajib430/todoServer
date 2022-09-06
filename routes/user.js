
const express=require("express")
const router=express.Router()
const bcrypt=require("bcryptjs")
const user_jwt=require("../middleware/user_jwt")
const jwt = require('jsonwebtoken');

const User=require("../models/User")

// router.get("/",user_jwt,async (req,res,next)=>{
//     try{

//         const user=await User.findById(req.user.id).select('-password');
//         res.status(200).json({
//             success:true,
//             user:user
//         })

//     }catch(error){
//         console.log(error.message);
//         res.status(500).json({
//             success:false,
//             msg:"Server err"
//         })
//         next();
//     }
// })


router.get("/",async (req,res,next)=>{
    try{

        const user=await User.find(this.all);
        res.status(200).json({
            success:true,
            user:user
        })

    }catch(error){
        console.log(error.message);
        res.status(500).json({
            success:false,
            msg:"Server err"
        })
        next();
    }
})



router.put('/',user_jwt, async (req, res, next) => {
    try {
        let toDoU = await User.findById(req.user.id);
        if(!toDoU) {
            return res.status(400).json({ success: false, msg: 'Author does not exits'});
        }

        toDoU=await User.findByIdAndUpdate(req.user.id,req.body,{
            new:true,
            runValidators:true
        })

        // toDo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // });

        res.status(200).json({ success: true,User: toDoU, msg: 'Successfully updated' });
        
    } catch (error) {
        next(error);
    }

});






router.post("/register",async(req,res,next)=>{
    const {username,email,password}=req.body;

    try{

        let user_exist=await User.findOne({email:email});

        if(user_exist){
            return res.status(400).json({
                success:false,
                msg:"user already exists"
            })
        }

        let user=new User();
        user.username=username;

        user.email=email;

        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);

        let size =200;
        user.avatar='https://gravatar.com/avatar/?s='+size+'&d=retro';

        await user.save();

        const payload={
            user:{
                id:user.id
            }
        }

        

        jwt.sign(payload,process.env.jwtUserSecret,{
            expiresIn:360000
        },(err,token)=>{
            if(err) throw err;
            res.status(200).json({
                success:true,
                token:token
            })

            
        })

      

    }catch(err){
        console.log(err);
    }

});

router.post('/login', async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {

        let user = await User.findOne({
            email: email
        });

        if(!user) {
            return res.status(400).json({
                success: false,
                msg: 'User not exists go & register to continue.'
            });
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                success: false,
                msg: 'Invalid password'
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, process.env.jwtUserSecret,
            {
                expiresIn: 360000
            }, (err, token) => {
                if(err) throw err;

                res.status(200).json({
                    success: true,
                    msg: 'User logged in',
                    token: token,
                    user: user
                });
            }
        )

    } catch(error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        })
    }
});


module.exports=router;

