<template>
    <div class="nav  navbar-inverse  loginBg" role="navigation">
        <div class="container widthIndexOne" id="userInfo">
            <div class="indexNav">
                <a class="navbar-brand" v-link="{path:'/'}"><img src="../../../image/index/ITC.png" class="logoImg"></a>
                <div  class="online-title">网上营业厅</div>
            </div>
            <div class="rightTitle">
                <div  class="div1">
                    <div class="div2">
                    </div>
                </div>
                <div class="div3">
                    <span class="title1">客服热线</span>
                    <p  style="font-size: 22px;  color: #f15637; margin-left: 69px;">400-8888-598</p>
                </div>
            </div>
        </div>
    </div>
<div class="resetPass">
    <div class="resetPassOne">
        <router-view>
        </router-view>
    </div>
</div>
<footer class="footer" style="height: 99px;">
    <div class="container footerIndexOne">
        <div class="row">
            <div>
                <img src="../../../image/index/bottom.png" class="footerImg" style="margin-top: 10px;">
            </div>
            <div class="splitLine"></div>
            <div class="footerDetail">
                <P> 地址：福建省厦门市湖滨南路国贸大厦2、5、11、27层 |</P>
                <P>客服热线：400-8888-598 Copyright © 2013 国贸期货有限公司 闽ICP备11000909号-2 版权所有 </div></P>
        </div>
    </div>
</footer>
</template>
<!--<script>-->
    <!--import {footerInfo} from '../../publicMethod/footer.vue'-->
    <!--export default{-->
        <!--components:{-->
            <!--footerInfo:footerInfo-->
        <!--}-->
    <!--}-->
<!--</script>-->