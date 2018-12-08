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
                        <span class="item-right">{{this.role.name}}</span>
                    </div>
                    <div class="info-item">
                        <span class="item-left">角色描述</span>
                        <span class="item-right">{{this.role.sign}}</span>
                    </div>
                </div>
                <div class="line"></div>
            </div>
            <div class="edit-box">
                <h6><span></span>角色权限</h6>
                <div class="box-info">
                    <div class="roles-list-empty" v-if="role.menus.length<=0">该角色没有任何权限</div>
                    <div class="roles-list" v-else="">
                        <ul>
                            <li v-for="item in role.menus">
                                <h5>{{item.name}}</h5>
                                <template v-if="item.childMenus.length>0">
                                    <span v-for="child in item.childMenus"><i></i>{{child.name}}</span>
                                </template>
                            </li>
                        </ul>
                    </div>
                    <button type="button" class="btn-common" @click="cancel">返回</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {dictionary} from '@/api/login'
    import request from '@/untils/request'

    export default {
        data(){
            return{
                role:{
                    name:"",//角色名称
                    sign:"",//角色描述
                    menus:[]//权限信息
                }
            }
        },
        created(){
            this.init(); //数据初始化
        },
        methods:{
            init(){
                let id=this.$route.query.id;

                return request({
                    method:'get',
                    url:'mai-meng-cloud/role/'+id,
                }).then((res)=>{
                    //console.log(res.data);
                    if(res.data.code=="200"){
                        this.role.name=res.data.data.role.name;
                        this.role.sign=res.data.data.role.sign;
                        if(res.data.data.menus.length>0){
                            for(let i=res.data.data.menus.length-1;i>=0;i--){
                                this.role.menus.push(res.data.data.menus[i]);
                            }
                        }else{
                            this.role.menus=res.data.data.menus;
                        }
                    }else{
                        console.log(res.data);
                        this.$message.error('数据异常，请刷新重试');
                    }
                }).catch((error=>{
                    console.log(error);
                    this.$message.error('数据异常，请刷新重试');
                }));
            },
            cancel(){
                this.$router.push({
                    path:'/role'
                })
            }
        }
    }
</script>

<style>
    @import "../../style/main-common.css";
    @import "../../style/main-role.css";
</style>
