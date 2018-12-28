<template>
    <div class="main certification">
        <div class="nav">
            <span>账号管理 > 企业认证</span>
        </div>
        <div class="main-edit">
            <div class="edit-box">
                <h6><span></span>企业认证信息</h6>
                <div class="box-info">
                    <div class="info-item">
                        <span class="item-left font-black"><span>*</span>公司全称</span>
                        <span class="item-right">
                            <input type="text" value="" class="txt-common" placeholder="请填写公司全称" v-model="company.name">
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black">公司网址</span>
                        <span class="item-right">
                            <input type="text" value="" class="txt-common" placeholder="请填写公司网址" v-model="company.homePage">
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black">办公地址</span>
                        <span class="item-right">
                            <input type="text" value="" class="txt-common" placeholder="请填写公司地址" v-model="company.address">
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black">负责人邮箱</span>
                        <span class="item-right">
                            <input type="text" value="" class="txt-common" placeholder="请填写负责人邮箱" v-model="company.email">
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black"><span>*</span>所属行业</span>
                        <span class="item-right">
                            <select class="txt-common" @change="select_vocation">
                                <template><!--v-if="company.vocation==''"-->
                                    <option value="">请选择行业</option>
                                    <option v-bind:value="item.id" v-for="item in vocation">{{item.dValue}}</option>
                                </template>
                               <!-- <template v-else v-for="item in vocation">
                                    <option v-bind:value="item.id" v-if="item.id==company.vocation" selected>{{item.dDescribe}}</option>
                                    <option v-bind:value="item.id" v-else>{{item.dDescribe}}</option>
                                </template>-->
                            </select>
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black" style="vertical-align: top;position: relative;top:14px;"><span>*</span>品牌名称</span>
                        <span class="item-right">
                            <div class="input-group-list" id="brand-list">
                                <div class="input-group-item" v-for="item in company.brands">
                                    <input type="text" v-bind:value="item" class="txt-common txt-disabled"style="width: 320px;" disabled><button type="button" class="btn-icon btn-del-item" @click="del_brand"></button>
                                </div>
                                <div class="input-group-item">
                                    <input type="text" value="" class="txt-common" placeholder="请填写品牌" style="width: 320px;"><button type="button" class="btn-icon btn-add-item" @click="add_brand"></button>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black" style="vertical-align:top;"><span>*</span>认证材料</span>
                        <span class="item-right">
                            <el-upload
                                class="upload-demo"
                                ref="upload"
                                action=""
                                :show-file-list="true"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                :auto-upload="true"
                                :before-upload="beforeUpload"
                                :on-progress="handleChange">
                                <el-button slot="trigger" size="medium" type="warning" style="width: 200px;">上传附件材料</el-button>
                                      <p class="remark-info">* 营业执照、税务登记证、组织机构代码证三证合一</p>
                                      <p class="remark-info">* 必须为清晰 、完整的彩色原件扫描件或数码照</p>
                                      <p class="remark-info">* 仅支持.jpg/.bmp/.png的图片格式，图片大小不超过3M</p>
                                      <p class="remark-info">* 必须在有效期内且年检章齐全（当年成立的公司可无年检章）</p>
                                      <p class="remark-info">* 必须为中国大陆工商局颁发</p>
                            </el-upload>
                        </span>
                    </div>
                </div>
                <button type="button" class="btn-submit" @click="save">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState,mapMutations} from 'vuex'
    import {dictionary} from '@/api/login'
    import request from '@/untils/request'
    import OSS from 'ali-oss'
    export default {
        inject:['reload'],
        data(){
            return{
                company:{
                    name:"",//公司全称
                    homePage:"",//公司网址
                    address:"",//办公地址
                    email:"",//负责人邮箱
                    vocation:"",//所属行业 dic-group=8
                    brands:[],//品牌名称
                    docs:[]//产品介绍-上传文件
                },
                n_docs:[],
                vocation:[],//行业信息集合
                fileList:[],
            }
        },
        created(){
            this.init_vocation();//初始化行业信息
            this.init();//初始化企业认证信息
        },
        methods:{
            init(){
                return request({
                    method:'get',
                    url:'mai-meng-cloud/company',
                }).then((res)=>{
                    if(res.data.code=="200"){
                        this.company.name=res.data.data.name;
                        this.company.homePage=res.data.data.homePage;
                        this.company.address=res.data.data.address;
                        this.company.email=res.data.data.email;
                        this.company.vocation=res.data.data.vocation==null?"":res.data.data.vocation;
                        this.company.brands=res.data.data.brands;
                        // this.company.docs=res.data.data.docs;
                    }else{
                        this.$message.error('数据初始化失败，请刷新重试');
                    }
                }).catch((error=>{
                    this.$message.error('数据初始化失败，请刷新重试');
                }));
            },
            init_vocation(){
                const res=this.$store.dispatch("dictionary")
                res.then(()=>{
                    //取出所属行业数据  转为JSON数组
                    let vocations=sessionStorage.getItem('vocation')
                    this.vocation=JSON.parse(vocations)
                }).catch(()=>{
                })
            },
            select_vocation(e){
                this.company.vocation=e.target.value;
            },
            add_brand(e){
                if(e.target.previousSibling.value==""){
                    this.$message({
                        type: 'warning',
                        message: '请填写品牌信息!'
                    });
                }else{
                    this.company.brands.push(e.target.previousSibling.value);
                    e.target.previousSibling.value="";
                }
            },
            del_brand(e){
                let list=this.company.brands;
                this.company.brands=[];

                for(let i=0;i<list.length;i++){
                    if(list[i]!=e.target.previousSibling.value){
                        this.company.brands.push(list[i]);
                    }
                }
            },
            save(){
                //数据
               /* this.company.docs=["rise.jpg"];*/

                //数据校验
                let validate=true;

                if(this.company.name==""){
                    validate=false;
                    this.$message({
                        type: 'warning',
                        message: '请填写公司全称!'
                    });
                }else if(this.company.vocation==""){
                    validate=false;
                    this.$message({
                        type: 'warning',
                        message: '请选择行业信息!'
                    });
                }else if(this.company.brands.length<=0){
                    validate=false;
                    this.$message({
                        type: 'warning',
                        message: '请填写品牌信息!'
                    });
                }else if(this.company.docs.length<=0){
                    validate=false;
                    this.$message({
                        type: 'warning',
                        message: '请上传认证材料!'
                    });
                }

                //数据提交
                if(validate){
                    this.company.docs=[]
                    this.n_docs.forEach((item,index)=>{
                        this.company.docs.push(item.url)
                    })
                    return request({
                        method:'put',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8'
                        },
                        transformRequest: [function(data) {
                            data = JSON.stringify(data);
                            return data;
                        }],
                        url:'/mai-meng-cloud/company',
                        data:{
                            "name":this.company.name,
                            "homePage":this.company.homePage,
                            "address":this.company.address,
                            "email":this.company.email,
                            "vocation":this.company.vocation,
                            "brands":this.company.brands,
                            "docs":this.company.docs
                        }
                    }).then((res)=>{
                        if(res.data.code=="200"){
                            this.$message({
                                type: 'success',
                                message: '认证信息提交成功'
                            });
                        }else{
                            this.$message.error('数据提交失败');
                        }
                    }).catch((error=>{
                        this.$message.error('数据提交失败');
                    }));
                }
            },
            //文件删除
            handleRemove(file, fileList) {
                let _this=this;
                // let url="";
                this.fileList=fileList
                fileList.forEach((item,index)=>{
                    return index
                })
                let  client = new OSS({
                    accessKeyId:'LTAIUEAyF5F1rtjD',
                    accessKeySecret:'6E4HR2AI8Bwd9DlfcjcwjksjFfpkzD',
                    region: 'oss-cn-zhangjiakou', // oss地区
                    bucket: 'cloud-mm'
                })
                const f =file.raw
                const s=file.name
                client.delete(s,f).then(function (r1) {
                    if (r1.res.status === 204) {
                        _this.n_docs.forEach((item,index)=>{
                            if(item.uid == file.uid){
                                _this.n_docs.splice(index,1)
                            }
                        })

                    }

                }).catch(function (err) {

                });
            },
           /* handlePreview(file) {
            },*/
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            beforeUpload(file){
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png'
                const isBMP = file.type === 'image/bmp'
                const isLt2M = file.size / 1024 / 1024 < 100;

                if (!isJPG && !isPNG && !isBMP) {
                    this.$message.error('上传头像图片只能是 JPG PNG BMP格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 100MB!');
                }
                return isJPG || isPNG || isBMP && isLt2M;
            },
            //文件上传
            handleChange(event,file,fileList) {
                let _this=this;
                    let url="";
                    this.fileList=fileList
                    // this.fileList = fileList.slice(-3);
                    let  client = new OSS({
                        accessKeyId:'LTAIUEAyF5F1rtjD',
                        accessKeySecret:'6E4HR2AI8Bwd9DlfcjcwjksjFfpkzD',
                        region: 'oss-cn-zhangjiakou', // oss地区
                        bucket: 'cloud-mm'
                    })
                    const f =file.raw
                    const s=file.name
                    client.put(s,f).then(function (r1) {
                        if (r1.res.status === 200) {
                            let b=[]
                            url=r1.url;
                            _this.company.docs.push(url);
                            _this.n_docs.push({
                                name:file.name,
                                uid:file.uid,
                                url:url
                            })
                            _this.fileList=_this.n_docs
                        }
                    }).catch(function (err) {

                    });
                }

              }

    }
</script>

<style>
    @import "../../style/main-common.css";
    .certification select.txt-common{
        height: 34px;
        width: 372px !important;
    }
    .certification .txt-common:disabled{
        cursor: no-drop;
        background: transparent !important;
    }
    .certification .input-group-list .input-group-item{
        margin-bottom: 10px;
    }
    .certification .input-group-list .input-group-item .txt-common{
        margin-right: 10px;
    }
    .certification .remark-info{
        color: #999999;
        font-size: 12px;
        line-height: 12px;
        margin-top: 12px;
    }
    .certification .btn-icon{
        width: 32px;
        height: 32px;
        background-color: #fff;
        border:1px solid #d6d6d6;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        text-align: center;
        line-height: 26px;
        cursor: pointer;
        position: relative;
        top: 8px;
    }
    .certification .btn-add-item{
        background: url("../../images/icon/add.png") center center no-repeat;
    }
    .certification .btn-add-item:hover{
        border-color: #007bc4;
        background: #007bc4 url("../../images/icon/add-on.png") center center no-repeat;
    }
    .certification .btn-del-item{
        background: url("../../images/icon/del.png") center center no-repeat;
    }
    .certification .btn-del-item:hover{
        border-color: #007bc4;
        background: #007bc4 url("../../images/icon/del-on.png") center center no-repeat;
    }
    .certification .btn-submit{
        margin: 30px 0 30px 200px;
    }
</style>
