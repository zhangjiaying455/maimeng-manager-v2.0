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
            <button type="button" class="btn-search" @click="search_data">查询</button>
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
                        <option value="10">每页显示10条</option>
                        <option value="20">每页显示20条</option>
                        <option value="50">每页显示50条</option>
                    </select>
                </div>
                <div class="pager-right" v-if="list.totalPage>1">
                    <div class="pager-box">
                        <ul>
                            <li v-if="pagers.prev"><a href="javascript:void(0)" @click="prev">上一页</a></li>
                            <li v-else-if="!pagers.prev"><a class="disabled">上一页</a></li>
                            <li v-for="p in pagers.pagers">
                                <a v-if="p==pagers.index" class="current">{{p}}</a>
                                <a v-else-if="p!=pagers.index" href="javascript:void(0)" @click="goto(p)">{{p}}</a>
                            </li>
                            <li v-if="pagers.next"><a href="javascript:void(0)" @click="next">下一页</a></li>
                            <li v-else-if="!pagers.next"><a class="disabled">下一页</a></li>
                        </ul>
                        <span>共{{this.list.totalPage}}页，跳到第</span><input type="text" value="1" id="go-page"><span>页</span>
                        <button type="button" class="btn-com" @click="goto(0)">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {dictionary} from '@/api/login'
    import request from '@/untils/request'
    import moment from 'moment'

    export default {
        inject:['reload'],//注入reload方法
        data(){
            return{
                search:{
                    name:"",//角色名称-模糊查询
                    page:0,//页码
                    size:10//每页数量
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
                }
            }
        },
        created(){
            this.search_list(); //数据初始化
        },
        methods:{
            search_data(){
                this.search.page=0;
                this.search_list();
            },
            search_list(){
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
                    //console.log(res.data);
                    if(res.data.code=="200"){
                        this.list.data=res.data.data.list;
                        this.list.totalCount=res.data.data.totalCount;
                        this.list.totalPage=res.data.data.totalPage;
                        for(let i=0;i<res.data.data.list.length;i++){
                            this.list.data[i].createTime=moment(this.list.data[i].createTime).format("YYYY-MM-DD");
                            this.list.data[i].updateTime=moment(this.list.data[i].updateTime).format("YYYY-MM-DD");
                        }
                        this.set_pagers(this.search.page,this.list.totalPage);
                    }else{
                        console.log(res.data);
                        this.$message.error('数据异常，请刷新重试');
                    }
                }).catch((error=>{
                    console.log(error);
                    this.$message.error('数据异常，请刷新重试');

                }));
            },
            prev(){
                this.search.page--;
                this.search_list();
            },
            next(){
                this.search.page++;
                this.search_list();
            },
            goto(i){
                if(i==0){
                    i=document.getElementById("go-page").value;

                    if(i>this.list.totalPage){
                        i=this.list.totalPage;
                    }

                    if(i<1){
                        i=1;
                    }

                    document.getElementById("go-page").value=i;
                }

                this.search.page=i-1;
                this.search_list();
            },
            change_size(e){
                this.search.page=0;
                this.search.size=parseInt(e.target.value);
                this.search_list();
            },
            set_pagers(index,totalpage){
                let pagers={};

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
                let maxpage=Math.ceil(pagers.index/5)*5;
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
                this.reload();
            },
            role_edit(id){
                this.$router.push({
                    path:'/role_edit?id='+id
                });
                this.reload();
            },
            role_info(id){
                this.$router.push({
                    path:'/role_info?id='+id
                });
                this.reload();
            },
            role_del(id){
                this.$confirm('确定删除该数据？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((res)=>{
                    return request({
                        method:'delete',
                        url:'/mai-meng-cloud/role/'+id,
                    }).then((res)=>{
                        //console.log(res.data);
                        if(res.data.code=="200"){
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            });
                            this.search_list();
                        }else{
                            console.log(res.data);
                            this.$message.error(res.data.message);
                        }
                    }).catch((error=>{
                        console.log(error);
                        //this.$message.error('操作失败');
                    }));
                }).catch((error)=>{
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style>
    @import "../../style/main-common.css";
</style>
