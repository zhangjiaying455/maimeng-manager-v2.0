<template>
    <div class="main clue-list">
        <!--<el-breadcrumb  separator=">" class="headerTop">
            <el-breadcrumb-item  v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>-->
        <div class="nav">
            <span>营销管理 > 线索管理</span>
        </div>
        <div class="main-search">
            <div class="search-item">
                <span class="item-left">需求名称</span>
                <span class="item-right">
                           <el-select  v-model="demand.newDemand" @change="changeDemand($event)">
                                    <el-option value="" label="全部">全部</el-option>
                                    <el-option :label="item.name" :value="item.id"  v-for="item in nameData" :key="item.dKey">{{item.name}}</el-option>
                           </el-select>
                            </span>
            </div>
            <!-- <div class="search-item">
                 <span class="item-left">城市</span>
                 <span class="item-right">
                         <el-select  v-model="demand.newDemandState" @change="changeDemandState($event)">
                             <el-option value="">全部</el-option>
                             <el-option :label="item.dValue" :value="item.dKey"  v-for="item in needstateData" :key="item.dKey">{{item.dValue}}</el-option>
                         </el-select>
                     </span>
             </div>-->
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
                <el-button type="button" class="btn-search" @click="search">查询</el-button>
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
                        <i class="iconfont icon-xiangqing color"></i>
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
    import index from "../../router";
    import {mapGetters} from 'vuex'
    export default {
        inject:['reload'],//注入reload方法
        data() {
            return {
                icon:'iconfont icon-round-headset_mic- color',
                iconShow:'iconfont icon-bofang color',
                musicShow:false,
                musicH:true,
                musicS:false,
                beginTime:'',
                endTime:'',
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
                tableData:[],
                pageSize:10,//每页十条
                total:0,
                currentPage: 1,
                nameData:[],//需求名称下拉列表数组
                demand:{
                    newDemand:'',
                    dName:''
                }

            }
        },
        created(){
            this.requirements()
            this.getDemandlist()
            this.getDemand()

        },
        mounted(){

        },
        methods: {
            getSbeginTime(val){
                this.newRole.beginTime=val;//这个sTime是在data中声明的，也就是v-model绑定的值
            },
            getSendTime(val){
                this.newRole.endTime=val;//这个sTime是在data中声明的，也就是v-model绑定的值
            },

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
            changeDemand(event){
                console.log(event)
                this.newDemand = event;
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
                    this.needstateData=dest[4].data  //需求状态数据
                    console.log(this.needstateData)
                }).catch(()=>{

                })
            },
            //获取需求名称字典查询
            getDemand(){
                debugger
                return request({
                    methods:'get',
                    url:'/mai-meng-cloud/demand',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:{
                        page:0,
                        size:1000
                    }
                }).then((res)=>{
                    debugger
                    this.nameData=res.data.data.list
                    console.log(res.data.data.list)
                    let timeUpate=new Date()
                }).catch((error)=>{
                    debugger
                    console.log(error)

                })
            },
            //获取列表
            getDemandlist(){
                debugger
                return request({
                    methods:'get',
                    url:'/mai-meng-cloud/thread',
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
                    console.log(this.total)
                    if(this.total == 0){
                        this.pag_show=false;
                    }else{
                        this.pag_show=true;
                    }
                }).catch((error)=>{
                    debugger

                })
            },
            //查询
            search(){
                debugger
                return request({
                    methods:'get',
                    url:'/mai-meng-cloud/thread',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:{
                        demandId:this.newDemand,
                        beginDate:this.beginTime,
                        endDate:this.endTime,
                        page:this.currentPage-1,
                        size:this.pageSize
                    }
                }).then((res)=>{
                    debugger
                    console.log(res.data.data.list)
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
            //点击播放
            playPause(row,index,event){
                console.log("play");
                console.log(event.target);
                console.log("play");
                let url=row.videoPath
                let audio=document.getElementById('music')
                // let iconClass=document.getElementsByClassName('iconfont icon-round-headset_mic- color')
                let iconShow=event.target.getAttribute('class')
                let iconName=event.target.getAttribute('name')
                if (iconShow == 'iconfont icon-round-headset_mic- color') {
                             debugger
                             let i_list=document.getElementsByName("play");
                             for(let n=0;n<i_list.length;n++){
                                 i_list[n].className="iconfont icon-round-headset_mic- color";
                             }
                             event.target.setAttribute("class", "iconfont icon-bofang color");
                             debugger
                             console.log(this)
                             audio.src = url;
                             audio.play()
                     } else {
                          debugger
                            let i_list=document.getElementsByName("play");
                                 event.target.setAttribute("class", "iconfont icon-round-headset_mic- color")
                                 audio.pause()
                             }


               // let url=row.videoPath
              /* let icon=this.icon;
                console.log(url)
                if(!url){
                    this.$message.error("没有录音文件");
                    return false
                }else{
                    let audio=document.getElementById('music')
                        debugger
                        this.musicH=false
                        this.musicS=true;
                        audio.src=url;
                        audio.play()
                }*/
         /*    for (var i=0;i<this.tableData.length;i++){
                 debugger
                 let url=row.videoPath;
                 let audio=document.getElementById('music')
                 if (this.tableData[i].videoPath == url){
                     debugger
                     console.log(this.tableData[i].videoPath)
                     console.log(url)
                     let record=document.getElementById("record").setAttribute("class",'iconfont icon-bofang color')
                     audio.src=url;
                     audio.play()

                 } else{
                     console.log(this.tableData[i].videoPath)
                     console.log(url)
                     let record=document.getElementById("record").setAttribute("class",'iconfont icon-round-headset_mic- color')
                     audio.pause()
                 }
             }*/

            },
            //点击暂停
           /* playDone(row){
               let audio=document.getElementById('music')
                this.musicS=false;
                this.musicH=true;
                audio.pause();
            },*/
            //每页显示多少条
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
    @import '../../style/mixin';
    @import '../../style/main-common.css';

    .clue-list .btn-search{
        height: 35px;
        line-height: 15px;
    }
    .clue-list .el-table th>.cell{
        text-align: center;
    }
    .btn-small{
        position: absolute;
        right: 30px;
    }
    /*//表头颜色为白色
    .el-table th > .cell{
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
    .item-right{display: inline-block}
    .color{color: #1d90e6;}*/
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

