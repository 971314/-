<template>
        <div class="panel panel-default top10 titleWidth">
            <div class="panel-body panel-title" >
                <img src="../../../image/index/round.png" class="round-icon"><span class="round-title">重置密码</span>
            </div>
        </div>
        <div v-if="submitInfo" >
                    <div class="panel panel-default allDivWidth linkmanInfo">
                        <div class="panel-body panel-default panelHeight ">
                            <div class="blue-round">1</div>
                            <div class="fontOne">选择密码类型</div>
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
                                <form class="form-horizontal" role="form" style=" margin-top: 56px;">
                                    <div class="form-group" >
                                        <label  class="labelAll">手机验证码：</label>
                                        <div class="inputPosition">
                                            <input type="text" class="form-control form-text"
                                                   id="codeMsg"
                                                   v-model="codeMsg"
                                                   data-required="true"
                                                   maxlength="6"
                                                   @focus="focusInfo"
                                                   data-regexp="^[0-9]*$"
                                                   data-error-message="亲，请输入纯数字的验证码"
                                                   data-error-container="#codeResult"
                                                   placeholder="请输入验证码" style="width: 140px;">
                                        </div>
                                        <div class="msgCode">
                                            <button  v-if="fetchCodeMsg"  type="button" @click="fetchCodeClick" class="btn-style  btn-submit" data-toggle="button">获取验证码
                                            </button>
                                            <span  class="sendMsg"  v-else> {{timerCodeMsg}}
                                            </span>
                                        </div>
                                    </div>
                                    <span id="codeResult" class="msgBottom text-align">{{errorMessage}}</span>
                                    <div class="form-group">
                                        <div class="cardDivStep" style="margin-left: 365px;">
                                            <span class="cardStepThreeOn">
                                                <button type="button"   class="btn-style  btn-submit" v-link="{path:'/resetPassInfo/resetPassTwo'}" data-toggle="button">上一步</button>
                                            </span>
                                            <span class="cardStepThreeSubmit" v-if="initBtn">
                                               <button type="button"  @click="submit"  class="btn-style  btn-submit" data-toggle="button">提交</button>
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
                    业务须知：
                    <div>
                        提交变更申请后，我们客服人员会对新号码进行电话回访，回访后新手机号正式生效。
                    </div>
                </div>
            </div>
        </div>
        <!--提交成功显示的提示页面-->
        <div v-else>
            <suc-info></suc-info>
        </div>
    </div>
</template>
<script>
    import store from '../../../vuex/store';
    import {getSaveInfo} from '../../../vuex/getters';
    import {onlineGlobal,onlineGlobalOne,resetPassCode,customerType,initMsgCode,outLoginType,checkSendMsgCode} from '../../../util/config';
    import sucInfo from '../../../components/backResult/resetPassSuc.vue';
    import {getCookie,setCookie}from '../../../util/cookie.js';
    export default{
        //短信验证码
        components:{
            sucInfo:sucInfo
        },
        store:store,
        vuex:{
            getters:{
                saveInfo:getSaveInfo,
            }
        },
        data:function(){
        return{
            submitInfo:true,
            codeMsg:'',
            errorMessage:'',
            initBtn:true,
            loadingBtn:false,
            fetchCodeMsg:true,
            timerMsg:'',
            timerCodeMsg:'',
        }
    },
        methods:{
            focusInfo:function(){
                this.errorMessage = ''
            },
            submit:function(){
                var _this=this;
                if(!$('#codeMsg' ).parsley('isValid')){
                    $('#codeMsg' ).parsley('validate')
                    return;
                }
                this.loadingBtn = true;
                this.initBtn = false;
                //取出前两步填写的信息
                let resetPassInfo =unescape(sessionStorage.getItem("resetPassInfo"));
                if(resetPassInfo !=""){
                    let dataInfo =JSON.parse(resetPassInfo);
                    $.ajax({
                        url:onlineGlobal,
                        type:'post',
                        dataType:'json',
                        data:JSON.stringify({ func:checkSendMsgCode,type:outLoginType,account:dataInfo['21'],token:'',
                            data:[{16:_this.codeMsg}]}),
                        contentType:'application/json',
                        success:function(data){
                            if(data.retHead == 1){
                                //如果校验成功 就执行提交操作
                                $.ajax({
                                    url:onlineGlobal,
                                    type:'post',
                                    data:JSON.stringify({
                                        func:resetPassCode,
                                        type:customerType,
                                        account:dataInfo['21'],
                                        token:'',
                                        data:[{
                                            74:dataInfo['74'],
//                                        75: dataInfo['75'],
                                            16:_this.codeMsg,
                                            81:dataInfo['81'],
                                            82:dataInfo['82'],
                                            83:dataInfo['83'],
                                            84:dataInfo['84']
                                        }]
                                    }),
                                    xhrFields:{withCredentials: true},
                                    crossDomain:true,
                                    contentType:'application/json',
                                    success:function(data){
                                        sessionStorage.removeItem("stepOneRestPass");//清空重置密第一步码缓存的信息
                                        sessionStorage.removeItem("restPassCardFront");//清空缓存的信息
                                        sessionStorage.removeItem("restPassCardUnFront");//清空缓存的信息
                                        if(data.retHead == 1){
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
                                        //  console.log("服务器异常");
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
                var _this= this;
                let resetPassInfo =unescape(sessionStorage.getItem("resetPassInfo"));
                if(resetPassInfo != ""){
                    let data =JSON.parse(resetPassInfo);
                    //获取短信验证码
                    $.ajax({
                        url: onlineGlobal,
                        type: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            func: initMsgCode, type: outLoginType,
                            account: data['21'], token: '', data: [{30: data['30']}]
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
                            //     console.log("服务器异常");
                        }
                    })
                }
                }
        },
        ready:function(){
//            let data=JSON.parse(this.saveInfo)
//            console.log(data.billAccount)
//            let resetPassInfo =unescape(getCookie("resetPassInfo"))
//            let data =JSON.parse(resetPassInfo);
           // console.log(data)
        }
    }
</script>