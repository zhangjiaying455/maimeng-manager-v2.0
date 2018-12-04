<template>
    <div class="container">
        <div class="page-top">
            <div class="top-center">
                <img src="../images/login/login-title.png">
                <div class="top-right">
                    <a href="#">麦盟官网</a> | <a href="#">帮助中心</a>
                </div>
            </div>
        </div>
        <div class="page-content">
            <div class="content-center">
                <div class="content-title">
                    <p>新用户注册</p>
                    <a href="javascript:void(0)" @click="login">使用已有账号登录</a>
                </div>
                <div class="content-box">
                    <div class="form-box">
                        <div class="form-input">
                            <span class="input-left">手机号码</span>
                            <span class="input-middle">
                                <input v-model="phone" type="text" value="" class="txt-common" placeholder="请输入您的手机号码">
                            </span>
                            <span class="input-right wrong">账号不存在</span>
                        </div>
                        <div class="form-input">
                            <span class="input-left">验证码</span>
                            <span class="input-middle">
                                <input v-model="code" type="text" value="" class="txt-common" placeholder="请输入短信验证码">
                                <button type="button" class="btn-small">获取验证码</button>
                            </span>
                            <span class="input-right">验证码错误</span>
                        </div>
                        <div class="form-input">
                            <span class="input-left">公司名称</span>
                            <span class="input-middle">
                                <input v-model="companyName" type="text" value="" class="txt-common" placeholder="请输入公司名称">
                            </span>
                            <span class="input-right"></span>
                        </div>
                        <div class="form-input">
                            <span class="input-left">称呼</span>
                            <span class="input-middle">
                                <input v-model="name" type="text" value="" class="txt-common" placeholder="请输入您的称呼，如王先生">
                            </span>
                            <span class="input-right"></span>
                        </div>
                        <div class="form-input">
                            <span class="input-left">密码</span>
                            <span class="input-middle">
                                <input v-model="password" type="text" value="" class="txt-common" placeholder="请输入6-16位数字或字母组成的密码">
                            </span>
                            <span class="input-right"></span>
                        </div>
                        <div class="form-checkbox">
                            <input type="checkbox"> 我已阅读并同意《麦盟网站服务条款》
                        </div>
                        <div class="form-btn">
                            <button type="button" class="btn-common" @click="submitReg">注册</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-bottom">
            <p>Copyright&copy;2018 麦盟科技maimenggroup版权所有</p>
        </div>
    </div>
</template>

<script>
    import request from '@/untils/request'
	export default {
	    data(){
           return{
               phone:'',
               code:'',
               companyName:'',
               name:'',
               password:'',
           }
		},
        methods:{
	        login(){
	            this.$router.push({
                    path:'/'
                })
            },
            submitReg(){
                return request({
                    method:'post',
                    url:'/authserver/user/regist',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    data:{
                        account:this.registerForm.phone,
                        companyName:this.registerForm.appellation,
                        name:this.registerForm.name,
                        password: this.registerForm.password
                    }
                }).then((res)=>{
                    debugger
                    console.log(res.data)
                    this.$message({
                        type:'success',
                        message:'注册成功'
                    })
                    this.$router.push({
                        path:'/'
                    })
                }).catch((error)=>{
                    debugger
                    console.log(error)
                })
            }
            }
	}
</script>

<style>
    @import "../style/register.css";
</style>
