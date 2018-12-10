<template>
    <el-form>
        <el-form-item class="el-select_content">
            <span class="test">拼配名称<input class="input_box" type="text"/></span>
            <span>需求状态</span>
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
                label="序号">
            </el-table-column>
            <el-table-column
                prop="name"
                label="需求名称">
            </el-table-column>
            <el-table-column
                prop="address"
                label="归属品牌">
            </el-table-column>
            <el-table-column
                prop="time"
                label="发布时间">
            </el-table-column>
            <el-table-column
                prop="state"
                label="需求状态">
            </el-table-column>
            <el-table-column
                prop="address"
                label="查看详情">
                <template slot-scope="scope">
                    <el-button type="text" size="small">详情</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作">
                <template slot-scope="scope">
                    <el-button  type="text" size="small">管理</el-button>
                    <el-button type="text" size="small">模型</el-button>
                    <el-button type="text" size="small">数据</el-button>
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
                    name: '瑞斯总部招生线索需求',
                    address: '瑞斯学科英语',
                    time:'2018-06-01',
                    state:'生产中'
                }, {
                    date: '2',
                    name: 'TutorABC京东投放',
                    address: 'TutorABC',
                    time:'2018-08-20',
                    state:'生产中'
                }, {
                    date: '3',
                    name: '火花思维',
                    address: '线索人群',
                    time:'2018-09-12',
                    state:'建模'
                }, {
                    date: '4',
                    name: 'VipJR少儿英语招生线索需求',
                    address: 'VipJR',
                    time:'2018-09-30',
                    state:'审核'
                },{
                    date: '5',
                    name: ' VipJR成人英语招生线索需求',
                    address: 'VipJR',
                    time:'2018-09-30',
                    state:'审核'
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
                value:'',
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
            },
            handleCurrentChange(val) {
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
    }
    .el-input__inner{
        height: 27px;
    }
    .el-select_content{
        height: 50px;
        line-height: 50px;
        width: 100%;
        background: #fff;
        /*margin: 10px;*/
    }
    .el-col{min-height: 100%}
    .test{padding-left:30px}
    .el-col-20{min-height:100%;background: #f6f6f6}
    .el-form-item__content {
        line-height: 50px;
        height: 60px;
    }
</style>
