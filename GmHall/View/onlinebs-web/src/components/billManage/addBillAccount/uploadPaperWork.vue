<template>
    <div class="panel panel-default top10 allDivWidth">
        <div class="panel-body panel-title" >
            <img src="../../../image/index/round.png" class="round-icon"><span class="round-title">添加结算账户</span>
        </div>
    </div>
    <div class="panel panel-default linkmanInfo allDivWidth">
        <div class="panel-body" style="height: 574px;">
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
                <div class="gray-round">3</div>
                <div class="fontTwo">签署协议</div>
                <div class="rightLine-grays" style="margin-left: 393px;"></div>
            </div>
            <div class="divImgFour">
                <div class="gray-round">4</div>
                <div class="fontTwo">手机确认</div>
            </div>
            <div class="top-step">
                <div class="accountDivOne">
                    <div class="spanCardOne">银行卡正面</div>
                    <div class="divBankImg">
                        <img :src="bankNoFront" class="cardFront">
                    </div>
                    <span class="spanCardOne">
                         <input type="file" class="upFileOne" @change="upBankNoFront" id="bankNoFront">
                        <button type="button" class="btn-style uploadBtn btn-submit btnAccount"   style="margin-top:-50px" data-toggle="button">上传</button>
                    </span>
                </div>
                <div class="accountDivTwo">
                    <div class="spanCardOne">身份证正面</div>
                    <div class="divCardImgOne">
                        <img :src="cardNoFront"   class="cardFront"  >
                        <span class="spanCardOne">
                             <input type="file" class="upFileTwo" @change="upCardNoFront" id="cardNoFront">
                            <button type="button" style="margin-left: 88px;margin-top:-43px"  class="btn-style uploadBtn btn-submit btnAccount"  data-toggle="button">上传</button>
                        </span>
                    </div>
                </div>
                <div class="accountDivThree" style="    margin-top: -228px;">
                    <div class="spanCardOne">身份证反面</div>
                    <div class="divCardImgOne">
                        <img :src="cardNoUnFront"   class="cardFront" >
                    </div>
                    <input type="file" class="upFileThree" @change="upCardNoUnFront" id="cardNoUnFront">
                    <span class="spanCardUploadTwo">
                        <button style="    margin-top: 14px;  margin-left: -317px" type="button" class="btn-style uploadBtn  btn-submit btnAccount"  data-toggle="button">上传</button>
                    </span>
                </div>
                <span class="error-msg upFileMsg">{{errorMsg}}</span>
                <div class="uploadDivStep">
                    <span class="spanCardStepOne"><button  v-link="{path: '/changeValidity'}"   type="button" class="btn-style  btn-submit upFirst"  data-toggle="button">上一步</button></span>
                    <span class="spanCardUploadTwo" style="margin-left: 227px;"><button type="button"   class="btn-style   btn-submit downFirst"  data-toggle="button" @click="nextOneStep">下一步</button></span>
                </div>
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
</template>
<script>
    import {getCookie,setCookie}from '../../../util/cookie.js';
    export default{
        data:function(){
        return{
            bankNoFront:"./dist/image/index/bankFront.png",
            cardNoFront:"./dist/image/index/cardFront.png",
            cardNoUnFront:"./dist/image/index/cardUnfront.png",
            errorMsg:''
        }
    },
     methods:{
            upBankNoFront:function(e){
                this.errorMsg =""
                var _this=this;
                var file=e.target.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    _this.bankNoFront = e.target.result;
                }
            },
            upCardNoFront:function(e){
                this.errorMsg =""
                var _this=this;
                var file= e.target.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e){
                    _this.cardNoFront = e.target.result;
                }
            },
            upCardNoUnFront:function(e){
                this.errorMsg =""
                var _this=this;
                var file= e.target.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e){
                     _this.cardNoUnFront = e.target.result;
                }
            },
         nextOneStep:function(){
             // v-link="{path: '/singAgreement'}"
             var bankFront = document.getElementById("bankNoFront").value;
             var cardNoFront = document.getElementById("cardNoFront").value;
             var cardNoUnFront = document.getElementById("cardNoUnFront").value;
             if(bankFront == ''){
                 this.errorMsg ="请上传银行卡正面"
                 return;
             }
             if(cardNoFront == ''){
                 this.errorMsg ="请上传身份证正面"
                 return;
             }
             if(cardNoUnFront == ''){
                 this.errorMsg ="请上传身份证反面"
                 return;
             }
             let accountInfo =getCookie("accountInfo")
             if(accountInfo!=""){
                 let data =  JSON.parse(accountInfo);
                 var obj={bankFront:bankFront,cardNoFront:cardNoFront,cardNoUnFront:cardNoUnFront}
                 //将第一步的信息与第二步的信息合并为一个对象并保存
                 for(let tem in obj){
                     data[tem]=obj[tem];
                 }
                 setCookie("accountInfo",JSON.stringify(data));
                 router.go('/main/singAgreement');
             }
         }
        },

    }
</script>
