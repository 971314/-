<template>
    <div class="panel panel-default top10 titleWidth">
        <div class="panel-body panel-title" >
            <img src="../../image/index/round.png" class="round-icon"><span class="round-title">联系方式变更</span>
        </div>
    </div>
    <div v-if="submitInfo" >
        <div class="panel panel-default allDivWidth" style="height: 399px">
            <div class="panel-body">
                <form class="  formTop" role="form" data-validate="parsley">
                    <div class="form-group">
                        <label    class="labelAll">旧手机号码：</label>
                        <div class="spanCardNo">
                            {{phoneNo}}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="newPhoneNo" class="labelAll">新手机号码：</label>
                        <div class="inputPosition">
                            <input type="text" class="form-control form-text" id="newPhoneNo" name="newPhoneNo" v-model="newPhoneNo"
                                   data-required="true"  maxlength="11" v-model="newPhoneNo" autocomplete="off"
                                   data-regexp="^(13|15|18|14|17)[0-9]{9}$"  @focus="codeMsgFocus"
                                   data-error-message="亲，请正确填写手机号（不支持港澳台手机号）"
                                   data-error-container="#newPhoneNoResult"
                                   placeholder="请输入新手机号">
                        </div>
                    </div>
                     <span  id="newPhoneNoResult"  class="error-msg text-align"></span>
                     <div class="form-group">
                         <label   class="labelAll"  >确认新手机号码：</label>
                         <div class=" inputPosition">
                             <input type="text" class="form-control form-text"
                                    id="confirmPhoneNo" v-model="confirmPhoneNo"
                                    data-required="true"  maxlength="11" autocomplete="off"
                                    data-regexp="^(13|15|18|14|17)[0-9]{9}$"  @focus="codeMsgFocus"
                                    data-error-message="亲，请正确填写新手机号"
                                    data-error-container="#confirmPhoneNoResult"
                                    placeholder="请输入新手机号码">
                         </div>
                     </div>
                    <span  id="confirmPhoneNoResult"  class="error-msg text-align"></span>
                     <div class="form-group">
                         <label  class="labelAll">手机验证码：</label>
                         <div class="inputPosition">
                             <input type="text" class="form-control form-text"
                                    id="codeMsg"
                                    @focus="codeMsgFocus"
                                    v-model="codeMsg" autocomplete="off"
                                    data-required="true"
                                    maxlength="6"
                                    data-regexp="^[0-9]*$"
                                    data-error-message="亲，请输入纯数字的验证码"
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
                     <span class="errorMsg">{{errorMessage}}</span>
                     <div class="form-group">
                         <risk-com :read-checked.sync="readChecked" :risk-content="riskContent" :msg-tip="msgTip">
                         </risk-com>

                         <div class="subLinkMan"  v-if="initBtn">
                             <button type="button" class=" btn-style  btn-submit" data-toggle="button"  @click="modifyLinkMan">提交</button>
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
                 <p>业务须知： </p>
                 <p>
                     1、提交申请后，我司客服热线400-8888-598将对您的新手机号码进行电话回访，回访确认后，新手机号码正式生效。
                 </p>
             </div>
         </div>
    </div>
    <!--提交成功显示的提示页面-->
    <div v-else>
        <suc-info></suc-info>
    </div>
 </template>
 <script>
     import store from '../../vuex/store'
     import sendCodes from '../../components/publicMethod/sendCodes.vue'
     import sucInfo from '../../components/backResult/suc.vue'
     import {getBaseInfo} from '../../vuex/getters'
     import { requestMyInfo } from '../../vuex/action'
     import {onlineGlobal,onlineGlobalOne,linkModifyCode,customerType,initMsgCode,outLoginType,checkSendMsgCode} from '../../util/config'
     import loadBtn from '../publicMethod/submitLoadBtn.vue';
     import {getErrorMsg,flagLogin} from '../../util/errorMsg.js';
     import {getCookie,setCookie}from '../../util/cookie.js';
     import valid from '../../image/valid.png';
     import orvalid from '../../image/orvalid.png';
     import riskCom from  '../../components/publicMethod/riskCom.vue'
     export default{
       store:store,
       vuex:{
           getters:{
               baseInfo: getBaseInfo,
           },
           actions:{
               requestMyInfo:requestMyInfo
           }
       },
       data:function(){
           return{
               newPhoneNo:'',
               errorMessage:'',
               newPhoneNo:'',
               fetchCodeMsg:true,
               timerMsg:'',
               submitInfo:true,
               phoneNo:'',
               codeMsg:'',
               confirmPhoneNo:'',
               timerCodeMsg:'',
               initBtn:true,
               loadingBtn:false,
               readChecked:false,
               riskContent:'mobileChange',
               msgTip:"我已阅读并遵守《手机号变更风险确认书》"
           }
       },
         //使用组件方法可以共用
         components:{
             //sendCodes,
             sucInfo:sucInfo,
             loadBtn:loadBtn,
             riskCom:riskCom
         },

         ready: function(){
           flagLogin();//判断登录状态
//               this.requestMyInfo()
                 var _this = this;
                  let userScape=getCookie("user")
                     if(userScape != ""){
                         let userInfo=JSON.parse(unescape(userScape))
                         _this.phoneNo = userInfo.data[0]['30']
                     }

             $("#confirmPhoneNo").change(function(){

                 if(_this.confirmPhoneNo!= _this.newPhoneNo)
                 {
                     _this.errorMessage ="两次手机号输入应该相同";
                 }
                 else
                 {
                     _this.errorMessage ="";
                 }

             })
         },
           methods:{

               codeMsgFocus: function(){
//                   this.errorMessage = "
               },
               modifyLinkMan : function(){

                    if(!$('#newPhoneNo' ).parsley('isValid')){
                        $('#newPhoneNo' ).parsley('validate')
                        return;
                    }
                   if(!$('#confirmPhoneNo' ).parsley('isValid')){
                       $('#confirmPhoneNo' ).parsley('validate')
                       return;
                   }

                   if(this.confirmPhoneNo!= this.newPhoneNo)
                   {
                       this.errorMessage ="两次手机号输入应该相同";
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
                       var  account = userInfo.account;
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
                                       data:JSON.stringify({ func:linkModifyCode,type:customerType,account:account,token:token,data:[{73: _this.newPhoneNo,16:_this.codeMsg}]}),
                                       contentType:'application/json',
                                       success:function(data){
                                           if(getErrorMsg(data) == 1){
                                               _this.loadingBtn = false;
                                               _this.initBtn = true;
                                               if(_this.submitInfo == true) {//判断是否显示成功提示
                                                   _this.submitInfo = false
                                               } else{
                                                   _this.loadingBtn = false;
                                                   _this.initBtn = true;
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
                   if(!$('#newPhoneNo' ).parsley('isValid')){
                       $('#newPhoneNo' ).parsley('validate')
                       return;
                   }
                   if(!$('#confirmPhoneNo' ).parsley('isValid')){
                       $('#confirmPhoneNo' ).parsley('validate')
                       return;
                   }

                   if(this.confirmPhoneNo!= this.newPhoneNo)
                   {
                       this.errorMessage ="两次手机号输入应该相同";
                       return;
                   }

                   var _this= this;
                   //获取短信验证码
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