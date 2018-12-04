<template>
 <el-form>
     <el-form-item class="el-select_content">
         <span class="test">关键字<input class="input_box" type="text"/></span>
         <span>配置状态</span>
         <el-select v-model="value" placeholder="请选择">
             <el-option
                 v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
             </el-option>
         </el-select>
         <span>时间范围</span>
             <el-date-picker
                 v-model="value1"
                 type="date"
                 placeholder="选择日期">
             </el-date-picker>
            <i></i><!--刷新图标区-->
         <el-button type="primary">查询</el-button>
     </el-form-item>
     <el-table
         :data="tableData"
         border
         style="width: 98%;padding: 10px;margin:10px auto;text-align: center">
         <el-table-column
             style="text-align: center"
             prop="date"
             label="人群ID">
         </el-table-column>
         <el-table-column
             prop="name"
             label="人群名称">
         </el-table-column>
         <el-table-column
             prop="address"
             label="人群类型">
         </el-table-column>
         <el-table-column
             prop="time"
             label="创建时间">
         </el-table-column>
         <el-table-column
             prop="state"
             label="配置状态">
         </el-table-column>
         <el-table-column
             prop="address"
             label="操作">
             <template slot-scope="scope">
                 <el-button type="text" size="small">扩展</el-button>
             </template>
         </el-table-column>
         <el-table-column
             prop="address"
             label="导入平台">
             <template slot-scope="scope">
                 <el-button  type="text" size="small">投放</el-button>
                 <el-button type="text" size="small">外呼</el-button>
                 <el-button type="text" size="small">客户</el-button>
             </template>
         </el-table-column>
     </el-table>
     <div class="pagination_content">
         <el-pagination
             class="pagination"
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
             :current-page="currentPage4"
             :page-sizes="[10, 20, 30, 40]"
             :page-size="100"
             layout=" sizes, prev, pager, next,total, jumper"
             :total="400">
         </el-pagination>
     </div>
 </el-form>
</template>

<script>
    export default {
        data() {
            return {
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                tableData: [{
                    date: '1',
                    name: '少儿英语人群包',
                    address: '通用人群',
                    time:'2018-06-01',
                    state:'创建成功'
                }, {
                    date: '2',
                    name: 'Tutor-成人人群包',
                    address: '投放人群',
                    time:'2018-08-20',
                    state:'创建失效'
                }, {
                    date: '3',
                    name: '火花思维线索人群包',
                    address: '线索人群',
                    time:'2018-09-12',
                    state:'创建成功'
                }, {
                    date: '4',
                    name: '魔奇青少英语人群包',
                    address: '线索人群',
                    time:'2018-09-30',
                    state:'创建成功'
                },{
                    date: '5',
                    name: ' VipJR少儿英语线索包',
                    address: '线索人群',
                    time:'2018-09-30',
                    state:'创建中'
                }],
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value:"",
                value1: '',
                value2: '',
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }]
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },

    }
</script>

<style lang="less">
    .el-row {
        /*margin-bottom: 20px;*/
        &:last-child {
            /*margin-bottom: 0;*/
        }
    }
    .el-col {
        /*border-radius: 4px;*/
    }
    .bg-purple-dark {
        background: #fff;
    }
    .bg-purple {
        background: #fff;
        height: 36px;
        line-height: 36px;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        /*border-radius: 4px;*/
        min-height: 36px;
    }
    .row-bg {
        /*padding: 10px 0;*/
        background-color: #f9fafc;
    }
    .keyword{
        right: 0;
        width: 75%;
        height: 25px;
        line-height: 25px;
        border-radius: 2px;
        border: 1px solid #f6f6f6;
    }
    .keyw{
       position: relative;
    }
    .el-table th>.cell{
        text-align: center;
    }
    .pagination_content{
        width: 100%;
        position: relative;
    }
    .pagination{
        position: absolute;
        right:35px;
    }
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
        height: 50px;
        line-height: 50px;
        width: 98%;
        background: #fff;
        margin: 10px;
    }
    .el-col{min-height: 100%}
    .test{padding-left:30px}
    .el-col-20{min-height:100%;background: #f6f6f6}
    .el-form-item__content {
        line-height: 50px;
        height: 60px;
    }
</style>
