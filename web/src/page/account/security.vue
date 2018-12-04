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
                    <p>绑定手机号176****7925</p>
                </div>
                <div class="right">
                    <button type="button" class="btn-large" id="btn-bind">绑定手机号</button>
                </div>
            </li>
            <li>
                <div class="left">
                    <span class="icon-success"></span>
                    <h4>修改密码</h4>
                    <p>互联网账号存在被盗风险，建议您定期更改密码以保护账户安全</p>
                </div>
                <div class="right">
                    <button type="button" class="btn-large" id="btn-password-update">修改密码</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "security"
    }
</script>

<style>
    @import "../../style/main-common.css";
    /*account-security-begin*/
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
    /*account-security-end*/
</style>
