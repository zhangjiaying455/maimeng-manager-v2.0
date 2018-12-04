<template>
    <div class="createrole_box">
                <el-breadcrumb  separator=">" class="headerTop">
                    <el-breadcrumb-item  v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
                </el-breadcrumb>
        <el-form class="create_content">
        <el-form-item class="role-info">
            <i class="vertical-bar"></i><span class="role-name">角色管理</span>
        </el-form-item>
        <el-form-item class="character_box">
            <span>角色名称</span><input class="character_name" type="text" placeholder="标签不能超过10个字"/>
            <span class="classification_name">角色分类</span><select  class="character_name col"><option>请选择</option><option>2</option><option>2</option></select>
        </el-form-item>
        <el-form-item class="desc_box">
            <span>角色描述</span>
            <el-input
                class="desc"
                type="textarea"
                placeholder="请输入角色描述，角色描述不能超过100个字。"
                v-model="textarea2"
                resize="none">
            </el-input>
            <div class="count_box">
                <i class="count">0/100</i>
            </div>
            <i class="line"></i>
        </el-form-item>
        <el-form-item class="role-info">
            <i class="vertical-bar"></i><span class="role-name">角色权限</span>
            <el-button class="add_permissions" @click="dialogFormPassword = true">添加权限</el-button>
            <!--添加权限弹窗功能-->
            <!--<Organization></Organization>-->
            <el-dialog class="select_permissions"  title="选择权限" :visible.sync="dialogFormPassword">
                <div class="clearfix" style="text-align: left">
                    <div class="choose">
                        <!--<div class="title">
                            <label>
                                <input type="checkbox" @change="checkAll" :checked="chkAllStatus"/>
                                <span>所有</span>
                            </label>
                        </div-->
                        <div class="list">
                            <div v-for="item in list">
                                <div v-if="item.type ==='department' && item.children.length > 0">
                                    <label>
                                        <i :class="item.open ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" @click.stop.prevent="openNext(item)"></i>
                                        <input :data-name="item.name" :data-level="item.level" type="checkbox"  @change="selectItem" :checked="item.checked"/>
                                        <span>{{item.name}}</span>
                                    </label>
                                    <div v-show="item.open" v-for="childItem in item.children">
                                        <div class="child" v-if="childItem.type ==='department' && childItem.children.length > 0">
                                            <label>
                                                <i :class="childItem.open ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" @click.stop.prevent="openNext(childItem)"></i>
                                                <input :data-name="childItem.name" :data-level="childItem.level" type="checkbox"  @change="selectItem" :checked="childItem.checked"/>
                                                <span>{{childItem.name}}</span>
                                            </label>
                                            <div v-show="childItem.open" v-for="thirdItem in childItem.children">
                                                <div class="third" v-if="thirdItem.type ==='department' && thirdItem.children.length > 0">
                                                    <label>
                                                        <i class="el-icon-caret-right"></i>
                                                        <input :data-name="thirdItem.name" :data-level="thirdItem.level" type="checkbox" @change="selectItem" :checked="thirdItem.checked"/>
                                                        <span>{{thirdItem.name}}</span>
                                                    </label>
                                                </div>
                                                <div class="humanItem" v-else-if="thirdItem.type === 'human' && thirdItem.children.length === 0">
                                                    <label>
                                                        <input :data-name="thirdItem.name" :data-level="thirdItem.level" type="checkbox"  @change="selectItem" :checked="thirdItem.checked"/>
                                                        <span>{{thirdItem.name}}</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="humanItem" v-else-if="childItem.type === 'human' && childItem.children.length === 0">
                                            <label>
                                                <input :data-name="childItem.name" :data-level="childItem.level" type="checkbox" @change="selectItem" :checked="childItem.checked"/>
                                                <span>{{childItem.name}}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="humanItem single" v-else-if="item.type === 'human' && item.children.length === 0">
                                    <label>
                                        <input :data-name="item.name" :data-level="item.level" type="checkbox" @change="selectItem" :checked="item.checked"/>
                                        <span>{{item.name}}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="selected">
                      <!--  <div class="title">
                            <label>
                                &lt;!&ndash;<input type="checkbox" @change="checkAll" :checked="chkAllStatus"/>&ndash;&gt;
                                <span>选中:</span>
                            </label>
                        </div>-->
                        <div class="list">
                            <div v-for="item in list">
                                <div v-if="item.type ==='department' && item.children.length > 0">
                                    <label>
                                        <!--<i class="el-icon-caret-right" @click.stop.prevent="openNext"></i>-->
                                        <input :data-name="item.name" :data-level="item.level" type="checkbox"  @change="selectItem" :checked="item.checked" v-show="item.checked"/>
                                        <span v-show="item.checked">{{item.name}}(全体)</span>
                                    </label>
                                    <div v-show="!item.checked" v-for="childItem in item.children">
                                        <div class="child" v-if="childItem.type ==='department' && childItem.children.length > 0">
                                            <label>
                                                <!--<i class="el-icon-caret-right"></i>-->
                                                <input :data-name="childItem.name" :data-level="childItem.level" type="checkbox"  @change="selectItem" :checked="childItem.checked"  v-show="childItem.checked"/>
                                                <span v-show="childItem.checked">{{childItem.name}}(全体)</span>
                                            </label>
                                            <div v-show="!childItem.checked" v-for="thirdItem in childItem.children">
                                                <div class="third" v-if="thirdItem.type ==='department' && thirdItem.children.length > 0">
                                                    <label>
                                                        <!--<i class="el-icon-caret-right"></i>-->
                                                        <input :data-name="thirdItem.name" :data-level="thirdItem.level" type="checkbox" @change="selectItem" :checked="thirdItem.checked"  v-show="thirdItem.checked"/>
                                                        <span v-show="thirdItem.checked">{{thirdItem.name}}</span>
                                                    </label>
                                                </div>
                                                <div class="humanItem" v-else-if="thirdItem.type === 'human' && thirdItem.children.length === 0">
                                                    <label>
                                                        <input :data-name="thirdItem.name" :data-level="thirdItem.level" type="checkbox"  @change="selectItem" :checked="thirdItem.checked"  v-show="thirdItem.checked"/>
                                                        <span v-show="thirdItem.checked">{{thirdItem.name}}</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="humanItem" v-else-if="childItem.type === 'human' && childItem.children.length === 0">
                                            <label>
                                                <input :data-name="childItem.name" :data-level="childItem.level" type="checkbox" @change="selectItem" :checked="childItem.checked" v-show="childItem.checked"/>
                                                <span  v-show="childItem.checked">{{childItem.name}}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="humanItem" v-else-if="item.type === 'human' && item.children.length === 0">
                                    <label>
                                        <input :data-name="item.name" :data-level="item.level" type="checkbox" @change="selectItem" :checked="item.checked" v-show="item.checked"/>
                                        <span v-show="item.checked">{{item.name}}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div slot="footer" class="determine">
                    <el-button class="lengths" @click="dialogFormPassword = false">取 消</el-button>
                    <el-button class="lengths" type="primary" @click="dialogFormPassword = false">确定</el-button>
                </div>
            </el-dialog>
            <el-input
                class="desc permissions"
                type="textarea"
                placeholder="角色暂未获得任何权限，请点击为角色添加权限"
                v-model="textarea2"
                resize="none">
            </el-input>
            <div class="dialog-footer">
                <el-button class="cancel">取 消</el-button>
                <el-button class="cancel" type="primary">保存</el-button>
            </div>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
    // import Organization from '../../components/OrganizationTree/index'
    import organizationData from '../../components/OrganizationTree/fake'
    export default {
       /* components:{Organization},*/
        name: 'organization-tree',
        data(){
            return{
                value2: [],
                textarea2:'',
                dialogFormPassword: false,
                list: [],
                chkAllStatus: false
            }

        },
        created() {
            // 初始化数据 加入 level键标记
            for (let i = 0; i < organizationData.length; i++) {
                organizationData[i].level = 1
                organizationData[i].open = false
                if (organizationData[i].children.length > 0) {
                    for (let j = 0; j < organizationData[i].children.length; j++) {
                        organizationData[i].children[j].level = 2
                        organizationData[i].children[j].open = false
                        if (organizationData[i].children[j].children.length > 0) {
                            for (let k = 0; k < organizationData[i].children[j].children.length; k++) {
                                organizationData[i].children[j].children[k].level = 3
                                organizationData[i].children[j].children[k].open = false
                            }
                        }
                    }
                }
            }
            this.list = organizationData
        },
        watch: {
            list: {
                handler: function(val, oldVal) {
                    const _this = this
                    // 监听一级
                    if ((val.every(function(item) {
                        return item.checked
                    }))) {
                        this.chkAllStatus = true
                    } else {
                        this.chkAllStatus = false
                    }
                    // 监听二级
                    for (let i = 0; i < val.length; i++) {
                        // 独立一级跳过every监听二级的步骤
                        if (val[i].type === 'department') {
                            if ((val[i].children.every(function(item) {
                                return item.checked
                            }))) {
                                this.$set(_this.list[i], 'checked', true)
                            } else {
                                this.$set(_this.list[i], 'checked', false)
                            }
                        }
                    }
                },
                deep: true
            }
        },
        computed: {
            selectArray() {
                const Array = []
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].checked) {
                        Array.push(this.list[i])
                    } else {
                        for (let j = 0; j < this.list[i].children.length; j++) {
                            if (this.list[i].children[j].checked) {
                                Array.push(this.list[i].children[j])
                            } else {
                                for (let k = 0; k < this.list[i].children[j].children.length; k++) {
                                    if (this.list[i].children[j].children[k].checked) {
                                        Array.push(this.list[i].children[j].children[k])
                                    }
                                }
                            }
                        }
                    }
                }
                return Array
            }
        },
        methods: {
            checkAll(e) {
                const Status = e.target.checked
                const _this = this
                for (let i = 0; i < this.list.length; i++) {
                    this.$set(_this.list[i], 'checked', Status)
                    for (let j = 0; j < this.list[i].children.length; j++) {
                        this.$set(_this.list[i].children[j], 'checked', Status)
                        for (let k = 0; k < this.list[i].children[j].children.length; k++) {
                            this.$set(_this.list[i].children[j].children[k], 'checked', Status)
                        }
                    }
                }
            },
            selectItem(e) {
                const level = e.target.dataset.level
                const words = e.target.dataset.name
                const Status = e.target.checked
                const _this = this
                if (level === '1') {
                    for (let i = 0; i < this.list.length; i++) {
                        // 勾选/取消 当前 1级节点 及 所包含的 2、3级节点
                        if (this.list[i].name === words) {
                            this.$set(_this.list[i], 'checked', Status)
                            if (this.list[i].children.length > 0) {
                                for (let j = 0; j < this.list[i].children.length; j++) {
                                    this.$set(_this.list[i].children[j], 'checked', Status)
                                    for (let k = 0; k < this.list[i].children[j].children.length; k++) {
                                        this.$set(_this.list[i].children[j].children[k], 'checked', Status)
                                    }
                                }
                            }
                        }
                    }
                } else if (level === '2') {
                    // 勾选/取消 当前 2级节点 及 所包含的 3级节点
                    for (let i = 0; i < this.list.length; i++) {
                        if (this.list[i].children.length > 0) {
                            for (let j = 0; j < this.list[i].children.length; j++) {
                                if (this.list[i].children[j].name === words) {
                                    this.$set(_this.list[i].children[j], 'checked', Status)
                                    for (let k = 0; k < this.list[i].children[j].children.length; k++) {
                                        this.$set(_this.list[i].children[j].children[k], 'checked', Status)
                                    }
                                }
                            }
                        }
                    }
                } else if (level === '3') {
                    // 勾选/取消 当前 3级节点
                    for (let i = 0; i < this.list.length; i++) {
                        if (this.list[i].children.length > 0) {
                            for (let j = 0; j < this.list[i].children.length; j++) {
                                if (this.list[i].children[j].children.length > 0) {
                                    for (let k = 0; k < this.list[i].children[j].children.length; k++) {
                                        // 监听三级
                                        if (this.list[i].children[j].children[k].name === words) {
                                            this.$set(_this.list[i].children[j].children[k], 'checked', Status)
                                            if (this.list[i].children[j].children.every(function(item) {
                                                return item.checked
                                            })) {
                                                this.$set(_this.list[i].children[j], 'checked', true)
                                            } else {
                                                this.$set(_this.list[i].children[j], 'checked', false)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            openNext(e) {
                const _this = this
                const words = e.name
                const OpenStatus = !e.open
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].name === words) {
                        this.$set(_this.list[i], 'open', OpenStatus)
                    } else {
                        for (let j = 0; j < this.list[i].children.length; j++) {
                            if (this.list[i].children[j].name === words) {
                                this.$set(_this.list[i].children[j], 'open', OpenStatus)
                            }
                        }
                    }
                }
            }
        }


    }
</script>

<style lang="less">
    @import '../../style/mixin';
    .createrole_box{width:100%;background: #f6f6f6;height: 850px;position: relative;padding:0 15px;box-sizing: border-box}
    .create_content{width:100%;background: #ffffff;padding:0 10px;box-sizing: border-box;height:100%}
    .headerTop {width:100%;height:40px;line-height: 40px;background: #f6f6f6;padding:0 15px;box-sizing: border-box;}
    .role-info{}
    .vertical-bar{width: 2px;height: 18px;line-height:18px;background: #007bc4;display: inline-block;vertical-align: middle;}
    .role-name{font-size:16px;color:#007bc4;font-weight: bold;display: inline-block;margin-left: 10px}
    .character_name{width:230px;height: 32px;line-height:32px;border:1px solid #d3d3d3;padding-left:10px;border-radius: 3px}
    .col{color: #cccccc}
    .classification_name{margin-left: 20px}
    .desc{width:60%;height:135px;vertical-align:top}
    .el-textarea__inner{height:100%}
    .count{float: right;color: #b9b9b9}
    .count_box{width:65%}
    .line{padding:0px 25px;width:100%;height: 1px;display: inline-block;background: #f6f6f6;box-sizing: border-box}
    .add_permissions{display: block;color:#007bc4;font-size:14px;border:1px solid #007bc4}
    .permissions{margin-top: 20px;height:240px!important;width:66%}
    .cancel{width:130px;margin-top: 19px}


    .choose .child, .choose .third{
        padding-left: 10px;
    }
    .choose .humanItem {
        padding-left: 28px;
    }
    .choose .single {
        padding-left: 18px;
    }
    .choose{height: 270px;overflow:scroll}
    label {
        vertical-align: middle;
        i {
            cursor: pointer;
        }
    }
    input {
        position: relative;
        top: 1px;
    }
    .title {
        height: 40px;
        line-height: 40px;
        background-color: #f5f7fa;
        padding-left: 10px;
        box-sizing: border-box;
    }
    .selected, .choose {
        float: left;
        width: 48%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
    }
    .selected {
        float: right
    }
    .list {
        padding-left: 10px;
    }
    .el-dialog--small{height:450px!important;width:40%!important;}
    .select_permissions{text-align: center}
    .lengths{widht:85px}
    .determine{position: absolute;bottom:20px;right:20px}
    .selected{height:270px;overflow: scroll}
</style>
