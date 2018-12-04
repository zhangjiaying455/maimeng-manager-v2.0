<template>
    <div class="enterpris_box">
        <el-breadcrumb  separator=">" class="headerTop">
            <el-breadcrumb-item  v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form class="enterpris_content">
            <el-form-item class="role-info">
                <i class="vertical-bar"></i><span class="role-name">企业认证信息</span>
            </el-form-item>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="公司全称" prop="pass">
                    <el-input type="password" placeholder="请填写公司全称" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="公司网址" prop="checkPass">
                    <el-input type="password" placeholder="请填写公司网址" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="办公地址" prop="age">
                    <el-input v-model.number="ruleForm2.age" placeholder="请填写办公地址"></el-input>
                </el-form-item>
                <el-form-item label="负责人邮箱" prop="age">
                    <el-input v-model.number="ruleForm2.age" placeholder="请填写负责人邮箱"></el-input>
                </el-form-item>
                <el-form-item label="所属行业" prop="age">
                    <el-select class="selected" v-model="ruleForm2.region" placeholder="请选择行业">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="brand_name" label="品牌名称" prop="age">
                    <el-input class="brand" v-model.number="ruleForm2.age" placeholder="请填写品牌"></el-input>
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="产品介绍">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false">
                        <el-button slot="trigger" size="medium" type="warning">上传三证材料</el-button>
                        <ul slot="tip" class="el-upload__tip">
                            <li>营业执照 税务登记证 组织机构代码证三证合一</li>
                            <li>必须为清晰 完整的彩色原件扫描件或数码照</li>
                            <li>仅支持.jpg/.bmp/.png的图片格式,图片大小不超过3M</li>
                            <li>必须在有效期内且年检章齐全(当年成立的公司可无年检章)</li>
                            <li>必须为中国大陆工商局颁发</li>
                        </ul>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm('ruleForm2')">取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                dialogImageUrl: '',
                dialogVisible: false,
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    age: '',
                    region:''
                },
                rules2: {
                },
                fileList: []

            }
        },
        methods:{
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        }

    }
</script>

<style lang="less">
    @import '../../style/mixin';
    .enterpris_box{width:100%;height: 850px;background: #f6f6f6;padding:0 15px;box-sizing: border-box}
    .enterpris_content{width: 100%;height:100%;background: #ffffff;padding:25px 15px 0px;box-sizing: border-box}
    .headerTop{width:100%;height:40px;line-height: 40px;background: #f6f6f6;padding:0 15px;box-sizing: border-box}
    .role-info{}
    .vertical-bar{width: 2px;height: 18px;line-height:18px;background: #007bc4;display: inline-block;vertical-align: middle;}
    .role-name{font-size:18px;color:#007bc4;font-weight: bold;display: inline-block;margin-left: 10px}
    .demo-ruleForm{width:55%}
    .selected{width:100%}
    .el-upload__tip li{list-style:disc}
    .brand_name{width:100%;}
    .brand{width: 90%}
    .el-upload--picture-card{width:36px;height:36px;line-height: 40px;position: absolute;top:0;right:0;border:1px solid #c0ccda;background: #ffffff}
    .el-upload--picture-card i{font-size:20px}
</style>
