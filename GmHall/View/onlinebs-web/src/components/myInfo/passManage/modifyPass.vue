<template>
    <div v-if="submitInfo">
        <div class="panel panel-default top10 titleWidth">
            <div class="panel-body panel-title" >
                <img src="../../../image/index/round.png" class="round-icon"><span class="round-title">修改密码</span>
            </div>
        </div>
        <div class="panel panel-default allDivWidth linkmanInfo">
            <div class="panel-body" style="height: 460px;">
                <form class="top17  formTop" role="form" data-validate="parsley"  >
                    <div class="form-group">
                        <label    class="labelAll">密码类型：</label>
                        <div class="modifyPass">
                            <select type="text" class="form-control form-text" v-model="selectType">
                                <option value="0" selected>交易密码</option>
                                <option value="1">资金密码</option>
                                <!--<option value="10">通讯密码</option>-->
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="initPass" class="labelAll">原密码：</label>
                        <div class="inputPosition">
                            <input type="password" class="form-control form-text" id="initPass" name="initPass" v-model="initPass"
                                   data-required="true" autocomplete="off"
                                   data-regexp=""  @focus="codeMsgFocus"
                                   data-error-message="亲，请正确填写密码格式"
                                   data-error-container="#initPassResult"
                                   placeholder="请输入原密码">
                        </div>
                    </div>
                    <span  id="initPassResult"  class="error-msg text-align"></span>
                    <div class="form-group">
                        <label   class="labelAll"  >新密码：</label>
                        <div class=" inputPosition">
                            <input type="password" class="form-control form-text" name="newPass"
                                   id="newPass"
                                   v-model="newPass"  @focus="codeMsgFocus"
                                   data-required="true" autocomplete="off"
                                   data-regexp=""
                                   data-error-message="亲，请正确填写密码格式"
                                   data-error-container="#newPassResult"
                                   placeholder="请输入新密码">
                        </div>
                    </div>
                    <span  id="newPassResult"  class="error-msg text-align"></span>
                    <div class="form-group">
                        <label   class="labelAll"  >确认新密码：</label>
                        <div class=" inputPosition">
                            <input type="password" class="form-control form-text"
                                   id="confirmPass" name="confirmPass"
                                   v-model="confirmPass"
                                   @focus="codeMsgFocus"
                                   data-required="true"  maxlength="11"
                                   data-regexp="" autocomplete="off"
                                   data-error-message="亲，请正确填写确认新密码"
                                   data-error-container="#confirmPassResult"
                                   placeholder="请输入确认新密码">
                        </div>
                    </div>
                    <span  id="confirmPassResult"  class="error-msg text-align"></span>
                    <div class="form-group">
                        <label  class="labelAll">手机验证码：</label>
                        <div class="inputPosition">
                            <input type="text" class="form-control form-text"
                                   id="codeMsg"
                                   @focus="codeMsgFocus"
                                   data-required="true"
                                   maxlength="6"
                                   v-model="codeMsg" autocomplete="off"
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
                    <div><span class="bankMsg">{{errorMessage}}{{msgInfo}}</span></div>
                    <div class="form-group">
                        <div class="subLinkMan" style="margin-top:10px" v-if="initBtn">
                            <button type="button" class=" btn-style  btn-submit" data-toggle="button" @click="submit">提交</button>
                        </div>
                        <div  v-if="loadingBtn">
                            <load-btn></load-btn>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="panel panel-default allDivWidth">
            <div class="panel-body panel-bgcolor">
                <p>  业务须知：</p>
                <p>
                    1、资金密码和交易密码请输入六位阿拉伯数字。
                </p>
            </div>
        </div>
    </div>
    <!--提交成功显示的提示页面-->
    <div v-else>
        <div class="panel panel-default top10 titleWidth">
            <div class="panel-body panel-title">
                <img src="../../../image/index/round.png" class="round-icon"><span class="round-title">修改密码 </span>
            </div>
        </div>
        <suc-info></suc-info>
    </div>
</template>
<script>
    import  {onlineGlobal,onlineGlobalOne,modifyPass,loginType,initMsgCode,outLoginType,checkSendMsgCode} from '../../../util/config';
    import sucInfo from '../../../components/backResult/sucModifyPass.vue';
    import loadBtn from '../../publicMethod/submitLoadBtn.vue';
    import {getErrorMsg,flagLogin} from '../../../util/errorMsg.js';
    import {Base64} from '../../../util/base64.js';
    import {getCookie,setCookie}from '../../../util/cookie.js';
    export default{
        data:function(){
        return{
            newPass:'',
            confirmPass:'',
            msgInfo:'',
            selectType:'',
            initPass:'',
            fetchCodeMsg:true,
            timerMsg:'',
            codeMsg:'',
            submitInfo:true,
            errorMessage:'',
            timerCodeMsg:'',
            initBtn:true,
            loadingBtn:false
        }
    },
        //使用组件方法可以共用
        components:{
            //sendCodes,
            sucInfo:sucInfo,
            loadBtn:loadBtn
        },
        ready:function(){
            flagLogin();//判断登录状态
        },
        methods:{
            submit:function(){
                if(!$('#initPass' ).parsley('isValid')){
                    $('#initPass' ).parsley('validate')
                    return;
                }
                if(!$('#newPass' ).parsley('isValid')){
                    $('#newPass' ).parsley('validate')
                    return;
                }
                if(!$('#confirmPass' ).parsley('isValid')){
                    $('#confirmPass' ).parsley('validate')
                    return;
                }
                if(this.initPass == this.newPass){
                    this.msgInfo = "新密码和旧密码一致，请重新输入";
                    return;
                }
                if(this.confirmPass != this.newPass){
                    $("#codeResult").html("")
                    this.msgInfo = "确认密码和新密码不一致，请重新输入";
                    return;
                }
                if(!$('#codeMsg' ).parsley('isValid')){
                    $('#codeMsg' ).parsley('validate')
                    return;
                }
                this.loadingBtn = true;
                this.initBtn = false;
                var _this=this;
                let userScape=getCookie("userAccount")
                if(userScape != ""){
                    let userInfo=JSON.parse(unescape(userScape))
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
                                var b =new Base64();
                                $.ajax({
                                    url:onlineGlobal,
                                    type:'post',
                                    data:JSON.stringify({ func:modifyPass,type:loginType,account:account,token:token,
                                        data:[{166: b.encode(_this.newPass),253: b.encode(_this.initPass),167:_this.selectType
                                         ,16:_this.codeMsg
                                        }]}),
                                    contentType:'application/json',
                                    success:function(data){
                                        //alert(data)
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
            codeMsgFocus:function(){
                this.msgInfo = "";this.errorMessage = ""
            },
            fetchCodeClick: function(){
                this.errorMessage = ""
                if(!$('#initPass' ).parsley('isValid')){
                    $('#initPass' ).parsley('validate')
                    return;
                }
                if(!$('#newPass' ).parsley('isValid')){
                    $('#newPass' ).parsley('validate')
                    return;
                }
                if(!$('#confirmPass' ).parsley('isValid')){
                    $('#confirmPass' ).parsley('validate')
                    return;
                }
                if(this.confirmPass != this.newPass){
                    this.msgInfo = "确认密码和新密码不一致，请重新输入";
                    return;
                }
                var _this= this;
                let userScape = getCookie("user");
                let accountScape = getCookie("userAccount");
                if(userScape != "" ||  accountScape != "") {
                    let userInfo=JSON.parse(unescape(userScape))
                    let accountInfo=JSON.parse(unescape(accountScape))
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