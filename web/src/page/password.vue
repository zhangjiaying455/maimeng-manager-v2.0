<template>
    <div class="container password">
        <div class="page-top">
            <div class="top-center">
                <img src="../images/login/login-title.png">
                <div class="top-right">
                    <a href="http://www.maimenggroup.com/" target="_blank">麦盟官网</a> | <a href="#">帮助中心</a>
                </div>
            </div>
        </div>
        <div class="page-content">
            <div class="content-center">
                <div class="content-title">
                    <p>账号安全</p>
                    <a href="javascript:void(0)" @click="login">返回登录</a>
                </div>
                <div class="content-box">
                    <ul class="menu-list">
                        <li class="tab_item over">验证手机号</li>
                        <li class="tab_item">修改密码</li>
                        <li class="tab_item">找回密码</li>
                    </ul>
                    <el-form class="form-box" id="step-1" v-show="first_step" :model="amendPassForm"  status-icon  ref="amendPassForm">
                        <el-form-item class="form-input" prop="phone">
                            <span class="input-left">手机号码</span>
                            <el-input type="number" v-model="amendPassForm.phone" placeholder="请输入您的手机号码"></el-input>
                        </el-form-item>
                        <el-form-item class="form-input" prop="code">
                            <span class="input-left">验证码</span>
                            <el-input  v-model="amendPassForm.code"  placeholder="请输入短信验证码"></el-input>
                            <button type="button" class="btn-small  codes">获取验证码</button>
                        </el-form-item>
                        <div class="form-btn">
                            <button type="button" class="btn-common" id="btn-check-info" @click="checkFirst">下一步</button>
                        </div>
                    </el-form>
                    <el-form class="form-box" id="step-2" v-show="second_step" :model="amendPassForm"  status-icon  ref="amendPassForm">
                        <el-form-item class="form-input" prop="password">
                            <span class="input-left">设置密码</span>
                            <el-input type="password" v-model="amendPassForm.password" placeholder="设置密码"></el-input>
                        </el-form-item>
                        <el-form-item class="form-input" prop="newPassword">
                            <span class="input-left">确认密码</span>
                            <el-input type="password" v-model="amendPassForm.newPassword" placeholder="确认密码"></el-input>
                        </el-form-item>
                        <div class="form-btn">
                            <button type="button" class="btn-common" id="btn-set-password" @click="checkSecond('amendPassForm')">下一步</button>
                        </div>
                    </el-form>
                    <el-form class="form-box" id="step-3" v-show="third_step">
                        <el-form-item class="form-msg">
                            您已经成功设置密码，请使用新密码登录
                        </el-form-item>
                        <div class="form-btn">
                            <button type="button" class="btn-common" id="btn-return-login" @click="goBack">返回登录</button>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="page-bottom">
            <p>Copyright&copy;2018 麦盟科技maimenggroup版权所有</p>
        </div>
    </div>
</template>
<script>
    import request from '../untils/request'
    import md5 from 'js-md5'
    import   Qs  from  'qs'
    export default {
       data(){
           return{
               amendPassForm:{
                   phone:'',//手机号
                   code:'',//验证码
                   password:'',//新密码
                   newPassword:'',//确认新密码
               },
               first_step:true,//验证手机号表单
               second_step:false,//修改密码表单
               third_step:false,//找回密码表单
           }
       },
        methods:{
            //返回登录页面
            login(){
                this.$router.push({
                    path:'/'
                })
                // this.reload()
            },
            //点击下一步进入修改密码页面
            checkFirst(){
                if(this.amendPassForm.phone == ''){
                   this.$message.error("请输入手机号")
                }/*else if(this.amendPassForm.code == ''){
                    this.$message.error("请输入验证码")
                }*/else{
                    this.first_step=false
                    this.second_step=true
                    let arr=document.getElementsByClassName('tab_item')
                    arr[1].classList.add("over")
                }
            },
            //修改密码并进入找回密码页面
            checkSecond(amendPassForm){
                if(this.amendPassForm.password == ''){
                     this.$message.error("请输入密码")
                }
                else if(this.amendPassForm.newPassword == ''){
                    this.$message.error("请输入确认密码")
                }else if (this.amendPassForm.password !== this.amendPassForm.newPassword){
                    this.$message.error("两次密码不一致，请重新输入")
                } else{
                    this.$refs.amendPassForm.validate(validate=>{
                        if (validate) {
                            let pass=md5(this.amendPassForm.password)
                            let password=pass.toLowerCase()
                            let arr=document.getElementsByClassName('tab_item')
                            return request({
                                method:'put',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                },
                                transformRequest: [function(data) {      //在请求之前对data传参进行格式转换
                                    data = Qs.stringify(data)
                                    return data
                                }],
                                url:'/authserver/user/password',
                                data:{
                                    account:this.amendPassForm.phone,
                                    password:password
                                }
                            }).then((res)=>{
                                if (res.data.code == 200){
                                    this.$message({
                                        type:'success',
                                        message:res.data.data
                                    })
                                    this.second_step=false,
                                    this.third_step=true,
                                    arr[2].classList.add("over")
                                }else{
                                    this.$message({
                                    type:'error',
                                    message:res.data.data
                                })
                                }
                            }).catch((error)=>{
                            })
                        }
                    })
                }
            },
            //返回登录页
            goBack(){
             this.$router.push({
                 path:'/'
             })
            }
        }

    }
</script>

<style>
    @import "../style/password.css";
    .password .el-input, .password .el-input__inner{
        width: 78%;
        border-top: none;
        border-left: none;
        border-right: none;
    }
    .password .el-form-item{
        margin-bottom: 18px;
    }
    .password .form-input{position: relative}
    .password .btn-common:hover{
        background-color: #046dac;
    }
    .password .codes{
        position: absolute;
        right: 120px;
    }
</style>
