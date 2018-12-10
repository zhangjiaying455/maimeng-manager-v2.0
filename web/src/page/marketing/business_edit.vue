<template>
    <div class="main business">
        <div class="nav">
            <span>营销管理 > 业务需求</span>
        </div>
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
                                        <el-select class="common"  v-model="newRole.operationMode"   @change="changeOperation($event)">
                                            <el-option  :label="item.dValue"    :value="item.dKey"  v-for="item in operationData"  :key="item.dKey">{{item.dValue}}</el-option>
                                        </el-select>
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left font-black"><span>*</span>业务分类</span>
                            <span class="item-right">
                                        <el-select class="common" v-model="newRole.businessClassification"  @change="changeClass($event)">
                                            <el-option :label="item.dValue" :value="item.dKey" v-for="item in businessData" :key="item.dKey">{{item.dValue}}</el-option>
                                        </el-select>
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left font-black"><span>*</span>年龄范围</span>
                            <span class="item-right">
                                        <input type="text" class="txt-common" value="" style="width: 159px !important;" v-model="newRole.beginAge"> - <input type="text" class="txt-common" value="" style="width: 159px !important;" v-model="newRole.endAge">
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left font-black"><span>*</span>课价水平</span>
                            <span class="item-right">
                                        <el-select class="common" v-model="newRole.priceLevel"  @change="changeAcademic($event)">
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
                                            <el-option :value="item.brandName" v-for="item in brand" :key="item.dKey">{{item.brandName}}</el-option>
                                        </el-select>
                                    </span>
                        </div>
                        <div class="info-item">
                            <span class="item-left font-black"><span>*</span>业务负责人</span>
                            <span class="item-right">
                                        <input type="text" value="" class="txt-common" v-model="newRole.contactPerson">
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
                        <span class="item-left font-black" :title="decs" style="vertical-align: top">标签描述</span>
                        <span class="item-right">
                                    <textarea class="txt-area" v-model="decs" id="tag-remark" rows="5" cols="50" placeholder="请输入标签描述，标签描述不能超过35个字"></textarea>
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
    import axios from 'axios'
    import request from '@/untils/request'
    export default{
        inject:['reload'],
        data(){
            return{
                params:'',
                decs:'',
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
                  // systemTags:'',//	系统标签
                  userTags:[],//自定义标签
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
                dynamicTags: [],
                inputVisible: true,
                inputValue: '',
                operationData:[],//运营模式数据
                businessData:[],//业务分类数据
                priceleveData:[],//课价水平数据
                regionData:[],//目标区域数据
                cluesData:[],//线索模板数据
                brand:[],
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
            },
            handlePreview(file) {
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
                if(this.dynamicTags == '') {
                    this.$message.error("请输入自定义标签")
                }else {
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
                this.operationMode = event; //获取运营模式的ID，即option对应的ID值
                if(this.operationMode==1){
                    this.operationValue='线上'
                }else{
                    this.operationValue='线下'
                }
            },
            changeClass(event){
                this.businessClassification = event;
                if(this.businessClassification==1){
                    this.businessValue='幼儿早教'
                }else if (this.businessClassification==2){
                    this.businessValue='少儿英语'
                }else if(this.businessClassification==3){
                    this.businessValue='成人英语'
                }else{
                    this.operationValue='少儿编程'
                }
            },
            changeAcademic(event){
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
                this.area = event;
                if(this.area==1){
                    this. areaValue='一线城市'
                }else if (this.area==2){
                    this. areaValue='二线城市'
                }else{
                    this. areaValue='三线城市'
                }
            },

            //新建角色确定
            confirm(){
                this.$refs.newRole.validate(valid => {
                    if (valid) {
                        let beginAge=this.newRole.beginAge
                        let endAge=this.newRole.endAge
                        let ageRange=this.newRole.beginAge+","+this.newRole.endAge

                        return request({
                           method:'post',
                           headers: {
                               'Content-Type': 'application/json; charset=UTF-8'
                           },
                            transformRequest: [function(data) {
                                data = JSON.stringify(data)
                                return data
                            }],
                           url:'/mai-meng-cloud/demand',
                           data:{
                               "threadTemplate":{"userTags":this.dynamicTags},
                               "brand":{"brand":this.newRole.brand,
                                   'contactPerson':this.newRole.contactPerson,
                                   'mobile':this.newRole.mobile,},
                               "demand":{
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
                            this.$message({
                                type: 'success',
                                message: '创建成功!'
                            });
                            this.$router.push({
                                path:'/business'
                            })
                            this.reload();
                       }).catch((error)=>{
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
                return request({
                    method:'get',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    url:'mai-meng-cloud/company/brand',
                }).then((res)=>{
                    let brand=[]
                    // brand.push({brandName:res.da})
                        let bra=res.data.data
                        for (var i=0;i<bra.length;i++){
                            brand.push({
                                brandName:bra[i]
                            })
                        }
                        let brands=brand;
                        let brandData=JSON.stringify(brands)
                        sessionStorage.setItem('brandData',brandData)
                        let brad=sessionStorage.getItem('brandData')
                        let brandDatas=JSON.parse(brad)
                        this.brand=brandDatas
                }).catch((error=>{
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
</style>
