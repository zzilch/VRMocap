<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
              <span  class="title">注册页面</span>
              <el-form
                ref="registerForm"
                :model="registerUser"
                
                :rules="rules"
                label-width="80px"
                class="registerForm"
              >
              <el-form-item label="卡号" prop="cardID">
                  <el-input v-model="registerUser.cardID" placeholder="请输入6位数卡号"></el-input>
              </el-form-item>
              <el-form-item label="电话号码" prop="phoneNum">
                  <el-input type="value" v-model="registerUser.phoneNum" placeholder="请输入手机号码"></el-input>
              </el-form-item>
              <el-form-item label="身高(m)" prop="height">
                  <el-input type="value" v-model="registerUser.height" placeholder="请输入身高(例如:1.58）"></el-input>
              </el-form-item>
              <el-form-item label="体重(kg)" prop='weight'>
                  <el-input type="value" v-model="registerUser.weight" placeholder="请输入身高(例如:47）"></el-input>
              </el-form-item>
              <el-form-item label="选择性别" >
                  <el-select  v-model="registerUser.sex" placeholder="请选择性别">
                      <el-option label="男" value="man"></el-option>
                      <el-option label="女" value="female"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="选择身份" >
                <el-select  v-model="registerUser.identity" placeholder="请选择身份">
                    <el-option label="管理员" value="manager"></el-option>
                    <el-option label="用户" value="user"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
              </el-form-item>
              </el-form>
            </div>
        </section>
    </div>
</template>

<script>
  export default{
        name:"register",
        components:{},
        data(){
            var validatePass2 = (rule, value, callback) => {
               if (value !== this.registerUser.password) {
                    callback(new Error("两次输入的密码不一致"))
                } else {
                    callback()
                }
            }
            return {
                registerUser:{
                    // cardID:'222222',
                    // phoneNum:'22222222222',
                    // height:'22',
                    // weight:'22',
                    // sex:'女',
                    // identity:'管理员'
                    cardID:'',
                    phoneNum:'',
                    height:'',
                    weight:'',
                    sex:'',
                    identity:''
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
                    phoneNum:[
                        {
                            required:true,message:"手机号码不能为空",trigger:"blur"
                        },
                        {
                            min:11,max:11,message:"长度应该为11",trigger:"blur"
                        },
                    ],
                    height:[
                        {
                            required:true,message:"身高不能为空",trigger:"blur"
                        },
                       
                    ],
                    weight:[
                        {
                            required:true,message:"体重不能为空",trigger:"blur"
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
                        this.axios.post('/api/users/register',this.registerUser)
                        .then(res=>{
                       
                            this.$message({
                                message:'账号注册成功',
                                type:'success'
                            });

                        })
                        this.$router.push('/login');
                    } 
                })
            }
        }
    }
</script>

<style scoped>
    .register {
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
      top: 10%;
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
    .registerForm {
      margin-top: 20px;
      background-color: #fff;
      padding: 20px 40px 20px 20px;
      border-radius: 5px;
      box-shadow: 0px 5px 10px #cccc;
    }
    
    .submit_btn {
      width: 100%;
    }
    .title{
        color:#000;
    }
</style>