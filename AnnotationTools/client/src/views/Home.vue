<template>
    <div class="home">
        <div class="container">
          
            <div class="title-container">
              <h1 class="cn-title">欢迎参加</h1>
              <h1>&nbsp;</h1>
              <h1 class="cn-title">动作捕捉实验</h1>

              <h1>&nbsp;</h1>
              <h1 class="title">Welcome to the motion capture experiment.</h1>
            </div>
        </div>
       <div class="intro">
        <h1 id="con" >实验流程</h1>
        
          <div>
            <img class="image" src="../assets/line.png">
          </div>
        </div>
    </div>
  
</template>

<style scoped>
.home {
  /* width: 100%;
  height: 100%; */
  /* background: url(../assets/showcase.jpg) no-repeat; */
  /* background-size: 100% 100%; */
  box-sizing: border-box;
  /* display: table; */
  overflow-y: scroll;
}
.container {
  width: 100%;
  height: 1000px;
  /* box-sizing: border-box; */
  /* padding-top: 1000px; */
  /* padding-bottom: 100px; */
  background-color: rgba(149, 0, 64, 1);
  text-align: center;
  color: white;
}
.intro {
  width: 100%;
  height: 1000px;

  /* margin-top: 1000px; */
  background-color: white;
  text-align: center;
  /* color: white; */
  /* position: relative;
    display: table; */
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    /* margin-top: 5rem; */





}
#con{
  display: block;
    font-size: 3em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    margin: 0 auto;
    padding-top:50px;
    padding-bottom:50px;
    text-align: center;
    width: fit-content;
    /* box-shadow: inset 0 -0.2em rgb(145 218 248); */
    /* background-color: #045b6e; */
    vertical-align: middle;
    color: rgba(149, 0, 64, 1);
}
.image{
  padding-top: 50px;
  padding-bottom: 100px;
  width:47%;

}

.title {
  
  font-size: 33px;
  font-family: "Calibri", cursive, serif, sans-serif;
  font-weight: 100;
}
.cn-title {
  font-size: 100px;
  font-family: "tit_top", cursive, serif, sans-serif;
  font-weight: bold;
}
.lead {
  margin-top: 70px;
  font-size: 22px;
}
.title-container{
  padding-top:300px;
}
</style>