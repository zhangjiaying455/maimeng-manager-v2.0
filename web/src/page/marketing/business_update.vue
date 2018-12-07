<template>
    <div class="main business">
        <div class="nav">
            <span>营销管理 > 业务需求</span>
        </div>
        <!--<el-breadcrumb  separator=">" class="headerTop">
            <el-breadcrumb-item  v-for="item in $route.meta" :key="item.id">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>-->
        <el-form class="main" :model="newRole"  ref="newRole">
            <!--主体内容-->
            <div class="main-step-list">
                <ul>
                    <li class="tab_item over">
                        <div class="step">
                            <div class="step-circle">1</div>
                            <p>业务需求</p>
                        </div>
                    </li>
                    <li class="tab_item">
                        <span class="step-dot"></span>
                        <div class="step">
                            <div class="step-circle">2</div>
                            <p>品牌信息</p>
                        </div>
                    </li>
                    <li class="tab_item">
                        <span class="step-dot"></span>
                        <div class="step">
                            <div class="step-circle">3</div>
                            <p>线索模板</p>
                        </div>
                    </li>
                    <li class="tab_item">
                        <span class="step-dot"></span>
                        <div class="step">
                            <div class="step-circle">4</div>
                            <p>确认信息</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="main-edit step-01" v-show="first_step">
                <div class="edit-info info-padding">
                    <div class="info-left">
                        <div class="info-item">
                            <span class="item-left font-black"><span>*</span>需求名称</span>
                            <span class="item-right">
                                        <input v-model="newRole.demandName" type="text"  class="txt-common">
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left font-black"><span>*</span>需求周期</span>
                            <span class="item-right">
                                           <el-date-picker
                                               v-model="newRole.beginTime"
                                               type="date"
                                               placeholder="选择日期"
                                               @change="getSbeginTime">
                                       </el-date-picker>
                                       -
                                       <el-date-picker
                                           v-model="newRole.endTime"
                                           type="date"
                                           placeholder="选择日期"
                                           @change="getSendTime">
                                       </el-date-picker>
                                <!--<input type="text" class="txt-common" value="" v-model="newRole.beginTime" style="width: 173px;"> - <input type="text" class="txt-common" v-model="newRole.endTime" value="" style="width: 172px;">-->
                                    </span>
                        </div>
                        <div class="info-item" >
                            <span class="item-left font-black"><span>*</span>运营模式</span>
                            <span class="item-right">
                                        <el-select class="common"  v-model="newRole.operationMode"  @change="changeOperation($event)">
                                            <el-option  :label="item.dValue" :value="item.dKey"  v-for="item in operationData"  :key="item.dKey">{{item.dValue}}</el-option>
                                        </el-select>
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left font-black"><span>*</span>业务分类</span>
                            <span class="item-right">
                                        <el-select class="common" v-model="newRole.businessClassification" @change="changeClass($event)">
                                            <el-option :label="item.dValue" :value="item.dKey"  v-for="item in businessData" :key="item.dKey">{{item.dValue}}</el-option>
                                        </el-select>
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left font-black"><span>*</span>年龄范围</span>
                            <span class="item-right">
                                        <input type="text" class="txt-common" value="" style="width: 159px !important;" v-model="newRole.beginAge"> - <input type="text" class="txt-common" value="" style="width:159px !important;" v-model="newRole.endAge">
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left font-black"><span>*</span>课价水平</span>
                            <span class="item-right">
                                        <el-select class="common" v-model="newRole.priceLevel" @change="changeAcademic($event)">
                                            <el-option :label="item.dValue" :value="item.dKey" v-for="item in priceleveData" :key="item.dKey">{{item.dValue}}</el-option>
                                        </el-select>
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left font-black"><span>*</span>目标区域</span>
                            <span class="item-right">
                                        <el-select class="common"  v-model="newRole.area"  @change="changeObject($event)">
                                            <el-option :label='item.dValue' :value="item.dKey" v-for="item in regionData" :key="item.dKey">{{item.dValue}}</el-option>
                                        </el-select>
                                    </span>
                        </div>
                    </div>
                    <div class="info-right">
                        <div class="info-item">
                            <span class="item-left font-black" style="vertical-align: top">补充说明</span>
                            <span class="item-right">
                                        <textarea rows="5" cols="50" class="txt-area" v-model="newRole.supplementary"></textarea>
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left font-black" style="vertical-align: top">产品材料</span>
                            <span class="item-right">

                                        <el-upload
                                            class="upload-demo"
                                            ref="upload"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :file-list="fileList"
                                            :auto-upload="false">
                                       <el-button slot="trigger" size="medium" type="warning">上传附件材料</el-button>
                                             <p class="remark-info">附件支持ppt、pdf、doc等文件格式，大小不可超过100MB</p>
                                        </el-upload>
                                    </span>
                        </div>

                    </div>
                    <div class="clear"></div>
                </div>
                <div class="edit-btn-list no-line">
                    <button type="button" class="btn-submit" id="btn_step2" @click="checkSecond">下一步</button>
                </div>
            </div>
            <div class="main-edit step-02" v-show="second_step">
                <div class="edit-info info-padding">
                    <div class="info-left">
                        <div class="info-item">
                            <span class="item-left font-black"><span>*</span>品牌名称</span>
                            <span class="item-right">
                                        <el-select class="common"  v-model="newRole.brand">
                                            <el-option :value="item.brandName" v-for="item in brands" :key="item.dKey">{{item.brandName}}</el-option>
                                        </el-select>
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left font-black"><span>*</span>业务负责人</span>
                            <span class="item-right">
                                        <input type="text"  v-model="newRole.contactPerson" class="txt-common">
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left font-black"><span>*</span>联系电话</span>
                            <span class="item-right">
                                        <input type="text" value="" class="txt-common" v-model="newRole.mobile">
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left font-black">联系邮箱</span>
                            <span class="item-right">
                                        <input type="text" value="" class="txt-common" v-model="newRole.email">
                                    </span>
                        </div>
                    </div>
                    <div class="info-right">
                        <div class="info-item">
                            <span class="item-left font-black" style="vertical-align: top">备注说明</span>
                            <span class="item-right">
                                        <textarea rows="5" cols="50" class="txt-area" v-model="newRole.remark"></textarea>
                                    </span>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="edit-btn-list no-line">
                    <button type="button" class="btn-common" id="btn_step1" @click="checkFirst">上一步</button>
                    <button type="button" class="btn-submit" id="btn_step3" @click="checkThird">下一步</button>
                </div>
            </div>
            <div class="main-edit step-03" v-show="third_step">
                <h6><span></span>系统标签</h6>
                <ul class="tag-list">
                    <el-tag v-model="newRole.systemTags" v-for="item in cluesData" :key="item.dKey">{{item.dValue}}</el-tag>
                </ul>
                <div class="line"></div>
                <h6><span></span>自定义标签</h6>
                <ul class="tag-list">
                    <el-tag
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        :title="desc"
                        @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                </ul>
                <div class="edit-info" style="width: 100%; clear: both">
                    <div class="info-item">
                        <span class="item-left font-black"><span>*</span>自定义标签</span>
                        <span class="item-right">
                                       <input type="text" class="txt-common" id="tag-title" value="" placeholder="标签不能超过10个字" v-if="inputVisible" v-model="inputValue" ref="saveTagInput">
                                </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black" style="vertical-align: top">标签描述</span>
                        <span class="item-right">
                                    <textarea class="txt-area" v-model="desc" id="tag-remark" rows="5" cols="50" placeholder="请输入标签描述，标签描述不能超过35个字"></textarea>
                                </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left" style="vertical-align: top">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span class="item-right">
                                    <button type="button" class="btn-file" id="btn-save-tag" @click="handleInputConfirm">保存标签</button>
                                </span>
                    </div>
                </div>
                <div class="edit-btn-list no-line">
                    <button type="button" class="btn-common" id="btn_step21" @click="checkUpper">上一步</button>
                    <button type="button" class="btn-submit" id="btn_step4" @click="checkFour">下一步</button>
                </div>
            </div>
            <div class="main-edit step-04" v-show="four_step">
                <h6><span></span>业务需求</h6>
                <div class="edit-info">
                    <div class="info-left">
                        <div class="info-item">
                            <span class="item-left">需求名称</span>
                            <span class="item-right">
                                        {{this.newRole.demandName}}
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left">运营模式</span>
                            <span class="item-right">
                                         {{this.operationValue}}
                                       </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left">业务分类</span>
                            <span class="item-right">
                                        {{this.businessValue}}
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left">年龄范围</span>
                            <span class="item-right">
                                        {{this.newRole.beginAge}}-{{this.newRole.endAge}}岁青少儿
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left">课价水平</span>
                            <span class="item-right">
                                        {{this.priceLevelValue}}
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left">目标区域</span>
                            <span class="item-right">
                                        {{this.areaValue}}
                                    </span>
                        </div>
                    </div>
                    <div class="info-right">
                        <div class="info-item">
                            <span class="item-left">需求周期</span>
                            <span class="item-right">
                                        {{this.newRole.beginTime}}/{{this.newRole.endTime}}
                                    </span>

                        </div>
                        <div class="info-item">
                            <span class="item-left">补充说明</span>
                            <span class="item-right">
                                        {{this.newRole.supplementary}}
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left">产品介绍</span>
                            <span class="item-right">
                                        {{this.fileList}}
                                    </span>
                        </div>
                    </div>
                </div>
                <div class="line"></div>
                <h6><span></span>品牌信息</h6>
                <div class="edit-info">
                    <div class="info-left">
                        <div class="info-item">
                            <span class="item-left">品牌名称</span>
                            <span class="item-right">
                                        {{this.newRole.brand}}
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left">业务负责人</span>
                            <span class="item-right">
                                        {{this.newRole.contactPerson}}
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left">联系电话</span>
                            <span class="item-right">
                                        {{this.newRole.mobile}}
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left">联系邮箱</span>
                            <span class="item-right">
                                       {{this.newRole.email}}
                                    </span>
                        </div>
                    </div>
                    <div class="info-right">
                        <div class="info-item">
                            <span class="item-left">备注说明</span>
                            <span class="item-right">
                                        {{this.newRole.remark}}
                                    </span>
                        </div>
                    </div>
                </div>
                <div class="line"></div>
                <h6><span></span>线索模板</h6>
                <div class="edit-info">
                    <div class="info-item">
                        <span class="item-left" style="vertical-align: top;">系统标签</span>
                        <span class="item-right">
                                    <ul class="tag-list-small">
                                        <li v-for="(item,index) in cluesData" :key="index">{{item.dValue}}</li>
                                    </ul>
                                </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left" style="vertical-align: top;">自定义标签</span>
                        <span class="item-right">
                                    <ul class="tag-list-small">
                                        <li  v-for="tag in dynamicTags" :key="tag">{{tag}}</li>
                                    </ul>
                                </span>
                    </div>
                </div>
                <div class="edit-btn-list no-line">
                    <button type="button" class="btn-common" id="btn_step31" @click="checkStory">上一步</button>
                    <button type="button" class="btn-submit" id="btn_submit" @click="confirm">确定</button>
                </div>
            </div>
            <div>

            </div>

        </el-form>
    </div>
</template>
<script>
    import {dictionary} from '@/api/login'
    import {mapActions, mapState,mapMutations} from 'vuex'
    import request from '@/untils/request'
    import moment from 'moment'
    export default{
        inject:['reload'],
        data(){
            return{
                params:'',
                desc:'',
              newRole:{
                  demandName:'',//需求名称
                  supplementary:'',//补充说明
                  contactPerson:'',//业务负责人
                  email:'',//联系邮箱
                  mobile:'',//联系人电话
                  remark:'',//备注说明
                  beginTime:'',//需求周期开始
                  endTime:'',//需求周期结束
                  beginAge:'',//年龄范围
                  endAge:'',//年龄范围
                  operationMode:'',//运营模式
                  businessClassification:'',//业务分类
                  priceLevel:'',//课价水平
                  area:'',//目标区域
                  userTags:'',//自定义标签
                  brand:'',//品牌名称
              },
                operationValue:'',//运营模式Value值
                businessValue:'', //业务分类Value值
                priceLevelValue:'',//课价分类Value值
                areaValue:'',//目标区域Value值
                fileList:[],
                first_step:true,
                second_step:false,
                third_step:false,
                four_step:false,
                dynamicTags:[],
                inputVisible: true,
                inputValue: '',
                operationDkey:'',
                businessDkey:'',
                priceleveDkey:'',
                regionDkey:'',
                operationData:[],//运营模式数据
                businessData:[],//业务分类数据
                priceleveData:[],//课价水平数据
                regionData:[],//目标区域数据
                cluesData:[],//线索模板数据
                brands:[],
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

            }
        },
        created(){
            this.getDictionary()
            this.getBrand()
            this.editor();
        },
        methods:{
            getSbeginTime(val){
                this.newRole.beginTime=val;//这个sTime是在data中声明的，也就是v-model绑定的值
            },
            getSendTime(val){
                this.newRole.endTime=val;//这个sTime是在data中声明的，也就是v-model绑定的值
            },
            ...mapActions(['dictionary']),
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            checkSecond(){
                if(this.newRole.demandName == ''){
                    this.$message.error("请输入需求名称")
                }else if(this.newRole.beginTime == '' || this.newRole.endTime == ''){
                    this.$message.error("请选择需求周期")
                }else if(this.newRole.operationMode == ''){
                    this.$message.error("请选择运营模式")
                }
                else if(this.newRole.businessClassification == ''){
                    this.$message.error("请选择业务分类")
                }
                else if(this.newRole.beginAge == '' || this.newRole.endAge == ''){
                    this.$message.error("请输入年龄范围")
                }else if(this.newRole.priceLevel == ''){
                    this.$message.error("请选择课业水平")
                }else if(this.newRole.area == ''){
                    this.$message.error("请选择目标区域")
                }else{
                    let arr = document.getElementsByClassName("tab_item");
                    this.first_step=false
                    this.second_step=true
                    arr[1].classList.add("over")
                }
            },
            //编辑
            editor(){
                    let rowId=this.$route.query.rowId
                    return request({
                   methods:'get',
                   url:'/mai-meng-cloud/demand/'+rowId,
                   headers: {
                       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                   },
               }).then((res)=>{
                   debugger
                   console.log(res.data.data.demand.name)
                   let demand=res.data.data.demand
                   //需求名称
                   this.newRole.demandName=demand.name;
                   //开始时间
                   this.newRole.beginTime=demand.beginTime
                    //结束时间
                    this.newRole.endTime=demand.endTime
                        //判断运营模式
                        if(demand.operationMode==1){
                            this.newRole.operationMode='线上'
                        }else{
                            this.newRole.operationMode='线下'
                        }
                        //判断业务分类
                        if(demand.businessClassification==1){
                            this.newRole.businessClassification='幼儿早教'
                        }else if(demand.businessClassification==2){
                            this.newRole.businessClassification='少儿英语'
                        }else if(demand.businessClassification==3){
                            this.newRole.businessClassification='成人英语'
                        }else{
                            this.newRole.businessClassification='少儿编程'
                        }
                        //分割年龄范围
                        let ageRange=demand.ageRange.split(',')
                        for(var i=0;i<ageRange.length;i++){
                            this.newRole.beginAge=ageRange[0]
                            this.newRole.endAge=ageRange[1]
                        }
                        //判断课价水平
                        if(demand.priceLevel==1){
                            this.newRole.priceLevel='低'
                        }else if(demand.priceLevel==2){
                            this.newRole.priceLevel='普通'
                        }else{
                            this.newRole.priceLevel='高'
                        }
                        //判断目标区域
                        if(demand.area==1){
                            this.newRole.area='一线城市'
                        }else if(demand.area==2){
                            this.newRole.area='二线城市'
                        }else{
                            this.newRole.area='三线城市'
                        }
                        let brandEntity=res.data.data.brandEntity
                        //品牌名称
                        this.newRole.brand=brandEntity.brand
                        //负责联系人
                        this.newRole.contactPerson=brandEntity.contactPerson
                       //联系电话
                        this.newRole.mobile=brandEntity.mobile

                        let threadTemplate=res.data.data.threadTemplate
                        //自定义标签
                        this.dynamicTags=threadTemplate.userTags



               }).catch((error)=>{
                   debugger
                   console.log(error)
               })
            },
            checkFirst(){
                let arr = document.getElementsByClassName("tab_item");
                this.first_step=true
                this.second_step=false
                arr[1].classList.remove("over")
            },
            checkThird(){
                if(this.newRole.brand == ''){
                    this.$message.error("请选择品牌名称")
                }else if(this.newRole.contactPerson == ''){
                    this.$message.error("请输入业务负责人")
                }else if(this.newRole.mobile == ''){
                    this.$message.error("请输入联系电话")
                }else{
                    let arr = document.getElementsByClassName("tab_item");
                    this.second_step=false
                    this.third_step=true
                    arr[2].classList.add("over")
                }
            },
            checkFour(){
                if(this.dynamicTags == ''){
                    this.$message.error("请输入自定义标签")
                }else{
                    let arr = document.getElementsByClassName("tab_item");
                    this.third_step=false
                    this.four_step=true
                    arr[3].classList.add("over")
                }
            },
            checkUpper(){
                  let arr = document.getElementsByClassName("tab_item");
                    this.second_step=true,
                    this.third_step=false
                    arr[2].classList.remove("over")

            },
            checkStory(){
                  let arr = document.getElementsByClassName("tab_item");
                   this.third_step=true,
                   this.four_step=false
                  arr[3].classList.remove("over")
            },
            changeOperation(event){
                debugger
                console.log(event)
                this.operationMode = event; //获取运营模式的ID，即option对应的ID值
                if(this.operationMode==1){
                    this.operationValue='线上'
                }else{
                    this.operationValue='线下'
                }
            },
            changeClass(event){
                console.log(event)
                debugger
                this.businessClassification = event;
                console.log(this.businessClassification)
                if(this.businessClassification==1){
                    this.businessValue='幼儿早教'
                }else if (this.businessClassification==2){
                    this.businessValue='少儿英语'
                }else if(this.businessClassification==3){
                    this.businessValue='成人英语'
                }else{
                    this.businessValue='少儿编程'
                }
            },
            changeAcademic(event){
                debugger
                console.log(event)
                this.priceLevel = event;
                if(this.priceLevel==1){
                    this.priceLevelValue='低'
                }else if (this.priceLevel==2){
                    this.priceLevelValue='普通'
                }else{
                    this.priceLevelValue='高'
                }
            },
            changeObject(event){
                debugger
                console.log(event)
                this.area = event;
                if(this.area==1){
                    this.areaValue='一线城市'
                }else if (this.area==2){
                    this.areaValue='二线城市'
                }else{
                    this.areaValue='三线城市'
                }
            },
            //更新需求确定
            confirm(){
                let rowId=this.$route.query.rowId
                this.$refs.newRole.validate(valid => {
                    if (valid) {
                        let ageRange=this.newRole.beginAge+","+this.newRole.endAge
                        debugger
                        return request({
                            method:'put',
                            headers: {
                                'Content-Type': 'application/json; charset=UTF-8'
                            },
                            transformRequest: [function(data) {
                                data = JSON.stringify(data)
                                return data
                            }],
                            url:'/mai-meng-cloud/demand',
                            data:{

                                "threadTemplate":{ 'id':rowId,"userTags":this.dynamicTags,},
                                "brand":{
                                    'id':rowId,
                                    "brand":this.newRole.brand,
                                    'contactPerson':this.newRole.contactPerson,
                                    'mobile':this.newRole.mobile,
                                    },
                                "demand":{
                                    'id':rowId,
                                    'name':this.newRole.demandName,
                                    'beginTime':this.newRole.beginTime,
                                    'endTime':this.newRole.endTime,
                                    'operationMode':this.operationMode,
                                    'businessClassification':this.businessClassification,
                                    'ageRange':ageRange,
                                    'priceLevel':this.priceLevel,
                                    'area':this.area
                                },
                            }
                        }).then((res)=>{
                            debugger
                            console.log(res.data)
                            this.$message({
                                type: 'success',
                                message: '更新成功!'
                            });
                            this.$router.push({
                                path:'/business'
                            })
                            this.reload();
                        }).catch((error)=>{
                            debugger
                            console.log(error)
                        })
                    }
                });

            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputValue = '';
            },
            //字典管理
              getDictionary(){
                const res=this.$store.dispatch("dictionary")
                res.then(()=>{
                     let dictData=this.$store.state.user.dict
                    console.log(dictData)
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
                    console.log(dest)
                    /*this.operationData=dest[0].data  //运营模式数据
                    this.businessData=dest[1].data  //业务分类数据
                    this.priceleveData=dest[2].data  //课价水平数据
                    this.regionData=dest[3].data  //目标区域数据
                    this.cluesData=dest[5].data //线索模板数据*/

                    let operationDatas=dest[0].data  //运营模式数据
                    let operationData=JSON.stringify(operationDatas)
                    sessionStorage.setItem('operationData',operationData)
                    let oprations=sessionStorage.getItem('operationData')
                    this.operationData=JSON.parse(oprations)

                    let need=sessionStorage.getItem('operationData')
                    let businessDatas=dest[1].data  //业务分类数据
                    let businessData=JSON.stringify(businessDatas)
                    sessionStorage.setItem('businessData',businessData)
                    let business=sessionStorage.getItem('businessData')
                    this.businessData=JSON.parse(business)

                    let priceleveDatas=dest[2].data  //课价水平数据
                    let priceleveData=JSON.stringify(priceleveDatas)
                    sessionStorage.setItem('priceleveData',priceleveData)
                    let priceleve=sessionStorage.getItem('priceleveData')
                    this.priceleveData=JSON.parse(priceleve)

                    let regionDatas=dest[3].data  //目标区域数据
                    let regionData=JSON.stringify(regionDatas)
                    sessionStorage.setItem('regionData',regionData)
                    let region=sessionStorage.getItem('regionData')
                    this.regionData=JSON.parse(region)

                    let cluesDatas=dest[5].data //线索模板数据
                    let cluesData=JSON.stringify(cluesDatas)
                    sessionStorage.setItem('cluesData',cluesData)
                    let clues=sessionStorage.getItem('cluesData')
                    this.cluesData=JSON.parse(clues)

                }).catch(()=>{

                })
            },
              operation(){

            },
            //查询品牌
            getBrand(){
                debugger
                return request({
                    method:'get',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    url:'mai-meng-cloud/company/brand',
                }).then((res)=>{
                    debugger
                    console.log(res.data);
                    let brand=[]
                    // brand.push({brandName:res.da})
                        let bra=res.data.data
                        for (var i=0;i<bra.length;i++){
                            console.log(bra[i])
                            brand.push({
                                brandName:bra[i]
                            })
                        }
                        console.log(brand)
                    let brad=sessionStorage.getItem('brandData')
                    let brandDatas=JSON.parse(brad)
                    this.brands=brandDatas;
                   // this.reload();


                }).catch((error=>{
                    debugger
                    console.log(error)
                }))
            }
        },
    }

</script>
<style  lang="less">
    @import '../../style/mixin';
    @import '../../style/main-common.css';
    .business .txt-area{
        width: 340px !important;
    }
    .business .txt-common{
        width: 350px !important;
    }
    .business .el-date-editor.el-input{
        width: 173px !important;
    }
    .business .el-select{
        width: 360px !important;
    }
    /*edit-box-extend-begin*/
    .edit-info{
        margin-bottom: 30px;
    }
    .edit-info.info-padding{
        padding-top: 30px;
    }
    .edit-info .info-left,.edit-info .info-right{
        float: left;
        width: 500px;
        margin-bottom: 20px;
        display: block;
    }
    .file-list{
        width: 365px;
    }
    .file-list li{
        background: url("../../images/icon_list_files.png") center left no-repeat;
        padding-left: 20px;

        color: #666666;
        font-size: 12px;
        line-height: 18px;
        margin-bottom: 10px;
    }
    .file-list li span{
        color: #999999;
        margin-left: 8px;
    }
    .file-list li a{
        color: #007bc4;
        margin-left: 30px;
    }
    .remark-info{
        color: #999999;
        font-size: 12px;
        line-height: 12px;
        margin-top: 12px;
    }
    .input-group-list .input-group-item{
        margin-bottom: 10px;
    }
    .input-group-list .input-group-item .txt-common{
        margin-right: 10px;
    }
    /*edit-box-extend-end*/
    /*step-list-begin*/
    .main-step-list{
        min-height: 60px;
        margin-bottom: 10px;
        padding: 15px;
        background-color: #fff;
        text-align: center;
    }
    .main-step-list ul{
        height: 60px;
        display: inline-block;
    }
    .main-step-list ul li{
        float: left;
        color: #979797;
        font-weight: 400;
        text-align: center;
    }
    .main-step-list ul li .step{
        float: left;
    }
    .main-step-list ul li .step-circle{
        width: 37px;
        height: 37px;
        color: #ffffff;
        font-size: 14px;
        text-align: center;
        line-height: 36px;
        display: inline-block;
        margin-bottom: 10px;
        background: url("../../images/circle-01.png") top center no-repeat;
    }
    .main-step-list ul li.over .step-circle{
        background: url("../../images/circle-02.png") top center no-repeat;
    }
    .main-step-list ul li.over .step p{
        color: #007bc4;
    }
    .main-step-list ul li .step-dot{
        float: left;
        display: inline-block;
        width: 200px;
        height: 2px;
        background: url("../../images/dot-01.png") top center repeat-x;
        position: relative;
        top: 18px;
    }
    .main-step-list ul li.over .step-dot{
        background: url("../../images/dot-02.png") top center repeat-x;
    }
    /*step-list-end*/

    /*tag-list-begin*/
    .tag-list{
        display: block;
    }
    .tag-list .el-tag{
        float: left;

        width: 108px;
        height: 32px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;

        color: #333333;
        font-size: 12px;
        line-height: 30px;
        text-align: center;

        margin-right: 8px;
        margin-bottom: 15px;

        border:1px solid #007bc4;
        background-color: rgba(0,123,196,.1);

        position: relative;
        top: 0;
        left: 0;
        overflow: hidden;
    }
    .tag-list li .del{
        display: none;
        width: 14px;
        height: 14px;
        background: url("../../images/icon-del.png") top center no-repeat;
        position: absolute;
        bottom: 0;
        right: 0;
        cursor: pointer;
    }
    .tag-list li:hover .del{
        display: inline-block;
    }

    .tag-list-small{
        display: inline-block;
    }
    .tag-list-small li{
        float: left;
        min-width: 90px;
        height: 20px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        border:1px solid #007bc4;
        background-color: rgba(0,123,196,.1);

        line-height: 18px;
        text-align: center;
        margin-right: 20px;
        padding: 0 20px;
    }
    /*tag-list-end*/
    /*.modal .modal-header{
        border-bottom: none;
    }
    .modal .modal-title{
        color: #333333;
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        position: relative;
        bottom: -16px;
    }
    .modal .modal-item{
        height: 60px;
        line-height: 60px;
    }
    .modal .modal-item span{
        color: #666666;
        font-size: 12px;
    }
    .modal .modal-item .item-left{
        display: inline-block;
        width: 200px;
        text-align: right;
        margin-right: 10px;
    }
    .modal .modal-item .txt-common{
        width: 145px;
        height: 35px;
        border: 1px solid #d3d3d3;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        margin-right: 10px;
        position: relative;
        top: 2px;
    }
    .modal .modal-footer{
        border-top: none;
        text-align: center;
    }
    !*bootstrap-modal-repeat-end*!

    !*table-opts-a-begin*!
    .main-table table tbody tr a.push{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("../../images/btn_push_n.png") top center no-repeat;
        position: relative;
        top: 5px;
    }
    .main-table table tbody tr a.push:hover{
        background: url("../../images/btn_push_h.png") top center no-repeat;
    }
    .main-table table tbody tr a.listen{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("../../images/btn_listen_n.png") top center no-repeat;
        position: relative;
        top: 5px;
    }
    .main-table table tbody tr a.listen:hover{
        background: url("../../images/btn_listen_h.png") top center no-repeat;
    }
    .main-table table tbody tr a.detail{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("../../images/btn_details_n.png") top center no-repeat;
        position: relative;
        top: 5px;
    }
    .main-table table tbody tr a.detail:hover{
        background: url("../../images/btn_details_h.png") top center no-repeat;
    }
    !*table-opts-a-end*!

    !*common-msg-begin*!
    .msg{
        display: none;
    }
    .msg .close{
        margin-top: 5px;
        margin-right: 10px;
    }
    .msg-success{
        width: 328px;
        height: 70px;

        background-color: #fff;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        -webkit-box-shadow:  2px 2px 2px rgba(0,0,0,.15);
        -moz-box-shadow:  2px 2px 2px rgba(0,0,0,.15);
        box-shadow:  2px 2px 2px rgba(0,0,0,.15);

        position: fixed;
        top: 35px;
        right: 5px;
    }
    .msg-success .msg-img{
        float: left;
        margin: 12px;
        width: 23px;
        height: 23px;
        background: url("../../images/icon-success.png") top center no-repeat;
    }
    .msg-success .msg-font{
        float: left;
        margin-top: 12px;
    }
    .msg-success .msg-font p{
        margin: 0 0 5px;
        padding: 0;
        color: #333333;
        font-size: 16px;
        font-weight: 600;
    }
    .msg-success .msg-font span{
        color: #666666;
        font-size: 14px;
    }
    .msg-fail .modal-title{
        color: #333333;
        font-size: 16px;
        font-weight: 600;
        text-align: left;
        position: relative;
        top: 0;
        width: 70%;
    }
    .msg-fail .modal-body .msg-font{
        height: 30px;
        background: url("../../images/icon_danger.png") center left no-repeat;
        padding-left: 35px;

        color: #333333;
        font-size: 16px;
        line-height: 30px;
    }
    .msg-fail .modal-footer{
        text-align: right;
    }
    !*common-msg-end*!

    !*edit-box-extend-begin*!
    .edit-info{
        margin-bottom: 30px;
    }
    .edit-info.info-padding{
        padding-top: 30px;
    }
    .edit-info .info-left,.edit-info .info-right{
        float: left;
        width: 50%;
        margin-bottom: 20px;
        display: block;
    }
    .file-list{
        width: 365px;
    }
    .file-list li{
        background: url("../../images/icon_list_files.png") center left no-repeat;
        padding-left: 20px;

        color: #666666;
        font-size: 12px;
        line-height: 18px;
        margin-bottom: 10px;
    }
    .file-list li span{
        color: #999999;
        margin-left: 8px;
    }
    .file-list li a{
        color: #007bc4;
        margin-left: 30px;
    }
    .remark-info{
        color: #999999;
        font-size: 12px;
        line-height: 12px;
        margin-top: 12px;
    }
    .input-group-list .input-group-item{
        margin-bottom: 10px;
    }
    .input-group-list .input-group-item .txt-common{
        margin-right: 10px;
    }
    !*edit-box-extend-end*!

    !*step-list-begin*!
    .main-step-list{
        min-height: 60px;
        margin-bottom: 10px;
        padding: 15px;
        background-color: #fff;
        text-align: center;
    }
    .main-step-list ul{
        height: 60px;
        display: inline-block;
    }
    .main-step-list ul li{
        float: left;
        color: #979797;
        font-weight: 400;
        text-align: center;
    }
    .main-step-list ul li .step{
        float: left;
    }
    .main-step-list ul li .step-circle{
        width: 37px;
        height: 37px;
        color: #ffffff;
        font-size: 14px;
        text-align: center;
        line-height: 36px;
        display: inline-block;
        margin-bottom: 10px;
        background: url("../../images/circle-01.png") top center no-repeat;
    }
    .main-step-list ul li.over .step-circle{
        background: url("../../images/circle-02.png") top center no-repeat;
    }
    !*.active{   background: url("../../images/circle-02.png") top center no-repeat;}*!
    .main-step-list ul li.over .step p{
        color: #007bc4;
    }
    .main-step-list ul li .step-dot{
        float: left;
        display: inline-block;
        width: 200px;
        height: 2px;
        background: url("../../images/dot-01.png") top center repeat-x;
        position: relative;
        top: 18px;
    }
    .main-step-list ul li.over .step-dot{
        background: url("../../images/dot-02.png") top center repeat-x;
    }
    !*step-list-end*!

    !*tag-list-begin*!
    .tag-list{
        display: block;
    }
    .tag-list .el-tag{
        float: left;

        width: 108px;
        height: 32px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;

        color: #333333;
        font-size: 12px;
        line-height: 30px;
        text-align: center;

        margin-right: 8px;
        margin-bottom: 15px;

        border:1px solid #007bc4;
        background-color: rgba(0,123,196,.1);

        position: relative;
        top: 0;
        left: 0;
        overflow: hidden;
    }
    .tag-list li .del{
        display: none;
        width: 14px;
        height: 14px;
        background: url("../../images/icon-del.png") top center no-repeat;
        position: absolute;
        bottom: 0;
        right: 0;
        cursor: pointer;
    }
    .tag-list li:hover .del{
        display: inline-block;
    }

    .tag-list-small{
        display: inline-block;
    }
    .tag-list-small li{
        float: left;
        min-width: 90px;
        height: 20px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        border:1px solid #007bc4;
        background-color: rgba(0,123,196,.1);

        line-height: 18px;
        text-align: center;
        margin-right: 20px;
        padding: 0 20px;
    }
    !*tag-list-end*!

    !*account-security-begin*!
    .account-security ul{
        padding: 0 15px;
        background-color: #fff;
    }
    .account-security ul li{
        height: 166px;
        border-bottom: 1px solid #f6f6f6;
    }
    .account-security ul li .left{
        width: 60%;
        float: left;
    }
    .account-security ul li .left .icon-success{
        width: 40px;
        height: 40px;
        display: inline-block;
        background: url("../../images/icon-right.png") top center no-repeat;

        float: left;
        margin: 60px 15px 60px 100px;
    }
    .account-security ul li .left h4{
        padding: 0;
        color: #333333;
        font-size: 14px;
        font-weight: 600;
        margin: 60px 0 12px;
    }
    .account-security ul li .left p{
        padding: 0;
        color: #333333;
        font-size: 12px;
    }
    .account-security ul li .right{
        width: 40%;
        float: right;
        text-align: right;
    }
    .account-security ul li .right button{
        margin-top: 60px;
        margin-right: 150px;
    }
    !*account-security-end*!

    !*role&subaccount-common-begin*!
    .role-power .modal-header{
        border-bottom: 0;
    }
    .role-power .modal-header h4{
        color: #333333;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
    }
    .role-power .modal-footer{
        clear: both;
        border-top: 0;
    }
    .role-power .power-list{
        clear: both;
        padding: 0 15px;
    }
    .role-power .power-list .list-left,.role-power .power-list .list-right{
        width: 260px;
        height: 400px;
        padding: 12px 0;
        border:1px solid #d6d6d6;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        overflow-y: auto;
    }
    .role-power .power-list .list-left{
        float: left;
    }
    .role-power .power-list .list-right{
        float: right;
    }
    .role-power .power-list ul li{
        height: 30px;
        padding: 0 15px;
        color: #595959;
        font-size: 14px;
        line-height: 30px;
        cursor: pointer;
    }
    .role-power .power-list ul li:hover{
        background-color: #fafafa;
    }
    .role-power .power-list ul li.current{
        background-color: #e3f1f9;
    }
    .role-power .power-list ul li input{
        width: 14px;
        height: 14px;
        margin-right: 6px;
        position: relative;
        top: 2px;
    }
    .role-power .power-list ul li span{
        color: #037dc5;
        font-size: 14px;
        line-height: 26px;
        float: right;
        margin-right: 10px;
    }
    .role-remark{
        width: 625px !important;
    }
    .roles-info{
        margin-bottom: 20px;
    }
    .roles-info label{
        margin-right: 20px;
    }
    .roles-info label input{
        margin-right: 10px;
        position: relative;
        top: 2px;
    }
    .roles-list{
        margin-bottom: 20px;
    }
    .roles-list ul li{
        width: 100%;
        min-height: 48px;
        background-color: #fbfbfb;
        margin-bottom: 10px;
    }
    .roles-list ul li h5{
        width: 80px;
        color: #333333;
        font-size: 14px;
        font-weight: 600;
        line-height: 46px;
        text-align: right;
        margin-right: 30px;
        display: inline-block;
    }
    .roles-list ul li span{
        color: #666666;
        margin-right: 20px;
    }
    .roles-list ul li span i{
        font-size: 12px;
        margin-right: 6px;
    }
    .roles-list-empty{
        width: 750px;
        height: 240px;
        border:1px solid #d6d6d6;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        margin-bottom: 20px;

        color: #b9b9b9;
        font-size: 12px;
        text-align: center;
        line-height: 240px;
    }
    .bottom{
        height: 100px;
        text-align: center;
        color: #afafaf;
        font-size: 10px;
        line-height: 100px;
    }
    .common{
        width:360px
    }

    !*role&subaccount-common-end*!
*/
</style>
