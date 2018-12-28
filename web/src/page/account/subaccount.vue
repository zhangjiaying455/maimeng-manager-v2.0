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
                    <select class="txt-common" @change="change_role">
                        <option value="0">全部</option>
                        <option v-bind:value="item.id" v-for="item in roles">{{item.name}}</option>
                    </select>
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
                    <!--<button type="button" class="btn-small" style="margin-right: 20px;">批量导入子账号</button>-->
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
                    <td>{{value.state==0?"已启用":"已停用"}}</td>
                    <td>
                        <a href="javascript:void(0)" @click="subaccount_info(value.id,value.account,value.name,value.mobile,value.roleName)">查看</a>
                        <a href="javascript:void(0)" @click="subaccount_del(value.id,value.state==0?-1:0)">{{value.state==0?"停用":"启用"}}</a>
                        <a href="javascript:void(0)" @click="subaccount_edit(value.id,value.account,value.name,value.mobile,value.roleId)">修改</a>
                    </td>
                </tr>
                <tr v-if="list.totalPage<=0">
                    <td colspan="6" style="background-color: #fafafa;">暂无数据</td>
                </tr>
                </tbody>
            </table>
            <div class="table-pager">
                <div class="pager-left">
                    <span>每页显示：</span>
                    <select @change="change_size">
                        <option value="10">每页显示10条</option>
                        <option value="20">每页显示20条</option>
                        <option value="50">每页显示50条</option>
                    </select>
                </div>
                <div class="pager-right" v-if="list.totalPage>0">
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
        <el-dialog class="subaccount-edit" title="账号基础信息" :visible.sync="dialog_edit">
            <div class="main-edit">
                <div class="edit-box">
                    <div class="box-info">
                    <div class="info-item">
                        <span class="item-left font-black"><span>*</span>子账号名称</span>
                        <span class="item-right">
                            <template v-if="account.id==0">
                                <input type="text" value="" class="txt-common" placeholder="请输入子账号名称，一旦保存不可再修改" v-model="account.account">
                            </template>
                            <template v-else>
                                <input type="text" value="" class="txt-common" disabled v-model="account.account">
                            </template>
                        </span>
                    </div>
                    <div class="info-item" v-if="account.id==0">
                        <span class="item-left font-black"><span>*</span>子账号密码</span>
                        <span class="item-right">
                            <input type="password" value="" class="txt-common" placeholder="请输入子账号密码" v-model="account.password">
                        </span>
                    </div>
                    <div class="info-item" v-if="account.id==0">
                        <span class="item-left font-black"><span>*</span>密码确认</span>
                        <span class="item-right">
                            <input type="password" value="" class="txt-common" placeholder="请确认子账号密码" v-model="account.passwords">
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black"><span>*</span>员工姓名</span>
                        <span class="item-right">
                            <input type="text" value="" class="txt-common" placeholder="请输入员工姓名" v-model="account.name">
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black">手机号码</span>
                        <span class="item-right">
                            <input type="number" value="" class="txt-common" placeholder="请输入手机号码" v-model="account.mobile">
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black"><span>*</span>角色信息</span>
                        <span class="item-right">
                            <select class="txt-common" id="edit-role" style="width: 373px;" @change="select_role">
                                <template v-if="account.roleid==0">
                                    <option value="0">请选择角色</option>
                                    <option v-bind:value="item.id" v-for="item in roles">{{item.name}}</option>
                                </template>
                                <template v-else v-for="item in roles">
                                    <option v-bind:value="item.id" v-if="item.id==account.roleid" selected>{{item.name}}</option>
                                    <option v-bind:value="item.id" v-else>{{item.name}}</option>
                                </template>
                            </select>
                        </span>
                    </div>
                </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog_edit = false">取消</el-button>
                <el-button type="primary" @click="subaccount_save">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog class="subaccount-edit" title="账号基础信息" :visible.sync="dialog_info">
            <div class="main-edit">
                <div class="edit-box">
                    <div class="box-info">
                        <div class="info-item">
                            <span class="item-left">子账号名称</span>
                            <span class="item-right">{{account.account}}</span>
                        </div>
                        <div class="info-item">
                            <span class="item-left">员工姓名</span>
                            <span class="item-right">{{account.name}}</span>
                        </div>
                        <div class="info-item">
                            <span class="item-left">联系电话</span>
                            <span class="item-right">{{account.mobile}}</span>
                        </div>
                        <div class="info-item">
                            <span class="item-left">账号角色</span>
                            <span class="item-right">{{account.role}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="text-align: center;">
                <el-button @click="dialog_info = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {dictionary} from '@/api/login'
    import request from '@/untils/request'
    import md5 from 'js-md5'

    export default {
        inject:['reload'],//注入reload方法
        data(){
            return{
                account:{
                    id:0,
                    account:"",
                    name:"",
                    password:"",
                    passwords:"",///
                    mobile:"",
                    role:"",//
                    roleid:0,
                    state:0
                },
                search:{
                    account:"",//子账号名称
                    roleId:0,//角色信息
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
                },
                roles:[],//角色信息
                dialog_edit: false,
                dialog_info: false
            }
        },
        created(){
            this.init_role();//初始化角色信息
            this.search_list();//列表数据初始化
        },
        methods:{
            init_role(){
                return request({
                    method:'get',
                    url:'mai-meng-cloud/role',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:{
                        page:0,
                        size:1000
                    }
                }).then((res)=>{
                    if(res.data.code=="200"){
                        for(let i=0;i<res.data.data.list.length;i++){
                            let role={
                                "id":res.data.data.list[i].id,
                                "name":res.data.data.list[i].name
                            }
                            this.roles.push(role);
                        }
                    }else{
                        this.$message.error('数据初始化失败，请刷新重试');
                    }
                }).catch((error=>{
                    this.$message.error('数据初始化失败，请刷新重试');
                }));
            },
            change_role(e){
                this.search.roleId=parseInt(e.target.value);
            },
            select_role(e){
                this.account.roleid=parseInt(e.target.value);
            },
            search_data(){
                this.search.page=0;
                this.search_list();
            },
            search_list(){
                let params={
                    account:this.search.account,
                    page:this.search.page,
                    size:this.search.size
                };
                if(this.search.roleId>0){
                    params.roleId=this.search.roleId;
                }
                return request({
                    method:'get',
                    url:'mai-meng-cloud/user',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:params
                }).then((res)=>{
                    if(res.data.code=="200"){
                        this.list.data=res.data.data.list;
                        this.list.totalCount=res.data.data.totalCount;
                        this.list.totalPage=res.data.data.totalPage;
                        this.set_pagers(this.search.page,this.list.totalPage);
                    }else{
                        this.$message.error('数据异常，请刷新重试');
                    }
                }).catch((error=>{
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
            subaccount_add(){
                this.account.id=0;
                this.account.account="";
                this.account.name="";
                this.account.password="";
                this.account.mobile="";
                this.account.roleid=0;
                this.account.role="";
                this.account.state=0;

                this.dialog_edit=true;
            },
            subaccount_edit(id,account,name,mobile,roleid){
                this.account.id=id;
                this.account.account=account;
                this.account.name=name;
                this.account.mobile=mobile;
                this.account.roleid=roleid;

                this.dialog_edit=true;
            },
            subaccount_info(id,account,name,mobile,role){
                this.account.id=id;
                this.account.account=account;
                this.account.name=name;
                this.account.mobile=mobile;
                this.account.role=role;

                this.dialog_info=true;
            },
            subaccount_del(id,state){
                return request({
                    method:'put',
                    url:'/mai-meng-cloud/user',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    transformRequest: [function(data) {
                        data = JSON.stringify(data)
                        return data
                    }],
                    data:{
                        "id":id,
                        "state":state
                    }
                }).then((res)=>{
                    if(res.data.code=="200"){
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        this.search_list();
                    }else{
                        this.$message.error('操作失败');
                    }
                }).catch((error=>{
                    this.$message.error('操作失败');
                }));
            },
            subaccount_save(){
                if(this.account.id==0){
                    //数据校验
                    let validate=true;
                    if(this.account.account==""){
                        validate=false;
                        this.$message({
                            type: 'warning',
                            message: '请输入子账号名称!'
                        });
                    }else if(this.account.password==""){
                        validate=false;
                        this.$message({
                            type: 'warning',
                            message: '请输入子账号密码!'
                        });
                    }else if(this.account.password!=this.account.passwords){
                        validate=false;
                        this.$message({
                            type: 'warning',
                            message: '两次密码不一致!'
                        });
                    }else if(this.account.name==""){
                        validate=false;
                        this.$message({
                            type: 'warning',
                            message: '请输入员工姓名!'
                        });
                    }else if(this.account.roleid==0){
                        validate=false;
                        this.$message({
                            type: 'warning',
                            message: '请选择账号角色!'
                        });
                    }

                    //数据提交
                    if(validate){
                        return request({
                            method:'post',
                            url:'/mai-meng-cloud/user',
                            headers: {
                                'Content-Type': 'application/json; charset=UTF-8'
                            },
                            transformRequest: [function(data) {
                                data = JSON.stringify(data);
                                return data
                            }],
                            data:{
                                "account":this.account.account,
                                "name":this.account.name,
                                "password":md5(this.account.password),
                                "mobile":this.account.mobile,
                                "roleId":this.account.roleid,
                                "state":this.account.state
                            }
                        }).then((res)=>{
                            if(res.data.code=="200"){
                                this.$message({
                                    type: 'success',
                                    message: '操作成功'
                                });
                                this.search_list();
                            }else{
                                this.$message.error('操作失败');
                            }
                            this.dialog_edit=false;
                        }).catch((error=>{
                            this.$message.error('操作失败');
                        }));
                    }
                }else{
                    //数据校验
                    let validate=true;

                    if(this.account.name==""){
                        validate=false;
                        this.$message({
                            type: 'warning',
                            message: '请输入员工姓名!'
                        });
                    }else if(this.account.roleid==0){
                        validate=false;
                        this.$message({
                            type: 'warning',
                            message: '请选择账号角色!'
                        });
                    }

                    //数据提交
                    if(validate){
                        return request({
                            method:'put',
                            url:'/mai-meng-cloud/user',
                            headers: {
                                'Content-Type': 'application/json; charset=UTF-8'
                            },
                            transformRequest: [function(data) {
                                data = JSON.stringify(data);
                                return data;
                            }],
                            data:{
                                "id":this.account.id,
                                "account":this.account.account,
                                "name":this.account.name,
                                "mobile":this.account.mobile,
                                "roleId":this.account.roleid
                            }
                        }).then((res)=>{
                            if(res.data.code=="200"){
                                this.$message({
                                    type: 'success',
                                    message: '操作成功'
                                });
                                this.search_list();
                                this.reload();
                            }else{
                                this.$message.error('操作失败');
                            }
                            this.dialog_edit=false;
                        }).catch((error=>{
                            this.$message.error('操作失败');
                        }));
                    }
                }
            }
        }
    }
</script>

<style>
    @import "../../style/main-common.css";

    .subaccount-edit .main-edit{
        min-height: 100px !important;
    }
    .subaccount-edit .dialog-footer{
        text-align: center;
    }
    .subaccount-edit .el-button--primary{
        background-color: #007bc4;
        border:1px solid #007bc4;
    }
    .subaccount-edit .el-button--primary:hover{
        background-color: #046dac;
        border:1px solid #046dac;
    }
    .subaccount-edit .el-button--default:hover{
        color: #1f2d3d;
        background-color: #eaeaea;
        border:1px solid #c4c4c4;
    }
    .subaccount-edit .btn-small{
        width:140px !important
    }
</style>
