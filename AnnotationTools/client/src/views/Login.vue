<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span  class="title">登录页面</span>
                <el-form
                    ref="loginForm"
                    :model="loginUser"
                    
                    :rules="rules"
                    label-width="80px"
                    class="loginForm"
                >
                <el-form-item label="卡号" prop="cardID">
                    <el-input v-model="loginUser.cardID" placeholder="请输入6位数卡号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginUser.password" placeholder="密码为卡号"></el-input>
                </el-form-item>
                <div class="tiparea">
                    <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                </div>
                <el-form-item>
                    <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
              </el-form>
            </div>
        </section>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
  export default{
        name:"login",
        components:{},
        data(){
         
            return {
                loginUser:{
                    cardID:'',
                    password:''
                },
                rules:{
                    cardID:[
                        {
                            required:true,message:"卡号不能为空",trigger:"blur"
                        },
                        {
                            min:6,max:6,message:"长度应该为6",trigger:"blur"
                        },
                    ],
                    password:[
                        {
                            required:true,message:"密码不能为空",trigger:"blur"
                        },
                        {
                            min:6,max:6,message:"密码应该为6",trigger:"blur"
                        },
                    ],
                 
                  
                    
                }
            }
        },
        methods:
        {
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      // alert("success");
                        this.axios.post('/api/users/login',this.loginUser).then(res=>{
                            const {token}=res.data;
                            localStorage.setItem('eleToken',token);

                            // 解析token
                            const decoded=jwt_decode(token);
                            // console.log(decoded);
                            // token 存储到vuex
                            this.$store.dispatch("setIsAutnenticated",!this.isEmpty(decoded));
                            this.$store.dispatch("setUser",decoded);
                            

                            this.$router.push('/index');
                        })
                      
                       
                    } 
                })
            },
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                );
            }
        }
    }
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  /* color: #fff; */
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>