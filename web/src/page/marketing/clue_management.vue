<template>
    <div class="main clue-list">
        <div class="nav">
            <span>营销管理 > 线索管理</span>
        </div>
        <div class="main-search">
            <div class="search-item">
                <span class="item-left">需求名称</span>
                <span class="item-right">
                   <el-select  v-model="demand.newDemand" @change="changeDemand($event)" >
                       <el-option label="全部" value="">全部</el-option>
                       <template v-for="item in nameData">
                           <el-option :label="item.name" :value="item.id"  :key="item.dKey">{{item.name}}</el-option>
                       </template>

                   </el-select>
                </span>
            </div>
            <div class="info-item">
                <span class="item-left font-black">预约时间</span>
                <span class="item-right">
                     <el-date-picker
                         v-model="beginTime"
                         type="date"
                         placeholder="选择日期"
                         @change="getSbeginTime">
                   </el-date-picker>
                   -
                   <el-date-picker
                       v-model="endTime"
                       type="date"
                       placeholder="选择日期"
                       @change="getSendTime">
                   </el-date-picker>
                </span>
                <button type="button" class="btn-search" @click="search">查询</button>
            </div>

        </div>
        <div class="main-table">
            <div class="table-msg">
                <div class="msg-left">
                    <p>查询符合上述条件得企业数据<span>{{this.total}}</span>条</p>
                </div>
                <div class="msg-right">
                    <el-button type="button" class="btn-small" >推送数据</el-button>
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
                    prop="madeTime"
                    label="线索日期"
                    :formatter="dateFormat">
                </el-table-column>
                <el-table-column
                    prop="province"
                    label="所在城市">
                </el-table-column>
                <el-table-column
                    prop="parentName"
                    label="家长称呼">
                </el-table-column>
                <el-table-column
                    prop="parentType"
                    label="家长身份">
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="孩子年龄">
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="孩子性别">
                </el-table-column>
                <el-table-column
                    prop="demandName"
                    label="需求名称">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作">
                    <template slot-scope="scope">
                        <i id="record" name="play" @change="hh(iconName)"  class="iconfont icon-round-headset_mic- color" @click="playPause(scope.row,scope.$index,$event)"></i>
                        <!--<i class="iconfont icon-xiangqing color"></i>-->
                    </template>
                </el-table-column>
            </el-table>
            <audio v-show="musicShow"   preload="auto" controls="controls" id="music"></audio>
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
            </div>
        </div>
    </div>
</template>
<script>
    import request from '@/untils/request'
    import moment from 'moment'
    import {mapGetters} from 'vuex'
    export default {
        inject:['reload'],//注入reload方法
        data() {
            return {
                musicShow:false,//隐藏audio播放器
                beginTime:'',//选择日期  开始日期
                endTime:'',//选择日期  结束日期
                pag_show:true,//分页是否显示
                needstateData:[],//需求状态数据
                rowId:'',//线索查询id
                rowName:'',//线索查询name
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }]
                },//element-ui日期组件 默认选中今天
                tableData:[],//表格数据数组
                pageSize:10,//每页十条
                total:0,//总数
                currentPage: 1,//当前页
                nameData:[],//需求名称下拉列表数组
                demand:{
                    id:'',
                    newDemand:'',
                }

            }
        },
        created(){
            this.demand.newDemand=this.$route.query.rowName;//初始化需求名称
            this.getDemand();//初始化需求名称字典查询
            this.getDemandlist()//初始化数据列表
            this.checkClue()//初始化点击线索查询
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
            //这个sTime是在data中声明的，也就是v-model绑定的值
            getSbeginTime(val){
                this.newRole.beginTime=val;
            },
            //这个sTime是在data中声明的，也就是v-model绑定的值
            getSendTime(val){
                this.newRole.endTime=val;
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
            //表格表头样式
            tableHeaderColor({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background-color: #ffff;'
                }
            },
            //需求名称
            changeDemand(event){
                this.newDemand = event;
            },
            //获取需求名称字典查询
            getDemand(){
                  let params={
                       page:0,
                       size:1000
                 }
                return request({
                    methods:'get',
                    url:'/mai-meng-cloud/demand',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:params
                }).then((res)=>{
                    let rowId=this.$route.query.rowId
                    this.nameData=res.data.data.list
                    let timeUpate=new Date()
                }).catch((error)=>{
                })
            },
            //获取列表
            getDemandlist(){
              let  params={
                 demandId:this.newDemand,
                 beginDate:this.beginTime,
                 endDate:this.endTime,
                 page:this.currentPage-1,
                 size:this.pageSize
                }
                return request({
                    methods:'get',
                    url:'/mai-meng-cloud/thread',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:params
                }).then((res)=>{
                    this.tableData=res.data.data.list
                    for (var i=0;i<this.tableData.length;i++){
                        if (this.tableData[i].parentType==1){
                            this.tableData[i].parentType='父亲'
                        } else{
                            this.tableData[i].parentType='母亲'
                        }
                        if(this.tableData[i].sex==1){
                            this.tableData[i].sex='男'
                        }else{
                            this.tableData[i].sex='女'
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
                })
            },
            //点击线索查询
            checkClue(){
                let rowId=this.$route.query.rowId;
                this.rowName=this.$route.query.rowName
                let params={
                    demandId:rowId,
                    beginDate:this.beginTime,
                    endDate:this.endTime,
                    page:this.currentPage-1,
                    size:this.pageSize
                }
                return request({
                    methods:'get',
                    url:'/mai-meng-cloud/thread',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:params
                }).then((res)=>{
                    this.tableData=res.data.data.list
                    for (var i=0;i<this.tableData.length;i++){
                        if (this.tableData[i].parentType==1){
                            this.tableData[i].parentType='父亲'
                        } else{
                            this.tableData[i].parentType='母亲'
                        }
                        if(this.tableData[i].sex==1){
                            this.tableData[i].sex='男'
                        }else{
                            this.tableData[i].sex='女'
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
                })
            },
            //查询
            search(){
                //获取列表
                this.getDemandlist();
            },
            //点击播放 //点击暂停
            playPause(row,index,event){
                let url=row.videoPath
                let audio=document.getElementById('music')
                let iconShow=event.target.getAttribute('class')
                let iconName=event.target.getAttribute('name')
                if (iconShow == 'iconfont icon-round-headset_mic- color') {
                     let i_list=document.getElementsByName("play");
                     for(let n=0;n<i_list.length;n++){
                         i_list[n].className="iconfont icon-round-headset_mic- color";
                     }
                     event.target.setAttribute("class", "iconfont icon-bofang color");
                     audio.src = url;
                     audio.play()
                 }else {
                     let i_list=document.getElementsByName("play");
                     event.target.setAttribute("class", "iconfont icon-round-headset_mic- color")
                     audio.pause()
                  }
            },
            //每页显示多少条
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
    @import '../../style/mixin';
    @import '../../style/main-common.css';

    .clue-list .btn-search{
        height: 35px;
        line-height: 15px;
    }
    .clue-list .el-table th>.cell{
        text-align: center;
    }
    /*.btn-small{
        position: absolute;
        right: 30px;
    }*/
    .color{color: #1d90e6;cursor: pointer}
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

</style>

