<template>
    <div class="index" :style="myStyleIndex">
        <HeadNav></HeadNav>
        <!-- <LeftMenu></LeftMenu> -->
        <div class="rightContainer" :style="myStylerightContainer">
            <router-view></router-view>
        </div>
       
    </div>
</template>

<script>
    import HeadNav from '../components/HeadNav';
    import LeftMenu from '../components/LeftMenu';

    export default{
        data(){
		return{
		currentbg:false,
        myStyleIndex:{
            'background-color': 'rgba(149, 0, 64, 1)'
        },
        myStylerightContainer:{
            'background-color': 'rgba(149, 0, 64, 1)'
        }
    
    
    }},
        name:"index",
        components:{
            HeadNav,
            LeftMenu
        },
        watch:{
        $route(to,from){
            console.log(to.path);
            if(to.path=="/tasklist"||to.path=="/TaskDetail")
            {
                this.currentbg=false;
                this.myStyleIndex={
            'background-color': 'rgba(255, 255, 255, 1)'
        }
        this.myStylerightContainer={
            'background-color': 'rgba(255, 255, 255, 1)'
        }
            }
            else
            {
                this.currentbg=true;
                this.myStyleIndex={
            'background-color': 'rgba(149, 0, 64, 1)'
        }
        this.myStylerightContainer={
            'background-color': 'rgba(255, 255, 255, 1)'
        }
            }

    }
}
    }
</script>
<style>
    
.changebg{
  background-color: rgba(255, 255, 255, 1);
}

    .index{
        width: 100%;
        /* height:100%;     */
        /* overflow: hidden; */
        
        }
    .rightContainer {
        background-color: rgba(149, 0, 64, 1);
        position: relative;
        top: 0;
        /* left: 180px; */
        /* box-shadow:0px 0px 0px 10px #e3e4e3; */
       
        /* width: calc(100% - 180px); */
        /* width:76%; */
        /* height: calc(100% - 71px); */
        overflow: auto;
        }
</style>

