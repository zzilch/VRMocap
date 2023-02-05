

<template>
<header class="head-nav">

<el-row class="rowColor" :class="{changebg:currentbg}">
    <el-col :span="8" class="logo-container" :class="{changebg:currentbg}">
      <img :src="imgSrc" class="logo" >
      <!-- <span class="title">VRMOCAP</span> -->
    </el-col>
    
    
    <el-col  :span="9" class="mid-container"  :style="myStyleMid">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo" 
        mode="horizontal"
        active-text-color="#ffffff"
     
        :style="myStyle"
       
        
      >
        <router-link to="/home">
          <el-menu-item  index="1" :style="myStyleItem">首页</el-menu-item>
        </router-link>
        
        <router-link to="/tasklist">
          <el-menu-item index="2" :style="myStyleItem">任务列表</el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
    <el-col  :span="2" class="user" :style="myStyleUser" >
      <div class="userinfo">
        <div class="welcome">
          <span class="name comename">欢迎， </span>
          <span class="name avatarname">{{user.cardID}}</span>
        </div>
        
        <span class="username">
          <!-- 下拉箭头 -->
          <!-- <template> -->
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <el-icon class="el-icon--right"><arrow-down :style="hh" /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="info">个人信息</el-dropdown-item>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          <!-- </template> -->
          
        </span>
      
      </div>
    </el-col>
</el-row>

</header>
</template>

  
<script>
  import { ElMessage } from 'element-plus'
  import { ArrowDown } from '@element-plus/icons-vue'

  export default{
    name:'head-nav',
    data(){
		return{
		currentbg:false,
    myStyle:{
      'background-color':'rgba(149, 0, 64, 1)',
      'el-menu-active-color':'#ffffff',
        'el-menu-bg-color': 'rgba(149, 0, 64, 1)',
        '--el-menu-hover-bg-color': 'rgba(149, 0, 64, 1)',
        '--el-menu-active-color': '#ffffff',
        '--el-menu-active-color--': '#ffffff',
        '--el-menu-color--': '#ffffff',
        '--el-menu-item-hover-bg-color--': 'rgba(149, 0, 64, 1)',
        '--el-menu-hover-text-color': '#ffffff',
        '--el-menu-border-color': 'rgba(149, 0, 64, 1)',
	
	},
  myStyleMid:{
    'background-color': 'rgba(149, 0, 64, 1)'
  },
  myStyleItem:{
    color: '#ffffff',
    'background-color':'rgba(149, 0, 64, 1)'
  },

  myStyleUser:{
    'line-height': '60px',
  'text-align': 'right',
  'float': 'right',
  'padding-right': '20px',
  'background-color': 'rgba(149, 0, 64, 1)',
  'color':'white'
  },
  imgSrc:require("../assets/szu.png"),
  hh:{
    'color':'white'
  }

}
},
    methods:{
      handleCommand(command){
        // ElMessage(`click on item ${command}`);
        switch(command)
        {
          case 'info':
            this.showInfoList();
            break;
          case 'logout':
            this.logout();
            break;
        }
      },
      showInfoList()
      {
        this.$router.push("./InfoShow")
      },
      logout()
      {
        localStorage.removeItem('eleToken');
        this.$store.dispatch('clearCurrentState');
        this.$router.push('/login');
      },
    
//     created () {
//     // if(this.$store.current_page==true)
//     // {

//     // }
//     window.addEventListener('beforeunload', this.leaveConfirm)
//     window.addEventListener('unload', this.updateRecord)
//  },
//  destroyed () {
//     window.removeEventListener('beforeunload', this.leaveConfirm)
//     window.removeEventListener('unload', this.updateRecord)
//   }





    },
      
    components:{
      ArrowDown,
      ElMessage
    },

    computed:{
      user()
      {
        return this.$store.getters.user;
      }
    },

    watch:{
        $route(to,from){
            console.log(to.path);
            if(to.path=="/tasklist"||to.path=="/TaskDetail")
            {
              this.currentbg=true;
              this.myStyle={
                'background-color':'rgba(255, 255, 255, 1)',
      'el-menu-active-color':'#000000',
        'el-menu-bg-color': 'rgba(255, 255, 255, 1)',
        '--el-menu-hover-bg-color': 'rgba(255, 255, 255, 1)',
        '--el-menu-active-color': '#000000',
        '--el-menu-active-color--': '#000000',
        '--el-menu-color--': '#000000',
        '--el-menu-item-hover-bg-color--': 'rgba(255, 255, 255, 1)',
        '--el-menu-hover-text-color':'#000000',
        '--el-menu-border-color': 'rgba(255, 255, 255, 1)',
	      };
        this.myStyleMid={
    'background-color':'rgba(255, 255, 255, 1)',
  };
  this.myStyleItem={
    color:'rgba(149, 0, 64, 1)',
    'background-color': 'rgba(255, 255, 255, 1)',
  }
  this.myStyleUser={
    'line-height': '60px',
  'text-align': 'right',
  'float': 'right',
  'padding-right': '20px',
  'background-color': 'rgba(255, 255, 255, 1)',
  'color':'rgba(149, 0, 64, 1)',
  }
  this.imgSrc=require("../assets/logo_03.png")
  this.hh={
    'color':'rgba(149, 0, 64, 1)',
  }
  // this.document.getElementsByClassName("el-menu-demo[data-v-001400ba]")[0].style.backgroundColor="red"
            }
            else{
              this.currentbg=false;
              this.myStyle={
                'background-color':'rgba(149, 0, 64, 1)',
                    'el-menu-active-color':'#ffffff',
                      'el-menu-bg-color': 'rgba(149, 0, 64, 1)',
                      '--el-menu-hover-bg-color': 'rgba(149, 0, 64, 1)',
                      '--el-menu-active-color': '#ffffff',
                      '--el-menu-active-color--': '#ffffff',
                      '--el-menu-color--': '#ffffff',
                      '--el-menu-item-hover-bg-color--': 'rgba(149, 0, 64, 1)',
                      '--el-menu-hover-text-color': '#ffffff',
                      '--el-menu-border-color': 'rgba(149, 0, 64, 1)',
                
                };
                this.myStyleMid={
                  'background-color': 'rgba(149, 0, 64, 1)'
                };
                this.myStyleItem={
                  color:'#fff',
                  'background-color': 'rgba(149, 0, 64, 1)'
                };
                this.myStyleUser={
                      'line-height': '60px',
                    'text-align': 'right',
                    'float': 'right',
                    'padding-right': '20px',
                    'background-color': 'rgba(149, 0, 64, 1)',
                    'color':'white'
                    };
                this.imgSrc=require("../assets/szu.png")
                this.hh={
    'color':'rgba(255, 255, 255, 1)',
  }
            }
        }
      }
   






  }
</script>
<style >


.rowColor{
  background-color: rgba(149, 0, 64, 1);
  /* box-shadow: 0px 1px 0px 0px #e5e5e5;   */
}




.changebg{
  background-color: white;
  /* box-shadow: 0px 1px 0px 0px #e5e5e5;   */
}

.changebg1{
  font-weight: bold;
  color: rgba(149, 0, 64, 1);
  --el-menu-active-color--:000000;--el-menu-bg-color:  rgba(255, 255, 255, 1);;
        --el-menu-hover-bg-color: rgba(255, 255, 255, 1);;
        --el-menu-active-color: rgba(149, 0, 64, 1);
        --el-menu-active-color--: rgba(149, 0, 64, 1);
        --el-menu-color--: rgba(149, 0, 64, 1);
        --el-menu-item-hover-bg-color: rgba(255, 255, 255, 1);;
        --el-menu-hover-text-color: rgba(149, 0, 64, 1);
}



.el-menu-demo {
  font-weight: bold;
  color: #000;
  background-color: white;
  --el-menu-active-color--:white;--el-menu-bg-color: rgba(149, 0, 64, 1);
        --el-menu-hover-bg-color: rgba(149, 0, 64, 1);;
        --el-menu-active-color: #ffffff;
        --el-menu-active-color--: white;
        --el-menu-color--: white;
        --el-menu-item-hover-bg-color: rgba(149, 0, 64, 1);
        --el-menu-hover-text-color: white;
}

.el-menu-item {
 
 
  color:'#fff';
  /* transition: none !important;  */
  background-color: white;
}
/* .el-menu-demo[data-v-001400ba]{
  background-color: white;
} */





.el-menu--horizontal > .el-menu-item {
  color: #ffffff !important;
  border-bottom: none !important;
  background-color: rgba(149, 0, 64, 1);
  /* background-color: white; */
}

.el-menu--horizontal > .el-menu-item.is-active {
  color: #ffffff !important;
  border-bottom: none !important;
  background-color: rgba(149, 0, 64, 1);
  /* background-color: white; */
}













 .head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  /* background: #324057; */
  /* color: ; */
  /* border-bottom: 0px solid #1f2d3d; */
 
 
}
.logo-container {
  line-height: 60px;
  /* min-width: 400px; */
  padding-left: 400px;
 
}
.mid-container{

  display: inline-block;
  line-height: 60px;
  vertical-align: middle;
  background-color: rgba(149, 0, 64, 1);
  /* background-color: rgba(255, 255, 255, 1); */

  padding: 5px 0px 0 425px;
}
 

.logo {
  /* height: 100%; */
  width: 100%;
  height:90%;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
a{
text-decoration:none;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 20px;
  background-color: rgba(149, 0, 64, 1);
}
.el-menu-demo {
  width: 100%;
  border-bottom:0;
  background-color: rgba(149, 0, 64, 1);
  color: #ffffff !important;
  --el-menu-active-color--:white
}
.el-menu--horizontal>.el-sub-menu.is-active .el-sub-menu__title {
    border-bottom: 2px solid var(--el-menu-active-color);
  
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
  /* color: #ffffff; */
  font-weight: bolder;
}
.avatarname {
  /* color: #ffffff; */
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
  
  
}
/* .el-icon svg{
  color:#ffffff
} */
.hh
{
  
  color:#ffffff
}


</style>
    