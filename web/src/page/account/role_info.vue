<template>
    <div class="main">
        <div class="nav">
            <span>账号管理 > 角色管理</span>
        </div>
        <!--主体内容-->
        <div class="main-edit">
            <div class="edit-box">
                <h6><span></span>角色信息</h6>
                <div class="box-info">
                    <div class="info-item">
                        <span class="item-left">角色名称</span>
                        <span class="item-right">
                            {{this.role.name}}
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left">角色描述</span>
                        <span class="item-right">
                            {{this.role.sign}}
                        </span>
                    </div>
                </div>
                <div class="line"></div>
            </div>
            <div class="edit-box">
                <h6><span></span>角色权限</h6>
                <div class="box-info">
                    <div class="roles-list-empty" v-if="this.role.powers==null">该角色没有任何权限</div>
                    <div class="roles-list" v-else="">
                        <ul>
                            <li>
                                <h5>用户管理</h5>
                                <span><i></i>用户列表</span>
                                <span><i></i>会员等级管理</span>
                                <span><i></i>用户分群</span>
                                <span><i></i>积分规则</span>
                            </li>
                            <li>
                                <h5>用户管理</h5>
                                <span><i></i>用户列表</span>
                                <span><i></i>会员等级管理</span>
                                <span><i></i>用户分群</span>
                            </li>
                        </ul>
                    </div>
                    <button type="button" class="btn-common" @click="return_role">返回</button>
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
                role:{
                    name:"",//角色名称
                    sign:"",//角色描述
                    powers:null//权限信息
                }
            }
        },
        created(){
            debugger
            return request({
                method:'get',
                url:'mai-meng-cloud/role/9',
            }).then((res)=>{
                debugger
                console.log(res.data);
                if(res.data.code=="200"){
                    this.role.name=res.data.data.role.name;
                    this.role.sign=res.data.data.role.sign;
                    this.role.powers=res.data.data.menus;
                }else{
                    console.log(res.data);
                }
            }).catch((error=>{
                debugger
                console.log(error)
            }));
        },
        mounted(){},
        methods:{
            return_role(){
                this.$router.push({
                    path:'/role'
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
