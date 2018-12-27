<template>
    <div class="container register">
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
                    <p>新用户注册</p>
                    <a href="javascript:void(0)" @click="login">使用已有账号登录</a>
                </div>
                <div class="content-box">
                    <el-form class="form-box" :model="registerForm"  status-icon :rules="rules1" ref="registerForm">
                        <el-form-item class="form-input" prop="phone">
                            <span class="input-left">手机号码</span>
                            <el-input v-model="registerForm.phone" placeholder="请输入您的手机号"></el-input>
                        </el-form-item>
                        <el-form-item class="form-input" prop="code">
                            <span class="input-left">验证码</span>
                            <el-input  v-model="registerForm.code"  placeholder="请输入短信验证码"></el-input>
                            <button type="button" class="btn-small">获取验证吗</button>
                        </el-form-item>
                        <el-form-item class="form-input" prop="companyName">
                            <span class="input-left">公司名称</span>
                            <el-input v-model="registerForm.companyName" placeholder="请输入公司名称"></el-input>
                        </el-form-item>
                        <el-form-item class="form-input" prop="name">
                            <span class="input-left">称呼</span>
                            <el-input v-model="registerForm.name" placeholder="请输入您的称呼，如王先生"></el-input>
                        </el-form-item>
                        <el-form-item class="form-input" prop="password">
                            <span class="input-left">密码</span>
                            <el-input type="password" v-model="registerForm.password" placeholder="请输入6-16位数字或字母组成的密码"></el-input>
                        </el-form-item>
                        <el-form-item class="form-checkbox">
                            <input type="checkbox" checked="checked"> 我已阅读并同意《麦盟网站服务条款》
                        </el-form-item>
                        <div class="form-btn">
                            <button type="button" class="btn-common" @click="submitReg('registerForm')">注册</button>
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
    import md5 from 'js-md5'
    import request from '@/untils/request'
    import   Qs  from  'qs'
	export default {
        inject:['reload'],
	    data(){
           return{
               registerForm:{
                   phone:'',//手机号
                   // code:'',//验证码
                   companyName:'',//公司名称
                   name:'',//称呼
                   password:'',//密码
               },
               //element-ui校验
               rules1: {
                   phone: [
                       { required: true, message: '请输入您的手机号', trigger: 'blur' },
                   ],
                  /* code: [
                       { required: true, message: '请输入短信验证码', trigger: 'blur' }
                   ],*/
                   companyName: [
                       { required: true, message: '请输入公司名称', trigger: 'blur' }
                   ],
                   name: [
                       { required: true, message: '请输入您的称呼', trigger: 'blur' }
                   ],
                   password: [
                       { required: true, message: '请输入您的密码', trigger: 'blur' }
                   ],
               },

           }
		},
        methods:{
            //使用已有账号登录 返回登录页
	        login(){
	            this.$router.push({
                    path:'/'
                })
                this.reload()
            },
            //注册
            submitReg(registerForm){
                this.$refs.registerForm.validate(validate=>{
                    if(validate){
                        let password=md5(this.registerForm.password)
                        return request({
                            method:'post',
                            url:'/authserver/user/regist',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            },
                            transformRequest: [function(data) {      //在请求之前对data传参进行格式转换
                                data = Qs.stringify(data)
                                return data
                            }],
                            data:{
                                account:this.registerForm.phone,
                                companyName:this.registerForm.companyName,
                                name:this.registerForm.name,
                                password:password
                            }
                        }).then((res)=>{
                            console.log(res.data)
                            if (res.data.code == 200){
                                debugger
                                this.$message({
                                    type:'success',
                                    message:'注册成功'
                                })
                                this.$router.push({
                                    path:'/'
                                })
                            }else{
                                this.$message({
                                    type:'error',
                                    message:res.data.message
                                })
                            }
                        }).catch((error)=>{
                      })
                   }
                })
              }
            }
	}
</script>

<style>
    @import "../style/register.css";
    .register .el-input,.register .el-input__inner{
        width: 78%;
        border-top: none;
        border-left: none;
        border-right: none;
    }
    .register .el-form-item{
        margin-bottom: 18px;
    }
    .register .form-input{position: relative}

    .register .btn-common:hover{
        background-color: #046dac;
    }

</style>
