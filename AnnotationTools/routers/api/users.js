// login register
const express=require("express");
const router=express.Router();
const jwt=require('jsonwebtoken');
const keys=require("../../config/keys")
const passport=require("passport")
const User=require("../../models/User")

// $router  GET api/users/test
// @desc    返回请求的json数据
// access   public
router.get("/test",(req,res)=>{
    res.json({msg:"login works"})
})


// $router  Post api/users/register
// @desc    返回请求的json数据
// access   public
router.post("/register",(req,res)=>{
    // res.json(req.body);
    User.findOne({cardID:req.body.cardID})
        .then(user=>{
            if(user){
                return res.status(400).json("卡号已经被注册");
            }else{
                const newUser=new User({
                    cardID:req.body.cardID,
                    phoneNum:req.body.phoneNum,
                    height:req.body.height,
                    weight:req.body.weight,
                    sex:req.body.sex,
                    identity:req.body.identity
                })
                newUser.save()
                        .then(user=>res.json(user))
                        .catch(err=>console.log(err));
            }
        })
})

// $router  Post api/users/login
// @desc    返回token jwt passport
// access   public
router.post("/login",(req,res)=>{
    const cardID=req.body.cardID;
    const password=req.body.password;

    // 查询数据库
    User.findOne({cardID})
        .then(user=>{
            if(!user)
            {
                return res.status(404).json({msg:"用户不存在"});
            }
            if(cardID===password)
            {
               const rule=
               {
                    id:user.id,
                    cardID:user.cardID,
                    phoneNum:user.phoneNum,
                    identity:user.identity,
                    sex:user.sex,
                    date:user.date
                };
               jwt.sign(rule,keys.secretOrkey,{expiresIn:36000},(err,token)=>{
                   if(err)throw err;
                    res.json({
                        success:true,
                        token:"Bearer "+token
                    })
               })
            }
            else
            {
                return res.status(400).json({password:"密码错误"});
            }
            

        })
})

// $router  GET api/users/current
// @desc    返回token jwt passport
// access   private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>
{
    res.json({
        id:req.user.id,
        cardID:req.user.cardID
    });
})




module.exports=router;