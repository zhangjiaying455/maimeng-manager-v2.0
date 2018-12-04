<template>
    <div class="security_box">
     <el-form>
         <el-breadcrumb  separator=">" class="headerTop">
             <el-breadcrumb-item  v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
         </el-breadcrumb>
         <el-form class="security_content">
             <el-form-item class="el-select_content">
                 <span class="test">角色ID <input class="input_box" type="text" PLACEHOLDER="请输入角色暗号"/></span>
                 <span class="test">角色名称 <input class="input_box" type="text" PLACEHOLDER="请输入角色名称"/></span>
                 <i></i><!--刷新图标区-->
                 <el-button type="primary">查询</el-button>
                 <el-button>重置</el-button>
             </el-form-item>
             <el-form-item class="new-box">
                 <router-link to="/createRole"></router-link>
                 <el-button class="add-role" @click="role">新建角色</el-button>
                 <div>
                     <router-view></router-view>
                 </div>
                 <div class="table_box">
                     <el-table
                         :data="tableData"
                         border
                         style="width: 100%;padding: 10px;margin:60px auto;text-align: center">
                         <el-table-column
                             style="text-align: center"
                             prop="date"
                             label="角色ID"
                             width="100">
                         </el-table-column>
                         <el-table-column
                             prop="name"
                             label="角色名称"
                             width="150">
                         </el-table-column>
                         <el-table-column
                             prop="address"
                             label="角色分类"
                             width="150">
                         </el-table-column>
                         <el-table-column
                             prop="time"
                             label="角色描述"
                             width="150">
                         </el-table-column>
                         <el-table-column
                             prop="state"
                             label="创建时间">
                         </el-table-column>
                         <el-table-column
                             prop="modification"
                             label="修改时间">
                         </el-table-column>
                         <el-table-column
                             prop="address"
                             label="操作">
                             <template slot-scope="scope">
                                 <el-button  type="text" size="small">查看</el-button>
                                 <el-button type="text" size="small">编辑</el-button>
                                 <el-button type="text" size="small" @click="del">删除</el-button>
                             </template>
                         </el-table-column>
                     </el-table>
                 </div>
             </el-form-item >
         </el-form>

     </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                tableData: [{
                    date: '351',
                    name: '1',
                    address: '客服',
                    time:'1',
                    state:'2018-11-18 11:20:12',
                    modification:'2018-11-18 11:20:12'

                }],
            }
        },
        methods:{
              del() {
                debugger;
                this.$confirm('确认删除该角色','提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    });
                }).catch(() => {

                });

            },
              role(){
                  this.$router.push({path:'/createRole'})
             }
        }

    }
</script>

<style lang="less">
    @import '../../style/mixin';
    .security_box{background: #f6f6f6}
    .headerTop{width:100%;height:40px;line-height: 40px;background: #f6f6f6;padding:0 15px;box-sizing: border-box}
    .input_box{
        border:1px solid #bfcbd9;
        height:25px;
        border-radius: 4px;
        padding-left:5px;
    }
    .el-input__inner{
        height: 27px;
    }
    .el-select_content{
        height: 58px;
        line-height: 58px;
        width: 100%;
        background: #fff;
        /*margin: 10px;*/
    }
    .el-col{min-height: 100%}
    .test{padding-left:30px}
    .el-col-20{min-height:100%;background: #f6f6f6}
    .el-form-item__content {
        line-height: 58px;
        height: 58px;
    }
    .cell{text-align: center}
    .el-table--fit{padding:0 !important;height:826px;width:97% !important;}
    .new-box{width:100%;height:60px;line-height:60px;display: inline-block;background:#ffffff;position: relative;}
    .add-role{margin-left: 10px !important;position: absolute;right:15px;top:13px;display: inline-block;border: 1px solid #007bc4;color: #007bc4}
    .table_box{width:100%;background: #ffffff}
</style>
