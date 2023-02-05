// login register
const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const passport=require("passport")
const TaskList=require("../../models/TaskList")
const User=require("../../models/User")
const House=require("../../models/House")
const CurrentTest=require("../../models/CurrentTest")
const Take=require("../../models/Take")
const Result=require("../../models/Result")






// $router  GET api/tasklists/test
// @desc    返回请求的json数据
// access   public
router.get("/test",(req,res)=>{
    res.json({msg:"tasklist works"})
})


function  findHouse(uid)
{
    House.findOne({
        // "$where":"1!=2"}, 
        users:{$not:{$elemMatch:{$eq:uid}}}})
        .then(house=>
            {
                if(house)
                {
                    var res={
                        _id:house._id,
                        hid:house.hid
                    }
                    console.log(res);
                    // console.log("hid:"+house.hid)
                    return res;
                }
                else
                {
                    console.log("null")
                    return null;
                }
            })
        .catch(err=>console.log(err))
}
function updateHouse(_id,uid)
{
    const newhouse={};
    House.findOne({
        _id:_id
    }).then(house=>
        {
            newhouse.curUserNum=house.curUserNum+1;
            newhouse.users=house.users;
            newhouse.push(uid);
        })
    
    House.findOneAndUpdate(
        {_id:_id},
        // {userCardID:req.user.id},
        {$set:newhouse},
        {new:true}
    ).then(house=>res.json(house));
}

// $router  POST api/tasklists/add
// @desc    创建信息接口
// access   private
router.get("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
    TaskList.findOne({
                userCardID:req.user.id, 
                state:{'$in':[-1,0]}})
            .then(task1=>{
                if(task1)
                   return  res.status(400).json("有任务待完成");
                else{
                    House.findOne({
                        function(){return this.maxUserNum>this.curUserNum;}, 
                        users:{$not:{$elemMatch:{$eq:req.user.id}}}})
                        .then(house=>
                            {
                                if(house)
                                {
                                    TaskList.findOne({userCardID:req.user.id, hid:house.hid,state:{'$in':[1,2]}})
                                    .then(task2=>{
                                            if(task2)
                                              return   res.status(400).json("任务已经创建过了");
                                            else{
                                                const task={};
                                                task.hid=house.hid;
                                                task.state=-1;
                                                if(req.user.id)task.userCardID=req.user.id;
                                                new TaskList(task).save()
                                                                .then(task=>{
                                                                    const newhouse={};
                                                                    newhouse.curUserNum=house.curUserNum+1;
                                                                    console.log(newhouse.curUserNum)
                                                                    newhouse.users=house.users;
                                                                    newhouse.users.push(req.user.id);
                                                                    House.findOneAndUpdate(
                                                                        {_id:house._id},
                                                                        {$set:newhouse},
                                                                        {new:true}
                                                                    ).then(res=>console.log(res.hid)).catch(err=>console.log(err))
                                                                    
                                                                });
                                                 res.json("success")
                                            }})
                                    .catch(err=>console.log(err))
                                }
                            })
                    }
            }) 
});
// $router  GET api/tasklists
// @desc    获取信息接口
// access   private
router.get("/",passport.authenticate("jwt",{session:false}),(req,res)=>{
    TaskList.find({userCardID:req.user.id})
            .then(tasklist=>{
                if(!tasklist){
                    return res.json("没有任何内容");
                }
                res.json(tasklist);
            }).catch(err=>{

            })
})
router.post("/takedetail/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const newtake={};
    House.findOne({hid:req.params.id}).then(house=>{
        newtake.hid=house._id
        newtake.userCardID=req.user.id;
        newtake.regionIndex=req.body.index;
        newtake.regionLabel=req.body.label;
       
        new Take(newtake).save().then(res.json(newtake))
    })
    // console.log("hid:"+newtake.hid)
  
})
router.get("/takedetail/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    House.findOne({hid:req.params.id}).then(house=>{
        Take.find({userCardID:req.user.id,hid:house._id})
        .then(take=>{
            if(!take){
                return res.json("没有任何内容");
            }
            res.json(take);
        }).catch(err=>{

        })
    })
    
})

// $router  GET api/tasklists/:id
// @desc    获取信息接口
// access   private
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    TaskList.findOne({userCardID:req.user.id,_id:req.params.id})
            .then(tasklist=>{
                if(!tasklist){
                    return res.json("没有任何内容");
                }
                res.json(tasklist);
            }).catch(err=>{

            })
})


// $router  POST api/tasklists/edit/:id
// @desc    编辑信息接口
// access   private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const task={};
    if(req.body.hid) task.hid=req.body.hid;
    if(req.body.state) task.state=req.body.state;
    TaskList.findOneAndUpdate(
        {_id:req.params.id},
        // {userCardID:req.user.id},
        {$set:task},
        {new:true}
    ).then(task=>res.json(task));
})

// $router  POST api/tasklists/delete/:id
// @desc    删除信息接口
// access   private
router.get("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
   TaskList.findOneAndRemove({_id:req.params.id})
            .then(task=>{
            
                res.json(task);
            })
            .catch(err=>res.status(404).json("删除失败"));
})

router.post("/start",passport.authenticate("jwt",{session:false}),(req,res)=>{
    CurrentTest.findOne({status:0}).then(test=>{
        if(test)
        {
            return res.status(400).json("当前有任务在进行中");
        }
        const newtake={};
        if(req.body.state!=-1)
        {
            return res.status(400).json("这个任务不能开始")
        }
        House.findOne({hid:req.body.hid}).then(house=>{
            newtake.hid=house._id
            newtake.userCardID=req.user.id;
            newtake.status=0;
           
            new CurrentTest(newtake).save().then(res.json(newtake))

            TaskList.findOne({userCardID:req.user.id,hid:req.body.hid}).then(task=>
                {
                    const newTask={};
                    newTask.state=0;
                    TaskList.findOneAndUpdate(
                        {_id:task._id},
                        {$set:newTask},
                        {new:true}
                    ).then(res=>console.log(res)).catch(err=>console.log(err))
                })
            
            // const newTask={};
            // newTask.state=0;
            // House.findOneAndUpdate(
            //     {_id:house._id},
            //     {$set:newTask},
            //     {new:true}
            // ).then(res=>console.log(res.hid)).catch(err=>console.log(err))
        })

    })
   
  





})

router.post("/addResult",passport.authenticate("jwt",{session:false}),(req,res)=>{
  
        
        Result.findOne({uid:req.body.uid,hid:req.body.hid,tid:req.body.tid}).then(res1=>{
            // if(!res1)
            // {
                console.log(req.body);
                const result={};
                result.uid=req.body.uid;
                result.hid=req.body.hid;
                result.tid=req.body.tid;
                result.verb=req.body.verb;
                result.noun=req.body.noun;
                result.cn=req.body.cn;
                result.valid=req.body.valid;
                result.rlabel=req.body.rlabel;
                result.checked=req.body.checked;

                
                new Result(result).save().then(res.json(result))
            // }
          
        })
})

module.exports=router;