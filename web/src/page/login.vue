<template>
    <div class="container login">
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
                <el-form class="login-box" :model="loginForm" :rules="rules" ref="loginForm">
                    <h3>登录</h3>
                    <el-form-item class="input">
                        <span class="icon-user"></span><input id="username"  v-model="loginForm.username" type="text" value="" class="input-text" placeholder="请输入用户名"/>
                        <div class="msg">请输入用户名</div>
                    </el-form-item>
                    <el-form-item class="input">
                        <span class="icon-password"></span><input id="password" v-model="loginForm.password" type="password" value="" class="input-text" placeholder="请输入密码"/>
                        <div class="msg">请输入密码</div>
                    </el-form-item>
                    <el-form-item class="forget-password">
                        <a href="javascript:void(0)" @click="password">忘记密码?</a>
                    </el-form-item>
                    <el-button type="button" class="btn" id="login-btn" @click="handleLogin">登录</el-button>
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
					username: 'admin',
					password: '123456',
				},
                checked:false,
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
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
            handleLogin() {
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
                        }).catch(()=>{

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
</style>
