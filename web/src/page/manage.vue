<template>
    <div class="containers">
        <div class="head">
            <div class="left">
                <img src="../images/top-logo.png">
            </div>
            <div class="right">
                <div class="right-box">
                    <div class="right-inner">
                        <div class="user">
                            <span class="user-icon"></span>
                            <span class="user-info">{{username}}</span>
                        </div>
                        <a href="javascript:void(0)" class="logout" v-on:click="loginOut()" menu-align='start'></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="box">
            <div class="content">
                <!--主体内容-->
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
                <div class="bottom">
                    <span>Copyright&copy;2018 麦盟科技maimenggroup版权所有</span>
                </div>
            </div>
            <div class="aside">
                <!--左侧菜单-->
                <el-menu unique-opened :default-active="defaultActive" theme="dark" router class="menu-list">
                    <el-menu-item class="menu-font" index="manage">
                        <i class="alignment iconfont icon-shouye"></i><span class="text">首页</span>
                    </el-menu-item>
                    <el-submenu  index="2">
                        <template slot="title">
                            <i class="alignment iconfont icon-yewu"></i><span class="text">营销管理</span>
                        </template>
                        <el-menu-item index="business">业务需求</el-menu-item>
                        <el-menu-item index="clue_management">线索管理</el-menu-item>
                        <el-menu-item index="monitoring">数据监测</el-menu-item>
                        <el-menu-item index="bordereaux">业务报表</el-menu-item>
                    </el-submenu>
                   <!-- <el-submenu index="3" >
                        <template slot="title">
                            <i class="alignment iconfont icon-digital"></i><span class="text">数据管理</span>
                        </template>
                        <el-menu-item index="MmDataSource">麦盟大数据</el-menu-item>
                        <el-menu-item index="cooperativeDataSource">合作数据源</el-menu-item>
                        <el-menu-item index="labelFeatureManagement">数据洞察</el-menu-item>
                        <el-menu-item index="modelDataManagement">人群挖掘</el-menu-item>
                        <el-menu-item index="crowdPackManagement">人群管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="alignment iconfont icon-ziyuan"></i><span class="text">模型管理</span>
                        </template>
                        <el-menu-item index="newModel">新建模型</el-menu-item>
                        <el-menu-item index="modelTraining">模型训练</el-menu-item>
                        <el-menu-item index="modelToEvaluate">模型评估</el-menu-item>
                        <el-menu-item index="modelToPredict">模型预测</el-menu-item>
                        <el-menu-item index="modelOutput">模型输出</el-menu-item>
                    </el-submenu>
                    <el-submenu  index="5">
                        <template slot="title">
                            <i class="alignment iconfont icon-touch_app"></i><span class="text">触达系统</span>
                        </template>
                        <el-menu-item index="statistical">智能外呼</el-menu-item>
                        <el-menu-item index="call_center">呼叫中心</el-menu-item>
                        <el-menu-item index="platform">投放平台</el-menu-item>
                        <el-menu-item index="sms_touch">短信触达</el-menu-item>
                    </el-submenu>-->
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="alignment iconfont icon-shezhi"></i><span class="text">账号管理</span>
                        </template>
                        <el-menu-item index="certification">企业认证</el-menu-item>
                        <el-menu-item index="security">账号安全</el-menu-item>
                        <el-menu-item index="role">角色管理</el-menu-item>
                        <el-menu-item index="subaccount">子账号管理</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </div>
    </div>
</template>

<script>
    import {signout} from '@/api/getData'
    import {baseImgPath} from '@/config/env'
    import {mapActions, mapState} from 'vuex'
    export default {
        data(){

            return {
                baseImgPath,
                username:''
            }
        },
        created(){
            debugger
            this.username=sessionStorage.getItem('username')

        },
        computed: {
            ...mapState(['adminInfo']),
            defaultActive: function(){
                return this.$route.path.replace('/', '');
            }
        },
        methods: {
            ...mapActions(['getAdminData']),
              loginOut() {
                  this.$confirm('是否退出登录', {
                      confirmButtonText: '退出',
                      cancelButtonText: '取消',
                      type: 'warning'
                  }).then(() => {
                      this.$message({
                          type: 'success',
                          message: '退出成功!',
                      });
                      this.$router.push('/');
                  }).catch(() => {

                  });

            }
        },
    }
</script>
<style lang="less" scoped>
    @import '../style/normalize.min.css';
    @import '../style/main-common.css';
    /*aside-menu-list*/
    .containers .aside .menu-list{
        padding: 20px 0;
    }
    .containers .aside .menu-list .text{
        color: #bfcbd9;
        font-size: 18px;
    }
    .containers .aside .menu-list .iconfont{
        color: #bfcbd9;
        font-size: 18px;
        margin-right: 10px;
    }
    .containers .aside .menu-list .el-menu .el-menu-item{
        padding-left: 50px !important;
    }
</style>

