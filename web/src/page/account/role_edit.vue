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
                        <span class="item-left font-black"><span>*</span>角色名称</span>
                        <span class="item-right">
                            <input type="text" value="" class="txt-common" placeholder="标签不能超过10个字符" v-model="this.role.name">
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black" style="vertical-align: top;">角色描述</span>
                        <span class="item-right">
                            <textarea rows="5" cols="30" class="txt-area role-remark" placeholder="请输入角色描述，描述信息不能超过100个字符" v-model="this.role.sign"></textarea>
                        </span>
                    </div>
                </div>
                <div class="line"></div>
            </div>
            <div class="edit-box">
                <h6><span></span>角色权限</h6>
                <div class="box-info">
                    <button type="button" class="btn-defined" @click="dialogTableVisible = true">添加权限</button>
                    <div class="roles-list-empty">角色暂未获得任何权限，请点击为角色添加权限</div>
                    <!--<div class="roles-list">
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
                    </div>-->
                    <button type="button" class="btn-common" @click="cancel" style="margin-right: 20px;">取消</button>
                    <button type="button" class="btn-submit" @click="save">保存</button>
                    <button type="button" class="btn-submit" @click="save_add" style="margin-left: 30px;">保存-add</button>
                    <button type="button" class="btn-submit" @click="save_update" style="margin-left: 30px;">保存-update</button>
                    <button type="button" class="btn-submit" @click="get_menu" style="margin-left: 30px;">获取菜单</button>
                </div>
            </div>
            <!--权限编辑-->
            <el-dialog class="role-power" title="选择权限" :visible.sync="dialogTableVisible">
                <div class="power-list">
                    <div class="list-left">
                        <ul>
                            <li class="current">
                                <input type="checkbox" value="0"> 首页
                            </li>
                            <li>
                                <input type="checkbox" value="1"> 营销管理 <span class="glyphicon glyphicon-chevron-right"></span>
                            </li>
                            <li>
                                <input type="checkbox" value="2"> 数据管理 <span class="glyphicon glyphicon-chevron-right"></span>
                            </li>
                            <li>
                                <input type="checkbox" value="3"> 模型管理 <span class="glyphicon glyphicon-chevron-right"></span>
                            </li>
                            <li>
                                <input type="checkbox" value="4"> 触达系统 <span class="glyphicon glyphicon-chevron-right"></span>
                            </li>
                            <li>
                                <input type="checkbox" value="5"> 账号管理 <span class="glyphicon glyphicon-chevron-right"></span>
                            </li>
                        </ul>
                    </div>
                    <div class="list-right">
                        <ul id="m-1" style="display: none;">
                            <li>
                                <input type="checkbox" value="0"> 业务需求
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 线索管理
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 数据监测
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 业务报表
                            </li>
                        </ul>
                        <ul id="m-2" style="display: none;">
                            <li>
                                <input type="checkbox" value="0"> 麦盟大数据
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 合作数据源
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 数据洞察
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 人群挖掘
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 人群管理
                            </li>
                        </ul>
                        <ul id="m-3" style="display: none;">
                            <li>
                                <input type="checkbox" value="0"> 新建模型
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 模型训练
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 模型评估
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 模型预测
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 模型输出
                            </li>
                        </ul>
                        <ul id="m-4" style="display: none;">
                            <li>
                                <input type="checkbox" value="0"> 智能外呼
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 投放平台
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 短信触达
                            </li>
                        </ul>
                        <ul id="m-5" style="display: none;">
                            <li>
                                <input type="checkbox" value="0"> 企业认证
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 账号安全
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 角色管理
                            </li>
                            <li>
                                <input type="checkbox" value="0"> 子账号管理
                            </li>
                        </ul>
                    </div>
                    <div class="clear"></div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
                </div>
            </el-dialog>
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
            return {
                role:{
                    id:0,//角色ID
                    name:"",//角色名称
                    sign:"",//角色描述
                    menus:[]//角色权限
                },
                dialogTableVisible: false
            };
        },
        created(){

        },
        mounted(){},
        methods:{
            cancel(){
                this.$router.push({
                    path:'/role'
                })
            },
            save(){

            },
            save_add(){
                debugger

                this.role.name="测试";
                this.role.sign="测试";
                this.role.menus=[1,2,3,4,5,6,7,8,9];

                return request({
                    method:'post',
                    url:'/mai-meng-cloud/role',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    transformRequest: [function(data) {
                        data = JSON.stringify(data)
                        return data
                    }],
                    data:{
                        "name":this.role.name,
                        "sign":this.role.sign,
                        "menuIds":this.role.menus
                    }
                }).then((res)=>{
                    debugger
                    console.log(res.data)
                }).catch((error=>{
                    debugger
                    console.log(error)
                }));
            },
            save_update(){
                debugger

                this.role.id=2;
                this.role.name="测试1";
                this.role.sign="测试2";
                this.role.menus=[1,2,3];

                return request({
                    method:'put',
                    url:'/mai-meng-cloud/role',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    transformRequest: [function(data) {
                        data = JSON.stringify(data)
                        return data
                    }],
                    data:{
                        "id":this.role.id,
                        "name":this.role.name,
                        "sign":this.role.sign,
                        "menuIds":this.role.menus
                    }
                }).then((res)=>{
                    debugger
                    console.log(res.data)
                }).catch((error=>{
                    debugger
                    console.log(error)
                }));
            },
            get_menu(){
                debugger
                return request({
                    method:'get',
                    url:'mai-meng-cloud/menu',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:{
                        parentId:0,
                    }
                }).then((res)=>{
                    debugger
                    console.log(res.data);
                }).catch((error=>{
                    debugger
                    console.log(error)
                }));
            }
        },
        computed:{}
    }
</script>

<style>
    @import "../../style/main-common.css";
    @import "../../style/main-role.css";
    .dialog-footer{
        text-align: center;
    }
    .el-button--primary{
        background-color: #007bc4;
        border:1px solid #007bc4;
    }
    .el-button--primary:hover{
        background-color: #046dac;
        border:1px solid #046dac;
    }
    .el-button--default:hover{
        color: #1f2d3d;
        background-color: #eaeaea;
        border:1px solid #c4c4c4
    }
</style>
