<template>
    <div class="container login-page">
        <div class="login-top">
            <div class="top-center">
                <img src="../images/login/login-title.png">
                <div class="top-right">
                    <a href="http://www.maimenggroup.com/" target="_blank">麦盟官网</a> | <a href="#">帮助中心</a>
                </div>
            </div>
        </div>
        <div class="login-content">
            <div class="content-center">
                <el-form class="login-box" :model="loginForm"  status-icon :rules="rules1" ref="loginForm"   @keyup.enter.native="handleLogin('loginForm')">
                    <h3>登录</h3>
                    <el-form-item class="input" prop="username">
                        <el-input  class="sizeText iconfont icon-xingmingyonghumingnicheng-copy" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item class="input" prop="password">
                        <el-input type="password"  class="sizeText iconfont icon-mima1" placeholder="请输入密码" v-model="loginForm.password"></el-input>
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
	import {mapActions, mapState} from 'vuex'
    import { getToken,setToken, removeToken } from '@/untils/auth'
	export default {
	    data(){
			return {
				loginForm: {
					username: '',//用户名
					password: '',//密码
				},
                //非空校验
				rules1: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' ,style: 'top:80%'},
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
			}
		},
		computed: {
		},
        created(){
        },
		methods: {
            //点击登录
            handleLogin(loginForm) {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.$store.dispatch("Login", this.loginForm).then((res)=>{
                            if (res.data.code == 200){
                                sessionStorage.setItem('username',this.loginForm.username)
                                setToken(res.data.data)
                                this.$message({
                                    type:'success',
                                    message:'登录成功'
                                })
                                this.$router.push("./clue_management")
                            }else if(res.data.code == 401){
                                this.$router.push("/")
                            }else{
                                this.$message({
                                    type:'error',
                                    message:res.data.message
                                })
                            }

                        }).catch((error)=>{

                        })
                    } else {
                        return false;
                    }
                });
            },
            //跳转到立即注册页
            register(){
                this.$router.push({
                    path:'/register'
                })
            },
            //跳转到忘记密码页
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
