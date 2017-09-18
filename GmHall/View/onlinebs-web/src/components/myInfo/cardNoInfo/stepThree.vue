<template>
    <div class="panel panel-default top10 allDivWidth">
        <div class="panel-body panel-title" >
            <img src="../../../image/index/round.png" class="round-icon"><span class="round-title">身份证有效期变更</span>
        </div>
    </div>
    <div v-if="submitInfo" >
        <div class="panel panel-default linkmanInfo allDivWidth">
            <div class="panel-body panel-bgcolor panelHeight">
                <div class="blue-round">1</div>
                <div class="fontOne">更改有效期</div>
                <div class="rightLine-blue"></div>
                <div class="divImgTwo">
                    <div class="blue-round">2</div>
                    <div class="fontOne">上传扫描件</div>
                    <div class="rightLine-blue"></div>
                </div>
                <div class="divImgThree">
                    <div class="blue-round">3</div>
                    <div class="fontOne">手机确认</div>
                </div>
                <form class="form-horizontal" role="form" style=" margin-top: 47px;">
                    <div class="form-group" >
                        <label  class="labelAll">手机验证码：</label>
                        <div class="inputPosition">
                            <input type="text" class="form-control form-text"
                                   id="codeMsg" autocomplete="off"
                                   @focus="focusInfo"
                                   v-model="codeMsg"
                                   data-required="true"
                                   maxlength="6"
                                   data-error-message="亲，请正确输入验证码"
                                   data-error-container="#codeResult"
                                   placeholder="请输入验证码" style="width: 140px;">
                        </div>
                        <send-codes></send-codes>
                    </div>
                    <span id="codeResult" class="error-msg text-align sendMsgInfo">{{errorMessage}}</span>
                    <div class="form-group" style="margin-top: -30px; ">

                        <risk-com :read-checked.sync="readChecked" :risk-content="riskContent" :msg-tip="msgTip">
                        </risk-com>

                        <div class="cardDivStep" style="margin-left: 365px;">
                            <span class="cardStepThreeOn">
                                <button type="button"   class="btn-style  btn-submit" v-link="{path:'/main/stepTwo'}" data-toggle="button">上一步</button>
                            </span>
                            <span class="cardStepThreeSubmit" v-if="initBtn">
                               <button type="button"    class="btn-style  btn-submit" data-toggle="button" @click="submit">提交</button>
                            </span>
                            <span class="cardStepThreeSubmit" v-if="loadingBtn">
                                <button type="button" class="submitLoadCCC">处理中...</button>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="panel panel-default allDivWidth">
            <div class="panel-body panel-bgcolor">
                <p>业务须知： </p>
                <p>  1、新上传的身份证正反面扫描件必须完整且内容清晰。 </p>
                <p>  2、上传文件不超过1M。 </p>
            </div>
        </div>
    </div>
        <!--提交成功显示的提示页面-->
        <div v-else>
            <suc-info></suc-info>
        </div>
</template>
<script>
    import sendCodes from '../../../components/publicMethod/sendCodes.vue';
    import sucInfo from '../../../components/backResult/suc.vue';
    import {onlineGlobal,onlineGlobalOne,cardNoCode,customerType,checkSendMsgCode,outLoginType} from '../../../util/config';
    import {getErrorMsg} from '../../../util/errorMsg.js';
    import {flagLogin} from '../../../util/errorMsg.js';
    import {getCookie,setCookie}from '../../../util/cookie.js';
    import riskCom from  '../../../components/publicMethod/riskCom.vue'
    export default{
        components:{
            sendCodes:sendCodes,
            sucInfo:sucInfo,
            riskCom:riskCom
        },
        data:function(){
        return{
            codeMsg:'',
            submitInfo:true,
            errorMessage:'',
            initBtn:true,
            loadingBtn:false,
            readChecked:false,
            riskContent:'idCard',
            msgTip:"我已阅读并遵守《身份证有效期变更风险确认书》"
        }
    },
        ready:function(){
            flagLogin();//判断登录状态
        },
        methods:{
            focusInfo:function(){
                this.errorMessage = ''
            },
            submit:function(){
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
                if(userScape!=""){
                    let userInfo=JSON.parse(unescape(userScape));
                    var  account = userInfo.account;
                    var token =userInfo.token;
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
                                //取出前两步骤的值
                                let cardInfo =unescape(sessionStorage.getItem("cardNoInfo"));
                                if(cardInfo!=""){
                                    var cardInfoData =JSON.parse(cardInfo);
                                    console.log(cardInfoData['52'])
                                    $.ajax({
                                        url:onlineGlobal,
                                        type:'post',
                                        data:JSON.stringify({func:cardNoCode,type:customerType,account:account,token:token,
                                            data:[{
                                                52:cardInfoData['52'],
                                                53:cardInfoData['53'],
                                                16:_this.codeMsg,
                                                81:cardInfoData['81'],
                                                82:cardInfoData['82'],
                                                83:cardInfoData['83'],
                                                84:cardInfoData['84']
                                            }]}),
                                        xhrFields:{withCredentials: true},
                                        crossDomain:true,
                                        contentType:'application/json',
                                        success:function(data){
                                            if(getErrorMsg(data) == 1){
                                                localStorage.clear();//清空缓存的信息
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
                                }
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
