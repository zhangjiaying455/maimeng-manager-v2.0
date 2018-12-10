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
                            <input type="text" value="" class="txt-common" placeholder="标签不能超过10个字符" v-model="role.name">
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="item-left font-black" style="vertical-align: top;">角色描述</span>
                        <span class="item-right">
                            <textarea rows="5" cols="30" class="txt-area role-remark" placeholder="请输入角色描述，描述信息不能超过100个字符" v-model="role.sign"></textarea>
                        </span>
                    </div>
                </div>
                <div class="line"></div>
            </div>
            <div class="edit-box">
                <h6><span></span>角色权限</h6>
                <div class="box-info">
                    <button type="button" class="btn-defined" @click="edit_menus">{{role.menus.length>0?"修改":"添加"}}权限</button>
                    <div class="roles-list" v-if="role.menus.length>0">
                        <ul>
                            <li v-for="item in role.menus">
                                <h5>{{item.name}}</h5>
                                <template v-if="item.childMenus.length>0">
                                    <span v-for="child in item.childMenus"><i></i>{{child.name}}</span>
                                </template>
                            </li>
                        </ul>
                    </div>
                    <div class="roles-list-empty" v-else>角色暂未获得任何权限，请点击为角色添加权限</div>
                    <button type="button" class="btn-common" @click="cancel" style="margin-right: 20px;">取消</button>
                    <button type="button" class="btn-submit" @click="save">保存</button>
                </div>
            </div>
            <!--权限编辑-->
            <el-dialog class="role-power" title="选择权限" :visible.sync="dialog_menus">
                <div class="power-list">
                    <div class="list-left">
                        <ul>
                            <li v-for="item in menus.level1" @click="select_menus(item.groupId)" v-bind:id="item.groupId" name="menus-level1">
                                <input type="checkbox" v-bind:value="item.id" name="checkbox" data-group="1" v-bind:data-name="item.name" v-bind:data-gid="item.groupId" @click="check_menus(item.groupId)"> {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="list-right">
                        <ul v-for="item in menus.level2"  v-bind:id="'m-'+item.pid" style="display:none;" name="menus-level2">
                            <li v-for="child in item.data">
                                <input type="checkbox" v-bind:value="child.id" name="checkbox" data-group="2" v-bind:data-name="child.name" v-bind:data-pid="item.pid" @click="check_menu(item.pid)"> {{child.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="clear"></div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialog_menus = false">取消</el-button>
                    <el-button type="primary" @click="save_menus">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {dictionary} from '@/api/login'
    import request from '@/untils/request'

    export default {
        data(){
            return {
                role:{
                    id:0,//角色ID
                    name:"",//角色名称
                    sign:"",//角色描述
                    menus:[],//角色权限
                    menu_list:[]//角色权限集合
                },
                menus:{
                    level1:[],
                    level2:[]
                },
                dialog_menus: false
            };
        },
        created(){
            //初始化角色id，0表示新增，其他表示修改
            this.role.id=this.$route.query.id==undefined?0:this.$route.query.id;

            //初始化角色信息
            if(this.role.id==0){
                this.role.name="";
                this.role.sign="";
                this.role.menus=[];
                this.role.menu_list=[];
            }else{
                this.init_role();
            }

            //初始化权限信息集合
            if(this.menus.level1.length<=0){
                this.get_menus(0);
            }
        },
        methods:{
            init_role(){
                return request({
                    method:'get',
                    url:'mai-meng-cloud/role/'+this.role.id,
                }).then((res)=>{
                    if(res.data.code=="200"){
                        this.role.name=res.data.data.role.name;
                        this.role.sign=res.data.data.role.sign;
                        if(res.data.data.menus.length>0){
                            for(let i=res.data.data.menus.length-1;i>=0;i--){
                                this.role.menus.push(res.data.data.menus[i]);
                                this.role.menu_list.push(res.data.data.menus[i].id);
                                if(res.data.data.menus[i].childMenus.length>0){
                                    for(let j=0;j<res.data.data.menus[i].childMenus.length;j++){
                                        this.role.menu_list.push(res.data.data.menus[i].childMenus[j].id);
                                    }
                                }
                            }
                        }else{
                            this.role.menus=res.data.data.menus;
                            this.role.menu_list=[];
                        }
                    }else{
                        this.$message.error('数据异常，请刷新重试');
                    }
                }).catch((error=>{
                    this.$message.error('数据异常，请刷新重试');
                }));
            },
            edit_menus(){
                if(this.role.menus.length>0){
                    let boxs=document.getElementsByName("checkbox");
                    for(let i=0;i<this.role.menu_list.length;i++){
                        for(let k=0;k<boxs.length;k++){
                            if(boxs[k].value==this.role.menu_list[i]){
                                boxs[k].checked=true;
                            }
                        }
                    }
                }else{
                    let chklist=document.getElementsByName("checkbox");
                    for(let i=0;i<chklist.length;i++){
                        chklist[i].checked=false;
                    }

                    for(let n=0;n<document.getElementsByName("menus-level2").length;n++){
                        document.getElementsByName("menus-level2")[n].style.display="none";
                    }

                    for(let m=0;m<document.getElementsByName("menus-level1").length;m++){
                        document.getElementsByName("menus-level1")[m].className="";
                    }
                }

                this.dialog_menus=true;
            },
            select_menus(id){
                let menu=document.getElementById(id);

                for(let i=0;i<menu.parentElement.children.length;i++){
                    menu.parentElement.children[i].className="";
                }
                menu.className="current";

                for(let n=0;n<document.getElementsByName("menus-level2").length;n++){
                    document.getElementsByName("menus-level2")[n].style.display="none";
                }
                document.getElementById("m-"+id).style.display="block";
            },
            check_menus(id){
                let obj=document.getElementById(id).children[0];
                let checkbox=document.getElementById("m-"+id).getElementsByTagName("input");

                if(obj.checked){
                    for(let m=0;m<checkbox.length;m++){
                        checkbox[m].checked=true;
                    }
                }else{
                    for(let m=0;m<checkbox.length;m++){
                        checkbox[m].checked=false;
                    }
                }
            },
            check_menu(id){
                let checkbox=document.getElementById("m-"+id).getElementsByTagName("input");
                let checked=0,unchecked=0;
                for(let m=0;m<checkbox.length;m++){
                    if(checkbox[m].checked){
                        checked++;
                    }else{
                        unchecked++;
                    }
                }
                if(checked>0){
                    document.getElementById(id).children[0].checked=true;
                }

                if(unchecked==checkbox.length){
                    document.getElementById(id).children[0].checked=false;
                }
            },
            get_menus(id){
                return request({
                    method:'get',
                    url:'mai-meng-cloud/menu',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:{
                        parentId:id,
                    }
                }).then((res)=>{
                    if(res.data.code=="200"){
                        if(id==0){
                            this.menus.level1=res.data.data;
                            for(let i=0;i<res.data.data.length;i++){
                                this.get_menus(res.data.data[i].groupId);
                            }
                        }else{
                            this.menus.level2.push({
                                pid:id,
                                data:res.data.data
                            });
                        }
                    }else{
                    }
                }).catch((error=>{
                }));
            },
            save_menus(){
                this.role.menus=[];
                this.role.menu_list=[];
                let chklist=document.getElementsByName("checkbox");
                for(let i=0;i<chklist.length;i++){
                    if(chklist[i].checked){
                        if(chklist[i].getAttribute("data-group")=="1"){
                            this.role.menus.push({
                                id:chklist[i].value,
                                name:chklist[i].getAttribute("data-name"),
                                group:chklist[i].getAttribute("data-gid"),
                                childMenus:[]
                            });
                        }else{
                            for(let j=0;j<this.role.menus.length;j++){
                                if(this.role.menus[j].group==chklist[i].getAttribute("data-pid")){
                                    this.role.menus[j].childMenus.push({
                                        id:chklist[i].value,
                                        name:chklist[i].getAttribute("data-name"),
                                    });
                                }
                            }
                        }
                        this.role.menu_list.push(chklist[i].value);
                    }
                }
                this.dialog_menus=false;
            },
            save(){
                //数据校验
                let validate=true;
                if(this.role.name==""){
                    validate=false;
                    this.$message({
                        type: 'warning',
                        message: '请输入角色名称!'
                    });
                }
                //数据提交
                if(validate){
                    if(this.role.id==0){
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
                                "menuIds":this.role.menu_list
                            }
                        }).then((res)=>{
                            if(res.data.code=="200"){
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.cancel();
                            }else{
                                this.$message.error('添加失败');
                            }
                        }).catch((error=>{
                            this.$message.error('添加失败');
                        }));
                    }else{
                        return request({
                            method:'put',
                            url:'/mai-meng-cloud/role',
                            headers: {
                                'Content-Type': 'application/json; charset=UTF-8'
                            },
                            transformRequest: [function(data) {
                                data = JSON.stringify(data);
                                return data;
                            }],
                            data:{
                                "id":this.role.id,
                                "name":this.role.name,
                                "sign":this.role.sign,
                                "menuIds":this.role.menu_list
                            }
                        }).then((res)=>{
                            if(res.data.code=="200"){
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                });
                                this.cancel();
                            }else{
                                this.$message.error('修改失败');
                            }
                        }).catch((error=>{
                            this.$message.error('修改失败');
                        }));
                    }
                }
            },
            cancel(){
                this.$router.push({
                    path:'/role'
                })
            },
        }
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
