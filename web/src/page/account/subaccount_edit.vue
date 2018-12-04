<template>
    <div class="main">
        <div class="nav">
            <span>账号管理 > 子账号管理</span>
        </div>
        <!--主体内容-->
        <div class="main-edit">
            <div class="edit-box">
                <h6><span></span>账号基础信息</h6>
                <div class="box-info">
                    <div class="info-item">
                        <span class="item-left font-black"><span>*</span>子账号名称</span>
                        <span class="item-right">
                            <input type="text" value="" class="txt-common" placeholder="4-20个字符，用户名一旦保存不可再修改">
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black"><span>*</span>子账号密码</span>
                        <span class="item-right">
                            <input type="password" value="" class="txt-common" placeholder="6-20个字符，不建议使用纯数字、纯字母或纯符号">
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black"><span>*</span>密码确认</span>
                        <span class="item-right">
                            <input type="password" value="" class="txt-common">
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black"><span>*</span>员工姓名</span>
                        <span class="item-right">
                            <input type="password" value="" class="txt-common">
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black"><span>*</span>手机号码</span>
                        <span class="item-right">
                            <input type="password" value="" class="txt-common">
                        </span>
                    </div>
                </div>
                <div class="line"></div>
            </div>
            <div class="edit-box">
                <h6><span></span>角色及账号权限(必填)</h6>
                <div class="box-info">
                    <!--<div class="roles-list-empty">该员工没有任何权限</div>-->
                    <div class="roles-list">
                        <div class="roles-info">
                            <label>
                                <input type="checkbox" value="0">数据管理
                            </label>
                            <label>
                                <input type="checkbox" value="1">用户管理
                            </label>
                            <label>
                                <input type="checkbox" value="2">运营管理
                            </label>
                        </div>
                        <ul>
                            <li id="l-0">
                                <h5>数据管理</h5>
                                <span><i></i>用户列表</span>
                                <span><i></i>会员等级管理</span>
                                <span><i></i>用户分群</span>
                                <span><i></i>积分规则</span>
                            </li>
                            <li id="l-1">
                                <h5>用户管理</h5>
                                <span><i></i>用户列表</span>
                                <span><i></i>会员等级管理</span>
                                <span><i></i>用户分群</span>
                                <span><i></i>积分规则</span>
                            </li>
                            <li id="l-2">
                                <h5>运营管理</h5>
                                <span><i></i>用户列表</span>
                                <span><i></i>会员等级管理</span>
                                <span><i></i>用户分群</span>
                            </li>
                        </ul>
                    </div>
                    <button type="button" class="btn-common" @click="cancel_save" style="margin-right: 20px;">取消</button>
                    <button type="button" class="btn-submit" @click="save_info">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "subaccount-edit",
        data(){},
        created(){},
        mounted(){},
        methods:{
            cancel_save(){
                this.$router.push({
                    path:'/subaccount'
                })
            },
            save_info(){
                this.$router.push({
                    path:'/subaccount'
                })
            }
        },
        computed:{}
    }
</script>

<style>
    @import "../../style/main-common.css";
    @import "../../style/main-role.css";
</style>
