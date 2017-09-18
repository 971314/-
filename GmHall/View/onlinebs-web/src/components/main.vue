<template>
    <div id="navBar">
        <!--<nav-bar></nav-bar>-->
        <div class="nav  navbar-inverse  loginBg" role="navigation">
            <div class="container widthIndexOne">
                <div class="indexNav">
                    <a class="navbar-brand" v-link="{path:'/main/'}"><img src="../image/index/ITC.png" class="logoImg"></a>

                    <div class="online-title">网上营业厅</div>
                </div>
                <div class="rightTitle">
                    <div class="div1">
                        <div class="div2">
                            <span class="title">欢迎您</span>
                            <span>{{userName}} </span>
                            <span class="out" style="margin-left: 52px"><a @click="outLogin">退出</a></span>
                        </div>
                    </div>
                    <div class="div3">
                        <span class="title1">客服热线</span>

                        <p style="font-size: 22px;  color: #f15637; margin-left: 69px;">400-8888-598</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="mainContainerInfo" id="subRoutesContext">
        <div class="leftMenu">
            <div style="width:187px;">
                <ul class="firstMenu">
                    <li>
                        <img src="../image/index/home-icon.png" id="bigImgIndex" class="indexIcon"/>
                        <a v-link="{path:'/main/'}">网厅首页</a>
                    </li>
                    <li>
                        <img src="../image/index/modify-icon.png" id="bigImgOne" class="modifyInfo"/>
                        <span>信息变更</span>
                    </li>
                    <ul class="twoMenu topOneMenu">
                        <li><a v-link="{path: '/main/linkManModify'}">手机号变更</a></li>
                        <li><a v-link="{path: '/main/stepFirst'}">身份证有效期变更</a></li>
                        <li><a v-link="{path: '/main/comAdsChange'}">通讯地址变更</a></li>
                        <!--<li> <a v-link="{path: '/main/billAccountChange'}">结算账户变更</a> </li>-->
                    </ul>
                   <li>
                        <img src="../image/index/password-icon.png" id="bigImgTwo" class="menuPassManIcon">
                        密码管理
                    </li>
                    <ul class="twoMenu topTwoMenu">
                        <li><a v-link="{path: '/main/modifyPass'}" style="line-height: 17px;">修改密码</a></li>
                    </ul>
                    <li>
                        <img src="../image/index/money-icons.png" id="bigImgThree" class="menuBillIcon">
                        资金管理
                    </li>
                    <ul class="twoMenu topThreeMenu">
                        <li><a v-link="{path: '/main/bankFuture'}">资金转账</a></li>
                        <li><a v-link="{path: '/main/detailBill'}">资金明细</a></li>
                        <li><a @click="nextLimitCancle">保底限制取消</a></li>
                    </ul>
                    <!-- <li>
                        <img src="../image/index/activat-icons.png" id="bigImgFour" class="menuActivatIcon">
                        休眠激活
                    </li>
                    <ul class="twoMenu topFourMenu">
                        <li><a v-link="{path: '/main/accountActivat'}" style="line-height: 17px;">休眠账户激活</a></li>
                    </ul> -->
                    <li>
                        <img src="../image/index/trans-icons.png" id="bigImgFive" class="menuTransIcon">
                        辅助交易
                    </li>
                    <ul class="twoMenu topFiveMenu">
                       <!-- <li><a v-link="{path: '/main/switchTrans'}">切换交易系统</a></li>-->
                        <li><a v-link="{path: '/main/arbitrageApply'}">套期保值服务</a></li>
                        <li><a v-link="{path: '/main/straddleApply'}">套利服务</a></li>
                        <li><a v-link="{path: '/main/pledgeService'}">仓单、质押服务</a></li>
                    </ul>
                </ul>
            </div>
        </div>
        <div class="contextInfo">
            <router-view>
            </router-view>
        </div>
    </div>
    <footer class="footer" style="height: 99px;">
        <div class="container footerIndexOne">
            <div class="row">
                <div>
                    <img src="../image/index/bottom.png" class="footerImg" style="margin-top: 10px;">
                </div>
                <div class="splitLine"></div>
                <div class="footerDetail">
                    <P> 地址：福建省厦门市湖滨南路国贸大厦2、5、11、27层 |</P>

                    <P>客服热线：400-8888-598 Copyright © 2013 国贸期货有限公司 闽ICP备11000909号-2 版权所有</div>
                </P>
            </div>
        </div>
    </footer>
    <div class="modal fade modal-top" id="limitModal" tabindex="-1" role="dialog" style="top:217px"
         aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close"
                            data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title text-center" id="myModalLabel">
                        提示
                    </h4>
                </div>
                <div class="modal-body modal-font" style="text-indent: 2em;">
                    若您的权益在1000元以下 （含1000元）
                    同时符合开户时间一年以上、</br>
                    最近一年以上无持仓、
                    最近一年以上无交易（含一年），账户将被休眠
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" id="outLoginInfo"
                            data-dismiss="modal" @click="btnLimit">确定
                    </button>
                </div>
            </div>
        </div>
    </div>



</template>
<script>
    import  {onlineGlobal,customerType,
            customerInfo,outlogin,outLoginType} from '../util/config';
    import {initMenu} from '../util/meun.js';
    import {getErrorMsg} from '../util/errorMsg.js';
    import {getCookie,setCookie,clearCookie}from '../util/cookie.js';
    export default  {
        data: function () {
            return {
                userName: ''
            }
        },
        methods: {
            nextLimitCancle: function () {
                //v-link="{ path: '/limitCancel' }"
                $('#limitModal').modal(limitModal)
            },
            btnLimit: function () {
                router.go({path: '/main/limitCancel'});
            },
            //退出登录系统
            outLogin: function () {
                let userScape = getCookie("userAccount");
                if (userScape != "") {
                    let userInfo = JSON.parse(unescape(userScape));
                    var account = userInfo.account;
                    var token = userInfo.token;
                    $.ajax({
                        url: onlineGlobal,
                        type: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            func: outlogin,
                            type: outLoginType,
                            account: account,
                            token: token,
                            data: []
                        }),
                        success: function (data) {
                            if (data.retHead == 1) { //如果等于1说明是成功
                                clearCookie();
                                router.go({path: '/'})
                            } else {
                                clearCookie()
                                router.go({path: '/'})
                            }
                        }, error: function (data) {
                            clearCookie()
                            router.go({path: '/'})
                        }
                    })
                    //如果session过期  就直接跳转到登录页面
                } else {
                    router.go({path: '/'})
                }
            }
        },
        ready: function () {
            //获取菜单的样式
            initMenu();
            //main.vue
//            var flag=getCookie("flagData");
//            if(flag ==""){
//                  router.go({path:'/'});
//            }
            let userInfoScape = getCookie("user");
            if (userInfoScape != "") {
                let userAccount = JSON.parse(unescape(userInfoScape));
                this.userName = userAccount.data[0]['24']
            }
//            //获取账户信息
            var _this = this;
            let userScape = getCookie("userAccount");
            if (userScape != "") {
                let userInfo = JSON.parse(unescape(userScape));
                var account = userInfo.account;
                var token = userInfo.token;
                $.ajax({
                    url: onlineGlobal,
                    method: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        func: customerInfo,
                        type: customerType,
                        account: account,
                        token: token,
                        data: [{}]
                    }),
                    success: function (data) {
                        if (getErrorMsg(data) == 1) {
                            _this.userName = data.data[0]['24']
                            // setCookie("user",escape(JSON.stringify(data)));
                            //将账户信息存放到本地session里面
                        }
                    }, error: function (data) {
                    }
                })
            }
        }
    }
</script>
