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
                        <span class="item-left">子账号名称</span>
                        <span class="item-right">
                            rise_zhangmeng
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left">员工姓名</span>
                        <span class="item-right">
                            张萌
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left">联系电话</span>
                        <span class="item-right">
                            18809090909
                        </span>
                    </div>
                </div>
                <div class="line"></div>
            </div>
            <div class="edit-box">
                <h6><span></span>角色及账号权限</h6>
                <div class="box-info">
                    <div class="roles-list">
                        <div class="roles-info">
                            <label>
                                <input type="checkbox" value="0" disabled>数据管理
                            </label>
                            <label>
                                <input type="checkbox" value="0" checked disabled>用户管理
                            </label>
                            <label>
                                <input type="checkbox" value="0" checked disabled>运营管理
                            </label>
                        </div>
                        <ul>
                            <li>
                                <h5>用户管理</h5>
                                <span><i></i>用户列表</span>
                                <span><i></i>会员等级管理</span>
                                <span><i></i>用户分群</span>
                                <span><i></i>积分规则</span>
                            </li>
                            <li>
                                <h5>运营管理</h5>
                                <span><i></i>用户列表</span>
                                <span><i></i>会员等级管理</span>
                                <span><i></i>用户分群</span>
                            </li>
                        </ul>
                    </div>
                    <button type="button" class="btn-common" @click="return_subaccount">返回</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {dictionary} from '@/api/login'
    import {mapActions, mapState,mapMutations} from 'vuex'
    import axios from 'axios'
    import request from '@/untils/request'

    export default {
        data(){
            return{
                subaccount:{
                    account:"",//子账号名称
                    name:"",//员工姓名
                    mobile:"",//联系电话
                    roles:null//角色与权限
                }
            }
        },
        created(){
            debugger
            return request({
                method:'get',
                url:'mai-meng-cloud/user/1',
            }).then((res)=>{
                debugger
                console.log(res.data);
                /*if(res.data.code=="200"){
                    this.role.name=res.data.data.role.name;
                    this.role.sign=res.data.data.role.sign;
                    this.role.powers=res.data.data.menus;
                }else{
                    console.log(res.data);
                }*/
            }).catch((error=>{
                debugger
                console.log(error)
            }));
        },
        mounted(){},
        methods:{
            return_subaccount(){
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
