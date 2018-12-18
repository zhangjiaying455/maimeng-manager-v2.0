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
                                    :on-change="handleChange"
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
                                <ul>
                                  <li v-for="item in fileList">{{item.name}}</li>
                                </ul>
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
    import {mapActions, mapState,mapMutations} from 'vuex'
    import request from '@/untils/request'
    import moment from 'moment'
    import OSS from 'ali-oss'
    export default{
        inject:['reload'],//注入reload  调用this.reload实现刷新
        data(){
            return{
                params:'',
                desc:'',//标签描述
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
                  docs:[],//上传的url
                  },
                  n_docs:[],
                  brandEntityId:'',
                  demandId:'',
                  threadTemplateId:'',
                  operationValue:'',//运营模式Value值
                  businessValue:'', //业务分类Value值
                  priceLevelValue:'',//课价分类Value值
                  areaValue:'',//目标区域Value值
                  fileList:[],//产品介绍数组
                  first_step:true,//业务需求表单
                  second_step:false,//品牌信息表单
                  third_step:false,//线索模板表单
                  four_step:false,//确认信息表单
                  dynamicTags:[],//自定义标签数组
                  inputVisible: true,
                  inputValue: '',//自定义标签
                  /* operationDkey:'',
                  businessDkey:'',
                  priceleveDkey:'',
                  regionDkey:'',*/
                  operationData:[],//运营模式数据
                  businessData:[],//业务分类数据
                  priceleveData:[],//课价水平数据
                  regionData:[],//目标区域数据
                  cluesData:[],//线索模板数据
                  brands:[],//品牌数据数组
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
                },//日期组件
             }
        },
        created(){
            this.getDictionary()
            this.getBrand()
            this.editor();

        },
        methods:{
            //这个sTime是在data中声明的，也就是v-model绑定的值
            getSbeginTime(val){
                this.newRole.beginTime=val;
            },
            //这个sTime是在data中声明的，也就是v-model绑定的值
            getSendTime(val){
                this.newRole.endTime=val;
            },
            /* submitUpload() {
                this.$refs.upload.submit();
            },*/
            //文件删除
            handleRemove(file, fileList) {
                debugger
                console.log(fileList);
                console.log("eui-del-file-list")
                let _this=this;
                // let url="";
                //this.fileList=fileList
                // this.fileList = fileList.slice(-3);
                let  client = new OSS({
                    accessKeyId:'LTAIUEAyF5F1rtjD',
                    accessKeySecret:'6E4HR2AI8Bwd9DlfcjcwjksjFfpkzD',
                    region: 'oss-cn-zhangjiakou', // oss地区
                    bucket: 'cloud-mm'
                })
                const f =file.raw
                const s=file.name
                client.delete(s,f).then(function (r1) {
                    debugger
                    console.log(r1)
                    if (r1.res.status === 204) {
                        /*  let b=[]*/
                        console.log('删除了')
                        _this.n_docs.forEach((item,index)=>{
                            debugger
                            console.log(item.uid)
                            if(item.uid == file.uid){
                                _this.n_docs.splice(index,1)
                                console.log(_this.n_docs)
                            }
                        })

                    }
                }).catch(function (err) {
                    debugger
                    console.log(err)
                });
            },
            //点击文件列表中已上传的文件时的钩子
            handlePreview(file) {
            },
            /*  handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },*/
            //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            handleChange(file,fileList){
                let _this = this;
             /*   let testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
                const extension = testmsg === 'doc'
                const extension2 = testmsg === 'pdf'
                const extension3 = testmsg === 'ppt'
                const isLt100M = file.size / 1024 / 1024 < 100;*/
               /* if(!extension &&  !extension2 && !extension3) {
                    debugger
                    this.$message({
                        message: '上传文件只能是 doc、pdf、ppt格式!',
                        type: 'warning'
                    });
                    _this.fileList=_this.n_docs
                    console.log(_this.fileList)
                    this.reload()
                }else if(!isLt100M){
                    debugger
                    this.$message.warning('上传头像图片大小不能超过 100MB!');
                    _this.fileList=_this.n_docs
                    console.log(_this.fileList)
                    this.reload()
                }else {*/
                    let url = "";
                    debugger
                    let client = new OSS({
                        accessKeyId: 'LTAIUEAyF5F1rtjD',
                        accessKeySecret: '6E4HR2AI8Bwd9DlfcjcwjksjFfpkzD',
                        region: 'oss-cn-zhangjiakou', // oss地区
                        bucket: 'cloud-mm'
                    })
                    const f = file.raw
                    const s = file.name
                    // const storeAs = 'abcdf'
                    client.put(s, f).then(function (r1) {
                        debugger
                        if (r1.res.status === 200) {
                            debugger
                            console.log('上传了')
                            url = r1.url;
                            _this.newRole.docs.push(url);
                            _this.n_docs.push({
                                name: file.name,
                                uid: file.uid,
                                url: url
                            })
                            console.log(_this.n_docs)

                        }
                    }).catch(function (err) {
                        debugger
                        console.log(err)
                    });
               /* }*/
            },
            //点击下一步进入品牌信息
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
                 debugger
                    let rowId=this.$route.query.rowId
                    return request({
                        methods:'get',
                        url:'/mai-meng-cloud/demand/'+rowId,
                        headers: {
                           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                }).then((res)=>{
                     this.brandEntityId=res.data.data.brandEntity.id
                     this.demandId=res.data.data.demand.id
                     this.threadTemplateId=res.data.data.threadTemplate.id

                    let demand=res.data.data.demand
                    let docsArr=demand.docs;
                    //console.log(docsArr)
                        let newDocs=[]
                     for(let i=0;i<docsArr.length;i++){
                         this.newRole.docs.push(docsArr[i])
                         let docs=docsArr[i].split('/')

                         this.fileList.push({
                             name:docs[3],
                             url:docsArr[i]
                         })
                     }
                     this.n_docs=this.fileList;
                    //需求名称
                    this.newRole.demandName=demand.name;
                    //开始时间
                    this.newRole.beginTime=demand.beginTime
                    //结束时间
                    this.newRole.endTime=demand.endTime
                        //判断运营模式
                        this.newRole.operationMode=demand.operationMode
                        if(demand.operationMode==1){
                            this.operationValue='线上'
                        }else{
                            this.operationValue='线下'
                        }

                        //判断业务分类
                        this.newRole.businessClassification=demand.businessClassification
                        if(demand.businessClassification==1){
                            this.businessValue='幼儿早教'
                        }else if (demand.businessClassification==2){
                            this.businessValue='少儿英语'
                        }else if(demand.businessClassification==3){
                            this.businessValue='成人英语'
                        }else{
                            this.businessValue='少儿编程'
                        }
                        //分割年龄范围
                        let ageRange=demand.ageRange.split(',')
                        for(var i=0;i<ageRange.length;i++){
                            this.newRole.beginAge=ageRange[0]
                            this.newRole.endAge=ageRange[1]
                        }
                        //判断课价水平
                        this.newRole.priceLevel=demand.priceLevel
                        if(demand.priceLevel==1){
                            this.priceLevelValue='低'
                        }else if (demand.priceLevel==2){
                            this.priceLevelValue='普通'
                        }else{
                            this.priceLevelValue='高'
                        }

                        //判断目标区域
                        this.newRole.area=demand.area
                        if(demand.area==1){
                            this.areaValue='一线城市'
                        }else if (demand.area==2){
                            this.areaValue='二线城市'
                        }else{
                            this.areaValue='三线城市'
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
               })
            },
            //点击上一步进入业务需求
            checkFirst(){
                let arr = document.getElementsByClassName("tab_item");
                this.first_step=true
                this.second_step=false
                arr[1].classList.remove("over")
            },
            //点击下一步进入线索模板
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
            //点击下一步进入确认信息
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
            //点击上一步进入品牌信息
            checkUpper(){
                  let arr = document.getElementsByClassName("tab_item");
                    this.second_step=true,
                    this.third_step=false
                    arr[2].classList.remove("over")

            },
            //点击上一步进入线索模板
            checkStory(){
                  let arr = document.getElementsByClassName("tab_item");
                   this.third_step=true,
                   this.four_step=false
                  arr[3].classList.remove("over")
            },
            //更改运营模式
            changeOperation(event){
                this.operationMode = event; //获取运营模式的ID，即option对应的ID值
                if(this.operationMode==1){
                    this.operationValue='线上'
                }else{
                    this.operationValue='线下'
                }
            },
            //更改业务分类
            changeClass(event){
                this.businessClassification = event;
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
            //更改课价水平
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
            //更改目标区域
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
            //更新需求确定
            confirm(){
                this.newRole.docs=[]
                this.n_docs.forEach((item,index)=>{
                    this.newRole.docs.push(item.url)
                })
                debugger
                this.$refs.newRole.validate(valid => {
                    if (valid) {
                        let ageRange=this.newRole.beginAge+","+this.newRole.endAge
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

                                "threadTemplate":{ 'id':this.threadTemplateId,"userTags":this.dynamicTags,},
                                "brand":{
                                    'id':this.brandEntityId,
                                    "brand":this.newRole.brand,
                                    'contactPerson':this.newRole.contactPerson,
                                    'mobile':this.newRole.mobile,
                                    },
                                "demand":{
                                    'id':this.demandId,
                                    'name':this.newRole.demandName,
                                    'beginTime':this.newRole.beginTime,
                                    'endTime':this.newRole.endTime,
                                    'operationMode':this.operationMode,
                                    'businessClassification':this.businessClassification,
                                    'ageRange':ageRange,
                                    'priceLevel':this.priceLevel,
                                    'area':this.area,
                                    'docs':this.newRole.docs
                                },
                            }
                        }).then((res)=>{
                            debugger
                            console.log(res)
                            this.$message({
                                type: 'success',
                                message: '更新成功!'
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
            //点击删除自定义标签
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            /* showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },*/
            //保存自定义标签
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
                    //取出运营模式数据  转为JSON数组
                    let oprations=sessionStorage.getItem('operationData')
                    this.operationData=JSON.parse(oprations)

                    //console.log(this.operationData);
                    //取出业务分类数据  转为JSON数组
                    let business=sessionStorage.getItem('businessData')
                    this.businessData=JSON.parse(business)

                    //取出课价水平数据  转为JSON数组
                    let priceleve=sessionStorage.getItem('priceleveData')
                    this.priceleveData=JSON.parse(priceleve)

                    //取出目标区域数据  转为JSON数组
                    let region=sessionStorage.getItem('regionData')
                    this.regionData=JSON.parse(region)

                    //取出线索模板数据  转为JSON数组
                    let clues=sessionStorage.getItem('cluesData')
                    this.cluesData=JSON.parse(clues)
                }).catch(()=>{

                })
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
                    this.brands=brand;
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
