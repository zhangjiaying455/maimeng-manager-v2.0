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
                    <p>账号安全</p>
                </div>
                <div class="content-box">
                    <ul class="menu-list">
                        <li class="over">验证手机号</li>
                        <li>修改密码</li>
                        <li>找回密码</li>
                    </ul>
                    <div class="form-box" id="step-1">
                        <div class="form-input">
                            <span class="input-left">手机号码</span>
                            <span class="input-middle">
                                <input type="text" value="" class="txt-common" placeholder="请输入您的手机号码">
                            </span>
                            <span class="input-right wrong">账号不存在</span>
                        </div>
                        <div class="form-input">
                            <span class="input-left">验证码</span>
                            <span class="input-middle">
                                <input type="text" value="" class="txt-common" placeholder="请输入短信验证码">
                                <button type="button" class="btn-small">获取验证码</button>
                            </span>
                            <span class="input-right">验证码错误</span>
                        </div>
                        <div class="form-btn">
                            <button type="button" class="btn-common" id="btn-check-info">下一步</button>
                        </div>
                    </div>
                    <div class="form-box" id="step-2" style="display: none;">
                        <div class="form-input">
                            <span class="input-left">设置密码</span>
                            <span class="input-middle">
                                <input type="text" value="" class="txt-common" placeholder="设置密码">
                            </span>
                            <span class="input-right wrong">密码不能为空</span>
                        </div>
                        <div class="form-input">
                            <span class="input-left">确认密码</span>
                            <span class="input-middle">
                                <input type="text" value="" class="txt-common" placeholder="确认密码">
                            </span>
                            <span class="input-right">密码不能为空</span>
                        </div>
                        <div class="form-btn">
                            <button type="button" class="btn-common" id="btn-set-password">下一步</button>
                        </div>
                    </div>
                    <div class="form-box" id="step-3" style="display: none;">
                        <div class="form-msg">
                            您已经成功设置密码，请使用新密码登录
                        </div>
                        <div class="form-btn">
                            <button type="button" class="btn-common" id="btn-return-login">返回登录</button>
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
    export default {
        name: "password"
    }
</script>

<style>
    @import "../style/password.css";
</style>
