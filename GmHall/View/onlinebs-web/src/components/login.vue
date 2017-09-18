<template>
    <div class="nav  navbar-inverse  loginBg" role="navigation">
        <div class="container widthIndexOne" id="userInfo">
            <div class="indexNav">
                <a class="navbar-brand" tabindex="-1" href="#"><img src="../image/index/ITC.png" class="logoImg"></a>

                <div class="online-title">网上营业厅</div>
            </div>
            <div class="rightTitle">
                <div class="div1">
                    <div class="div2">
                    </div>
                </div>
                <div class="div3">
                    <span class="title1">客服热线</span>

                    <p style="font-size: 22px;  color: #f15637; margin-left: 69px;">400-8888-598</p>
                </div>
            </div>
        </div>
    </div>
    <div class="jumbotron login-background">
        <div class="container">

        </div>
    </div>
    <div class="container widthOne" id="loginContext">
        <div>
            <div class="panel panel-default loginDivInfo allLogin">
                <div class="panel-body">
                    <p class="loginP">登入后即可办理</p>

                    <div style="margin-top: 5px;"><p><img src="../image/index/info-modify.png"
                                                          class="filed-img loginOneFive"></p>

                        <p class="loginOneFive accountInfo">信息变更 </p>

                        <div class="indexDivInfoOne"><p><img src="../image/index/modify-pass.png"
                                                             class="filed-img margin45"></p>

                            <p class="accountInfo margin45"> 修改密码 </p></div>
                        <div class="indexDivInfoTwo"><p><img src="../image/index/bill.png" class="filed-img margin20">
                        </p>

                            <p class="accountInfo margin20"> 资金转账 </p></div>
                        <div class="indexDivInfoThree"><p><img src="../image/index/detail-query.png" class="filed-img">
                        </p></p>  <p class="accountInfo" style="margin-top: -7px;"> 明细查询 </p></div>
                    </div>
                    <div class="indexDivInfoFour"><p><img src="../image/index/person.png"
                                                          class="filed-img login-icon loginOneFive"></p></p>    <p
                            class="loginOneFive accountInfo"> 账户激活 </p></div>
                    <div class="indexDivInfoFive"><p><img src="../image/index/trans-swith.png"
                                                          class="filed-img login-icon margin45"></p></p> <p
                            class="accountInfo margin45" style="margin-left: 44px;"> 保底限制取消 </p></div>
                    <div class="indexDivInfoSix"><p><img src="../image/index/trans-query.png"
                                                         class="filed-img login-icon margin20"></p></p><p
                            class="accountInfo margin20" style="margin-left: 23px;"> 当日交易查询 </p></div>
                    <div class="indexDivInfoServe"><p><img src="../image/index/soft-dw.png"
                                                           class="filed-img login-icon"></p> </p> <p class="accountInfo"
                                                                                                     style="margin-left: -16px;    margin-top: -7px;">
                        业务流程查询 </p></div>
                </div>
            </div>
            <div class="panel panel-default login-div" style="margin-left: 835px;    margin-top: -392px;">
                <div class="panel-body">
                    <form class="form-horizontal" role="form">
                        <h4 class="form-signin-heading text-align-center accountInfo"
                            style="margin-top: 19px; margin-bottom: 56px;">登录</h4>

                        <div class="form-group login-bottom">
                            <div class="loginInput">
                                <input type="text" @focus="loadFocus" @blur="accountBlur" value="" v-model="account"
                                       class="form-control logIn inputText" id="firstname"
                                       autocomplete="off" placeholder="请输入资金账号" @change="accountChange">
                            </div>
                        </div>
                        <div class="form-group login-bottom">
                            <div class="loginInput">
                                <input v-model="password" @blur="passwordBlur" type="text"
                                       class="form-control logIn inputText"
                                       autocomplete="off" placeholder="请输入CTP主席密码" onfocus="this.type='password'"
                                       @focus="passControl" id="passWord">
                            </div>
                        </div>
                        <div class="form-group login-bottom">
                            <div class="loginInput">
                                <input type="text" autocomplete="off" v-model="checkMsgCode" @focus="focusCode"
                                       class="form-control form-text" style="width: 197px;height:35px"
                                       placeholder="请输入验证码">
                                <img v-if="initMsgCode" title="点击更换" @click="switchCode" id="changeImg" alt="验证图片"
                                     class="codeImg" :src="initCode">
                            </div>
                        </div>
                        <!--<div class="reset"><a v-link="{path:'/resetPassInfo'}">重置密码</a></div>-->

                        <div class="login-btnInit" v-if="initBtn" style="margin-bottom: 7px;">
                            <input type="button" @focus="loadFocus" @click="loadCheckInfo"
                                   class=" btn-style  btn-submit loginBtn" value="进入网上营业厅">
                        </div>
                        <div v-if="loadingBtn" style="margin-bottom: 7px;">
                            <load-btn></load-btn>
                        </div>
                    </form>
                    <div>
                        <span class="errorMsgLogin" style="margin: -29px 48px;display: inline;">{{errorMsg}}</span>
                        <span class="errorMsgLogin" id="versionMsg" style="margin: -29px -74px;display: inline;"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade modal-top" id="riskModal" tabindex="-1" role="dialog" style="top:217px"
             aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title text-center" id="myModalLabel">
                            风险提示书
                        </h3>
                    </div>
                    <div class="modal-body" style="text-indent: 2em; height: 413px; overflow-y: auto;">

                        <risk-warning></risk-warning>

                        <div class="modal-footer rsikfooter" style="text-align: center">
                            <button type="button" class="btn-style  btn-riskcancel textindent" id="toThink "
                                    data-dismiss="modal" @click="btnCalcel" style="margin-right: 40px">再想想
                            </button>
                            <button type="button" class="btn-style  btn-submit textindent" id="toAgree"
                                    data-dismiss="modal" @click="btnAgree">我同意
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>


    <footer class="footer" style="height: 99px;">
        <div class="container widthOne">
            <div class="row">
                <div>
                    <img src="../image/index/bottom.png" class="footerImg">
                </div>
                <div class="splitLine"></div>
                <div class="footerDetail">
                    <P> 地址：福建省厦门市湖滨南路国贸大厦2、5、11、27层 |</P>

                    <P>客服热线：400-8888-598 Copyright © 2013 国贸期货有限公司 闽ICP备11000909号-2 版权所有</div>
                </P>
            </div>
        </div>
    </footer>
</template>

<script>
    import  {onlineGlobal,onlineGlobalOne,loginCode,loginType,prepareLoginType,checkMsgCode,outLoginType,lastLoginTimeCode,customerInfo,customerType} from '../util/config';
    import loadBtn from './publicMethod/loadBtn.vue';
    import {Base64} from '../util/base64.js';
    import {setCookie,getCookie,initKeyBoard}from '../util/cookie.js';
    import riskWarning from './publicMethod/riskWarning.vue'
    export default{
        data: function () {
            return {
                email: '',
                account: '',
                errorMsg: '',
                checkMsgCode: '',
                password: '',
                initCode: '',
                initBtn: true,
                loadingBtn: false,
                initMsgCode: false,
                token: ''
            }
        },
        components: {
            loadBtn: loadBtn,
            riskWarning: riskWarning
        },
        ready: function () {

            initKeyBoard()
            this.accountChange();
            sessionStorage.removeItem("stepOneRestPass");//清空重置密第一步码缓存的信息
            sessionStorage.removeItem("restPassCardFront");//清空缓存的信息
            sessionStorage.removeItem("restPassCardUnFront");//清空缓存的信息
        },
        methods: {

            nextLimitCancle: function () {
                //v-link="{ path: '/limitCancel' }"
                $('#limitModal').modal(limitModal)
            },
            btnLimit: function () {
                router.go({path: '/main/limitCancel'});
            },


            passControl: function () {
                //   $('#passWord').keyboard();
            },
            //失去焦点后清空错误信息
            accountBlur: function () {
                this.errorMsg = "";
//                $("#versionMsg").html('')
            },
            passwordBlur: function () {
                this.errorMsg = "";
//                $("#versionMsg").html('')
            },
            loadFocus: function () {
                this.errorMsg = "";
//                $("#versionMsg").html('')
            },
            focusCode: function () {
                this.errorMsg = ""
//                $("#versionMsg").html('')
            },
            //切换验证码
            switchCode: function () {
                document.getElementById('changeImg').src = onlineGlobalOne + '/captcha/gen?token=' + encodeURIComponent(this.token) + '&' + Math.random();
                this.errorMsg = ""
            },
            accountChange: function () {
                var _this = this;
                $.ajax({
                    url: onlineGlobal,
                    type: 'post',
                    data: JSON.stringify({
                        func: prepareLoginType, type: outLoginType,
                        data: [{}]
                    }),
                    contentType: 'application/json',
                    success: function (data) {
                        //如果成功取出返回的token并缓存起来
                        if (data.retHead == 1) {
//                            console.log(data.data[0]['13'])
                            _this.token = data.data[0]['13'];
                            //因业务需求缓存账户名称和token 为查询账户信息
                            var tokenObj = {token: data.data[0]['13']}
                            setCookie("userAccount", escape(JSON.stringify(tokenObj)))
                            _this.initMsgCode = true;
                            //获取初始化的验证码
                            _this.initCode = onlineGlobalOne + '/captcha/gen?token=' + encodeURIComponent(data.data[0]['13']) + '&' + Math.random();
                        }
                    }
                })
            },
            loadCheckInfo: function (event) {
                var _this = this;
                //window.location.href = "./dist/components/index.html"
                var regAccount = /^[0-9]*$/;
                if (this.account == '' || !regAccount.test(this.account)) {
                    this.errorMsg = "亲，请正确输入资金账号";
                    return;
                }
//                alert(document.getElementById("passWord").value)
                if (document.getElementById("passWord").value == '') {
                    this.errorMsg = "亲，请输入正确的密码";
                    return;
                }
                if (this.checkMsgCode == '') {
                    this.errorMsg = "亲，请输入验证码";
                    return;
                }
                this.loadingBtn = true;
                this.initBtn = false;
                //取出userAccount 的缓存信息并将账户号也添加进来
                var getToken = unescape(getCookie("userAccount"))
                if (getToken != "") {
                    var getTokenData = JSON.parse(getToken);
                    var accountObj = {account: this.account}
                    for (let tem in accountObj) {
                        getTokenData[tem] = accountObj[tem];
                    }
                    setCookie("userAccount", escape(JSON.stringify(getTokenData)));
                    $.ajax({
                        url: onlineGlobal,
                        type: 'post',
                        data: JSON.stringify({
                            func: checkMsgCode,
                            type: outLoginType,
                            account: _this.account,
                            token: _this.token,
                            data: [{
                                15: _this.checkMsgCode
                            }]
                        }),
                        contentType: 'application/json',
                        success: function (data) {
                            if (data.retHead == 1) {
                                var b = new Base64();
                                //如果校验成功进行登录操作
                                $.ajax({
                                    url: onlineGlobal,
                                    type: 'post',
                                    data: JSON.stringify({
                                        func: loginCode, type: loginType,
                                        account: _this.account, token: _this.token,
                                        data: [{
                                            59: b.encode(document.getElementById("passWord").value),
                                            69: _this.checkMsgCode
                                        }]
                                    }),
                                    contentType: 'application/json',
                                    success: function (data) {
                                        if (data.retHead == 1) {
                                            _this.myInfo();
//                                            $('#riskModal').modal(riskModal);

                                            //如果登录成功
//                                        var flagObj={flagIndex: 1}
//                                        setCookie("flagData",JSON.stringify(flagObj));
//
//                                            _this.loadingBtn = false;
//                                            _this.initBtn = true;
//                                            router.go({path:'/main/'});
                                        } else {
                                            _this.loadingBtn = false;
                                            _this.initBtn = true;
                                            _this.errorMsg = data.desc;
                                        }
                                    }, error: function (data) {
                                        _this.loadingBtn = false;
                                        _this.initBtn = true;
                                        _this.errorMsg = "服务器异常";
                                    }
                                })
                            } else {
                                _this.loadingBtn = false;
                                _this.initBtn = true;
                                _this.errorMsg = data.desc;
                            }
                        }, error: function (data) {
                            _this.loadingBtn = false;
                            _this.initBtn = true;
                            this.errorMsg = "服务器异常";
                        }
                    })
                }
            },


            checkLastLogin: function () {
                $.ajax({
                    url: onlineGlobal,
                    type: 'post',
                    data: JSON.stringify({
                        func: lastLoginTimeCode, type: customerType,
                        account: this.account, token: this.token,
                        data: [{
                            '72': '3'
                        }]//确认风险揭示书
                    }),
                    contentType: 'application/json',
                    success: function (data) {
                        if (data.retHead == 1) {
//                            console.log("记录确认风险揭示书成功")
                            router.go({path: '/main/'});
                        }
                    }, error: function (data) {
                        console.log("记录确认风险揭示书出错！");
                    }
                })
            },

            myInfo: function () {

                var account = this.account;
                var token = this.token;
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
                        if (data.retHead  == 1) {
                            if (data.data[0]['110'] == 0) //未确认
                            {
//                                console.log("确认风险揭示书状态值："+data.data[0]['110']);
                                $('#riskModal').modal(riskModal);
                            }
                            else {
//                                console.log("确认风险揭示书状态值："+data.data[0]['110']);

                                var flagObj = {flagIndex: 1}
                                setCookie("flagData", JSON.stringify(flagObj));

                                this.loadingBtn = false;
                                this.initBtn = true;

                                router.go({path: '/main/'});
                            }


                        }
                    }, error: function (data) {
                        console.log("获取客户信息出错！");
                    }
                })
            },

        btnAgree: function () {
            //如果登录成功
            var _this = this;
            var flagObj = {flagIndex: 1}
            setCookie("flagData", JSON.stringify(flagObj));

            _this.loadingBtn = false;
            _this.initBtn = true;
            _this.checkLastLogin();
            //router.go({path: '/main/'});

        },

        btnCalcel: function () {
            var _this = this;
            _this.loadingBtn = false;
            _this.initBtn = true;
            _this.account = '';
            _this.errorMsg = '';
            _this.checkMsgCode = '';
            _this.password = '';
        }
    }
    }
</script>


