<template>
    <div class="main account-security">
        <div class="nav">
            <span>账号管理 > 账号安全</span>
        </div>
        <!--主体内容-->
        <ul>
            <li>
                <div class="left">
                    <span class="icon-success"></span>
                    <h4>修改手机号</h4>
                    <p>绑定手机号{{mobiles}}</p>
                </div>
                <div class="right">
                    <button type="button" class="btn-large" @click="bind_mobile">绑定手机号</button>
                </div>
            </li>
            <li>
                <div class="left">
                    <span class="icon-success"></span>
                    <h4>修改密码</h4>
                    <p>互联网账号存在被盗风险，建议您定期更改密码以保护账户安全</p>
                </div>
                <div class="right">
                    <button type="button" class="btn-large" @click="update_password">修改密码</button>
                </div>
            </li>
        </ul>
        <el-dialog title="验证手机号" :visible.sync="dialog_check">
            <div class="modal-body">
                <div class="modal-item">
                    <span class="item-left">已绑定手机：</span>
                    <span class="item-right">{{mobiles}}</span>
                </div>
                <div class="modal-item">
                    <span class="item-left"><span>*</span>验证码：</span>
                    <input type="text" value="" class="txt-common" placeholder="请输入验证码">
                    <button type="button" class="btn-common">获取验证码</button>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog_check = false">取消</el-button>
                <el-button type="primary" @click="check_code">验证</el-button>
            </div>
        </el-dialog>
        <el-dialog title="绑定手机号" :visible.sync="dialog_mobile">
            <div class="modal-body">
                <div class="modal-item">
                    <span class="item-left"><span>*</span>手机号：</span>
                    <input type="text" value="" class="txt-common" style="width: 277px;" placeholder="请输入新手机号码" v-model="dialog_mobile_info.mobile">
                </div>
                <div class="modal-item">
                    <span class="item-left"><span>*</span>验证码：</span>
                    <input type="text" value="" class="txt-common" placeholder="请输入验证码">
                    <button type="button" class="btn-common">获取验证码</button>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog_mobile = false">取消</el-button>
                <el-button type="primary" @click="save_mobile">绑定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改密码" :visible.sync="dialog_password">
            <div class="modal-body">
                <div class="modal-item">
                    <span class="item-left"><span>*</span>原密码：</span>
                    <input type="password" value="" class="txt-common" style="width: 255px;" placeholder="请输入原密码" v-model="dialog_password_info.password">
                </div>
                <div class="modal-item">
                    <span class="item-left"><span>*</span>新密码：</span>
                    <input type="password" value="" class="txt-common" style="width: 255px;" placeholder="请输入新密码" v-model="dialog_password_info.password_new">
                </div>
                <div class="modal-item">
                    <span class="item-left"><span>*</span>确认新密码：</span>
                    <input type="password" value="" class="txt-common" style="width: 255px;" placeholder="请确认新密码" v-model="dialog_password_info.password_news">
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog_password= false">取消</el-button>
                <el-button type="primary" @click="save_password">修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {dictionary} from '@/api/login'
    import request from '@/untils/request'
    import md5 from 'js-md5'

    export default {
        data(){
            return{
                mobile:"",
                mobiles:"",
                dialog_type:0,//0表示绑定手机号，1表示修改密码
                dialog_check:false,
                dialog_mobile:false,
                dialog_password:false,
                dialog_mobile_info:{
                    mobile:""
                },
                dialog_password_info:{
                    password:"",
                    password_new:"",
                    password_news:""
                }
            }
        },
        created(){
            this.init();//初始化企业信息
        },
        methods:{
            init(){
                return request({
                    method:'get',
                    url:'mai-meng-cloud/company',
                }).then((res)=>{
                    if(res.data.code=="200"){
                        this.mobile=res.data.data.mobile;
                        this.mobiles=res.data.data.mobile.substring(0,3)+"****"+res.data.data.mobile.substring(7,11);
                    }else{
                        this.$message.error('数据初始化失败，请刷新重试');
                    }
                }).catch((error=>{
                    this.$message.error('数据初始化失败，请刷新重试');
                }));
            },
            bind_mobile(){
                this.dialog_type=0;
                this.dialog_check=true;
            },
            update_password(){
                this.dialog_type=1;
                this.dialog_check=true;
            },
            check_code(){
                this.dialog_check=false;

                if(this.dialog_type==0){
                    this.dialog_mobile_info.mobile="";
                    this.dialog_mobile=true;
                }else{
                    this.dialog_password_info.password="";
                    this.dialog_password_info.password_new="";
                    this.dialog_password_info.password_news="";
                    this.dialog_password=true;
                }
            },
            save_mobile(){
                //数据校验
                let validate=true;
                if(this.dialog_mobile_info.mobile==""){
                    validate=false;
                    this.$message({
                        type: 'warning',
                        message: '请输入新手机号码!'
                    });
                }

                //数据提交
                if(validate){
                    return request({
                        method:'put',
                        url:'/mai-meng-cloud/company/mobile',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        params:{
                            mobile:this.dialog_mobile_info.mobile
                        }
                    }).then((res)=>{
                        if(res.data.code=="200"){
                            this.init();
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            });
                        }else{
                            this.$message.error('操作失败');
                        }
                        this.dialog_mobile=false;
                    }).catch((error=>{
                        this.$message.error('操作失败');
                    }));
                }
            },
            save_password(){
                //数据校验
                let validate=true;
                if(this.dialog_password_info.password==""){
                    validate=false;
                    this.$message({
                        type: 'warning',
                        message: '请输入原密码!'
                    });
                }else if(this.dialog_password_info.password_new==""){
                    validate=false;
                    this.$message({
                        type: 'warning',
                        message: '请输入新密码!'
                    });
                }else if(this.dialog_password_info.password_new!=this.dialog_password_info.password_news){
                    validate=false;
                    this.$message({
                        type: 'warning',
                        message: '两次输入的新密码不一致!'
                    });
                }

                //数据提交
                if(validate){
                    return request({
                        method:'put',
                        url:'/mai-meng-cloud/user/password',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        params:{
                            password:md5(this.dialog_password_info.password_new),
                            oldPassword:md5(this.dialog_password_info.password),
                        }
                    }).then((res)=>{
                        if(res.data.code=="200"){
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            });
                        }else{
                            this.$message.error(res.data.message);
                        }
                        this.dialog_password=false;
                    }).catch((error=>{
                        this.$message.error('操作失败');
                    }));
                }
            }
        }
    }
</script>

<style>
    @import "../../style/main-common.css";

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
        font-size: 16px;
        font-weight: 600;
        margin: 60px 0 12px;
    }
    .account-security ul li .left p{
        padding: 0;
        color: #333333;
        font-size: 14px;
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
    .account-security .modal-body .modal-item{
        height: 60px;
        line-height: 60px;
    }
    .account-security .modal-body .modal-item span{
        color: #666666;
        font-size: 12px;
    }
    .account-security .modal-body .modal-item .item-left{
        display: inline-block;
        width: 200px;
        text-align: right;
        margin-right: 10px;
    }
    .account-security .modal-body .modal-item .item-left span{
        color: #ff0000;
        margin-right: 6px;
        position: relative;
        top: 2px;
    }
    .account-security .modal-body .modal-item .txt-common{
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
    .account-security .modal-body .modal-item .btn-common{
        width: 120px;
        height: 38px;
        background-color: #007bc4;
        color: #ffffff;
        font-size: 14px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        border: 1px solid #007bc4;
        outline: none;
        line-height: 22px;
        text-align: center;
        cursor: pointer;
        position: relative;
        top: 2px;
    }
    .account-security .dialog-footer{
        text-align: center;
    }
    .account-security .el-button--primary{
        background-color: #007bc4;
        border:1px solid #007bc4;
    }
    .account-security .el-button--primary:hover{
        background-color: #046dac;
        border:1px solid #046dac;
    }
    .account-security .el-button--default:hover{
        color: #1f2d3d;
        background-color: #eaeaea;
        border:1px solid #c4c4c4
    }
</style>
