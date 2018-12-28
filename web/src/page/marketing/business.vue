<template>
   <div class="main business-list">
       <div class="nav">
           <span>营销管理 > 业务需求</span>
       </div>
       <div class="main-search">
           <div class="search-item">
               <span class="item-left">需求名称</span>
               <span class="item-right"><el-input type="text" v-model="inputName"></el-input></span>
           </div>
           <div class="search-item">
               <span class="item-left">需求状态</span>
               <span class="item-right">
                 <el-select  v-model="demand.newDemandState" @change="changeDemandState($event)">
                    <el-option value="" label="全部">全部</el-option>
                    <el-option :label="item.dValue" :value="item.dKey"  v-for="item in needstateData" :key="item.dKey">{{item.dValue}}</el-option>
                 </el-select>
              </span>
           </div>
           <button type="button" class="btn-search" @click="search">查询</button>
       </div>
       <div class="main-table">
           <div class="table-msg">
               <div class="msg-left">
                   <p>查询符合上述条件得业务需求数据 <span>{{this.total}}</span>条</p>
               </div>
               <div class="msg-right">
                   <el-button type="button" class="btn-small" @click="newDemand">新建需求</el-button>
               </div>
           </div>
           <el-table
               :data="tableData"
               :header-cell-style="tableHeaderColor"
               border
               style="text-align: center">
               <el-table-column label="序号">
                   <template slot-scope="scope">
                       {{scope.$index+1}}
                   </template>
               </el-table-column>
               <el-table-column
                   prop="name"
                   label="需求名称">
               </el-table-column>
               <el-table-column
                   prop="companyBrandName"
                   label="归属品牌">
               </el-table-column>
               <el-table-column
                   prop="createTime"
                   label="发布时间"
                   :formatter="dateFormat">
               </el-table-column>
               <el-table-column
                   prop="state"
                   label="需求状态">
               </el-table-column>
               <el-table-column
                   prop="address"
                   label="操作">
                   <template slot-scope="scope">
                       <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                       <el-button type="text" size="small" @click="editor(scope.row)">编辑</el-button>
                       <el-button type="text" size="small" @click="clue(scope.row)">线索</el-button>
                   </template>
               </el-table-column>
           </el-table>
           <div class="pager-left" v-if="pag_show">
               <span>每页显示：</span>
               <select id="pager-size" @change="change_size">
                   <option value="10">每页显示10条</option>
                   <option value="20">每页显示20条</option>
                   <option value="50">每页显示50条</option>
               </select>
           </div>
           <div class="pagination_content" style="text-align: right;margin-top: 10px;">
               <el-pagination
                   v-if="pag_show"
                   class="pagination"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-size="pageSize"
                   layout="prev, pager, next,total, jumper"
                   :total="total">
               </el-pagination>
                  <!-- :page-sizes="[10, 20, 30, 40]"-->
           </div>
       </div>
   </div>
</template>
<script>
    import request from '@/untils/request'
    import moment from 'moment'
    import {mapGetters} from 'vuex'
    export default {
        inject:['reload'],//注入reload方法 this.reload()刷新页面
        data() {
            return {
                pag_show:true,//分页显示
                needstateData:[],//需求状态数组
                value:"",
                tableData:[],//表格数据数组
                pageSize:10,//每页十条
                total:0,//总数
                currentPage: 1,//当前页
                inputName:'',//需求名称
                demand:{
                    newDemandState:'',//绑定需求状态
                },

            }
        },
        created(){
          this.requirements()//初始化字典查询 并根据groupId做分组处理 进行存储
          this.getDemandlist()//初始化表格数据
        },
        methods: {
            //时间格式化
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            //每页条数切换
            handleSizeChange(pageSize) {
                this.pageSize=pageSize
            },
            //页码切换
            handleCurrentChange(currentPage) {
               this.currentPage=currentPage
                this.getDemandlist()
            },
            //修改表格样式
            tableHeaderColor({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background-color: #ffff;'
                }
            },
            //跳转到新建需求
            newDemand(){
                this.$router.push({
                    path:'/business_edit'
                })
            },
            changeDemandState(event){
                this.newDemandState = event;
            },
            //获取业务需求数据
            requirements() {
                const res=this.$store.dispatch("dictionary")
                res.then(()=>{
                    //取出存在sessionStorge里面的Json字符串，转换为Json数组
                    let needStates=sessionStorage.getItem('needstatedData')
                    let needState=JSON.parse(needStates)
                    this.needstateData=needState
                }).catch(()=>{
                })
            },
            //获取列表
            getDemandlist(){
              let params={
                    name:this.inputName,
                        state:this.newDemandState,
                        page:this.currentPage-1,
                        size:this.pageSize
                }
                return request({
                    methods:'get',
                    url:'/mai-meng-cloud/demand',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:params
                }).then((res)=>{
                    console.log(res.data)
                    this.tableData=res.data.data.list;
                    for(var i=0;i<this.tableData.length;i++){
                        if(this.tableData[i].state==1){
                            this.tableData[i].state="生产中";
                        }else if(this.tableData[i].state==2){
                            this.tableData[i].state="建模"
                        }else{
                            this.tableData[i].state="审核"
                        }
                    }
                    let data=res.data.data.list
                    let timeUpate=new Date()
                    this.total=res.data.data.totalCount
                    if(this.total == 0){
                        this.pag_show=false;
                    }else{
                        this.pag_show=true;
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //查询
            search(){
                this.getDemandlist()
            },
            //编辑
            editor(row){
                this.id=row.id
                this.$router.push({
                    path:'/business_update',
                    query:{
                        rowId:this.id
                    }
                })
                this.reload();
            },
            //删除
            del(row){
                this.$confirm('确定删除该数据？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((res)=>{
                    this.id=row.id
                    return request({
                        method:'delete',
                        url:'/mai-meng-cloud/demand/'+this.id,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                    }).then((res)=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.reload() //直接调用
                    })
                }).catch((error)=>{
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            //携带id跳转到线索
            clue(row){
                this.rowId=row.id
                this.rowName=row.name
                this.$router.push({
                    path:'/clue_management',
                    query:{
                        rowId:this.rowId,
                        rowName:this.rowName
                    }

                })
                this.reload()
            },
            //切换每页显示多少条数据
            change_size(event){
                this.pageSize=event.target.value;
                this.search();
            }
        },
        computed:{
            ...mapGetters([
                'updateTableList'
            ]),
        },
        watch:{
        }


    }
</script>
<style lang="less">
    @import '../../style/main-common.css';

    .business-list .el-input{
        width: 200px;
    }
    .business-list .btn-search{
        height: 35px;
        line-height: 15px;
    }
    .business-list  .pager-left{
        float: left;
        width: 200px;
        margin-top: 15px;
    }
    .business-list  .pager-left select{
        color: #c9c7c7;
        font-size: 12px;
        border:1px solid #eaeaea;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        height: 28px;
    }
    .business-list .el-table th>.cell{
        text-align: center;
    }
</style>

