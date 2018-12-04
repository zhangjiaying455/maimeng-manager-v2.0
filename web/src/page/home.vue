<template>
    <div class="main home">
        <!--主体内容-->
        <h2>一站式智慧营销服务</h2>
        <ul class="home-icon">
            <li>
                <a href="business-edit.html">
                    <img src="../images/home-3.png">
                    <h4>线索挖掘</h4>
                    <p>对产品、用户行为和特征进行分析，通过机器学习建模挖掘意向客户，向品牌提供符合业务需求的精准用户线索。</p>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../images/home-2.png">
                    <h4>数据预测</h4>
                    <p>帮助企业对其自有数据进行分析、挖掘和处理，进而提升企业自有数据的有效利用、价值激活和销售转化。</p>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../images/home-1.png">
                    <h4>标签服务</h4>
                    <p>根据业务需求，结合麦盟大数据及合作数据源，对企业用户标签画像进行优化和完善，进而提升销售效率和带来千人千面的客户体验。</p>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
 export default {
     data(){
         return{
         }
     }
 }
</script>

<style lang="less">
    @import "../style/main-common.css";
    .home{
        background-color: #fff;
    }
    .home h2{
        margin: 0;
        padding: 50px 0 80px 0;
        color: #007bc4;
        font-size: 40px;
        font-weight: 600;
        text-align: center;
    }
    .home .home-icon{
        width: 960px;
        height: 535px;
        margin: 0 auto;
    }
    .home .home-icon li{
        width: 280px;
        height: 340px;
        -webkit-box-shadow: 0 0 15px rgba(26,26,26,.1);
        -moz-box-shadow:  0 0 15px rgba(26,26,26,.1);
        box-shadow:  0 0 15px rgba(26,26,26,.1);
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        text-align: center;
        padding-top: 35px;
        margin-right: 60px;
        cursor: pointer;
        float: left;
    }
    .home .home-icon li:last-child{
        margin-right: 0;
    }
    .home .home-icon li:hover{
        -webkit-box-shadow: 0 0 15px rgba(0,123,196,.5);
        -moz-box-shadow:  0 0 15px rgba(0,123,196,.5);
        box-shadow:  0 0 15px rgba(0,123,196,.5);
    }
    .home .home-icon li img{
        width: 100px;
        height: 100px;
    }
    .home .home-icon li h4{
        color: #333333;
        font-size: 20px;
        font-weight: 600;
        padding: 25px 0;
        margin: 0;
    }
    .home .home-icon li p{
        width: 230px;
        padding: 0;
        margin: 0 auto;
        color: #333333;
        font-size: 14px;
        line-height: 24px;
        text-align: left;
    }
</style>
