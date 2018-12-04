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
                            <select class="txt-common" id="vocation">
                                <template v-if="company.vocation==''">
                                    <option value="0">请选择行业</option>
                                    <option v-bind:value="item.id" v-for="item in vocation">{{item.name}}</option>
                                </template>
                                <template v-else>
                                    <option v-bind:value="item.id" v-for="item in vocation" v-if="item.id==company.vocation" selected>{{item.name}}</option>
                                    <option v-bind:value="item.id" v-for="item in vocation" v-if="item.id!=company.vocation">{{item.name}}</option>
                                </template>
                            </select>
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black" style="vertical-align: top;position: relative;top:14px;"><span>*</span>品牌名称</span>
                        <span class="item-right">
                            <div class="input-group-list" id="brand-list">
                                <div class="input-group-item" v-for="item in company.brands">
                                    <input type="text" v-bind:value="item" class="txt-common"style="width: 320px;"><button type="button" class="btn-icon btn-del-item" @click="del_brand"></button>
                                </div>
                                <div class="input-group-item">
                                    <input type="text" value="" class="txt-common" placeholder="请填写品牌" style="width: 320px;"><button type="button" class="btn-icon btn-add-item" @click="add_brand"></button>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black" style="vertical-align:top;"><span>*</span>产品介绍</span>
                        <span class="item-right">
                            <el-upload
                                class="upload-demo"
                                ref="upload"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                :auto-upload="false">
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
    import {dictionary} from '@/api/login'
    import {mapActions, mapState,mapMutations} from 'vuex'
    import axios from 'axios'
    import request from '@/untils/request'

    export default {
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
                vocation:[]//行业信息集合
            }
        },
        created(){
            this.init_vocation();//初始化行业信息
            this.init();//初始化企业数据
        },
        methods:{
            init(){
                debugger
                return request({
                    method:'get',
                    url:'mai-meng-cloud/company',
                }).then((res)=>{
                    debugger
                    //console.log(res.data);
                    if(res.data.code=="200"){
                        this.company.name=res.data.data.name;
                        this.company.homePage=res.data.data.homePage;
                        this.company.address=res.data.data.address;
                        this.company.email=res.data.data.email;
                        this.company.vocation=res.data.data.vocation;
                        this.company.brands=res.data.data.brands;
                        this.company.docs=res.data.data.docs;
                    }else{
                        console.log(res.data);
                    }
                }).catch((error=>{
                    debugger;
                    console.log(error);
                }));
            },
            init_vocation(){
                debugger
                return request({
                    method:'get',
                    url:'mai-meng-cloud/dict',
                }).then((res)=>{
                    debugger
                    //console.log(res.data);
                    if(res.data.code=="200"){
                        for(let i=0;i<res.data.data.length;i++){
                            if(res.data.data[i].groupId=="8"){
                                let obj={
                                    "value":res.data.data[i].dKey,
                                    "name":res.data.data[i].dValue
                                }
                                this.vocation.push(obj);
                            }
                        }
                    }
                }).catch((error=>{
                    debugger;
                    console.log(error);
                }));
            },
            add_brand(e){
                if(e.target.previousSibling.value==""){
                    this.$message({
                        type: 'warning',
                        message: '请填写品牌!'
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
                debugger

                this.company.vocation=document.getElementById("vocation").value;
                this.company.docs=["rise.pdf"];

                return request({
                    method:'put',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    transformRequest: [function(data) {
                        data = JSON.stringify(data)
                        return data
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
                    debugger;
                    console.log(res.data);
                    if(res.data.code=="200"){
                        this.$message({
                            type: 'success',
                            message: '认证信息提交成功'
                        });
                    }else{
                        console.log(res.data);
                        this.$message.error('数据提交失败');
                    }
                }).catch((error=>{
                    debugger;
                    console.log(error);
                    this.$message.error('数据提交失败');
                }));
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
    .certification .btn-submit{
        margin: 30px 0 30px 200px;
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
</style>
