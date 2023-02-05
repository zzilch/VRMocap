<template>
   <div class="dialog">
      
       <el-dialog  
        title="标注视频"
        v-model='dialog.show'
        :close-on-click-modal="false"
        :before-close='logdialogclose'
      
       >
       <div class="container" >
            <div class="left" >
                <video :src="dialog.video" controls autoplay loop="loop" class="video" :ref="dialogVideo" ></video>
            </div> 
          
                <div class="form">
                    <el-form
                        ref="form"
                        :model="formData"
                        :rules="form_rules"
                        label-width="120px"
                        style="margin:10px;width:auto;">

                    </el-form>
                    <el-form-item label="verb:">
                            <el-select v-model="formData.verb"   placeholder="verb:">
                                <el-option v-for="(item,index) in verb_list" :key="index" :label="item" :value="item"></el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item  label="noun:">
                            <el-select v-model="formData.noun" placeholder="noun:">
                                <el-option v-for="(item,index) in noun_list" :key="index" :label="item" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-model="noun" label="cn:">
                            <el-input type="describe" v-model="formData.cn"></el-input>
                        </el-form-item>
                        <el-form-item label="valid:">
                            <!-- <el-input type="radio" v-model="formData.valid" value="false">valid</el-input> -->
                            <el-switch v-model="formData.valid"></el-switch>
                        </el-form-item>
                        <el-form-item class="text-right">
                            <el-button @click="dialogflag=false">取消</el-button>
                            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                        </el-form-item>
                    </div>
               
            </div>
       </el-dialog>
   </div>
</template>


<script>
    // import ref from 'vue'
    // const dialogFormVisible = false;
    export default{
        name:'MyDialog',
        props:{
            dialog:Object,
            formData:Object,
           
        },
        
        emits:['closedia'],
        methods:{
            logdialogclose()
            {
                this.$emit('closedia')
            },
            selectVerb(v)
            {
                this.formData.verb=v
            },
            selectNoun(v)
            {
                this.formData.noun=v
            },
            onSubmit(form){
                console.log(this.formData)
                this.$refs[form].validate(valid=>{
                    if(valid){
                        
                        // this.formData.uid=this.userCardID;
                        // this.formData.hid=this.houseID;
                        // this.formData.tid=this.takeID;
                        // this.formData.rlabel=regionLabel;
                        // console.log("userCardID:"+this.userCardID);
                        // console.log("ushiderCardID:"+this.houseID);
                        
                        this.axios.post("/api/tasklists/addResult",this.formData).then(res=>{
                            this.$message({
                                message:'标注成功',
                                type:"success"
                            });
                            this.dialog.show=false;
                            this.formData.verb="";
                            this.formData.noun="";

                            this.formData.cn="";
                            this.formData.valid=false;
                        })
                    }
                })
            }
        },
        data(){
            return{
               
                form_rules:{
                    verb:[
                        {required:true,message:'不能为空',trigger:'blur'}
                    ],
                    noun:[
                        {required:true,message:'不能为空',trigger:'blur'}
                    ],
                    cn:[
                        {required:true,message:'不能为空',trigger:'blur'}
                    ],
                },
          
                verb_list:[
                    'cook','eat','have','lie','listen','look','play','rest','sit','stand','talk','use','wait','wash','watch','work'
                ],
                noun_list:[
                    'wall', 'floor', 'chair', 'door', 'table', 'picture', 'cabinet', 'cushion', 'window', 'sofa', 'bed', 'curtain', 'chest_of_drawers', 'plant', 'sink', 'stairs', 'ceiling', 'toilet', 'stool', 'towel', 'mirror', 'tv_monitor', 'shower', 'column', 'bathtub', 'counter', 'fireplace', 'lighting', 'beam', 'railing', 'shelving', 'blinds', 'gym_equipment', 'seating', 'board_panel', 'furniture', 'appliances', 'clothes'
                ],
                // valid_list:['true','false']
            }
        },
      
    };
</script>


<style scoped>

.container{
    height: 40vh;
     overflow: auto;
    
}

.left{
  /* font-size: 16px; */
  width:44%;
  height:35vh; 
  position:absolute;
  display: flex;
  display: -webkit-flex;
  align-items:center;
  justify-content:center;
  /* color: #008cff; */
  /* border-right:1px solid #ebedf0; */
}
.video{
    width: 100% !important;
            height: 100%;
            /*生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。可以根据实际情况修改*/
            position: absolute;
            /*这里我试了一下好像只要是矩形的四个角的的点都行,也就是说right:0;bottom:0;也可以*/
            /* left: 0;
            top: 0; */
            /*将视频放在元素的堆叠顺序最底层，以防覆盖其他东西*/
            /* z-index: -9999; */
            /*被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。*/
            object-fit: fill;

}
.form{
    /* height:100%; */
  float: right;
  /* display: flex; */
  /* display: -webkit-flex; */
  align-items:center;
  justify-content:center;
  color: #008cff;
  /* border-left:1px solid #ebedf0; */
  width: 45%;
}

</style>
    