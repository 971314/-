<template>
    <div class="panel panel-default top10 allDivWidth">
        <div class="panel-body panel-title" >
            <img src="../../../image/index/round.png" class="round-icon"><span class="round-title">添加结算账户</span>
        </div>
    </div>
    <div v-if="submitInfo" >
        <div class="panel panel-default linkmanInfo allDivWidth">
            <div class="panel-body panelHeight">
                <div class="divImgOne">
                    <div class="blue-round">1</div>
                    <div class="fontOne">更改有效期</div>
                    <div class="rightLine-blue"></div>
                </div>
                <div class="divImgAccountTwo">
                    <div class="blue-round">2</div>
                    <div class="fontOne">上传扫描件</div>
                    <div class="rightLine-blue"></div>
                </div>

                <div class="divImgAccountThree">
                    <div class="blue-round">3</div>
                    <div class="fontOne">签署协议</div>
                    <div class="rightLine-blue" style="margin-left: 393px;"></div>
                </div>
                <div class="divImgFour">
                    <div class="blue-round">4</div>
                    <div class="fontOne">手机确认</div>
                </div>
                <form class="form-horizontal" role="form" style=" margin-top: 56px;">
                    <div class="form-group">
                        <label  class="labelAll">手机验证码：</label>
                        <div class="inputPosition">
                            <input type="text" class="form-control form-text"
                                   id="codeMsg"
                                   v-model="codeMsg"
                                   data-required="true"
                                   maxlength="6"
                                   data-regexp="^[0-9]*$"
                                   data-error-message="亲，请输入纯数字的验证码"
                                   data-error-container="#codeResult"
                                   placeholder="请输入验证码" style="width: 140px;">
                        </div>
                        <send-codes></send-codes>
                    </div>
                    <span id="codeResult" class="error-msg text-align"></span>
                    <div class="form-group">
                        <div class="cardDivStep" style="margin-left: 365px;">
                                <span class="cardStepThreeOn">
                                    <button type="button"   class="btn-style  btn-submit" v-link="{path:'/singAgreement'}" data-toggle="button">上一步</button>
                                </span>
                                <span class="cardStepThreeSubmit">
                                   <button type="button"   class="btn-style  btn-submit" data-toggle="button" @click="submit">提交</button>
                                </span>
                        </div>
                    </div>
                </form>
            </div>
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
</template>
<script>
    import sendCodes from '../../../components/publicMethod/sendCodes.vue';
    import {getCookie,setCookie}from '../../../util/cookie.js';
    export default {
        data:function(){
        return{
            codeMsg:'',
            submitInfo:true
        }
    },
    components:{
        sendCodes:sendCodes
    },
    methods:{
        submit:function(){
            if(!$('#codeMsg' ).parsley('isValid')){
                $('#codeMsg' ).parsley('validate')
                return;
            }
            //取出前三步的缓存数据
            let data = getCookie("accountInfo");
            if(data!=""){
                let accountInfo = JSON.parse(data);
                console.log(accountInfo)
            }
        }
    },
        ready:function(){

        }
    }
</script>
