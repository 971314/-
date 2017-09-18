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
                <div class="blue-round">3</div>
                <div class="fontOne">签署协议</div>
                <div class="rightLine-blue" style="margin-left: 393px;"></div>
            </div>
            <div class="divImgFour">
                <div class="gray-round">4</div>
                <div class="fontTwo">手机确认</div>
            </div>
            <div class="top-step">
                <div class="accountDivOne">
                    <div class="spanCardOne">协议1</div>
                    <div class="divBankImg">
                        <img :src="singAgreeOne"  class="cardFront">
                    </div>
                    <span class="spanCardOne">
                         <input type="file"  class="changeUpOne" @change="upSingAgreeOne" id="singAgreeOne">
                         <button type="button"  class="btn-style uploadBtn btn-submit dwOne"   data-toggle="button">下载</button>
                        <button type="button" class="btn-style uploadBtn btn-submit btnAccount"   style="margin-top: -50px; margin-left: 24px;" data-toggle="button">上传</button>
                    </span>
                </div>
                <div class="accountDivTwo">
                    <div class="spanCardOne">协议2</div>
                    <div class="divCardImgOne">
                        <img :src="singAgreeTwo" class="cardFront">
                        <span class="spanCardOne">
                             <input type="file" class="changeUpTwo" @change="upSingAgreeTwo" id="singAgreeTwo">
                           <button type="button"  class="btn-style uploadBtn btn-submit dwOne"  style="margin-left:46px"  data-toggle="button">下载</button>
                           <button type="button" class="btn-style uploadBtn btn-submit btnAccount"   style="margin-top: -50px; margin-left: 24px;" data-toggle="button">上传</button>
                       </span>
                    </div>
                </div>
                <div class="accountDivThree" style="    margin-top: -228px;">
                    <div class="spanCardOne">协议3</div>
                    <div class="divCardImgOne">
                        <img :src="singAgreeThree" class="cardFront">
                    </div>
                    <input type="file"  class="changeUpThree" @change="upSingAgreeThree" id="singAgreeThree">
                    <span class="spanCardUploadTwo">
                        <button type="button"  class="btn-style uploadBtn btn-submit  "  style="margin-left: -365px; margin-top: 12px"  data-toggle="button">下载</button>
                        <button type="button" class="btn-style uploadBtn btn-submit btnAccount"   style="margin-top: 13px;  margin-left: 24px;" data-toggle="button">上传</button>
                    </span>
                </div>
                <span class="error-msg upFileMsg">{{errorMsg}}</span>
                <div class="uploadDivStep">
                    <span class="spanCardStepOne"><button  v-link="{path: '/uploadPaperWork'}"   type="button" class="btn-style  btn-submit upFirst"  data-toggle="button">上一步</button></span>
                    <span class="spanCardUploadTwo" style="margin-left: 227px;"><button type="button"   class="btn-style   btn-submit downFirst"  data-toggle="button" @click="nextPhoneConfirm">下一步</button></span>
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
    export default{
    data:function(){
        return{
            singAgreeOne:'./dist/image/index/customerSing.png',
            singAgreeTwo:'./dist/image/index/customerSing.png',
            singAgreeThree:'./dist/image/index/customerSing.png',
            errorMsg:''

        }
    },
    methods:{
        upSingAgreeOne:function(e){
            this.errorMsg =""
            var _this=this;
            var file= e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                _this.singAgreeOne = e.target.result;
            }
        },
        upSingAgreeTwo:function(e){
            this.errorMsg =""
            var _this=this;
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                _this.singAgreeTwo = e.target.result;
            }
        },
        upSingAgreeThree:function(e){
            this.errorMsg =""
            var _this=this;
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                _this.singAgreeThree = e.target.result;
            }
        },
        nextPhoneConfirm:function(){
            // v-link="{path: '/phoneConfirm'}"
            var singOne = document.getElementById("singAgreeOne").value;
            var singTwo = document.getElementById("singAgreeTwo").value;
            var singThree = document.getElementById("singAgreeThree").value;
            if(singOne == ''){
                this.errorMsg ="请上传协议1"
                return;
            }
            if(singTwo == ''){
                this.errorMsg ="请上传协议2"
                return;
            }
            if(singThree == ''){
                this.errorMsg ="请上传协议3"
                return;
            }
            let accountInfo =getCookie("accountInfo")
            if(accountInfo!=""){
                let data =  JSON.parse(accountInfo);
                let obj = {singOne:singOne,singTwo:singTwo,singThree:singThree};
                //将第一二步信息和第三部信息合并为一个对象并保存
                for(let tem in obj){
                    data[tem] = obj[tem];
                }
                setCookie("accountInfo",JSON.stringify(data));
                router.go('/main/phoneConfirm');
            }
        }
    }
    }
</script>
