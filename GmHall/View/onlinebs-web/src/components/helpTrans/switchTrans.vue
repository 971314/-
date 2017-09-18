<template>
    <div class="panel panel-default top10 titleWidth">
        <div class="panel-body panel-title">
            <img src="../../image/index/round.png" class="round-icon"><span class="round-title">切换交易系统</span>
        </div>
    </div>
    <div v-if="submitInfo">
        <div class="panel panel-default allDivWidth linkmanInfo" style="height: 360px">
            <div class="panel-body" v-show="currentPositInfoValue">
                <form class="top17  formTop" role="form" data-validate="parsley">
                    <div class="form-group">
                        <label class="labelAll">原交易系统平台：</label>

                        <div class="spanCardNo">
                            <template v-if="sys == 0">金仕达</template>
                            <template v-if="sys == 1">CTP</template>
                            <template v-if="sys == 2">CTPMINI</template>
                            <template v-if="sys == 3">飞马</template>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="labelAll">切换交易系统：</label>

                        <div class="modifyPass">
                            <select type="text" v-model="newSys" class="form-control form-text" id="firstname">
                                <option selected="selected" value="0">金仕达</option>
                                <option value="1">CTP</option>
                                <!--<option value="2">CTPMINI</option>-->
                                <!--<option value="3">飞马</option>-->
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="labelAll">手机验证码：</label>

                        <div class="inputPosition">
                            <input type="text" class="form-control form-text"
                                   id="codeMsg"
                                   data-required="true"
                                   v-model="codeMsg" autocomplete="off"
                                   maxlength="6"
                                   @focus="focusInfo"
                                   data-regexp="^[0-9]*$"
                                   data-error-message="亲，请输入纯数字的验证码"
                                   data-error-container="#codeResult"
                                   placeholder="请输入验证码" style="width: 140px;">
                        </div>
                        <send-codes></send-codes>
                    </div>
                    <span id="codeResult" class="error-msg text-align"></span>

                    <div><span class="errorMsg">{{errorMessage}}</span></div>
                    <div class="form-group">

                        <risk-com v-show="sys==0 && sys!=newSys" :read-checked.sync="readChecked" :risk-content="riskContent" :msg-tip="msgTip">
                        </risk-com>

                        <div class="subLinkMan" v-if="initBtn">
                            <button type="button" class=" btn-style  btn-submit" data-toggle="button" @click="submit">
                                提交
                            </button>
                        </div>
                        <div v-if="loadingBtn">
                            <load-btn></load-btn>
                        </div>
                    </div>
                </form>
            </div>
            <div class="panel-body" v-show="noNextShow">
                <div class="contextTitleCancel">
                    <img src="../../image/index/warn.png" class="imgTip"> <span class="tipMsg">需无持仓才可以办理此业务!</span>
                </div>
            </div>
            <div v-show="loadingShow">
                <loading-Info></loading-Info>
            </div>
        </div>
        <div class="panel panel-default allDivWidth">
            <div class="panel-body panel-bgcolor">
                <p> 业务须知：</p>

                <p> 1、每日15：15之前提交申请，当天办理，下一交易日可以使用；15:15之后申请，次日收盘办理，客户第三天才可以使用。</p>

                <p> 2、办理当天必须无持仓。</p>
            </div>
        </div>
    </div>
    <!--提交成功显示的提示页面-->
    <div v-else>
        <suc-info></suc-info>
    </div>
</template>
<script>
    import store from '../../vuex/store';
    import sendCodes from '../../components/publicMethod/sendCodes.vue';
    import sucInfo from '../../components/backResult/suc.vue';
    import {onlineGlobal,onlineGlobalOne,transSwitchCode,customerType,checkSendMsgCode,outLoginType,currentPosit,loginType} from '../../util/config';
    import loadBtn from '../publicMethod/submitLoadBtn.vue';
    import {getErrorMsg,flagLogin} from '../../util/errorMsg.js';
    import {getCookie,setCookie} from '../../util/cookie.js';
    import loadingInfo from '../../components/publicMethod/lodingIng.vue';
    import riskCom from  '../../components/publicMethod/riskCom.vue';
    export default{
        //短信验证码
        components: {
            sendCodes: sendCodes,
            sucInfo: sucInfo,
            loadBtn: loadBtn,
            loadingInfo: loadingInfo,
            riskCom: riskCom
        },
        data: function () {
            return {
                submitInfo: true,
                errorMessage: '',
                newSys: '',
                codeMsg: '',
                sys: '',
                initBtn: true,
                loadingBtn: false,
                currentPositInfoValue: false,
                loadingShow: true,
                noNextShow: false,
                readChecked: true,
                riskContent: 'ctpUse',
                msgTip:"我已阅读并遵守《上期技术综合交易平台（CTP）使用须知》"
            }
        },
        ready: function () {
            flagLogin();//判断登录状态
            let userScapeFlag = getCookie("user");
            if (userScapeFlag != "") {
                let userInfo = JSON.parse(unescape(userScapeFlag));
                this.sys = userInfo.data[0]['75']
            }
            var _this = this;
            //获取当日持仓的列表信息
            var userScape = getCookie("userAccount");
            if (userScape != "") {
                let userInfo = JSON.parse(unescape(userScape));
                var account = userInfo.account;
                var token = userInfo.token;
                $.ajax({
                    url: onlineGlobal,
                    type: 'post',
                    data: JSON.stringify({
                        func: currentPosit,
                        type: loginType,
                        account: account,
                        token: token,
                        data: [{}]
                    }),
                    contentType: 'application/json',
                    success: function (data) {
                        if (getErrorMsg(data) == 1) {
                            _this.loadingShow = false
                            if (data.data && data.data.length == 0) {
                                //首先查询是否有持仓记录如果没有才可以进行系统切换
                                _this.currentPositInfoValue = true
                                _this.noNextShow = false
                            } else {
                                _this.currentPositInfoValue = false
                                _this.noNextShow = true
                            }
                        }
                    }
                })
            }
        },
        watch: {
            newSys: function () {
                if (this.sys == 0 && this.sys == this.newSys) {
                    this.readChecked = true;
                }
                else {
                    this.readChecked = false;
                }

            }
        },
        methods: {
            focusInfo: function () {
                this.errorMessage = ''
            },
            submit: function () {
                if (this.sys == this.newSys)
                {
                    this.errorMessage="没有变更，无需提交";
                    return;
                }

                if (!$('#codeMsg').parsley('isValid')) {
                    $('#codeMsg').parsley('validate')
                    return;
                }

                if (!this.readChecked) {
                    this.$broadcast("parent-submit");
                    return;
                }

                this.loadingBtn = true;
                this.initBtn = false;
                var _this = this;
                var userScape = getCookie("userAccount");
                if (userScape != "") {
                    let userInfo = JSON.parse(unescape(userScape));
                    var account = userInfo.account;
                    var token = userInfo.token;
                    $.ajax({
                        url: onlineGlobal,
                        type: 'post',
                        dataType: 'json',
                        data: JSON.stringify({
                            func: checkSendMsgCode, type: outLoginType, account: account, token: token,
                            data: [{16: _this.codeMsg}]
                        }),
                        contentType: 'application/json',
                        success: function (data) {
                            if (data.retHead == 1) {
                                //如果校验成功 就执行提交操作
                                $.ajax({
                                    url: onlineGlobal,
                                    type: 'post',
                                    data: JSON.stringify({
                                        func: transSwitchCode,
                                        type: customerType,
                                        account: account,
                                        token: token,
                                        data: [{75: _this.newSys, 16: _this.codeMsg}]
                                    }),
                                    contentType: 'application/json',
                                    success: function (data) {
                                        if (getErrorMsg(data) == 1) {
                                            _this.loadingBtn = false;
                                            _this.initBtn = true;
                                            if (_this.submitInfo == true) {//判断是否显示成功提示
                                                _this.submitInfo = false
                                            } else {
                                                _this.submitInfo = true
                                            }
                                        } else {
                                            _this.loadingBtn = false;
                                            _this.initBtn = true;
                                            _this.errorMessage = data.desc;
                                        }
                                    }, error: function (data) {
                                        _this.loadingBtn = false;
                                        _this.initBtn = true;
                                        _this.errorMessage = "服务器异常";
                                        console.log("服务器异常");
                                    }
                                })
                            } else {
                                _this.loadingBtn = false;
                                _this.initBtn = true;
                                _this.errorMessage = data.desc;
                            }
                        }, error: function (data) {
                            _this.loadingBtn = false;
                            _this.initBtn = true;
                            this.errorMessage = "服务器异常";
                        }
                    })
                }
            }
        }
    }
</script>
