<template>
    <div class="panel panel-default top10 titleWidth">
        <div class="panel-body panel-title" >
            <img src="../../image/index/round.png" class="round-icon"><span class="round-title">通讯地址变更</span>
        </div>
    </div>
    <div v-if="submitInfo" >
        <div class="panel panel-default allDivWidth linkmanInfo">
            <div class="panel-body panel-bgcolor panelHeight">
                <div>
                    <form class="formTop" role="form" data-validate="parsley">
                        <div class="form-group">
                            <label   class="labelAll">原通讯地址：</label>
                            <div class="spanCardNo">
                                {{idAddr}}
                            </div>
                        </div>
                        <span  id="newPhoneNoResult"  class="error-msg text-align"></span>
                        <div class="form-group">
                            <label   class="labelAll"  >新通讯地址：</label>
                            <div class=" inputPosition">
                                <input type="text" class="form-control form-text"
                                       id="infoAddress"
                                       v-model="infoAddress"  @focus="focusInfo"
                                       data-required="true" autocomplete="off"
                                       data-error-message="亲，请正确填写新通讯地址"
                                       data-error-container="#infoAddressResult"
                                       placeholder="请输入新通讯地址">
                            </div>
                        </div>
                        <span  id="infoAddressResult"  class="error-msg text-align"></span>
                        <div class="form-group">
                            <label  class="labelAll">手机验证码：</label>
                            <div class="inputPosition">
                                <input type="text" class="form-control form-text"
                                       id="codeMsg"
                                       v-model="codeMsg"
                                       data-required="true" autocomplete="off"
                                       maxlength="6"  @focus="focusInfo"
                                       data-error-message="亲，请正确输入验证码"
                                       data-error-container="#codeResult"
                                       placeholder="请输入验证码" style="width: 140px;">
                            </div>
                            <div class="msgCode">
                                <button  v-if="fetchCodeMsg"  type="button" @click="fetchCodeClick" class="btn-style  btn-submit" data-toggle="button">获取验证码
                                </button>
                                <span  class="sendMsg"  v-else> {{timerCodeMsg}}
                                <!--<span  class="oneMsg">{{errorMessage}}</span>-->
                                </span>
                            </div>
                        </div>
                        <span id="codeResult" class="error-msg text-align"></span>
                        <div><span class="errorMsg">{{errorMessage}}</span></div>
                        <div class="form-group">

                            <risk-com :read-checked.sync="readChecked" :risk-content="riskContent" :msg-tip="msgTip">
                            </risk-com>

                            <div class="subLinkMan"  v-if="initBtn">
                                <button type="button" class=" btn-style  btn-submit" data-toggle="button" @click="submit">提交</button>
                            </div>
                            <div  v-if="loadingBtn">
                                <load-btn></load-btn>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="panel panel-default allDivWidth">
            <div class="panel-body panel-bgcolor">
                <p> 业务须知：</p>
                <p>1、提交申请后，我司客服热线400-8888-598将对您预留手机号码进行电话回访，回访确认后，新通讯地址生效。</p>
            </div>
        </div>
    </div>
    <!--提交成功显示的提示页面-->
    <div v-else>
        <suc-info></suc-info>
    </div>
</template>
<script>
    import sendCodes from '../../components/publicMethod/sendCodes.vue';
    import sucInfo from '../../components/backResult/suc.vue';
    import {onlineGlobal,onlineGlobalOne,infoAddressCode,customerType,initMsgCode,outLoginType,checkSendMsgCode} from '../../util/config';
    import loadBtn from '../publicMethod/submitLoadBtn.vue';
    import {getErrorMsg,flagLogin} from '../../util/errorMsg.js';
    import {getCookie,setCookie}from '../../util/cookie.js';
    import riskCom from  '../../components/publicMethod/riskCom.vue'
    export default{
        //短信验证码
        components:{
            sendCodes:sendCodes,
            sucInfo:sucInfo,
            loadBtn:loadBtn,
            riskCom:riskCom
        },
        data:function(){
        return{
            idAddr:'',
            infoAddress:'',
            submitInfo:true,
            errorMessage:'',
            codeMsg:'',
            fetchCodeMsg:true,
            timerCodeMsg:'',
            initBtn:true,
            loadingBtn:false,
            readChecked:false,
            riskContent:'postAddress',
            msgTip:"我已阅读并遵守《通讯地址变更风险确认书》"
        }
    },
        ready:function(){
            flagLogin();//判断登录状态
            let userScape=getCookie("user");
            if(userScape !=""){
                let userInfo=JSON.parse(unescape(userScape));
                this.idAddr = userInfo.data[0]['34']
            }
        },
    methods:{
        focusInfo:function(){
            this.errorMessage = ''
        },
        submit: function(){


            if(!$('#infoAddress' ).parsley('isValid')){
                $('#infoAddress' ).parsley('validate')
                return;
            }
            if(!$('#codeMsg' ).parsley('isValid')){
                $('#codeMsg' ).parsley('validate')
                return;
            }

            if(!this.readChecked)
            {
                this.$broadcast("parent-submit");
                return;
            }

            this.loadingBtn = true;
            this.initBtn = false;
            var _this=this;
            let userScape=getCookie("userAccount");
            if(userScape != ""){
                let userInfo=JSON.parse(unescape(userScape));
                var account = userInfo.account;
                var token = userInfo.token;
                $.ajax({
                    url:onlineGlobal,
                    type:'post',
                    dataType:'json',
                    data:JSON.stringify({ func:checkSendMsgCode,type:outLoginType,account:account,token:token,
                        data:[{16:_this.codeMsg}]}),
                    contentType:'application/json',
                    success:function(data){
                        if(data.retHead == 1){
                            //如果校验成功 就执行提交操作
                            $.ajax({
                                url:onlineGlobal,
                                type:'post',
                                data:JSON.stringify({func:infoAddressCode,type:customerType,account:account,token:token,data:[{73:_this.infoAddress,16:_this.codeMsg}]}),
                                contentType:'application/json',
                                success:function(data){
                                    if(getErrorMsg(data) == 1){
                                        _this.loadingBtn = false;
                                        _this.initBtn = true;
                                        if(_this.submitInfo == true) {//判断是否显示成功提示
                                            _this.submitInfo = false
                                        }else{
                                            _this.submitInfo = true
                                        }
                                    }else{
                                        _this.loadingBtn = false;
                                        _this.initBtn = true;
                                        _this.errorMessage = data.desc;
                                    }
                                },error:function(data){
                                    _this.loadingBtn = false;
                                    _this.initBtn = true;
                                    _this.errorMessage ="服务器异常";
                                    console.log("服务器异常");
                                }
                            })
                        }else{
                            _this.loadingBtn = false;
                            _this.initBtn = true;
                            _this.errorMessage = data.desc;
                        }
                    },error:function(data){
                        _this.loadingBtn = false;
                        _this.initBtn = true;
                        this.errorMessage ="服务器异常";
                    }
                })
            }
        },
        fetchCodeClick: function(){
            if(!$('#infoAddress' ).parsley('isValid')){
                $('#infoAddress' ).parsley('validate')
                return;
            }
            var _this= this;
            let userScape = getCookie("user");
            let accountScape = getCookie("userAccount");
            if(userScape != "" ||  accountScape != "") {
                let userInfo=JSON.parse(unescape(userScape));
                let accountInfo=JSON.parse(unescape(accountScape));
                var phoneNo = userInfo.data[0]['30']
                var account = accountInfo.account;
                var token =accountInfo.token;
                $.ajax({
                    url: onlineGlobal,
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        func: initMsgCode, type: outLoginType,
                        account: account, token: token, data: [{30: phoneNo}]
                    }),
                    success:function(data){
                        if(data.retHead == 1){
                            //点击获取验证码按钮 如果== true就让此隐藏 else 显示
                            if(_this.fetchCodeMsg == true ){
                                _this.fetchCodeMsg = false//让获取验证码隐藏  并出现倒计时
                                let sec =60;
                                for(let  i=0; i<=60; i++){
                                    window.setTimeout(function(){
                                        if (sec != 0) {
                                            _this.timerCodeMsg =   sec + "秒后重发验证" ;
                                            sec--;
                                        } else {
                                            sec = 60;//如果倒计时结束就让  获取验证码显示出来
                                            _this.fetchCodeMsg = true
                                        }
                                    }, i * 1000)
                                }
                            }else{
                                _this.fetchCodeMsg = true
                            }
                        }else{
                            _this.timerCodeMsg = data.desc
                        }
                    },error:function(data){
                        this.timerMsg= "服务器异常"
                        console.log("服务器异常");
                    }
                })
            }
        }
    }
    }
</script>
