const express=require("express");
const auth=require("../middleware/user_jwt");
const Todo=require("../models/Todo");


const router=express.Router();

//create new todo task
router.post("/",auth,async(req,res,next)=>{
    try{

      const  toDo=await Todo.create({titleee:req.body.titleee,description:req.body.description,user:req.user.id});

      if(!toDo){
        return res.status(400).json({
            success:false,
            msg:"Something went worng"
        })
      }

       res.status(200).json({
        success:true,
        todo:toDo,
        msg:"successfuly created"
    })

    }catch(error){
        next(error)
    }
})



//desc   Fetch all todos
//mehod  GET
router.get('/', auth, async(req, res, next) => {
    try {
        const todo = await Todo.find({user: req.user.id, finished: false});

        if(!todo) {
            return res.status(400).json({ success: false, msg: 'Something error happened'});
        }

        res.status(200).json({ success: true, count: todo.length, todos: todo, msg: 'Successfully fetched'})
    } catch (error) {
        next(error);
    }
});




router.put('/:id', async (req, res, next) => {
    try {
        let toDo = await Todo.findById(req.params.id);
        if(!toDo) {
            return res.status(400).json({ success: false, msg: 'Task Todo not exits' });
        }

        toDo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true,todo: toDo, msg: 'Successfully updated' });
        
    } catch (error) {
        next(error);
    }
});


//delete a task 
router.delete("/:id",async(req,res,next)=>{
   try{
   
    let toDo = await Todo.findById(req.params.id);
    if(!toDo) {
        return res.status(400).json({ success: false, msg: 'Task Todo not exits' });
    }

    toDo=await Todo.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        msg:"Successfully deleted"
    })

   }catch(error){
    next(error)
   }

})


//desc   Fetch all todos finished
//mehod  GET
router.get('/finished', auth, async(req, res, next) => {
    try {
        const todo = await Todo.find({user: req.user.id, finished: true});

        if(!todo) {
            return res.status(400).json({ success: false, msg: 'Something error happened'});
        }

        res.status(200).json({ success: true, count: todo.length, todos: todo, msg: 'Successfully fetched'})
    } catch (error) {
        next(error);
    }
});





module.exports=router;


