<template>
    <div class="fillcontain">
        <div>
            <el-form :inline="true" ref="add_data">
                <el-form-item class="btnRight">
                    <template #default="scope">
                      
                    <el-button class="button" type="primary" size="middle" icon="view" style="background-color:rgba(149, 0, 64, 1); text-align:center;font-weight:bold;border:none" @click="handleAdd()">
                        添加

                    </el-button>
                    </template>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-container">
        <el-table v-if="tableData.length>0" :data="tableData" max-height=450 style="width: 100%" border >
            <el-table-column
                type="index"
                label="序号"
                align='center'
                width="70">
            </el-table-column>
            <el-table-column prop="date" label="创建时间" width="290"  align="center">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                    <el-icon><timer /></el-icon>
                    <span style="margin-left: 10px ">{{ scope.row.date }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="hid" label="房子id" width="150" align="center">
                <template #default="scope">
                
                    <span style="color:#00d053">{{ scope.row.hid }}</span>
                    
                </template>
            </el-table-column>
            <el-table-column prop="state" label="任务状态" width="150" align="center">
                <template #default="scope">
                
                    <span style="color:#f56767">{{ scope.row.state }}</span>
                    
                </template>
            </el-table-column>s
            <el-table-column prop="operation" label="操作" align="center" width="401">
                <template #default="scope">
                    <el-button
                    icon="delete"
                        size="small"
                        type="danger"
                        @click="StartTask(scope.$index, scope.row)"
                        >Start</el-button
                    >




                    <router-link :to="{path:'TaskDetail',query:{hid:scope.row.hid}}">
                        <el-button icon="edit" type="warning" size="small" 
                            >查看</el-button>
                    </router-link>
              
                </template>
            </el-table-column>

        </el-table>
    </div>
</div>
</template>

<script>
    import { Timer } from '@element-plus/icons-vue'
    export default{
        name:"taskList",
        data()
        {
            return {
                tableData:[

                ]
            }
        },
        created()
        {
            this.getTaskList();
        },
        methods:{
            getTaskList()
            {
                this.axios.get("/api/tasklists")
                .then(res=>{
                   this.tableData=res.data;
                })
                .catch(err=>console.log(err));
            },
          
            StartTask(index,row)
            {
                var body = {
                    hid:row.hid,
                    state:row.state
                };
                this.axios.post("/api/tasklists/start/",body)
                .then(res=>{
                    this.$message({
                                message:'开始任务成功',
                                type:'success'
                            });
                            // window.location.reload()
                            this.getTaskList()
                //    this.tableData=res.data;
                })
                .catch(err=>console.log(err));
                
            },
            handleAdd()
            {
                this.axios.get("/api/tasklists/add")
                .then(res=>{
                    this.$message({
                                message:'创建任务成功',
                                type:'success'
                            });
                            this.getTaskList()
                })
                .catch(err=>{
                    console.log(err);
                    // this.$message({
                    //             message:'失败',
                    //             type:'failure'
                    //         });
                });
            }
        },
        components:{
            Timer
        },

    }
</script>
<style scoped>
    .fillcontain {
  width: 57%;
  height: 100%;
  padding: 0px;
  padding-left:30px;
  padding-top:50px;
  box-sizing: border-box;
  margin: auto
}
.btnRight {
  float:right;
  color:white
}
.el-button [class*=el-icon]+span{
    margin-left:0px
}
</style>
    