<template>
    <div class="main">
        <div class="nav">
            <span>账号管理 > 角色管理</span>
        </div>
        <!--主体内容-->
        <div class="main-search">
            <div class="search-item">
                <span class="item-left">角色名称</span>
                <span class="item-right">
                    <input type="text" value="" class="txt-common" v-model="search.name">
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
                    <button type="button" class="btn-small" @click="role_add">新增角色</button>
                </div>
            </div>
            <table border="0" cellpadding="0" cellspacing="0">
                <thead>
                <tr>
                    <td style="width: 10%;">编号</td>
                    <td style="width: 10%;">角色名称</td>
                    <td style="width: 20%;">角色描述</td>
                    <td>创建时间</td>
                    <td>修改时间</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(value,key) in this.list.data">
                    <td>{{key+1}}</td>
                    <td>{{value.name}}</td>
                    <td>{{value.sign}}</td>
                    <td>{{value.createTime}}</td>
                    <td>{{value.updateTime}}</td>
                    <td>
                        <a href="javascript:void(0)" @click="role_info(value.id)">查看</a>
                        <a href="javascript:void(0)" @click="role_edit(value.id)">编辑</a>
                        <a href="javascript:void(0)" @click="role_del(value.id)">删除</a>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="table-pager">
                <div class="pager-left">
                    <span>每页显示：</span>
                    <select id="pager-size" @change="change_size">
                        <option value="1">每页显示1条</option>
                        <option value="5">每页显示5条</option>
                        <option value="10">每页显示10条</option>
                        <option value="20">每页显示20条</option>
                        <option value="50">每页显示50条</option>
                    </select>
                </div>
                <div class="pager-right" v-if="list.totalPage>1">
                    <div class="pager-box">

                        <!--<ul>
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
                        <button type="button" class="btn-com">确定</button>-->

                        <ul>
                            <li v-if="pagers.prev"><a href="javascript:void(0)" v-on:click="prev()">上一页</a></li>
                            <li v-else-if="!pagers.prev"><a class="disabled">上一页</a></li>
                            <li v-for="p in pagers.pagers">
                                <a v-if="p==pagers.index" class="current">{{p}}</a>
                                <a v-else-if="p!=pagers.index" href="javascript:void(0)" v-on:click="goto(p)">{{p}}</a>
                            </li>
                            <li v-if="pagers.next"><a href="javascript:void(0)" v-on:click="next()">下一页</a></li>
                            <li v-else-if="!pagers.next"><a class="disabled">下一页</a></li>
                        </ul>
                        <span>共{{this.list.totalPage}}页，跳到第</span><input type="text" value="1" id="go-page"><span>页</span>
                        <button type="button" class="btn-com" v-on:click="goto()">确定</button>
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
    import moment from 'moment'

    export default {
        data(){
            return{
                search:{
                    name:"",//角色名称-模糊查询
                    page:0,//页码
                    size:1//每页数量
                },
                list:{
                    data:{},//数据集
                    totalCount:0,//总数量
                    totalPage:0//总页数
                },
                pagers:{
                    index:1,
                    prev:false,
                    next:true,
                    pagers:[1,2,3,4,5]
                },
            }
        },
        created(){
            this.search_list();
        },
        methods:{
            search_list(){
                debugger
                return request({
                    method:'get',
                    url:'mai-meng-cloud/role',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:{
                        name:this.search.name,
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
                        for(let i=0;i<res.data.data.list.length;i++){
                            this.list.data[i].createTime=moment(this.list.data[i].createTime).format("YYYY-MM-DD");
                            this.list.data[i].updateTime=moment(this.list.data[i].updateTime).format("YYYY-MM-DD");
                        }
                        this.init_pagers(this.search.page,this.list.totalPage);
                    }else{
                        console.log(res.data);
                    }
                }).catch((error=>{
                    debugger
                    console.log(error)
                }));
            },
            change_size(){
                this.search.size=document.getElementById("pager-size").value;
                this.search_list();
            },
            init_pagers(index,totalpage){
                var pagers={};

                pagers.index=index+1;

                if(pagers.index==1){
                    pagers.prev=false;
                }else{
                    pagers.prev=true;
                }

                if(pagers.index==totalpage){
                    pagers.next=false;
                }else{
                    pagers.next=true;
                }

                pagers.pagers=[];
                let maxpage=Math.ceil(pagers.index/5)*5
                let t=totalpage<maxpage?totalpage:maxpage;
                let i=t-4;
                if(i<=0){
                    i=1;
                }
                for(i;i<=t;i++){
                    pagers.pagers.push(i);
                }

                this.pagers=pagers;
            },
            role_add(){
                this.$router.push({
                    path:'/role_edit'
                });
            },
            role_edit(id){
                this.$router.push({
                    path:'/role_edit?id='+id
                });
            },
            role_info(id){
                this.$router.push({
                    path:'/role_info?id='+id
                });
            },
            role_del(id){
                debugger

                return request({
                    method:'delete',
                    url:'/mai-meng-cloud/role/'+id,
                }).then((res)=>{
                    debugger
                    console.log(res.data)
                }).catch((error=>{
                    debugger
                    console.log(error)
                }));
            }
        }
    }
</script>

<style>
    @import "../../style/main-common.css";
</style>
