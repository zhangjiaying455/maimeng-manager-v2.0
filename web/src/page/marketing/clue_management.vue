<template>
    <div class="main clue-list">
        <div class="nav">
            <span>营销管理 > 线索管理</span>
        </div>
        <div class="main-search">
            <div class="search-item">
                <span class="item-left">需求名称</span>
                <span class="item-right">
                   <el-select  v-model="demand.newDemand" @change="changeDemand($event)">
                       <el-option label="全部" value="">全部</el-option>
                       <template v-for="item in nameData">
                           <el-option :label="item.name" :value="item.id"  :key="item.dKey">{{item.name}}</el-option>
                       </template>

                   </el-select>
                </span>
            </div>
            <div class="search-item">
                <span class="item-left">质检结果</span>
                <span class="item-right">
                   <el-select v-model="demand.qualitySearch" @change="changeDemandSearch($event)">
                        <el-option label="全部" value="">全部</el-option>
                       <template v-for="(item,index) in qualityList">
                            <el-option :label="item.name"  :value="item.id" :key="index">{{item.name}}</el-option>
                       </template>
                   </el-select>
                </span>
            </div>
            <div class="info-item">
                <span class="item-left font-black">线索时间</span>
                <span class="item-right">
                     <el-date-picker
                         v-model="beginTime"
                         type="date"
                         value-format="yyyy/MM/dd"
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
                    <el-button type="button" class="btn-small" @click="checkPush">推送今日数据</el-button>
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
                    prop="age"
                    label="孩子年龄">
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="孩子性别">
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="质检结果">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作">
                    <template slot-scope="scope">
                        <i id="record" name="play" @change="hh(iconName)"  class="iconfont icon-round-headset_mic- color" @click="playPause(scope.row,scope.$index,$event)"></i>
                        <!--<i class="quality"><img src="../../images/quality.png"></i>-->
                        <i class="iconfont icon-zhijian1 color" @click="quality(scope.row)"></i>
                    </template>
                </el-table-column>
            </el-table>
            <audio v-show="musicShow"   preload="auto" controls="controls" id="music"></audio>
            <el-dialog title="请选择质检状态" :visible.sync="dialogVisible" style="top: 20%;">
                <div class="search-item">
                    <span class="item-left">质检状态:</span>
                    <span class="item-right">
                     <el-select v-model="demand.qualityName" @change="changeQuality($event)">
                         <template v-for="(item,index) in qualityList">
                            <el-option :label="item.name"  :value="item.id" :key="index">{{item.name}}</el-option>
                        </template>
                     </el-select>
                   </span>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="qualitSubmit">确定</el-button>
                </div>
            </el-dialog>
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
    import fileDownload from 'js-file-download'
    export default {
        inject:['reload'],//注入reload方法
        data() {
            return {
                id:'',//质检的rowd
                dialogVisible:false,
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
                    qualityName:'',
                    qualitySearch:''
                },
                qualityList:[],
            }
        },
        created(){
            //console.log(this.$route.query.rowName);
            this.demand.newDemand=this.$route.query.rowName==undefined?"":this.$route.query.rowName;//初始化需求名称
            this.getDemand();//初始化需求名称字典查询

            //转换日期格式
            let begin=new Date()
            /*console.log(begin)*/
            let result=moment(begin).format('YYYY-MM-DD');
           /* console.log(result)*/
            this.beginTime=result; //获取当前日期
            this.endTime=result; //获取当前日期
            this.getDemandlist()//初始化数据列表
            this.checkClue()//初始化点击线索查询
           /* console.log(this.beginTime)*/
            this.qualityList.push({
                name:'未通过',
                id:-1
            },{
                name:'已通过',
                id:0
            })
            console.log(this.qualityList)
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
                debugger
                this.beginTime=val;
            },
            //这个sTime是在data中声明的，也就是v-model绑定的值
            getSendTime(val){
                this.endTime=val;
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
            changeQuality(event){
                this.qualityName=event
            },
            changeDemandSearch(event){
                this.qualitySearch=event;
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
              debugger
              let  params={
                 demandId:this.newDemand,
                 beginDate:this.beginTime,
                 endDate:this.endTime,
                 page:this.currentPage-1,
                 size:this.pageSize,
                 state:this.demand.qualitySearch
                }
                return request({
                    methods:'get',
                    url:'/mai-meng-cloud/thread',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:params
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
                        if (this.tableData[i].state==0){
                            this.tableData[i].state='已通过'
                        }else{
                            this.tableData[i].state='未通过'
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
                    debugger
                    console.log(error)
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
                    debugger
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
                        if (this.tableData[i].state==0){
                            this.tableData[i].state='已通过'
                        }else{
                            this.tableData[i].state='未通过'
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
              this.getDemandlist()
            },
            //点击播放 //点击暂停
            playPause(row,index,event){
                return request({
                    methods:'get',
                    url:'/mai-meng-cloud/thread/'+row.id+'/path',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                }).then((res)=>{
                    debugger
                    console.log(res.data)
                    let url=res.data.data
                    console.log(url)
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
                }).catch((error)=>{
                    debugger
                    console.log(error)
                })

            },
            //每页显示多少条
            change_size(event){
                this.pageSize=event.target.value;
                this.search();
            },
            //修改某个线索的质检结果
            quality(row){
                this.id=row.id
                this.dialogVisible=true
            },
            qualitSubmit(row){
                let params={
                    id:this.id,
                    state:this.qualityName,
                }
                console.log(this.id)
                console.log(this.qualityName)
                return request({
                    method:'put',
                    url:'/mai-meng-cloud/thread',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:params
                }).then((res)=>{
                    debugger
                    console.log(res)
                    this.dialogVisible=false
                    this.getDemandlist();
                    /*   this.reload()*/

                }).catch((error)=>{
                    debugger
                    console.log(error)

                })
            },
            checkPush(){
               /* debugger
                console.log(this.tableData)
               if(this.tableData==[]){
                   debugger
                   this.$message({
                       message: '暂无数据可推送',
                       type: 'warning'
                   })
               }else{*/
                   debugger
                   return request({
                       method:'post',
                       url:'/mai-meng-cloud/thread/excel',
                       headers: {
                           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                       },
                   }).then((res)=>{
                       debugger
                       console.log(res.data)
                       window.location.href=res.data.data
                   }).catch((error)=>{
                       debugger
                       console.log(error)
                   })
              // }
             /*下载下来的excel表格乱码问题  待排除解决*/
             /*   return request({
                    method:'post',
                    url:'/mai-meng-cloud/thread/',
                    responseType: 'arraybuffer',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                }).then((res)=>{
                    debugger
                    console.log("测试")
                    console.log(res.data)
                   /!* let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
                    let objectUrl = URL.createObjectURL(blob);
                    console.log(objectUrl)
                    window.location.href = objectUrl;*!/
                    fileDownload(res.data,"text.xls")
                }).catch((error)=>{
                    debugger
                    console.log(error)
                })
*/
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
    .color{color: #1d90e6;cursor: pointer;margin-left: 10px}
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
    .clue-list .el-dialog--small{
        width: 30%;
        height:200px;
    }
    .clue-list .el-date-editor.el-input {
        width: 170px;
    }
   .clue-list .el-select{
       width: 170px;
   }
    /*.clue-list .el-dialog__footer{
        text-align: center;
    }*/

  /*  .quality img{
        width: 18px;
        !* color: blue; *!
        vertical-align: text-bottom
    }*/
</style>

