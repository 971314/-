<template>
    <div class="msgCode">
        <button  v-if="fetchCodeMsg"  type="button" @click="fetchCodeClick" class="btn-style  btn-submit" data-toggle="button">获取验证码
        </button>
        <span  class="sendMsg"  v-else> {{timerCodeMsg}}
        <span  class="oneMsg">{{errorMessage}}</span>
        </span>
    </div>
</template>
<script>
 import  {onlineGlobal,onlineGlobalOne,initMsgCode,outLoginType} from '../../util/config';
 import {setCookie,getCookie}from '../../util/cookie.js';
    export default{
        data:function(){
            return{
                fetchCodeMsg:true,
                timerCodeMsg:'',
                errorMessage:''
            }
        },
           methods: {
               fetchCodeClick: function(){
                   var _this= this;
                   //获取短信验证码
                   let userScape = getCookie("user");
                   let accountScape = getCookie("userAccount");
                   if(userScape != "" ||  accountScape != "") {
                       let userInfo=JSON.parse(unescape(userScape));
                       let accountInfo=JSON.parse(unescape(accountScape));
                       var phoneNo = userInfo.data[0]['30'];
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