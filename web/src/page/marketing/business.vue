<template>
   <div class="main business-list">
       <!--<el-breadcrumb  separator=">" class="headerTop">
           <el-breadcrumb-item  v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
       </el-breadcrumb>-->
       <div class="nav">
           <span>营销管理 > 业务需求</span>
       </div>
       <div class="main-search">
           <div class="search-item">
               <span class="item-left">需求名称</span>
               <span class="item-right">
                           <el-input type="text" v-model="inputName"></el-input>
                            </span>
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
           <el-button type="button" class="btn-search" @click="search">查询</el-button>
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
                       <el-button type="text" size="small" @click="clue">线索</el-button>
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
    import index from "../../router";
    import {mapGetters} from 'vuex'
    export default {
        inject:['reload'],//注入reload方法
        data() {
            return {
                pag_show:true,
                needstateData:[],
                tableName:[],
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value:"",
                value1: '',
                value2: '',
                tableData:[],
                pageSize:10,//每页十条
                total:0,
                currentPage: 1,
                inputName:'',
                demand:{
                    newDemandState:'',
                }

            }
        },
        created(){
          this.requirements()
          this.getDemandlist()
        },
        mounted(){

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
            handleSizeChange(pageSize) {//每页条数切换
                this.pageSize=pageSize
                console.log(`每页 ${pageSize} 条`);
            },
            handleCurrentChange(currentPage) {//页码切换
               this.currentPage=currentPage
                console.log(this.currentPage)
                this.getDemandlist()
            },
            tableHeaderColor({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background-color: #ffff;'
                }
            },
            newDemand(){
                this.$router.push({
                    path:'/business_edit'
                })
            },
            changeDemandState(event){
                console.log(event)
                this.newDemandState = event;
            },
            //获取业务需求数据
            requirements() {
                const res=this.$store.dispatch("dictionary")
                res.then(()=>{
                    let dictData=this.$store.state.user.dict
                    //根据相同的groupId组成新的数组
                    let map={},
                        dest=[];
                    for(var i=0;i<dictData.length;i++){
                        let ai=dictData[i];
                        if(!map[ai.groupId]){
                            dest.push({
                                groupId:ai.groupId,
                                dDescribe:ai.dDescribe,
                                data:[ai]
                            });
                            map[ai.groupId]=ai
                        }else{
                            for (var j=0;j<dest.length;j++) {
                                let dj=dest[j];
                                if(dj.groupId==ai.groupId){
                                    dj.data.push(ai)
                                    break;
                                }
                            }
                        }
                    }
                    let needstateDatas=dest[4].data  //需求状态数据
                    //转换Json数组为Json字符串
                    let needstateData1=JSON.stringify(needstateDatas)
                    //存储需求状态数组  Json字符串
                    sessionStorage.setItem('needstatedData',needstateData1)
                    //取出存在sessionStorge里面的Json字符串，转换为Json数组
                    let needStates=sessionStorage.getItem('needstatedData')
                    let needState=JSON.parse(needStates)
                    this.needstateData=needState
                }).catch(()=>{

                })
            },
            //获取列表
            getDemandlist(){
                debugger
                return request({
                    methods:'get',
                    url:'/mai-meng-cloud/demand',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:{
                        page:this.currentPage-1,
                        size:this.pageSize
                    }
                }).then((res)=>{
                    debugger
                    console.log(res.data.data.list)
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
                    console.log(this.total)
                    if(this.total == 0){
                        this.pag_show=false;
                    }else{
                        this.pag_show=true;
                    }

                }).catch((error)=>{
                    debugger
                    console.log(error)

                })
            },
            //查询
            search(){
                debugger
                return request({
                    methods:'get',
                    url:'/mai-meng-cloud/demand',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },params:{
                        name:this.inputName,
                        state:this.newDemandState,
                        page:this.currentPage-1,
                        size:this.pageSize
                    }
                }).then((res)=>{
                    debugger
                    console.log(res.data.data.list)
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
                    console.log(this.total)
                    if(this.total == 0){
                        this.pag_show=false;
                    }else{
                        this.pag_show=true;
                    }

                }).catch((error)=>{
                    debugger
                    console.log(error)
                })

            },
            //编辑
            editor(row){
                debugger
                this.id=row.id
                console.log(this.id)
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
                    debugger
                    this.id=row.id
                    console.log(this.id)
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
            clue(){
                this.$router.push({
                    path:'/clue_management'
                })
            },
            change_size(){
                this.pageSize=document.getElementById("pager-size").value;
                this.search();
            }

        },
        computed:{
            ...mapGetters([
                'updateTableList'
            ]),
        },
        watch:{
            // 监听updateTableList，如果updateTableList值有变化，则执行刷新功能
            updateTableList: function (newValue) {
                if(newValue) {
                    this.getDemandlist()
                    this.$store.commit('UPLOAD_TABLE_LIST',true)
                }
            }
        }


    }
</script>

<style lang="less">
    /*@import '../../style/mixin';*/
    @import '../../style/main-common.css';

    .business-list .el-input{
        width: 200px;
    }
    .business-list .btn-search{
        height: 35px;
        line-height: 15px;
    }
   .pager-left{
        float: left;
        width: 200px;
        margin-top: 15px;
    }
    .pager-left select{
        color: #c9c7c7;
        font-size: 12px;
        border:1px solid #eaeaea;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        height: 28px;
    }
    .business-list .btn-small{
        position: absolute;
        right: 30px;
    }
    .business-list .el-table th>.cell{
        text-align: center;
    }

    //表头颜色为白色
    /*.el-table th > .cell{
        background: #ffff;
        height: 46px;
        line-height: 46px;
        text-align: center;
    }
    .main-search{
        min-height: 60px;
        margin-bottom: 10px;
        background-color: #fff;

        color: #000;
        font-size: 14px;
        font-weight: 600;
        line-height: 24px;
    }
    .main-search .search-item{
        float: left;
        min-width: 190px;
    }
    .main-search .search-item span.item-left{
        color: #333333;
        font-size: 14px;
    }
    .main-table{
       !* min-height: 400px;*!
        background-color: #fff;
    }
    .main-table .table-msg .msg-left{
        float: left;
        text-align: left;
    }
    .main-table .table-msg .msg-left p{
        color: #999999;
        font-size: 14px;
        line-height: 20px;
    }
    .main-table .table-msg .msg-left p span{
        color: #007bc4;
        font-weight: 600;
    }
    .main-table .table-msg .msg-right{
        float: right;
        text-align: right;
    }
    .txt-common{
        width: 160px;
        height: 30px;
        border:1px solid #d6d6d6;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;

        color: #b9b9b9;
        font-size: 14px;
        font-weight: 400;
        line-height: 30px;

    }
    .txt-area{
        width: 160px;
        height: 135px;
        border:1px solid #d6d6d6;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        color: #b9b9b9;
        font-size: 14px;
    }

    .btn-small{
        min-width: 80px;
        height: 24px;
        background-color: #ffffff;
        color: #007bc4;
        font-size: 14px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        border: 1px solid #007bc4;
        outline: none;
        line-height: 22px;
        text-align: center;
    }
    .btn-small:hover{
        background-color: #007bc4;
        color: #ffffff;
    }
    .el-icon-arrow-left:before {
        content: "上一页";
    }
    .el-icon-arrow-right:before {
        content: "下一页";
    }
    .el-pagination{
        float: right;
    }
    .pagination_content{
        position: relative;
        margin-top: 20px;
    }
    .el-pagination__sizes{
        position: absolute;
        left:20px;
    }
    .el-pagination__sizes:before{
        content: "每页显示: ";
    }
    .box{
        width: 100%;
    }
    .bottom {
        text-align: center;
        color: #afafaf;
        font-size: 10px;
    }
    .el-table--fit{margin-top: 40px}
    .item-right{display: inline-block}*/
</style>

