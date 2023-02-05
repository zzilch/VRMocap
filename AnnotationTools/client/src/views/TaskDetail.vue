<template>
    <div class="fillcontain">
        <div class="table-container">
            <el-table v-if="tableData.length>0" :data="tableData" max-height=450 style="width: 100%" border >
                <el-table-column
                    type="index"
                    label="序号"
                    align='center'
                    width="70">
                </el-table-column>
               
                <el-table-column prop="regionIndex" label="区域id" width="100" align="center">
                    <template #default="scope">
                    
                        <span style="color:#00d053">{{ scope.row.regionIndex }}</span>
                        
                    </template>
                </el-table-column>
                <el-table-column prop="regionLabel" label="区域类型" width="100" align="center">
                    <template #default="scope">
                    
                        <span style="color:#f56767">{{ scope.row.regionLabel }}</span>
                        
                    </template>
                </el-table-column>s
                <el-table-column prop="operation" label="操作" align="center" width="300">
                    <template #default="scope">
                    <el-button icon="edit" type="warning" size="small" @click="mark(scope.$index, scope.row)"
                        >标注</el-button
                    >
                    </template>
                </el-table-column>
    
            </el-table>
        </div>
      
    </div>
    <MyDialog :dialog="dialog" :formData="formData" @closedia='closedia'>

    </MyDialog>
</template>




<script>
    import MyDialog from '../components/Dialog';
    import { Timer } from '@element-plus/icons-vue';
     export default{
        name:"taskdetail",
        computed: {
                user() {
                return this.$store.getters.user;
                }
            },
        data()
        {
            return {
                tableData:[],
                formData:{
                    uid:this.$store.getters.user.cardID,
                    hid:this.$route.query.hid,
                    tid:"",
                    verb:"",
                    noun:"",
                    cn:"",
                    valid:false,
                    rlabel:"",
                    checked:false
                },
                dialog:{
                    show:false,
                    video:""
                },
              
            }
        },
        created()
        {
            this.getTaskDetail();
        },
        methods:{
            getTaskDetail(hid)
            {
                console.log("111hid:"+this.$route.query.hid);
                this.axios.get("/api/tasklists/takedetail/"+this.$route.query.hid)
                .then(res=>{
                   this.tableData=res.data;
                })
                .catch(err=>console.log(err));
            },
            mark(index,row)
            {
                this.dialog.video=require("../static/"+this.formData.uid.toString()+"/house"+this.formData.hid.toString()+"/view/view_"+index.toString().padStart(3,'0')+".mp4");
                console.log("mark")
                this.formData.tid=index;
                this.formData.rlabel=row.regionLabel;
               
                console.log("video:"+this.dialog.video)
                this.dialog.show=true;
                console.log(this.formData)
              
            }, 
           
            closedia()  
            {
                this.dialog.show=false;
            },
            handleDelete()
            {

            },
           
        },
        components:{
            Timer,MyDialog
        },

    }
</script>





<style scoped>
    .fillcontain {
 
  

  width: 35%;
  height: 100%;
  padding: 0px;
  padding-left:100px;
  padding-top:100px;
  box-sizing: border-box;
  margin: auto
}
</style>