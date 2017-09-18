<template>
    <div class="panel panel-default top10 titleWidth">
        <div class="panel-body panel-title" >
            <img src="../../image/index/round.png" class="round-icon"><span class="round-title">休眠账户激活</span>
        </div>
    </div>
    <div v-if="submitInfo" >
        <div class="panel panel-default allDivWidth linkmanInfo " style="height: 299px">
            <div class="panel-body" v-show="accountActivat">
                <div class="form-group top17  formTop">
                    <div class="inputPosition checkboxInfo">
                        <label class="titleLeft">
                            <input type="checkbox" id="checkBox"> 申请休眠账户激活
                        </label>
                    </div>
                </div>
                <form class="top17  formTop" role="form" data-validate="parsley">
                    <div class="form-group">
                        <label  class="labelAll">手机验证码：</label>
                        <div class="inputPosition">
                            <input type="text" class="form-control form-text"
                                   id="codeMsg" autocomplete="off"
                                   v-model="codeMsg"
                                   data-required="true"
                                   @focus="codeFocus"
                                   maxlength="6"
                                   data-regexp="^[0-9]*$"
                                   data-error-message="亲，请输入纯数字的验证码"
                                   data-error-container="#codeResult"
                                   placeholder="请输入验证码" style="width: 140px;">
                        </div>
                        <send-codes></send-codes>
                    </div>
                    <span id="codeResult" class="error-msg text-align"></span>
                    <div><span class="errorMsg" v-bind:class="[eMsg]">{{errorMessage}}</span></div>
                    <div class="form-group">
                        <div class="subLinkMan" v-if="initBtn">
                            <button type="button" class=" btn-style  btn-submit" data-toggle="button" @click="submit">提交</button>
                        </div>
                        <div  v-if="loadingBtn">
                            <load-btn></load-btn>
                        </div>
                    </div>
                </form>
            </div>
            <div class="panel-body" v-show="noNextShow">
                <div class="contextTitleCancel">
                    <img src="../../image/index/warn.png" class="imgTip"> <span class="tipMsg"> 您的账户目前不可发起激活流程!</span>
                </div>
            </div>
            <div v-show="loadingShow">
                <loading-Info></loading-Info>
            </div>
        </div>
        <div class="panel panel-default allDivWidth">
            <div class="panel-body panel-bgcolor">
                <p>业务须知：</p>
                <p>1、账户资金大于1001元。</p>
                <p>  2、若有中金所编码，需通过递交纸质材料申请中金所激活。</p>
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
    import {onlineGlobal,onlineGlobalOne,sleepAccountCode,customerType,accountCancel,checkSendMsgCode,outLoginType} from '../../util/config';
    import loadBtn from '../publicMethod/submitLoadBtn.vue';
    import {getErrorMsg,flagLogin} from '../../util/errorMsg.js';
    import {getCookie}from '../../util/cookie.js';
    import loadingInfo from '../../components/publicMethod/lodingIng.vue'
    export default{
        //短信验证码
        components:{
            sendCodes:sendCodes,
            sucInfo:sucInfo,
            loadBtn:loadBtn,
            loadingInfo:loadingInfo
        },
        data:function(){
        return{
            errorMessage:'',
            submitInfo:true,
            codeMsg:'',
            eMsg:'',
            accountActivat:false,
            initBtn:true,
            loadingBtn:false,
            loadingShow:true,
            noNextShow:false
        }
    },
        ready:function(){
            flagLogin();//判断登录状态
            //查询是否有取消保底税的权限
            var userScape=getCookie("userAccount");
            if(userScape != ""){
                let userInfo=JSON.parse(unescape(userScape));
                var  account =  userInfo.account;
                var token = userInfo.token;
                var _this=this;
                $.ajax({
                    url:onlineGlobal,
                    type:'post',
                    data:JSON.stringify({func:accountCancel,type:customerType,account:account,token:token,data:[{ }]}),
                    contentType:'application/json',
                    success:function(data){
                        _this.loadingShow = false
                        if(data.retHead != 1){
                            //无权限
                            _this.accountActivat = false
                            _this.noNextShow = true
                        }else{
                            _this.accountActivat = true
                            _this.noNextShow = false
                        }
                    }
                })
            }else{
                router.go({path:'/'});
            }
            //如果缓存不存在就直接到登录页面
            let userAccount=getCookie("userAccount");
            let flagData = getCookie("flagData");
            if(userAccount == '' || flagData == ""){
                router.go({path:'/'});
            }
        },
    methods:{
        codeFocus:function(){
            this.errorMessage = ""
        },
        submit:function(){
            var checkBox = document.getElementById("checkBox");
            if(checkBox.checked){
                this.errorMessage=""
            }else{
                this.errorMessage = '请勾选申请休眠账户激活';
                this.eMsg = 'eMsg'
                return;
            }
            if(!$('#codeMsg' ).parsley('isValid')){
                $('#codeMsg' ).parsley('validate')
                return;
            }
            this.loadingBtn = true;
            this.initBtn = false;
            var _this=this;
            var userScape=getCookie("userAccount");
            if(userScape != " "){
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
                                data:JSON.stringify({func:sleepAccountCode,type:customerType,account:account,token:token,data:[{16:_this.codeMsg}]}),
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
        }
    }
    }
</script>
