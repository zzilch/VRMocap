const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const passport=require("passport");
const app=express();


// 引入users.js
const users=require("./routers/api/users");
// 引入tasklists.js
const tasklists=require("./routers/api/tasklists");


// DB config
const db=require("./config/keys").mongoURI;
mongoose.connect(db)
        .then(()=>console.log("MongoDB connected."))
        .catch(err=>console.log(err));


// passport 初始化
app.use(passport.initialize())
require("./config/passport")(passport);

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.get("/",(req,res)=>{
    res.send("Hello world!");
})

// 使用routers
app.use("/api/users/",users);
app.use("/api/tasklists/",tasklists);

const port =process.env.PORT||5001;
app.listen(port,'0.0.0.0',()=>{
    console.log(`Server running on port ${port}`);
})