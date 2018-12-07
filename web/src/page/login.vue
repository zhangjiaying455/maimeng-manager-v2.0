<template>
    <div class="container login-page">
        <div class="login-top">
            <div class="top-center">
                <img src="../images/login/login-title.png">
                <div class="top-right">
                    <a href="#">麦盟官网</a> | <a href="#">帮助中心</a>
                </div>
            </div>
        </div>
        <div class="login-content">
            <div class="content-center">
                <el-form class="login-box" :model="loginForm"  status-icon :rules="rules1" ref="loginForm">
                    <h3>登录</h3>
                    <el-form-item class="input" prop="username">
                       <!-- <span class="icon-user"></span>
                        <input id="username"  v-model="loginForm.username" type="text" value="" class="input-text" placeholder="请输入用户名"/>
                        <div class="msg">请输入用户名</div>-->
                        <el-input  class="sizeText iconfont icon-xingmingyonghumingnicheng-copy" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item class="input" prop="password">
                        <el-input type="password"  class="sizeText iconfont icon-mima1" placeholder="请输入密码" v-model="loginForm.password"></el-input>
                       <!-- <span class="icon-password"></span><input id="password" v-model="loginForm.password" type="password" value="" class="input-text" placeholder="请输入密码"/>
                        <div class="msg">请输入密码</div>-->
                    </el-form-item>
                    <el-form-item class="forget-password">
                        <a href="javascript:void(0)" @click="password">忘记密码?</a>
                    </el-form-item>
                    <el-button type="button" class="btn" id="login-btn" @click="handleLogin('loginForm')">登录</el-button>
                    <el-form-item class="register">
                        <span>还没有账号？</span>
                        <a href="javascript:void(0)" @click="register">立即注册 >></a>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="login-bottom">
            <p>Copyright&copy;2018 麦盟科技maimenggroup版权所有</p>
        </div>
    </div>
</template>

<script>
	// import {login, getAdminInfo} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'

	export default {
	    data(){
			return {
				loginForm: {
					username: '',
					password: '',
				},
                checked:false,
				rules1: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' ,style: 'top:80%'},
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		mounted(){
		},
		computed: {
			// ...mapState(['adminInfo']),
		},
		methods: {
            //点击登录
            handleLogin(loginForm) {
                debugger
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        const res=this.$store.dispatch("Login", this.loginForm).then(()=>{
                            debugger
                            this.$message({
                                type:'success',
                                message:'登录成功'
                            })
                            this.$router.push({
                                path:'/manage'
                            })
                        }).catch((error)=>{
                            debugger
                            console.log(error)
                        })
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            register(){
                this.$router.push({
                    path:'/register'
                })
            },
            password(){
                this.$router.push({
                    path:'/password'
                })
            }
		},
		watch: {
			/*adminInfo: function (newValue){
				if (newValue.id) {
					this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
					this.$router.push('manage')
				}
			}*/
		}
	}
</script>

<style lang="less" scoped>
    @import "../style/login.css";



    /*.sizeText[data-v-71f5339d] .el-form-item__error{
        !*color: #1d90e6 !important;*!
        position: absolute !important;
        top: 60% !important;
        left: 35px !important;
    }*/
    .icon-xingmingyonghumingnicheng-copy:before {
        content: "\E600";
        position: absolute;
        left: 10px;
        color: #1d90e6;
        font-weight: bolder;
        font-size: 18px;
    }
    .icon-mima1:before{
        position: absolute;
        left: 10px;
        color: #1d90e6;
        font-weight: bolder;
        font-size: 18px;
    }
    .sizeText{
        font-size: 12px;
        padding-left: 25px;
    }

</style>
