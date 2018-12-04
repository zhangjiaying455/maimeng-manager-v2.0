<template>
    <div class="main">
        <div class="nav">
            <span>账号管理 > 子账号管理</span>
        </div>
        <!--主体内容-->
        <div class="main-search">
            <div class="search-item">
                <span class="item-left">子账号名称</span>
                <span class="item-right">
                    <input type="text" class="txt-common" value="" v-model="search.account">
                </span>
            </div>
            <div class="search-item">
                <span class="item-left">角色名称</span>
                <span class="item-right">
                    <select class="txt-common">
                        <option value="0">全部</option>
                        <option value="1">客服</option>
                    </select>
                </span>
            </div>
            <button type="button" class="btn-search" @click="search_list">查询</button>
        </div>
        <div class="main-table">
            <div class="table-msg">
                <div class="msg-left">
                    <p>查询符合上述条件的数据<span>{{this.list.totalCount}}</span>条</p>
                </div>
                <div class="msg-right">
                    <button type="button" class="btn-small" style="margin-right: 20px;">批量导入子账号</button>
                    <button type="button" class="btn-small" @click="subaccount_add">创建新子账号</button>
                </div>
            </div>
            <table border="0" cellpadding="0" cellspacing="0">
                <thead>
                <tr>
                    <td style="width: 10%;">编号</td>
                    <td style="width: 20%;">子账号名称</td>
                    <td style="width: 10%;">员工姓名</td>
                    <td style="width: 20%;">角色名称</td>
                    <td>状态</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(value,key) in this.list.data">
                    <td>{{key+1}}</td>
                    <td>{{value.account}}</td>
                    <td>{{value.name}}</td>
                    <td>{{value.roleName}}</td>
                    <td>{{value.state}}</td>
                    <td>
                        <a href="javascript:void(0)" @click="subaccount_info(value.id)">查看</a>
                        <a href="javascript:void(0)" @click="subaccount_del(value.id)">停用</a>
                        <a href="javascript:void(0)" @click="subaccount_edit(value.id)">修改</a>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="table-pager">
                <div class="pager-left">
                    <span>每页显示：</span>
                    <select>
                        <option value="10">每页显示10条</option>
                        <option value="20">每页显示20条</option>
                        <option value="50">每页显示50条</option>
                    </select>
                </div>
                <div class="pager-right">
                    <div class="pager-box">
                        <ul>
                            <li><a href="javascript:void(0)" class="disabled">上一页</a></li>
                            <li><a href="javascript:void(0)" class="current">1</a></li>
                            <li><a href="javascript:void(0)">2</a></li>
                            <li><a href="javascript:void(0)">3</a></li>
                            <li><a href="javascript:void(0)">4</a></li>
                            <li><a href="javascript:void(0)">5</a></li>
                            <li><a href="javascript:void(0)">下一页</a></li>
                        </ul>
                        <span>共{{this.list.totalPage}}页，跳到第</span>
                        <input type="text" value="1">
                        <span>页</span>
                        <button type="button" class="btn-com">确定</button>
                    </div>
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
                search:{
                    account:"",//子账号名称
                    roleId:null,//角色名称
                    page:0,//页码
                    size:10//每页数量
                },
                list:{
                    data:{},//数据集
                    totalCount:0,//总数量
                    totalPage:0//总页数
                }
            }
        },
        created(){
            //this.search_list()
        },
        mounted(){},
        methods:{
            search_list(){
                debugger
                return request({
                    method:'get',
                    url:'mai-meng-cloud/user',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:{
                        account:this.search.account,
                        page:this.search.page,
                        size:this.search.size
                    }
                }).then((res)=>{
                    debugger
                    console.log(res.data);
                    if(res.data.code=="200"){
                        this.list.data=res.data.data.list;
                        this.list.totalCount=res.data.data.totalCount;
                        this.list.totalPage=res.data.data.totalPage;
                    }else{
                        console.log(res.data);
                    }
                }).catch((error=>{
                    debugger
                    console.log(error)
                }));
            },
            subaccount_add(){
                this.$router.push({
                    path:'/subaccount_edit'
                });
            },
            subaccount_edit(id){
                this.$router.push({
                    path:'/subaccount_edit?id='+id
                });
            },
            subaccount_info(id){
                this.$router.push({
                    path:'/subaccount_info?id='+id
                });
            },
            subaccount_del(id){
                debugger

                return request({
                    method:'delete',
                    url:'/mai-meng-cloud/user/'+id,
                }).then((res)=>{
                    debugger
                    console.log(res.data)
                }).catch((error=>{
                    debugger
                    console.log(error)
                }));
            }
        },
        computed:{

        }
    }
</script>

<style>
    @import "../../style/main-common.css";
</style>
